import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cruises } from '../mockData'

export default function Cruises() {
  const [msg, setMsg] = useState('')

  return (
    <>
      <h1 className="page-title">Cruise catalog</h1>
      <p className="page-sub">Arabian Sea to Red Sea sailings with occupancy intelligence.</p>
      {msg && <div className="toast">{msg}</div>}
      <div className="grid-3">
        {cruises.map((c) => (
          <div className="panel cruise-card" key={c.id}>
            <div className={`cruise-hero ${c.image === 'coral' ? 'coral' : c.image === 'desert' ? 'desert' : ''}`} />
            <h3>{c.name}</h3>
            <div className="muted">{c.ship}</div>
            <div>{c.destination}</div>
            <div className="muted">{c.departure} → {c.arrival}</div>
            <div>Captain {c.captain}</div>
            <div className="progress"><span style={{ width: `${c.occupancy}%` }} /></div>
            <div className="muted">{c.occupancy}% occupied · {c.cabinsLeft} cabins left · {c.weather}</div>
            <span className={`tag ${c.occupancy < 50 ? 'warn' : c.status.includes('Delayed') ? 'danger' : 'ok'}`}>{c.status}</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              <Link className="btn btn-secondary" to="/app/bookings">Book</Link>
              <button className="btn btn-ghost" type="button" onClick={() => setMsg(`AI: Promote ${c.name} to Pearl/Gold guests with balcony preference.`)}>AI recommendation</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
