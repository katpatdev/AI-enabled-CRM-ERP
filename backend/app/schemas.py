from datetime import datetime
from pydantic import BaseModel, Field


class GuestOut(BaseModel):
    id: int
    name: str
    email: str
    cabin: str
    loyalty_tier: str
    loyalty_points: int
    dietary: str
    faith_prefs: str
    mobility: str
    language: str
    interests: str
    gcc_visa_status: str
    nationality: str
    check_in_status: str

    class Config:
        from_attributes = True


class ItineraryStopOut(BaseModel):
    id: int
    day: int
    port: str
    sea: str
    arrival: str
    departure: str
    highlight: str
    weather_note: str

    class Config:
        from_attributes = True


class OfferOut(BaseModel):
    id: int
    offer_type: str
    title: str
    description: str
    port: str
    base_price_sar: float
    yield_price_sar: float
    demand_score: float
    capacity: int
    booked: int
    remaining: int
    dietary_tags: str
    active: bool
    fill_pct: float

    class Config:
        from_attributes = True


class BookingCreate(BaseModel):
    guest_id: int
    booking_type: str = Field(pattern="^(dining|excursion|spa)$")
    title: str
    details: str = ""
    amount_sar: float = 0.0
    offer_id: int | None = None


class BookingOut(BaseModel):
    id: int
    guest_id: int
    offer_id: int | None
    booking_type: str
    title: str
    details: str
    status: str
    amount_sar: float
    created_at: datetime
    synced_at: datetime | None

    class Config:
        from_attributes = True


class InventoryOut(BaseModel):
    id: int
    sku: str
    name: str
    category: str
    quantity: int
    unit: str
    min_quantity: int
    halal_certified: bool
    location: str
    low_stock: bool = False

    class Config:
        from_attributes = True


class SensorOut(BaseModel):
    id: int
    sensor_id: str
    location: str
    metric: str
    value: float
    min_safe: float
    max_safe: float
    recorded_at: datetime
    alert: bool

    class Config:
        from_attributes = True


class InvoiceCreate(BaseModel):
    invoice_type: str = Field(pattern="^(B2C|B2B)$")
    buyer_name: str
    buyer_vat: str | None = None
    description: str
    subtotal_sar: float


class InvoiceOut(BaseModel):
    id: int
    invoice_number: str
    invoice_type: str
    buyer_name: str
    buyer_vat: str | None
    description: str
    subtotal_sar: float
    vat_sar: float
    total_sar: float
    status: str
    qr_tlv_base64: str
    xml_payload: str
    created_at: datetime
    synced_at: datetime | None

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    guest_id: int
    message: str


class ChatResponse(BaseModel):
    reply: str
    sources: list[str]
    suggestions: list[str]
    mode: str


class SyncEventOut(BaseModel):
    id: int
    entity_type: str
    entity_id: int
    action: str
    payload: str
    status: str
    created_at: datetime
    synced_at: datetime | None

    class Config:
        from_attributes = True


class SyncStatusOut(BaseModel):
    edge_online: bool
    pending_count: int
    risk_banner: str
    ship_name: str
    ship_lat: float
    ship_lon: float


class EdgeToggle(BaseModel):
    edge_online: bool


class FleetSnapshot(BaseModel):
    ship_name: str
    occupancy_pct: float
    guest_count: int
    booking_count: int
    low_stock_items: int
    sensor_alerts: int
    pending_sync: int
    edge_online: bool
    risk_banner: str
    open_work_orders: int
    avg_feedback: float
    revenue_today_sar: float


class CabinOut(BaseModel):
    id: int
    cabin: str
    guest_id: int | None
    housekeeping: str
    mini_bar: str
    service_notes: str

    class Config:
        from_attributes = True


class CabinUpdate(BaseModel):
    housekeeping: str | None = None
    mini_bar: str | None = None
    service_notes: str | None = None


class WorkOrderOut(BaseModel):
    id: int
    title: str
    asset: str
    priority: str
    status: str
    assigned_to: str
    notes: str
    created_at: datetime

    class Config:
        from_attributes = True


class WorkOrderCreate(BaseModel):
    title: str
    asset: str
    priority: str = "Medium"
    assigned_to: str = "Unassigned"
    notes: str = ""


class WorkOrderUpdate(BaseModel):
    status: str | None = None
    assigned_to: str | None = None
    priority: str | None = None


class FeedbackCreate(BaseModel):
    guest_id: int
    rating: int = Field(ge=1, le=5)
    category: str = "General"
    comment: str = ""


class FeedbackOut(BaseModel):
    id: int
    guest_id: int
    rating: int
    category: str
    comment: str
    sentiment: str
    created_at: datetime

    class Config:
        from_attributes = True


class CrewOut(BaseModel):
    id: int
    name: str
    role: str
    department: str
    shift: str
    on_duty: bool

    class Config:
        from_attributes = True


class NotificationOut(BaseModel):
    id: int
    guest_id: int | None
    title: str
    body: str
    kind: str
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class LoyaltyRedeem(BaseModel):
    guest_id: int
    points: int = Field(ge=100)
    reason: str = "Onboard reward"
