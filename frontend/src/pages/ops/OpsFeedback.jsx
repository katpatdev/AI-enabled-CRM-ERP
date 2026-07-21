import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function OpsFeedback() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    api.feedback().then(setRows)
  }, [])

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.sentiment] = (acc[r.sentiment] || 0) + 1
      return acc
    },
    {},
  )

  return (
    <div>
      <div className="kpi-grid" style={{ marginBottom: '1rem' }}>
        {['Positive', 'Neutral', 'Negative'].map((s) => (
          <div className="panel kpi" key={s}>
            <div className="stat" style={{ fontSize: '1.5rem' }}>
              {counts[s] || 0}
            </div>
            <div className="muted">{s}</div>
          </div>
        ))}
      </div>
      <div className="panel">
        <h3>Guest sentiment inbox</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Sentiment</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>#{r.guest_id}</td>
                <td>{r.rating}/5</td>
                <td>{r.category}</td>
                <td>
                  <span className={`tag ${r.sentiment === 'Negative' ? 'alert' : 'ok'}`}>
                    {r.sentiment}
                  </span>
                </td>
                <td>{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
