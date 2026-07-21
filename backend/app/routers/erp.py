from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import (
    InventoryItem,
    SensorReading,
    Invoice,
    Guest,
    Booking,
    WorkOrder,
    Feedback,
)
from app.schemas import (
    InventoryOut,
    SensorOut,
    InvoiceCreate,
    InvoiceOut,
    FleetSnapshot,
)
from app.services import sync as sync_service
from app.services import zatca as zatca_service

router = APIRouter(prefix="/api/v1", tags=["erp"])


@router.get("/inventory", response_model=list[InventoryOut])
def list_inventory(db: Session = Depends(get_db)):
    items = db.query(InventoryItem).order_by(InventoryItem.name).all()
    out = []
    for item in items:
        data = InventoryOut.model_validate(item)
        data.low_stock = item.quantity < item.min_quantity
        out.append(data)
    return out


@router.get("/sensors", response_model=list[SensorOut])
def list_sensors(db: Session = Depends(get_db)):
    return db.query(SensorReading).order_by(SensorReading.recorded_at.desc()).all()


@router.post("/sensors/simulate-tick", response_model=list[SensorOut])
def simulate_sensor_tick(db: Session = Depends(get_db)):
    sensors = db.query(SensorReading).all()
    for s in sensors:
        if s.sensor_id == "CS-B-TEMP":
            s.value = round(s.value + 0.3, 1)
            s.alert = s.value < s.min_safe or s.value > s.max_safe
            s.recorded_at = datetime.utcnow()
        elif s.sensor_id == "CS-A-TEMP":
            s.value = round(1.5 + (datetime.utcnow().second % 10) * 0.1, 1)
            s.alert = False
            s.recorded_at = datetime.utcnow()
    db.commit()
    return db.query(SensorReading).order_by(SensorReading.id).all()


@router.get("/invoices", response_model=list[InvoiceOut])
def list_invoices(db: Session = Depends(get_db)):
    return db.query(Invoice).order_by(Invoice.created_at.desc()).all()


@router.post("/invoices", response_model=InvoiceOut)
def create_invoice(body: InvoiceCreate, db: Session = Depends(get_db)):
    if body.invoice_type == "B2B" and not body.buyer_vat:
        raise HTTPException(400, "B2B invoices require buyer_vat")

    count = db.query(Invoice).count() + 1
    subtotal, vat, total = zatca_service.compute_amounts(body.subtotal_sar)
    online = sync_service.is_online(db)

    if not online:
        status = "queued_offline"
    elif body.invoice_type == "B2B":
        status = "cleared"
    else:
        status = "pending_report"

    invoice_number = zatca_service.next_invoice_number(body.invoice_type, count)
    ts = datetime.utcnow().replace(microsecond=0).isoformat() + "Z"
    qr = zatca_service.build_tlv_qr(
        settings.seller_name,
        settings.seller_vat,
        ts,
        total,
        vat,
    )
    xml = zatca_service.build_xml_invoice(
        invoice_number,
        body.invoice_type,
        body.buyer_name,
        body.buyer_vat,
        body.description,
        subtotal,
        vat,
        total,
        status,
    )

    inv = Invoice(
        invoice_number=invoice_number,
        invoice_type=body.invoice_type,
        buyer_name=body.buyer_name,
        buyer_vat=body.buyer_vat,
        description=body.description,
        subtotal_sar=subtotal,
        vat_sar=vat,
        total_sar=total,
        status=status,
        qr_tlv_base64=qr,
        xml_payload=xml,
        synced_at=datetime.utcnow() if online else None,
    )
    db.add(inv)
    db.commit()
    db.refresh(inv)

    if not online:
        sync_service.enqueue(
            db,
            "invoice",
            inv.id,
            "create",
            {"invoice_number": inv.invoice_number, "status": status},
        )
    return inv


@router.get("/fleet/snapshot", response_model=FleetSnapshot)
def fleet_snapshot(db: Session = Depends(get_db)):
    state = sync_service.get_or_create_state(db)
    guest_count = db.query(Guest).count()
    booking_count = db.query(Booking).filter(Booking.status != "cancelled").count()
    low = sum(1 for i in db.query(InventoryItem).all() if i.quantity < i.min_quantity)
    alerts = db.query(SensorReading).filter(SensorReading.alert.is_(True)).count()
    open_wo = (
        db.query(WorkOrder)
        .filter(WorkOrder.status.in_(["Open", "In progress", "Scheduled"]))
        .count()
    )
    avg_fb = db.query(func.avg(Feedback.rating)).scalar() or 0.0
    revenue = (
        db.query(func.coalesce(func.sum(Booking.amount_sar), 0.0))
        .filter(Booking.status != "cancelled")
        .scalar()
        or 0.0
    )
    invoice_rev = db.query(func.coalesce(func.sum(Invoice.total_sar), 0.0)).scalar() or 0.0
    occupancy = min(96.0, 58.0 + guest_count * 5.2)
    return FleetSnapshot(
        ship_name=settings.ship_name,
        occupancy_pct=occupancy,
        guest_count=guest_count,
        booking_count=booking_count,
        low_stock_items=low,
        sensor_alerts=alerts,
        pending_sync=sync_service.pending_count(db),
        edge_online=state.edge_online,
        risk_banner=state.risk_banner,
        open_work_orders=open_wo,
        avg_feedback=round(float(avg_fb), 2),
        revenue_today_sar=round(float(revenue) + float(invoice_rev), 2),
    )
