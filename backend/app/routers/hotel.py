from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    CabinStatus,
    WorkOrder,
    Feedback,
    CrewMember,
    Notification,
    Guest,
)
from app.schemas import (
    CabinOut,
    CabinUpdate,
    WorkOrderOut,
    WorkOrderCreate,
    WorkOrderUpdate,
    FeedbackCreate,
    FeedbackOut,
    CrewOut,
    NotificationOut,
    LoyaltyRedeem,
    GuestOut,
)

router = APIRouter(prefix="/api/v1", tags=["hotel-ops"])


def _sentiment(rating: int, comment: str) -> str:
    lower = comment.lower()
    if rating <= 2 or any(w in lower for w in ("bad", "poor", "slow", "dirty", "rude")):
        return "Negative"
    if rating == 3 or any(w in lower for w in ("wait", "could improve", "ok")):
        return "Neutral"
    return "Positive"


@router.get("/cabins", response_model=list[CabinOut])
def list_cabins(db: Session = Depends(get_db)):
    return db.query(CabinStatus).order_by(CabinStatus.cabin).all()


@router.patch("/cabins/{cabin_id}", response_model=CabinOut)
def update_cabin(cabin_id: int, body: CabinUpdate, db: Session = Depends(get_db)):
    cabin = db.query(CabinStatus).filter(CabinStatus.id == cabin_id).first()
    if not cabin:
        raise HTTPException(404, "Cabin not found")
    if body.housekeeping is not None:
        cabin.housekeeping = body.housekeeping
    if body.mini_bar is not None:
        cabin.mini_bar = body.mini_bar
    if body.service_notes is not None:
        cabin.service_notes = body.service_notes
    db.commit()
    db.refresh(cabin)
    return cabin


@router.get("/work-orders", response_model=list[WorkOrderOut])
def list_work_orders(db: Session = Depends(get_db)):
    return db.query(WorkOrder).order_by(WorkOrder.created_at.desc()).all()


@router.post("/work-orders", response_model=WorkOrderOut)
def create_work_order(body: WorkOrderCreate, db: Session = Depends(get_db)):
    wo = WorkOrder(
        title=body.title,
        asset=body.asset,
        priority=body.priority,
        assigned_to=body.assigned_to,
        notes=body.notes,
        status="Open",
    )
    db.add(wo)
    db.commit()
    db.refresh(wo)
    return wo


@router.patch("/work-orders/{wo_id}", response_model=WorkOrderOut)
def update_work_order(wo_id: int, body: WorkOrderUpdate, db: Session = Depends(get_db)):
    wo = db.query(WorkOrder).filter(WorkOrder.id == wo_id).first()
    if not wo:
        raise HTTPException(404, "Work order not found")
    if body.status is not None:
        wo.status = body.status
    if body.assigned_to is not None:
        wo.assigned_to = body.assigned_to
    if body.priority is not None:
        wo.priority = body.priority
    db.commit()
    db.refresh(wo)
    return wo


@router.get("/feedback", response_model=list[FeedbackOut])
def list_feedback(guest_id: int | None = None, db: Session = Depends(get_db)):
    q = db.query(Feedback).order_by(Feedback.created_at.desc())
    if guest_id is not None:
        q = q.filter(Feedback.guest_id == guest_id)
    return q.all()


@router.post("/feedback", response_model=FeedbackOut)
def create_feedback(body: FeedbackCreate, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == body.guest_id).first()
    if not guest:
        raise HTTPException(404, "Guest not found")
    row = Feedback(
        guest_id=body.guest_id,
        rating=body.rating,
        category=body.category,
        comment=body.comment,
        sentiment=_sentiment(body.rating, body.comment),
        created_at=datetime.utcnow(),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/crew", response_model=list[CrewOut])
def list_crew(db: Session = Depends(get_db)):
    return db.query(CrewMember).order_by(CrewMember.department, CrewMember.name).all()


@router.get("/notifications", response_model=list[NotificationOut])
def list_notifications(guest_id: int | None = None, db: Session = Depends(get_db)):
    q = db.query(Notification).order_by(Notification.created_at.desc())
    if guest_id is not None:
        q = q.filter(
            (Notification.guest_id == guest_id) | (Notification.guest_id.is_(None))
        )
    return q.limit(40).all()


@router.post("/notifications/{nid}/read", response_model=NotificationOut)
def mark_read(nid: int, db: Session = Depends(get_db)):
    n = db.query(Notification).filter(Notification.id == nid).first()
    if not n:
        raise HTTPException(404, "Notification not found")
    n.read = True
    db.commit()
    db.refresh(n)
    return n


@router.post("/loyalty/redeem", response_model=GuestOut)
def redeem_loyalty(body: LoyaltyRedeem, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == body.guest_id).first()
    if not guest:
        raise HTTPException(404, "Guest not found")
    if guest.loyalty_points < body.points:
        raise HTTPException(400, "Insufficient points")
    guest.loyalty_points -= body.points
    db.add(
        Notification(
            guest_id=guest.id,
            title="Points redeemed",
            body=f"Redeemed {body.points} Pearl Points for: {body.reason}",
            kind="loyalty",
        )
    )
    db.commit()
    db.refresh(guest)
    return guest
