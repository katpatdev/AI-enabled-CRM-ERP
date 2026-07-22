import { useMemo } from 'react'
import { qiblaBearing, approxPrayerTimes } from '../faith'

const SHIP = { lat: 21.4858, lon: 39.1925 }

export default function FaithCabin() {
  const bearing = useMemo(() => qiblaBearing(SHIP.lat, SHIP.lon), [])
  const times = useMemo(() => approxPrayerTimes(SHIP.lat), [])

  return (
    <>
      <h1 className="page-title">Faith-conscious cabin</h1>
      <p className="page-sub">Qibla and prayer times from mock Red Sea ship GPS (Jeddah corridor).</p>
      <div className="grid-2">
        <div className="panel" style={{ textAlign: 'center' }}>
          <h3>Qibla compass</h3>
          <p className="muted">{SHIP.lat.toFixed(4)}°N, {SHIP.lon.toFixed(4)}°E</p>
          <div style={{
            width: 180, height: 180, margin: '1rem auto', borderRadius: '50%',
            border: '2px solid var(--gold)', position: 'relative',
            background: 'radial-gradient(circle at 40% 35%, rgba(59,130,246,0.35), transparent 55%)',
          }}>
            <div style={{
              position: 'absolute', left: '50%', top: '50%', width: 4, height: 70,
              marginLeft: -2, marginTop: -70, background: 'linear-gradient(var(--gold), transparent)',
              transformOrigin: 'bottom center', transform: `rotate(${bearing}deg)`, borderRadius: 2,
            }} />
          </div>
          <p>Bearing <strong>{bearing.toFixed(1)}°</strong> toward Makkah</p>
        </div>
        <div className="panel">
          <h3>Prayer times</h3>
          <ul className="list">
            {Object.entries(times).map(([n, t]) => (
              <li key={n}><strong>{n}</strong> · {t}</li>
            ))}
          </ul>
          <p className="muted">Prayer room Deck 4 midship · Quiet hours 04:30 to 06:00</p>
        </div>
      </div>
    </>
  )
}
