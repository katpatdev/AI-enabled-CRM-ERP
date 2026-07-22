# Navora | AI OS for Cruise and Cargo Fleets

Pitchable **MVP+** prototype for Middle Eastern maritime operations (Arabian Sea to Red Sea), covering cruise liners and cargo ships. Hardcoded role-based login, guest passenger portal, and employee ERP/CRM surfaces with enterprise-looking dashboards backed by mock data and optional FastAPI APIs.

**Tech docs:** [docs/DESIGN.md](docs/DESIGN.md) · [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md) · [docs/CRUISEOS_MVP_PLUS.md](docs/CRUISEOS_MVP_PLUS.md)

## Demo login

| Portal | Username | Password |
|--------|----------|----------|
| Guest (passenger) | `guest` | `abcd` |
| Employee (ops / ERP) | `employee` | `abcd` |

Or use **Continue as Guest / Continue as Employee** on the login screen.

## Quick start

### Backend (optional for enriched concierge / invoices)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8888
```

Optional: `OPENAI_API_KEY` for live concierge answers.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and sign in.

### Docker

```bash
docker compose up --build
```

Open http://localhost:8888

## What you will see

**Guest:** dashboard, digital boarding pass, cruises, booking wizard, AI assistant, faith cabin (Qibla), knowledge base, notifications, profile.

**Employee:** executive dashboard with AI insights, CRM + timeline, analytics, support Kanban, ZATCA finance feed, threat map, Halal cold-chain chart, maintenance dispatch, employee portal, admin, audit logs, Copilot, global search.

## Stack

React (Vite) · FastAPI · SQLite · Mock enterprise datasets · Hybrid AI concierge
