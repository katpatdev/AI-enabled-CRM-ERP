from datetime import datetime
from sqlalchemy import String, Float, Integer, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class SystemState(Base):
    __tablename__ = "system_state"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    edge_online: Mapped[bool] = mapped_column(Boolean, default=True)
    risk_banner: Mapped[str] = mapped_column(Text, default="")
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Guest(Base):
    __tablename__ = "guests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(180), unique=True)
    cabin: Mapped[str] = mapped_column(String(20))
    loyalty_tier: Mapped[str] = mapped_column(String(40), default="Pearl")
    loyalty_points: Mapped[int] = mapped_column(Integer, default=0)
    dietary: Mapped[str] = mapped_column(String(120), default="Halal")
    faith_prefs: Mapped[str] = mapped_column(String(120), default="Prayer reminders")
    mobility: Mapped[str] = mapped_column(String(80), default="Standard")
    language: Mapped[str] = mapped_column(String(40), default="en")
    interests: Mapped[str] = mapped_column(Text, default="")
    gcc_visa_status: Mapped[str] = mapped_column(String(40), default="Valid")
    nationality: Mapped[str] = mapped_column(String(80), default="")
    check_in_status: Mapped[str] = mapped_column(String(40), default="Onboard")

    bookings = relationship("Booking", back_populates="guest")
    feedback = relationship("Feedback", back_populates="guest")


class ItineraryStop(Base):
    __tablename__ = "itinerary_stops"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    day: Mapped[int] = mapped_column(Integer)
    port: Mapped[str] = mapped_column(String(80))
    sea: Mapped[str] = mapped_column(String(80))
    arrival: Mapped[str] = mapped_column(String(40))
    departure: Mapped[str] = mapped_column(String(40))
    highlight: Mapped[str] = mapped_column(Text)
    weather_note: Mapped[str] = mapped_column(String(200), default="")


class KnowledgeChunk(Base):
    __tablename__ = "knowledge_chunks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    category: Mapped[str] = mapped_column(String(60))
    title: Mapped[str] = mapped_column(String(160))
    content: Mapped[str] = mapped_column(Text)
    tags: Mapped[str] = mapped_column(String(240), default="")


class Offer(Base):
    """Bookable dining / excursion catalog with yield pricing."""

    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    offer_type: Mapped[str] = mapped_column(String(40))  # dining | excursion | spa
    title: Mapped[str] = mapped_column(String(160))
    description: Mapped[str] = mapped_column(Text, default="")
    port: Mapped[str] = mapped_column(String(80), default="Onboard")
    base_price_sar: Mapped[float] = mapped_column(Float, default=0.0)
    demand_score: Mapped[float] = mapped_column(Float, default=0.5)  # 0-1
    capacity: Mapped[int] = mapped_column(Integer, default=40)
    booked: Mapped[int] = mapped_column(Integer, default=0)
    dietary_tags: Mapped[str] = mapped_column(String(120), default="")
    active: Mapped[bool] = mapped_column(Boolean, default=True)


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    guest_id: Mapped[int] = mapped_column(ForeignKey("guests.id"))
    offer_id: Mapped[int | None] = mapped_column(ForeignKey("offers.id"), nullable=True)
    booking_type: Mapped[str] = mapped_column(String(40))
    title: Mapped[str] = mapped_column(String(160))
    details: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(40), default="confirmed")
    amount_sar: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    synced_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    guest = relationship("Guest", back_populates="bookings")


class CabinStatus(Base):
    __tablename__ = "cabin_statuses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    cabin: Mapped[str] = mapped_column(String(20), unique=True)
    guest_id: Mapped[int | None] = mapped_column(ForeignKey("guests.id"), nullable=True)
    housekeeping: Mapped[str] = mapped_column(String(40), default="Ready")
    mini_bar: Mapped[str] = mapped_column(String(40), default="Stocked")
    service_notes: Mapped[str] = mapped_column(Text, default="")


class WorkOrder(Base):
    __tablename__ = "work_orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(160))
    asset: Mapped[str] = mapped_column(String(120))
    priority: Mapped[str] = mapped_column(String(40), default="Medium")
    status: Mapped[str] = mapped_column(String(40), default="Open")
    assigned_to: Mapped[str] = mapped_column(String(120), default="Unassigned")
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Feedback(Base):
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    guest_id: Mapped[int] = mapped_column(ForeignKey("guests.id"))
    rating: Mapped[int] = mapped_column(Integer, default=5)
    category: Mapped[str] = mapped_column(String(60), default="General")
    comment: Mapped[str] = mapped_column(Text, default="")
    sentiment: Mapped[str] = mapped_column(String(40), default="Positive")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    guest = relationship("Guest", back_populates="feedback")


class CrewMember(Base):
    __tablename__ = "crew_members"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120))
    role: Mapped[str] = mapped_column(String(80))
    department: Mapped[str] = mapped_column(String(80))
    shift: Mapped[str] = mapped_column(String(40), default="Day")
    on_duty: Mapped[bool] = mapped_column(Boolean, default=True)


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    guest_id: Mapped[int | None] = mapped_column(ForeignKey("guests.id"), nullable=True)
    title: Mapped[str] = mapped_column(String(160))
    body: Mapped[str] = mapped_column(Text)
    kind: Mapped[str] = mapped_column(String(40), default="info")
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    sku: Mapped[str] = mapped_column(String(40), unique=True)
    name: Mapped[str] = mapped_column(String(120))
    category: Mapped[str] = mapped_column(String(60))
    quantity: Mapped[int] = mapped_column(Integer)
    unit: Mapped[str] = mapped_column(String(20), default="kg")
    min_quantity: Mapped[int] = mapped_column(Integer, default=10)
    halal_certified: Mapped[bool] = mapped_column(Boolean, default=True)
    location: Mapped[str] = mapped_column(String(80), default="Cold Store A")


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    sensor_id: Mapped[str] = mapped_column(String(40))
    location: Mapped[str] = mapped_column(String(80))
    metric: Mapped[str] = mapped_column(String(40), default="temperature_c")
    value: Mapped[float] = mapped_column(Float)
    min_safe: Mapped[float] = mapped_column(Float, default=-2.0)
    max_safe: Mapped[float] = mapped_column(Float, default=4.0)
    recorded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    alert: Mapped[bool] = mapped_column(Boolean, default=False)


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    invoice_number: Mapped[str] = mapped_column(String(40), unique=True)
    invoice_type: Mapped[str] = mapped_column(String(20))
    buyer_name: Mapped[str] = mapped_column(String(160))
    buyer_vat: Mapped[str | None] = mapped_column(String(40), nullable=True)
    description: Mapped[str] = mapped_column(Text)
    subtotal_sar: Mapped[float] = mapped_column(Float)
    vat_sar: Mapped[float] = mapped_column(Float)
    total_sar: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(40), default="pending_report")
    qr_tlv_base64: Mapped[str] = mapped_column(Text, default="")
    xml_payload: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    synced_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


class SyncEvent(Base):
    __tablename__ = "sync_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    entity_type: Mapped[str] = mapped_column(String(40))
    entity_id: Mapped[int] = mapped_column(Integer)
    action: Mapped[str] = mapped_column(String(40))
    payload: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(40), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    synced_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
