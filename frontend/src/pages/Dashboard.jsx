import { useAuth } from '../auth'
import { kpis, insights, cruises, activityFeed, employeeTasks, leaderboard } from '../mockData'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { isGuest, user } = useAuth()

  if (isGuest) {
    return (
      <>
        <h1 className="page-title">Passenger dashboard</h1>
        <p className="page-sub">Welcome aboard, {user.displayName}. Cabin {user.cabin} · {user.tier}</p>
        <div className="grid-4">
          {[
            { label: 'Next port', value: 'Jeddah' },
            { label: 'Arrival window', value: '10:00' },
            { label: 'Loyalty', value: user.tier },
            { label: 'Open bookings', value: '2' },
          ].map((k) => (
            <div className="panel kpi" key={k.label}>
              <div className="value">{k.value}</div>
              <div className="label">{k.label}</div>
            </div>
          ))}
        </div>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          <div className="panel">
            <h3>Quick actions</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Link className="btn btn-primary" to="/app/boarding">Digital boarding pass</Link>
              <Link className="btn btn-secondary" to="/app/cruises">Browse cruises</Link>
              <Link className="btn btn-secondary" to="/app/assistant">Ask AI assistant</Link>
              <Link className="btn btn-secondary" to="/app/faith">Faith cabin</Link>
            </div>
          </div>
          <div className="panel insight-card">
            <h3>AI recommendation</h3>
            <p>Afternoon heat advisory. Book Pearl Spa Hammam or Al Bahar indoor dining before Maghrib.</p>
            <Link className="btn btn-ghost" to="/app/bookings">Start booking</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Executive dashboard</h1>
      <p className="page-sub">Live cruise network KPIs across Arabian Sea and Red Sea fleet.</p>
      <div className="grid-4">
        {[
          { label: "Today's bookings", value: kpis.todaysBookings },
          { label: "Today's revenue", value: `SAR ${(kpis.todaysRevenue / 1000).toFixed(0)}k` },
          { label: 'Occupancy', value: `${kpis.occupancy}%` },
          { label: 'Ships at sea', value: kpis.shipsAtSea },
          { label: 'Pending tickets', value: kpis.pendingTickets },
          { label: "Today's check-ins", value: kpis.checkIns },
          { label: "Today's check-outs", value: kpis.checkOuts },
          { label: 'Weather alerts', value: kpis.weatherAlerts },
        ].map((k) => (
          <div className="panel kpi" key={k.label}>
            <div className="value">{k.value}</div>
            <div className="label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div className="panel">
          <h3>AI insights</h3>
          <ul className="list">
            {insights.map((i) => (
              <li key={i.id} className="insight-card" style={{ padding: '0.75rem', marginBottom: '0.5rem', border: '1px solid var(--line)', borderRadius: '0.75rem' }}>
                <strong>{i.title}</strong>
                <div>{i.body}</div>
                <div className="tag gold">{i.impact}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Fleet snapshot</h3>
          <ul className="list">
            {cruises.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> · {c.occupancy}%
                <div className="muted">{c.status} · {c.destination}</div>
                <div className="progress"><span style={{ width: `${c.occupancy}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Crew tasks</h3>
          <ul className="list">
            {employeeTasks.map((t) => (
              <li key={t.id}>
                <span className={`tag ${t.done ? 'ok' : 'warn'}`}>{t.done ? 'Done' : 'Open'}</span> {t.task}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Activity feed</h3>
          <ul className="list feed">
            {activityFeed.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
          <h3 style={{ marginTop: '1rem' }}>Sales leaderboard</h3>
          <ul className="list">
            {leaderboard.map((l, i) => (
              <li key={l.name}>#{i + 1} {l.name} · SAR {l.sales.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
