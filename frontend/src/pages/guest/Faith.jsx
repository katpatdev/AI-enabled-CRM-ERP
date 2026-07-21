import { useEffect, useState } from 'react'
import { api } from '../../api'
import { approxPrayerTimes, qiblaBearing } from '../../faith'

export default function Faith() {
  const [sync, setSync] = useState(null)

  useEffect(() => {
    api.syncStatus().then(setSync)
  }, [])

  if (!sync) return <p className="muted">Loading ship GPS…</p>

  const bearing = qiblaBearing(sync.ship_lat, sync.ship_lon)
  const times = approxPrayerTimes(sync.ship_lat)

  return (
    <div className="grid-2">
      <div className="panel compass-wrap">
        <h3>Qibla compass</h3>
        <p className="muted">
          Ship position ≈ {sync.ship_lat.toFixed(4)}°N, {sync.ship_lon.toFixed(4)}°E toward Makkah
        </p>
        <div className="compass">
          <div className="compass-needle" style={{ transform: `rotate(${bearing}deg)` }} />
          <div className="compass-center" />
        </div>
        <p>
          Bearing <strong>{bearing.toFixed(1)}°</strong> from true north
        </p>
      </div>
      <div className="panel">
        <h3>Prayer times (approx.)</h3>
        <p className="muted">Demo calculation from ship latitude, not a certified timetable.</p>
        <ul className="list">
          {Object.entries(times).map(([name, t]) => (
            <li key={name}>
              <strong>{name}</strong> · {t}
            </li>
          ))}
        </ul>
        <p className="muted" style={{ marginTop: '1rem' }}>
          Prayer room: Deck 4 midship · Quiet hours 04:30 to 06:00 for Fajr guests.
        </p>
      </div>
    </div>
  )
}
