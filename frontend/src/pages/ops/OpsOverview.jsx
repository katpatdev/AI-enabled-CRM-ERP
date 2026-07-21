import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function OpsOverview() {
  const [fleet, setFleet] = useState(null)
  const [inventory, setInventory] = useState([])
  const [bookings, setBookings] = useState([])

  async function load() {
    const [f, inv, b] = await Promise.all([api.fleet(), api.inventory(), api.bookings()])
    setFleet(f)
    setInventory(inv)
    setBookings(b.slice(0, 8))
  }

  useEffect(() => {
    load()
  }, [])

  if (!fleet) return <p className="muted">Loading fleet…</p>

  const kpis = [
    { label: 'Occupancy', value: `${fleet.occupancy_pct.toFixed(0)}%` },
    { label: 'Guests', value: fleet.guest_count },
    { label: 'Bookings', value: fleet.booking_count },
    { label: 'Revenue (demo)', value: `${fleet.revenue_today_sar.toLocaleString()} SAR` },
    { label: 'Avg feedback', value: fleet.avg_feedback.toFixed(1) },
    { label: 'Open work orders', value: fleet.open_work_orders },
    { label: 'Low stock', value: fleet.low_stock_items },
    { label: 'Sensor alerts', value: fleet.sensor_alerts },
  ]

  return (
    <>
      {fleet.risk_banner && <div className="alert-banner">{fleet.risk_banner}</div>}
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="panel kpi" key={k.label}>
            <div className="stat" style={{ fontSize: '1.55rem' }}>
              {k.value}
            </div>
            <div className="muted">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div className="panel">
          <div className="panel-head">
            <h3>{fleet.ship_name}</h3>
            <span className={`tag ${fleet.edge_online ? 'ok' : 'alert'}`}>
              {fleet.edge_online ? 'edge online' : 'edge offline'}
            </span>
          </div>
          <p className="muted">
            Pending sync: {fleet.pending_sync}. Hotel and finance modules share this live snapshot.
          </p>
        </div>
        <div className="panel">
          <h3>Inventory alerts</h3>
          <table className="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Halal</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.id}>
                  <td>{i.sku}</td>
                  <td>{i.name}</td>
                  <td>
                    {i.quantity} {i.unit}{' '}
                    {i.low_stock && <span className="tag alert">low</span>}
                  </td>
                  <td>{i.halal_certified ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel" style={{ gridColumn: '1 / -1' }}>
          <h3>Recent bookings (CRM to ERP)</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Guest #</th>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.guest_id}</td>
                  <td>{b.title}</td>
                  <td>{b.booking_type}</td>
                  <td>{b.amount_sar ? `${b.amount_sar} SAR` : 'Incl.'}</td>
                  <td>
                    <span className={`tag ${b.status === 'cancelled' ? 'alert' : 'ok'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
