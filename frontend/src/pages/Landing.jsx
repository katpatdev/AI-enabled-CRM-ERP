import { Link } from 'react-router-dom'

const modules = [
  {
    title: 'Guest CRM',
    text: '360 profiles, AI concierge, experiences catalog, loyalty, faith UX, and feedback.',
    to: '/guest',
    cta: 'Open guest app',
  },
  {
    title: 'Ops ERP',
    text: 'Fleet KPIs, ZATCA invoices, Halal cold-chain, cabins, maintenance, crew, and edge sync.',
    to: '/ops',
    cta: 'Open ops desk',
  },
]

export default function Landing() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">AI CRM and ERP · Arabian Sea to Red Sea</p>
        <h1>Mare Arabia</h1>
        <p>
          Intelligence for floating cities: guest personalization, ZATCA-ready finance, and edge sync
          when the satellite drops.
        </p>
        <div className="cta-row">
          <Link className="btn btn-primary" to="/guest">
            Open guest concierge
          </Link>
          <Link className="btn btn-secondary" to="/ops">
            Open ops dashboard
          </Link>
        </div>
      </section>
      <div className="page">
        <div className="grid-3">
          {modules.map((m) => (
            <div className="panel feature-card" key={m.title}>
              <h3>{m.title}</h3>
              <p className="muted">{m.text}</p>
              <Link className="btn btn-secondary" to={m.to} style={{ marginTop: '0.75rem' }}>
                {m.cta}
              </Link>
            </div>
          ))}
          <div className="panel feature-card">
            <h3>Pitch differentiators</h3>
            <ul className="list">
              <li>Hybrid AI concierge with ship knowledge RAG</li>
              <li>Mock ZATCA Phase 2 B2C / B2B invoicing</li>
              <li>Halal cold-chain alerts and yield pricing</li>
              <li>Offline edge queue for at-sea resilience</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
