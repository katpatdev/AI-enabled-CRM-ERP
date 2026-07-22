export default function Boarding() {
  return (
    <>
      <h1 className="page-title">Smart embarkation</h1>
      <p className="page-sub">Digital boarding pass with staggered arrival windows and pier queue status.</p>
      <div className="grid-2">
        <div className="boarding-pass">
          <div className="tag gold">MS Horizon Pearl</div>
          <h2 style={{ fontFamily: 'var(--font-display)', margin: '0.5rem 0' }}>Layla Al-Harbi</h2>
          <p className="muted">Cabin A-1204 · Diamond · Muscat embarkation</p>
          <div className="qr-box" aria-label="Boarding QR code" />
          <p><strong>Arrival window:</strong> 10:00 AM - 10:30 AM</p>
          <p className="muted">Gate B · Present passport + this QR</p>
        </div>
        <div className="panel">
          <h3>Terminal congestion</h3>
          <p><span className="tag ok">Low</span> Current wait ~6 minutes</p>
          <div className="progress" style={{ margin: '1rem 0' }}><span style={{ width: '28%' }} /></div>
          <ul className="list">
            <li>Diamond / Gold: 10:00 - 10:30 (priority lane)</li>
            <li>Pearl: 10:30 - 11:15</li>
            <li>Open boarding: 11:15 - 12:00</li>
          </ul>
          <p className="muted">Prototype view. Production would sync live pier sensors and PMS embarkation counts.</p>
        </div>
      </div>
    </>
  )
}
