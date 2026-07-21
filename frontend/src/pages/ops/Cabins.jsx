import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function Cabins() {
  const [cabins, setCabins] = useState([])

  async function load() {
    setCabins(await api.cabins())
  }

  useEffect(() => {
    load()
  }, [])

  async function cycleHousekeeping(c) {
    const order = ['Ready', 'In progress', 'Inspect', 'Ready']
    const next = order[(order.indexOf(c.housekeeping) + 1) % order.length]
    await api.updateCabin(c.id, { housekeeping: next })
    await load()
  }

  return (
    <div className="panel">
      <h3>Cabin / housekeeping board</h3>
      <p className="muted">Hotel PMS slice for shipboard property management.</p>
      <table className="table" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Cabin</th>
            <th>Guest</th>
            <th>Housekeeping</th>
            <th>Mini-bar</th>
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cabins.map((c) => (
            <tr key={c.id}>
              <td>{c.cabin}</td>
              <td>{c.guest_id ?? '-'}</td>
              <td>
                <span className={`tag ${c.housekeeping === 'Ready' ? 'ok' : 'alert'}`}>
                  {c.housekeeping}
                </span>
              </td>
              <td>{c.mini_bar}</td>
              <td className="muted">{c.service_notes || '-'}</td>
              <td>
                <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem' }} onClick={() => cycleHousekeeping(c)}>
                  Advance status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
