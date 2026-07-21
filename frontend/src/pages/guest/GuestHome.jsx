import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function GuestHome() {
  const { guestId } = useOutletContext()
  const [guest, setGuest] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [notes, setNotes] = useState([])

  useEffect(() => {
    api.guest(guestId).then(setGuest)
    api.itinerary().then(setItinerary)
    api.notifications(guestId).then(setNotes)
  }, [guestId])

  if (!guest) return <p className="muted">Loading profile…</p>

  return (
    <div className="grid-2">
      <div className="panel">
        <div className="panel-head">
          <h3>{guest.name}</h3>
          <span className="tag ok">{guest.check_in_status}</span>
        </div>
        <p className="muted">{guest.email}</p>
        <div className="kpi-row" style={{ marginTop: '1rem' }}>
          <div className="kpi mini">
            <div className="stat">{guest.loyalty_points.toLocaleString()}</div>
            <div className="muted">Pearl Points</div>
          </div>
          <div className="kpi mini">
            <div className="stat" style={{ fontSize: '1.4rem' }}>
              {guest.loyalty_tier}
            </div>
            <div className="muted">Tier</div>
          </div>
        </div>
        <ul className="list" style={{ marginTop: '1rem' }}>
          <li>
            <strong>Cabin</strong> · {guest.cabin}
          </li>
          <li>
            <strong>Dietary</strong> · {guest.dietary}
          </li>
          <li>
            <strong>Faith prefs</strong> · {guest.faith_prefs}
          </li>
          <li>
            <strong>Mobility</strong> · {guest.mobility}
          </li>
          <li>
            <strong>GCC visa</strong> · {guest.gcc_visa_status}
          </li>
          <li>
            <strong>Nationality</strong> · {guest.nationality}
          </li>
          <li>
            <strong>Interests</strong> · {guest.interests.replaceAll(',', ', ')}
          </li>
        </ul>
        <div className="cta-row" style={{ marginTop: '1rem' }}>
          <Link className="btn btn-primary" to={`/guest/${guestId}/concierge`}>
            Ask concierge
          </Link>
          <Link className="btn btn-secondary" to={`/guest/${guestId}/experiences`}>
            Browse experiences
          </Link>
        </div>
      </div>

      <div className="panel">
        <h3>Voyage: Arabian Sea to Red Sea</h3>
        <ol className="timeline">
          {itinerary.map((s) => (
            <li key={s.id}>
              <div className="timeline-day">Day {s.day}</div>
              <strong>
                {s.port} · {s.sea}
              </strong>
              <div className="muted">
                {s.arrival} to {s.departure}
              </div>
              <div>{s.highlight}</div>
              <div className="muted">{s.weather_note}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="panel" style={{ gridColumn: '1 / -1' }}>
        <h3>Notifications</h3>
        {notes.length === 0 ? (
          <p className="muted">No notifications.</p>
        ) : (
          <ul className="list">
            {notes.slice(0, 6).map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                <span className="tag" style={{ marginLeft: '0.5rem' }}>
                  {n.kind}
                </span>
                <div className="muted">{n.body}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
