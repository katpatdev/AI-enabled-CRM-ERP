import { useState } from 'react'
import { maintenanceAlerts } from '../mockData'

export default function MaintenancePage() {
  const [rows, setRows] = useState(maintenanceAlerts)

  function dispatch(id) {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r)))
  }

  return (
    <>
      <h1 className="page-title">Predictive maintenance</h1>
      <p className="page-sub">AI-style alerts with one-click technician dispatch for the demo.</p>
      <div className="grid-2">
        {rows.map((a) => (
          <div className="panel" key={a.id}>
            <h3>{a.title}</h3>
            <p className="muted">{a.detail}</p>
            <p><span className={`tag ${a.status === 'Resolved' ? 'ok' : 'danger'}`}>{a.status}</span></p>
            {a.status !== 'Resolved' && (
              <button className="btn btn-primary" type="button" onClick={() => dispatch(a.id)}>
                Dispatch technician
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
