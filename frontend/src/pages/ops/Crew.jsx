import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function Crew() {
  const [crew, setCrew] = useState([])

  useEffect(() => {
    api.crew().then(setCrew)
  }, [])

  return (
    <div className="panel">
      <h3>Crew roster</h3>
      <p className="muted">Lightweight HR slice for shipboard staffing visibility.</p>
      <table className="table" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Shift</th>
            <th>Duty</th>
          </tr>
        </thead>
        <tbody>
          {crew.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>{c.department}</td>
              <td>{c.shift}</td>
              <td>
                <span className={`tag ${c.on_duty ? 'ok' : 'alert'}`}>
                  {c.on_duty ? 'On duty' : 'Off'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
