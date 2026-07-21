# Design Document: AI-Enabled CRM & ERP for Middle Eastern Maritime Hospitality

## 1. Executive Summary

This system is an AI-enabled CRM + ERP prototype for a cruise line operating Arabian Sea → Red Sea itineraries, with future resort partnerships. Traditional hospitality platforms act as a **system of record**. This MVP acts as a **system of intelligence**: guest personalization, compliance automation, and edge-first operations when satellite connectivity drops.

**Brand (demo):** Mare Arabia Cruises, vessel *MS Horizon Pearl*.

For implementation-accurate HLD/LLD (stack, APIs, data model, algorithms), see [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md).

## 2. Traditional vs AI-Enabled CRM/ERP

| Dimension | Traditional CRM/ERP | AI-Enabled (this product) |
|-----------|---------------------|---------------------------|
| Guest data | Static profiles, siloed PMS/POS | 360° guest profile across ship + future resorts |
| Engagement | Manual scripts, call centers | AI concierge with RAG over menus, itineraries, policies |
| Pricing / yield | Periodic manual rate changes | Demand-aware suggestions (Phase 2: pricing agents) |
| Finance | Manual invoices / batch tax filing | ZATCA Phase 2–style clearance & reporting workflows |
| Supply chain | Spreadsheets + periodic audits | Halal cold-chain IoT flags + inventory alerts |
| At sea | Systems degrade offline | Edge SQLite + sync queue until reconnect |
| Ops decisions | After-the-fact reports | Live dashboards, risk banners, predictive flags |

## 3. Domain Context (Middle East Cruise)

- **Itinerary corridor:** Muscat (Arabian Sea) → Jeddah (Red Sea) → Aqaba (Jordan/Red Sea).
- **Regional differentiators:** ZATCA e-invoicing (KSA), halal logistics, faith-aware cabin UX (Qibla / prayer times), GCC multi-port guest journeys.
- **Connectivity:** Intermittent satellite/LTE → offline-first edge writes with deferred cloud sync.
- **Future:** Resort CRM handoff (same guest profile, loyalty, preferences).

## 4. Architecture (MVP)

```
Guest React App ──┐
                  ├── FastAPI (/api/v1) ── SQLite (edge DB)
Ops React App  ───┘         │
                            ├── Concierge (seeded RAG + optional LLM)
                            ├── ZATCA mock engine (TLV QR + UBL-like XML)
                            └── Sync queue (offline → flush on reconnect)
```

**Stack:** React (Vite) + FastAPI + SQLite. Single container can serve API + built frontend for pitch hosting.

## 5. CRM Requirements

| ID | Requirement | MVP | Later |
|----|-------------|-----|-------|
| CRM-01 | 360° guest profile (loyalty, dietary, faith, cabin) | Yes | — |
| CRM-02 | AI multimodal / chat concierge | Text + RAG | Voice, vision |
| CRM-03 | Personalized dining & excursion booking | Yes | Dynamic yield |
| CRM-04 | Faith module (Qibla + prayer times) | Client calc | Cabin screens |
| CRM-05 | GCC Unified Visa API validation | Mock fields | Live API |
| CRM-06 | Cross-property sync (ship ↔ resort) | Design only | Full |

## 6. ERP Requirements

| ID | Requirement | MVP | Later |
|----|-------------|-----|-------|
| ERP-01 | Fleet / voyage ops snapshot | Yes (1 ship) | Multi-ship |
| ERP-02 | Inventory + low-stock alerts | Yes | Auto PO |
| ERP-03 | Halal cold-chain IoT monitoring | Simulated sensors | Real IoT + blockchain |
| ERP-04 | ZATCA B2C simplified (report within 24h model) | Mock TLV QR | Live Fatoora |
| ERP-05 | ZATCA B2B standard (clearance model) | Mock cleared XML | Live CSID |
| ERP-06 | Edge offline queue + sync | Yes | CRDT / Couchbase |
| ERP-07 | Geopolitical routing / re-provision | Static banner | Live AIS risk feeds |
| ERP-08 | Predictive maintenance | — | IoT + work orders |

## 7. AI Concierge Workflow

1. **Perceive** — Guest message + profile context.
2. **Retrieve** — Keyword / chunk match over ship knowledge base.
3. **Reason** — Optional OpenAI/Gemini; else deterministic templates from retrieved chunks.
4. **Act** — Suggest or create booking via API; enqueue sync if offline.
5. **Sync** — When edge online, flush pending events to “cloud” (same DB with `synced_at`).

## 8. ZATCA Simulation Notes

- **Not** connected to live Fatoora; pitch-safe demo only.
- B2C: simplified invoice + Base64 TLV QR (seller, VAT, timestamp, totals).
- B2B: standard invoice marked `cleared` after mock validation.
- Offline POS: invoice status `queued_offline` until sync flush → `pending_report` / `cleared`.

## 9. Out of Scope (Phase 2+)

Couchbase Mobile / CRDT, real ZATCA CSID, live GCC visa APIs, React Native, full predictive maintenance, blockchain halal ledger, multi-tenant auth, Alibaba/GCP data residency production deploy.

## 10. Pitch Demo Script (3 minutes)

1. Open Guest → show profile + itinerary Muscat → Jeddah → Aqaba.
2. Ask concierge for halal dinner / shore excursion → book.
3. Open Ops → see booking + occupancy.
4. Issue ZATCA B2C invoice → show QR payload.
5. Toggle edge offline → create POS sale → reconnect & sync.
6. Show cold-chain alert on out-of-range Halal container.
