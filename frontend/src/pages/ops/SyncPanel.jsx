import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function SyncPanel() {
  const [status, setStatus] = useState(null)
  const [events, setEvents] = useState([])
  const [busy, setBusy] = useState(false)

  async function load() {
    const [s, e] = await Promise.all([api.syncStatus(), api.syncEvents()])
    setStatus(s)
    setEvents(e)
  }

  useEffect(() => {
    load()
  }, [])

  async function toggle(online) {
    setBusy(true)
    try {
      await api.setEdge(online)
      await load()
    } finally {
      setBusy(false)
    }
  }

  async function createOfflineSale() {
    setBusy(true)
    try {
      if (status?.edge_online) {
        await api.setEdge(false)
      }
      await api.createInvoice({
        invoice_type: 'B2C',
        buyer_name: 'Deck 7 retail POS',
        description: 'Souvenir: Red Sea coral art print',
        subtotal_sar: 95,
      })
      await load()
    } catch (e) {
      alert(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (!status) return <p className="muted">Loading sync…</p>

  return (
    <div className="grid-2">
      <div className="panel">
        <h3>Edge connectivity</h3>
        <p>
          Status:{' '}
          <span className={`tag ${status.edge_online ? 'ok' : 'alert'}`}>
            {status.edge_online ? 'online' : 'offline'}
          </span>
        </p>
        <p className="muted">Pending sync events: {status.pending_count}</p>
        <div className="cta-row" style={{ marginTop: '1rem' }}>
          <button
            className="btn btn-danger"
            disabled={busy || !status.edge_online}
            onClick={() => toggle(false)}
          >
            Go offline
          </button>
          <button
            className="btn btn-primary"
            disabled={busy || status.edge_online}
            onClick={() => toggle(true)}
          >
            Reconnect and sync
          </button>
          <button className="btn btn-secondary" disabled={busy} onClick={createOfflineSale}>
            Offline POS sale
          </button>
        </div>
        <p className="muted" style={{ marginTop: '1rem' }}>
          Pitch path: go offline, create POS sale, reconnect and sync. Invoices flip from
          queued_offline to pending_report / cleared.
        </p>
      </div>
      <div className="panel">
        <h3>Sync queue</h3>
        {events.length === 0 ? (
          <p className="muted">No sync events yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Entity</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    {ev.entity_type} #{ev.entity_id}
                  </td>
                  <td>{ev.action}</td>
                  <td>
                    <span className={`tag ${ev.status === 'synced' ? 'ok' : 'alert'}`}>
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
