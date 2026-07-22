import { useMemo, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'
import { notifications, searchIndex, matchCopilot } from '../mockData'
import Copilot from './Copilot'

const guestLinks = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/boarding', label: 'Boarding Pass' },
  { to: '/app/cruises', label: 'Cruises' },
  { to: '/app/bookings', label: 'Bookings' },
  { to: '/app/assistant', label: 'AI Assistant' },
  { to: '/app/faith', label: 'Faith Cabin' },
  { to: '/app/knowledge', label: 'Knowledge Base' },
  { to: '/app/notifications', label: 'Notifications' },
  { to: '/app/profile', label: 'Profile' },
  { to: '/app/settings', label: 'Settings' },
]

const employeeLinks = [
  { section: 'Overview', items: [
    { to: '/app/dashboard', label: 'Executive Dashboard' },
    { to: '/app/analytics', label: 'Analytics' },
    { to: '/app/notifications', label: 'Notifications' },
  ]},
  { section: 'CRM & Sales', items: [
    { to: '/app/crm', label: 'Customer CRM' },
    { to: '/app/cruises', label: 'Cruises' },
    { to: '/app/bookings', label: 'Booking Wizard' },
    { to: '/app/employee', label: 'Employee Portal' },
  ]},
  { section: 'Operations', items: [
    { to: '/app/threat-map', label: 'Threat Map' },
    { to: '/app/halal-iot', label: 'Halal Cold Chain' },
    { to: '/app/maintenance', label: 'Maintenance' },
    { to: '/app/support', label: 'Support Kanban' },
  ]},
  { section: 'Finance & Admin', items: [
    { to: '/app/finance', label: 'Finance / ZATCA' },
    { to: '/app/invoices', label: 'Invoices' },
    { to: '/app/admin', label: 'Admin Panel' },
    { to: '/app/audit', label: 'Audit Logs' },
  ]},
  { section: 'Intelligence', items: [
    { to: '/app/assistant', label: 'CruiseOS Copilot' },
    { to: '/app/knowledge', label: 'Knowledge Base' },
    { to: '/app/settings', label: 'Settings' },
    { to: '/app/profile', label: 'Profile' },
  ]},
]

const AI_ACTIONS = ['Summarize', 'Generate Report', 'Export PDF', 'Predict', 'Recommend', 'Explain', 'Optimize', 'Draft Email']

export default function AppShell() {
  const { user, logout, isEmployee } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [aiModal, setAiModal] = useState(null)

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return []
    return searchIndex().filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.type.toLowerCase().includes(query) ||
        (r.hint || '').toLowerCase().includes(query),
    ).slice(0, 8)
  }, [q])

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="name">
            Cruise<span>OS</span>
          </div>
          <div className="sub">AI Enterprise OS for Cruise Tourism</div>
        </div>
        {isEmployee ? (
          employeeLinks.map((group) => (
            <div className="nav-section" key={group.section}>
              <h4>{group.section}</h4>
              {group.items.map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))
        ) : (
          <div className="nav-section">
            <h4>Guest Portal</h4>
            {guestLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => { logout(); navigate('/login') }}>
          Sign out
        </button>
      </aside>

      <div className="main-col">
        <header className="topbar">
          <div className="search-wrap">
            <input
              className="search-input"
              style={{ width: '100%' }}
              placeholder="Search customers, cruises, bookings, invoices..."
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowSearch(true) }}
              onFocus={() => setShowSearch(true)}
            />
            {showSearch && results.length > 0 && (
              <div className="search-results">
                {results.map((r) => (
                  <button
                    key={`${r.type}-${r.title}`}
                    type="button"
                    onClick={() => {
                      navigate(r.path)
                      setShowSearch(false)
                      setQ('')
                    }}
                  >
                    <strong>{r.title}</strong>
                    <div className="muted">{r.type} · {r.hint}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ai-actions">
            {AI_ACTIONS.map((a) => (
              <button key={a} type="button" className="ai-chip" onClick={() => setAiModal(a)}>
                ✦ {a}
              </button>
            ))}
          </div>

          <div className="top-actions">
            <div style={{ position: 'relative' }}>
              <button type="button" className="icon-btn" onClick={() => setShowNotif((v) => !v)} aria-label="Notifications">
                🔔
                <span className="badge-dot" />
              </button>
              {showNotif && (
                <div className="notif-panel">
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--line)' }}>
                      <strong>{n.title}</strong>
                      <div className="muted">{n.body}</div>
                      <div className="muted">{n.time} ago</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="muted" style={{ fontSize: '0.85rem' }}>
              {user?.displayName}
              <div>
                <span className="tag gold">{user?.role}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>

      <Copilot />

      {aiModal && (
        <div className="modal-backdrop" onClick={() => setAiModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>CruiseOS AI · {aiModal}</h3>
            <p className="muted">Simulated enterprise AI action for the pitch demo.</p>
            <p>{matchCopilot(aiModal === 'Predict' ? 'forecast' : aiModal === 'Recommend' ? 'marketing' : aiModal === 'Summarize' ? 'summarize' : 'default')}</p>
            <button className="btn btn-primary" onClick={() => setAiModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
