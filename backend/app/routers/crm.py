from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Guest, ItineraryStop, Booking, Offer
from app.schemas import GuestOut, ItineraryStopOut, BookingCreate, BookingOut, OfferOut
from app.services import sync as sync_service
from app.services.yield_pricing import yield_price

router = APIRouter(prefix="/api/v1", tags=["crm"])


def _offer_out(offer: Offer) -> OfferOut:
    yp = yield_price(offer.base_price_sar, offer.demand_score, offer.booked, offer.capacity)
    remaining = max(0, offer.capacity - offer.booked)
    fill = round(100 * offer.booked / offer.capacity, 1) if offer.capacity else 0
    return OfferOut(
        id=offer.id,
        offer_type=offer.offer_type,
        title=offer.title,
        description=offer.description,
        port=offer.port,
        base_price_sar=offer.base_price_sar,
        yield_price_sar=yp,
        demand_score=offer.demand_score,
        capacity=offer.capacity,
        booked=offer.booked,
        remaining=remaining,
        dietary_tags=offer.dietary_tags,
        active=offer.active,
        fill_pct=fill,
    )


@router.get("/guests", response_model=list[GuestOut])
def list_guests(db: Session = Depends(get_db)):
    return db.query(Guest).order_by(Guest.id).all()


@router.get("/guests/{guest_id}", response_model=GuestOut)
def get_guest(guest_id: int, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(404, "Guest not found")
    return guest


@router.get("/itinerary", response_model=list[ItineraryStopOut])
def get_itinerary(db: Session = Depends(get_db)):
    return db.query(ItineraryStop).order_by(ItineraryStop.day).all()


@router.get("/offers", response_model=list[OfferOut])
def list_offers(offer_type: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Offer).filter(Offer.active.is_(True)).order_by(Offer.offer_type, Offer.title)
    if offer_type:
        q = q.filter(Offer.offer_type == offer_type)
    return [_offer_out(o) for o in q.all()]


@router.get("/bookings", response_model=list[BookingOut])
def list_bookings(guest_id: int | None = None, db: Session = Depends(get_db)):
    q = db.query(Booking).order_by(Booking.created_at.desc())
    if guest_id is not None:
        q = q.filter(Booking.guest_id == guest_id)
    return q.all()


@router.post("/bookings", response_model=BookingOut)
def create_booking(body: BookingCreate, db: Session = Depends(get_db)):
    guest = db.query(Guest).filter(Guest.id == body.guest_id).first()
    if not guest:
        raise HTTPException(404, "Guest not found")

    amount = body.amount_sar
    title = body.title
    offer_id = body.offer_id
    booking_type = body.booking_type

    if offer_id:
        offer = db.query(Offer).filter(Offer.id == offer_id).first()
        if not offer:
            raise HTTPException(404, "Offer not found")
        if offer.booked >= offer.capacity:
            raise HTTPException(400, "Offer is sold out")
        amount = yield_price(offer.base_price_sar, offer.demand_score, offer.booked, offer.capacity)
        # Diamond spa discount
        if offer.offer_type == "spa" and guest.loyalty_tier == "Diamond":
            amount = round(amount * 0.85, 2)
        title = offer.title
        booking_type = offer.offer_type
        offer.booked += 1
        offer.demand_score = min(0.98, offer.demand_score + 0.02)

    online = sync_service.is_online(db)
    booking = Booking(
        guest_id=body.guest_id,
        offer_id=offer_id,
        booking_type=booking_type,
        title=title,
        details=body.details,
        amount_sar=amount,
        status="confirmed",
        synced_at=datetime.utcnow() if online else None,
    )
    db.add(booking)

    # Earn loyalty: 1 point per SAR (min 50 for complimentary dining)
    earned = max(50, int(amount)) if amount else 75
    guest.loyalty_points += earned

    db.commit()
    db.refresh(booking)

    if not online:
        sync_service.enqueue(
            db,
            "booking",
            booking.id,
            "create",
            {"title": booking.title, "guest_id": booking.guest_id},
        )
    return booking


@router.post("/bookings/{booking_id}/cancel", response_model=BookingOut)
def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(404, "Booking not found")
    if booking.status == "cancelled":
        return booking
    booking.status = "cancelled"
    if booking.offer_id:
        offer = db.query(Offer).filter(Offer.id == booking.offer_id).first()
        if offer and offer.booked > 0:
            offer.booked -= 1
    db.commit()
    db.refresh(booking)
    return booking
