import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function Maintenance() {
  const [rows, setRows] = useState([])
  const [title, setTitle] = useState('')
  const [asset, setAsset] = useState('')

  async function load() {
    setRows(await api.workOrders())
  }

  useEffect(() => {
    load()
  }, [])

  async function create(e) {
    e.preventDefault()
    await api.createWorkOrder({ title, asset, priority: 'Medium', notes: 'Created from ops desk' })
    setTitle('')
    setAsset('')
    await load()
  }

  async function close(id) {
    await api.updateWorkOrder(id, { status: 'Closed' })
    await load()
  }

  return (
    <div className="grid-2">
      <div className="panel">
        <h3>Predictive / corrective work orders</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Asset</th>
              <th>Priority</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <tr key={w.id}>
                <td>
                  {w.title}
                  <div className="muted">{w.assigned_to}</div>
                </td>
                <td>{w.asset}</td>
                <td>
                  <span className={`tag ${w.priority === 'Critical' || w.priority === 'High' ? 'alert' : 'ok'}`}>
                    {w.priority}
                  </span>
                </td>
                <td>{w.status}</td>
                <td>
                  {w.status !== 'Closed' && (
                    <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem' }} onClick={() => close(w.id)}>
                      Close
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h3>New work order</h3>
        <form onSubmit={create}>
          <div className="form-row">
            <label className="muted">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-row">
            <label className="muted">Asset</label>
            <input value={asset} onChange={(e) => setAsset(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}
