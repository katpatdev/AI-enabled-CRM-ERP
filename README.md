# Mare Arabia | AI-Enabled CRM and ERP (MVP)

Pitchable prototype for a Middle Eastern cruise line sailing **Arabian Sea to Red Sea** (Muscat · Jeddah · Aqaba). Combines guest CRM (AI concierge, faith UX, loyalty, experiences) with ops ERP (ZATCA mock invoicing, Halal cold-chain, cabins, maintenance, crew, edge sync).

Full design notes: [docs/DESIGN.md](docs/DESIGN.md)  
**High-level + low-level tech document (stack, features, APIs, data model):** [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md)

## Quick start (local)

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8888
```

Optional live LLM: set `OPENAI_API_KEY` in the environment (otherwise deterministic RAG fallback).

### Frontend (dev)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 (Vite proxies `/api` to `:8888`).

### Docker (single URL for pitch)

```bash
docker compose up --build
```

Open http://localhost:8888

## Pitch demo script (~4 minutes)

1. **Landing**: Mare Arabia brand, CRM vs ERP CTAs.
2. **Guest CRM**: Select Layla Al-Harbi, show itinerary Muscat to Jeddah to Aqaba.
3. **Experiences**: Book an excursion with yield pricing; points increase.
4. **Concierge**: Ask "Suggest a Halal dinner".
5. **Faith**: Show Qibla compass and prayer times from ship GPS.
6. **Loyalty**: Redeem Pearl Points.
7. **Ops ERP**: Overview KPIs, risk banner, inventory.
8. **Yield**: Show demand-based price board.
9. **ZATCA**: Issue B2C simplified invoice, show TLV QR and XML.
10. **Cabins / Maintenance / Crew**: Hotel and engineering slices.
11. **Edge sync**: Go offline, Offline POS sale, reconnect and sync.
12. **Cold chain**: Sensor tick, Cold Store B alert.

## API highlights

| Endpoint | Purpose |
|----------|---------|
| `GET /api/v1/guests` | CRM profiles + loyalty |
| `GET /api/v1/offers` | Catalog with yield prices |
| `POST /api/v1/concierge/chat` | AI concierge |
| `POST /api/v1/bookings` | Dining / excursion / spa |
| `POST /api/v1/loyalty/redeem` | Redeem points |
| `POST /api/v1/invoices` | Mock ZATCA B2C/B2B |
| `GET /api/v1/cabins` | Housekeeping board |
| `GET /api/v1/work-orders` | Maintenance |
| `POST /api/v1/sync/edge` | Toggle offline / flush |
| `GET /api/v1/fleet/snapshot` | Ops dashboard KPIs |

Interactive docs: http://localhost:8888/docs

## Deploy notes (Railway / Render)

- Build with the root `Dockerfile` (builds React into `backend/static`, FastAPI serves SPA).
- Set `OPENAI_API_KEY` if desired.
- Persist `/app/data` as a volume for SQLite.

## Stack

React (Vite) · FastAPI · SQLite · Hybrid RAG concierge · Mock ZATCA Phase 2 · Yield pricing
