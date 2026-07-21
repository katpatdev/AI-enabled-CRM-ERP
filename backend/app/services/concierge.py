"""Hybrid AI concierge: seeded RAG + optional OpenAI."""

from __future__ import annotations

import re

from sqlalchemy.orm import Session

from app.config import settings
from app.models import Guest, KnowledgeChunk, ItineraryStop


def _tokenize(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-z0-9]+", text.lower()) if len(t) > 2}


def retrieve_chunks(db: Session, message: str, limit: int = 3) -> list[KnowledgeChunk]:
    tokens = _tokenize(message)
    chunks = db.query(KnowledgeChunk).all()
    scored: list[tuple[int, KnowledgeChunk]] = []
    for chunk in chunks:
        hay = _tokenize(f"{chunk.title} {chunk.content} {chunk.tags} {chunk.category}")
        score = len(tokens & hay)
        if "halal" in tokens and "halal" in hay:
            score += 2
        if any(k in tokens for k in ("prayer", "qibla", "faith")) and chunk.category == "policy":
            score += 2
        if any(k in tokens for k in ("jeddah", "muscat", "aqaba", "excursion", "tour")):
            if chunk.category == "excursion":
                score += 1
        if any(k in tokens for k in ("loyalty", "points", "reward")) and chunk.category == "loyalty":
            score += 2
        scored.append((score, chunk))
    scored.sort(key=lambda x: x[0], reverse=True)
    top = [c for s, c in scored if s > 0][:limit]
    if not top:
        top = chunks[:limit]
    return top


def _fallback_reply(guest: Guest, message: str, chunks: list[KnowledgeChunk], stops: list[ItineraryStop]) -> str:
    titles = ", ".join(c.title for c in chunks[:3])
    port_line = " -> ".join(f"{s.port} ({s.sea})" for s in stops)
    lower = message.lower()

    if any(w in lower for w in ("loyalty", "points", "reward", "redeem")):
        return (
            f"You have {guest.loyalty_points} Pearl Points as a {guest.loyalty_tier} member. "
            "Earn 1 point per SAR spent. Redeem 500 points for coffee or a mini-bar refill from Loyalty."
        )
    if any(w in lower for w in ("dinner", "dining", "restaurant", "eat", "halal", "food")):
        diet = guest.dietary
        return (
            f"Based on your {diet} preference and loyalty tier ({guest.loyalty_tier}), "
            f"I recommend: {titles}. Your cabin {guest.cabin} is a short walk from Deck elevators. "
            f"Shall I reserve a table at Al Bahar or Oasis Cafe?"
        )
    if any(w in lower for w in ("excursion", "tour", "shore", "jeddah", "muscat", "aqaba", "desert")):
        mobility = guest.mobility
        return (
            f"For our voyage {port_line}, top matches for you: {titles}. "
            f"Noted mobility: {mobility}. I can book Jeddah Al-Balad or Wadi Rum with seating options."
        )
    if any(w in lower for w in ("prayer", "qibla", "faith", "mosque")):
        return (
            "Prayer room is on Deck 4 midship. Your cabin screen and this app show live Qibla toward Makkah "
            "using ship GPS. Quiet hours 04:30 to 06:00 support Fajr. Want a reminder before Maghrib today?"
        )
    if any(w in lower for w in ("spa", "hot", "weather", "heat")):
        return (
            f"Given midday Red Sea heat guidance, Pearl Spa is ideal now. "
            f"Diamond/Gold perks may apply for {guest.name.split()[0]}. Sources: {titles}."
        )
    return (
        f"Marhaba {guest.name.split()[0]}! I am your Mare Arabia concierge aboard {settings.ship_name}. "
        f"Voyage: {port_line}. I can help with dining, shore excursions, spa, loyalty, and prayer facilities. "
        f"Relevant info: {titles}."
    )


def _suggestions(chunks: list[KnowledgeChunk]) -> list[str]:
    tips = [c.title for c in chunks[:3]]
    tips.append("Show prayer times and Qibla")
    return tips[:4]


async def chat(db: Session, guest_id: int, message: str) -> dict:
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        return {
            "reply": "Guest not found. Please select a valid guest profile.",
            "sources": [],
            "suggestions": [],
            "mode": "error",
        }

    chunks = retrieve_chunks(db, message)
    stops = db.query(ItineraryStop).order_by(ItineraryStop.day).all()
    sources = [c.title for c in chunks]
    suggestions = _suggestions(chunks)
    context = "\n\n".join(f"### {c.title}\n{c.content}" for c in chunks)
    itinerary = "\n".join(f"Day {s.day}: {s.port} ({s.sea}) - {s.highlight}" for s in stops)

    if settings.openai_api_key:
        try:
            from openai import OpenAI

            client = OpenAI(api_key=settings.openai_api_key)
            system = (
                "You are the AI concierge for Mare Arabia Cruises on MS Horizon Pearl, "
                "sailing Arabian Sea to Red Sea. Be concise, warm, and culturally aware. "
                "Ground answers ONLY in the provided context. Suggest bookable dining or excursions. "
                "Mention Halal / faith options when relevant. Do not use em dashes."
            )
            user = (
                f"Guest: {guest.name}, cabin {guest.cabin}, tier {guest.loyalty_tier}, "
                f"points {guest.loyalty_points}, dietary {guest.dietary}, mobility {guest.mobility}, "
                f"interests {guest.interests}.\n"
                f"Itinerary:\n{itinerary}\n\nContext:\n{context}\n\nGuest message: {message}"
            )
            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                temperature=0.4,
                max_tokens=350,
            )
            reply = completion.choices[0].message.content or _fallback_reply(guest, message, chunks, stops)
            return {
                "reply": reply,
                "sources": sources,
                "suggestions": suggestions,
                "mode": "openai",
            }
        except Exception as exc:  # noqa: BLE001
            fallback = _fallback_reply(guest, message, chunks, stops)
            return {
                "reply": f"{fallback}\n\n(Live AI unavailable: {exc})",
                "sources": sources,
                "suggestions": suggestions,
                "mode": "fallback",
            }

    return {
        "reply": _fallback_reply(guest, message, chunks, stops),
        "sources": sources,
        "suggestions": suggestions,
        "mode": "rag-fallback",
    }
