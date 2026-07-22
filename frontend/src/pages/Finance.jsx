import { zatcaFeed } from '../mockData'

export default function Finance() {
  return (
    <>
      <h1 className="page-title">Finance & ZATCA monitor</h1>
      <p className="page-sub">Simulated Phase 2 clearance feed for Saudi onboard commerce.</p>
      <div className="grid-4">
        {[
          { label: "Today's revenue", value: 'SAR 428k' },
          { label: 'Monthly revenue', value: 'SAR 9.4M' },
          { label: 'Pending payments', value: '37' },
          { label: 'Refund requests', value: '6' },
        ].map((k) => (
          <div className="panel kpi" key={k.label}>
            <div className="value" style={{ fontSize: '1.3rem' }}>{k.value}</div>
            <div className="label">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="panel" style={{ marginTop: '1rem' }}>
        <h3>Live ZATCA feed</h3>
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Item</th><th>Type</th><th>Amount</th><th>Status</th><th>QR (mock)</th></tr>
          </thead>
          <tbody>
            {zatcaFeed.map((z) => (
              <tr key={z.id}>
                <td>{z.id}</td>
                <td>{z.item}</td>
                <td>{z.type}</td>
                <td>{z.amount ? `SAR ${z.amount}` : 'Incl.'}</td>
                <td><span className={`tag ${z.status.includes('Cleared') ? 'ok' : 'warn'}`}>{z.status}</span></td>
                <td className="muted" style={{ fontSize: '0.7rem' }}>QVRN...mock</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
