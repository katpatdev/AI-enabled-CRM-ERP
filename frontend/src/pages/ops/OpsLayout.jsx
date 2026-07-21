import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { path: '/ops', label: 'Overview', end: true },
  { path: '/ops/yield', label: 'Yield' },
  { path: '/ops/invoices', label: 'ZATCA' },
  { path: '/ops/cold-chain', label: 'Cold chain' },
  { path: '/ops/cabins', label: 'Cabins' },
  { path: '/ops/maintenance', label: 'Maintenance' },
  { path: '/ops/crew', label: 'Crew' },
  { path: '/ops/feedback', label: 'Sentiment' },
  { path: '/ops/sync', label: 'Edge sync' },
]

export default function OpsLayout() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="section-title">Ops ERP</h2>
          <p className="section-sub">
            Fleet, compliance, hotel ops, and maritime edge resilience.
          </p>
        </div>
      </div>
      <div className="subnav">
        {links.map((l) => (
          <NavLink
            key={l.path}
            end={l.end}
            to={l.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
