# CruiseOS MVP+ Design Notes

**Product name:** CruiseOS  
**Tagline:** AI Enterprise Operating System for Cruise Tourism

## Positioning

The systems that impress buyers feel alive. This MVP+ prioritizes a polished, interconnected UI with role-based portals. Many advanced capabilities are backed by hardcoded or simplified logic, with FastAPI available for concierge, bookings, invoices, and edge sync demos.

## Authentication (demo IAM)

| Role | Username | Password | Landing |
|------|----------|----------|---------|
| Guest | guest | abcd | Passenger dashboard |
| Employee | employee | abcd | Executive dashboard |

Login also offers **Continue as Guest** and **Continue as Employee** cards.

## Guest portal highlights

- Smart embarkation / digital boarding pass (QR, arrival window, congestion bar)
- Cruise cards + booking wizard
- CruiseOS Copilot / AI assistant
- Faith cabin Qibla + prayer times (mock Red Sea GPS)
- Knowledge base search
- Notifications and profile

## Employee portal highlights

- Executive KPIs + AI insight cards
- Customer CRM with CLV, churn, timeline, AI summary
- Analytics + forecast cards
- Support Kanban with AI suggested replies
- ZATCA live feed simulation
- Geopolitical threat map + safe route
- Halal cold-chain chart with compliance badge
- Predictive maintenance dispatch
- Admin panel, audit logs, activity feed
- Global smart search + floating Copilot + page AI action chips

## Pitch architecture story

- **Edge-based caching:** static ship assets bundled in the app; dynamic actions hit the edge API and sync when satellite bandwidth allows.
- **Conflict-free syncing:** backend sync queue models offline POS / booking merges (CRDT-ready narrative for Phase 2).

## Feature matrix (demo)

| Module | Demo ready | Deep backend |
|--------|------------|--------------|
| Login RBAC | Yes | No |
| Executive dashboard | Yes | No |
| Customer CRM | Yes | Minimal |
| Booking wizard | Yes | Minimal |
| Copilot | Yes | Optional LLM |
| Support Kanban | Yes | No |
| ZATCA monitor | Yes | Optional API invoices |
| Threat map / Halal IoT | Yes | No |
| Admin / audit | Yes | No |
