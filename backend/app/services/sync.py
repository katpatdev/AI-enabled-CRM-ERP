"""Edge offline sync queue — enqueue when offline, flush when reconnecting."""

from __future__ import annotations

import json
from datetime import datetime

from sqlalchemy.orm import Session

from app.models import SystemState, SyncEvent, Booking, Invoice


def get_or_create_state(db: Session) -> SystemState:
    state = db.query(SystemState).filter(SystemState.id == 1).first()
    if not state:
        state = SystemState(id=1, edge_online=True, risk_banner="")
        db.add(state)
        db.commit()
        db.refresh(state)
    return state


def is_online(db: Session) -> bool:
    return bool(get_or_create_state(db).edge_online)


def set_online(db: Session, online: bool) -> SystemState:
    state = get_or_create_state(db)
    state.edge_online = online
    state.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(state)
    return state


def enqueue(
    db: Session,
    entity_type: str,
    entity_id: int,
    action: str,
    payload: dict | None = None,
) -> SyncEvent | None:
    """Create pending sync event only when edge is offline."""
    if is_online(db):
        return None
    event = SyncEvent(
        entity_type=entity_type,
        entity_id=entity_id,
        action=action,
        payload=json.dumps(payload or {}),
        status="pending",
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def mark_entity_synced(db: Session, entity_type: str, entity_id: int) -> None:
    now = datetime.utcnow()
    if entity_type == "booking":
        row = db.query(Booking).filter(Booking.id == entity_id).first()
        if row:
            row.synced_at = now
    elif entity_type == "invoice":
        row = db.query(Invoice).filter(Invoice.id == entity_id).first()
        if row:
            row.synced_at = now
            if row.status == "queued_offline":
                row.status = "pending_report" if row.invoice_type == "B2C" else "cleared"
    db.commit()


def flush_pending(db: Session) -> int:
    """Mark all pending sync events as synced and update related entities."""
    pending = db.query(SyncEvent).filter(SyncEvent.status == "pending").all()
    now = datetime.utcnow()
    count = 0
    for event in pending:
        mark_entity_synced(db, event.entity_type, event.entity_id)
        event.status = "synced"
        event.synced_at = now
        count += 1
    db.commit()
    return count


def pending_count(db: Session) -> int:
    return db.query(SyncEvent).filter(SyncEvent.status == "pending").count()
