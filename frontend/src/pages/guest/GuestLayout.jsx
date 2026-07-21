import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api'

const links = [
  { path: '', label: 'Overview', end: true },
  { path: 'concierge', label: 'Concierge' },
  { path: 'experiences', label: 'Experiences' },
  { path: 'faith', label: 'Faith' },
  { path: 'loyalty', label: 'Loyalty' },
  { path: 'bookings', label: 'Bookings' },
  { path: 'feedback', label: 'Feedback' },
]

export default function GuestLayout() {
  const [guests, setGuests] = useState([])
  const { guestId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    api.guests().then((g) => {
      setGuests(g)
      if (!guestId && g[0]) navigate(`/guest/${g[0].id}`, { replace: true })
    })
  }, [guestId, navigate])

  if (!guestId) return <p className="muted page">Loading guests…</p>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="section-title">Guest CRM</h2>
          <p className="section-sub">Personalization, bookings, loyalty, and faith-aware services.</p>
        </div>
        <div className="form-row" style={{ minWidth: 280, margin: 0 }}>
          <label className="muted">Demo guest</label>
          <select value={guestId} onChange={(e) => navigate(`/guest/${e.target.value}`)}>
            {guests.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} · {g.cabin} · {g.loyalty_tier}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="subnav">
        {links.map((l) => (
          <NavLink
            key={l.path}
            end={l.end}
            to={l.path ? `/guest/${guestId}/${l.path}` : `/guest/${guestId}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
      <Outlet context={{ guestId: Number(guestId), guests }} />
    </div>
  )
}
