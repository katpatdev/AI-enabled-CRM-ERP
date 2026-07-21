from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import SyncEvent
from app.schemas import ChatRequest, ChatResponse, SyncStatusOut, SyncEventOut, EdgeToggle
from app.services import concierge as concierge_service
from app.services import sync as sync_service

router = APIRouter(prefix="/api/v1", tags=["ai-sync"])


@router.post("/concierge/chat", response_model=ChatResponse)
async def concierge_chat(body: ChatRequest, db: Session = Depends(get_db)):
    result = await concierge_service.chat(db, body.guest_id, body.message)
    return ChatResponse(**result)


@router.get("/sync/status", response_model=SyncStatusOut)
def sync_status(db: Session = Depends(get_db)):
    state = sync_service.get_or_create_state(db)
    return SyncStatusOut(
        edge_online=state.edge_online,
        pending_count=sync_service.pending_count(db),
        risk_banner=state.risk_banner,
        ship_name=settings.ship_name,
        ship_lat=settings.ship_lat,
        ship_lon=settings.ship_lon,
    )


@router.get("/sync/events", response_model=list[SyncEventOut])
def list_sync_events(db: Session = Depends(get_db)):
    return db.query(SyncEvent).order_by(SyncEvent.created_at.desc()).limit(50).all()


@router.post("/sync/edge", response_model=SyncStatusOut)
def set_edge(body: EdgeToggle, db: Session = Depends(get_db)):
    state = sync_service.set_online(db, body.edge_online)
    if body.edge_online:
        sync_service.flush_pending(db)
    return SyncStatusOut(
        edge_online=state.edge_online,
        pending_count=sync_service.pending_count(db),
        risk_banner=state.risk_banner,
        ship_name=settings.ship_name,
        ship_lat=settings.ship_lat,
        ship_lon=settings.ship_lon,
    )


@router.post("/sync/flush", response_model=SyncStatusOut)
def flush_sync(db: Session = Depends(get_db)):
    state = sync_service.get_or_create_state(db)
    if state.edge_online:
        sync_service.flush_pending(db)
    return SyncStatusOut(
        edge_online=state.edge_online,
        pending_count=sync_service.pending_count(db),
        risk_banner=state.risk_banner,
        ship_name=settings.ship_name,
        ship_lat=settings.ship_lat,
        ship_lon=settings.ship_lon,
    )
