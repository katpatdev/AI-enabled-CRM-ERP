import { useEffect, useState } from 'react'
import { api } from '../api'
import { zatcaFeed } from '../mockData'

export default function InvoicesPage() {
  const [live, setLive] = useState([])

  useEffect(() => {
    api.invoices().then(setLive).catch(() => setLive([]))
  }, [])

  return (
    <>
      <h1 className="page-title">Invoices</h1>
      <p className="page-sub">Mock ledger plus live FastAPI invoices when the backend is running.</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Simulated cleared sales</h3>
          <ul className="list">
            {zatcaFeed.map((z) => (
              <li key={z.id}>{z.item} · {z.type} · {z.status}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>API invoices</h3>
          {live.length === 0 ? (
            <p className="muted">No API invoices yet (or backend offline). Use Ops finance tools when API is up.</p>
          ) : (
            <table className="table">
              <thead><tr><th>No.</th><th>Type</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {live.map((i) => (
                  <tr key={i.id}>
                    <td>{i.invoice_number}</td>
                    <td>{i.invoice_type}</td>
                    <td>{i.total_sar}</td>
                    <td>{i.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
