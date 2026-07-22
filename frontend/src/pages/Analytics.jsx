export default function Analytics() {
  const bars = [
    { label: 'Revenue', pct: 78 },
    { label: 'Bookings', pct: 64 },
    { label: 'Occupancy', pct: 85 },
    { label: 'Returning', pct: 41 },
    { label: 'CSAT', pct: 92 },
  ]

  return (
    <>
      <h1 className="page-title">Analytics</h1>
      <p className="page-sub">Power-BI style executive charts with AI forecast cards.</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Performance</h3>
          {bars.map((b) => (
            <div key={b.label} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{b.label}</span>
                <span className="muted">{b.pct}%</span>
              </div>
              <div className="progress"><span style={{ width: `${b.pct}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="panel insight-card">
          <h3>AI forecast</h3>
          <ul className="list">
            <li>Expected bookings · <strong>+18%</strong></li>
            <li>Revenue growth · <strong>12%</strong></li>
            <li>Occupancy · <strong>85%</strong></li>
            <li>Best destination · <strong>Dubai packages / Jeddah heritage</strong></li>
            <li>Most popular cabin · <strong>Balcony Suite</strong></li>
          </ul>
        </div>
        <div className="panel">
          <h3>Top countries</h3>
          <ul className="list">
            <li>Saudi Arabia · 34%</li>
            <li>UAE · 18%</li>
            <li>India · 12%</li>
            <li>UK · 9%</li>
            <li>Singapore · 7%</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Age distribution</h3>
          <ul className="list">
            <li>18-30 · 16%</li>
            <li>31-45 · 38%</li>
            <li>46-60 · 29%</li>
            <li>60+ · 17%</li>
          </ul>
        </div>
      </div>
    </>
  )
}
