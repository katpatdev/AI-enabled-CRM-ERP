import { auditLogs, activityFeed } from '../mockData'

export default function Audit() {
  return (
    <>
      <h1 className="page-title">Audit logs</h1>
      <p className="page-sub">Immutable-style activity trail for compliance storytelling.</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Audit trail</h3>
          <ul className="list">
            {auditLogs.map((a, i) => (
              <li key={i}><strong>{a.time}</strong> · {a.text}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Live activity feed</h3>
          <ul className="list feed">
            {activityFeed.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
