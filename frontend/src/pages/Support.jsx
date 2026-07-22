import { useMemo, useState } from 'react'
import { tickets } from '../mockData'

const COLUMNS = ['New', 'Assigned', 'In Progress', 'Resolved']

export default function Support() {
  const [rows, setRows] = useState(tickets)
  const grouped = useMemo(() => {
    const g = Object.fromEntries(COLUMNS.map((c) => [c, []]))
    rows.forEach((t) => g[t.status]?.push(t))
    return g
  }, [rows])

  function move(id, status) {
    setRows((list) => list.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  return (
    <>
      <h1 className="page-title">Support center</h1>
      <p className="page-sub">Kanban workflow with AI suggested replies.</p>
      <div className="kanban">
        {COLUMNS.map((col) => (
          <div className="kanban-col" key={col}>
            <h4>{col}</h4>
            {grouped[col].map((t) => (
              <div className="ticket-card" key={t.id}>
                <strong>{t.id}</strong>
                <div className="muted">{t.customer} · {t.category}</div>
                <span className={`tag ${t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warn' : 'ok'}`}>{t.priority}</span>
                <p style={{ fontSize: '0.82rem' }}><em>AI:</em> {t.aiReply}</p>
                <select value={t.status} onChange={(e) => move(t.id, e.target.value)} style={{ width: '100%', marginTop: '0.35rem' }}>
                  {COLUMNS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
