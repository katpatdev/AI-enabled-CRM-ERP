import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function ColdChain() {
  const [sensors, setSensors] = useState([])

  async function load() {
    setSensors(await api.sensors())
  }

  useEffect(() => {
    load()
  }, [])

  async function tick() {
    setSensors(await api.sensorTick())
  }

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h3>Halal cold-chain IoT</h3>
          <p className="muted">Simulated temperature / humidity. Alert when out of safe band.</p>
        </div>
        <button className="btn btn-secondary" onClick={tick}>
          Simulate sensor tick
        </button>
      </div>
      <table className="table" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Location</th>
            <th>Value</th>
            <th>Safe range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((s) => (
            <tr key={s.id}>
              <td>{s.sensor_id}</td>
              <td>{s.location}</td>
              <td>
                {s.value}
                {s.metric === 'humidity_pct' ? '%' : '°C'}
              </td>
              <td>
                {s.min_safe} to {s.max_safe}
              </td>
              <td>
                <span className={`tag ${s.alert ? 'alert' : 'ok'}`}>
                  {s.alert ? 'ALERT' : 'OK'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
