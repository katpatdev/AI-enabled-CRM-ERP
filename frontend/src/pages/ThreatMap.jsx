export default function ThreatMap() {
  return (
    <>
      <h1 className="page-title">Geopolitical resilience map</h1>
      <p className="page-sub">Arabian Sea / Red Sea corridor with threat markers and a calculated safe route.</p>
      <div className="map-wrap">
        <svg className="map-svg" viewBox="0 0 800 320" role="img" aria-label="Red Sea threat map">
          <defs>
            <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0b2a4a" />
              <stop offset="100%" stopColor="#0a1628" />
            </linearGradient>
          </defs>
          <rect width="800" height="320" fill="url(#sea)" />
          <path d="M120 60 C180 90, 210 140, 240 200 C270 250, 300 270, 340 280" fill="none" stroke="#334155" strokeWidth="40" opacity="0.5" />
          <path d="M340 280 C420 290, 520 250, 600 180 C660 130, 700 90, 740 70" fill="none" stroke="#334155" strokeWidth="36" opacity="0.45" />
          <text x="140" y="50" fill="#94a3b8" fontSize="12">Arabian Sea</text>
          <text x="520" y="250" fill="#94a3b8" fontSize="12">Red Sea</text>
          <text x="250" y="300" fill="#64748b" fontSize="11">Bab el-Mandeb</text>
          <circle cx="300" cy="270" r="8" fill="#ef4444" />
          <circle cx="360" cy="255" r="6" fill="#ef4444" />
          <circle cx="330" cy="290" r="5" fill="#ef4444" />
          <path d="M160 90 C260 130, 320 160, 400 200 C500 250, 620 160, 720 90" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="8 6" />
          <circle cx="160" cy="90" r="7" fill="#c9a227" />
          <circle cx="720" cy="90" r="7" fill="#3b82f6" />
          <text x="170" y="85" fill="#e8d48b" fontSize="11">Muscat</text>
          <text x="660" y="85" fill="#93c5fd" fontSize="11">Aqaba</text>
          <text x="420" y="40" fill="#22c55e" fontSize="13">Safe route calculated</text>
        </svg>
      </div>
      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div className="panel">
          <h3>Threat summary</h3>
          <p><span className="tag danger">Warning</span> Elevated risk near Bab el-Mandeb approaches.</p>
          <p className="muted">Prototype overlay. Production would ingest AIS + maritime risk feeds.</p>
        </div>
        <div className="panel">
          <h3>Reroute impact (simulated)</h3>
          <ul className="list">
            <li>Fuel delta · +4.2%</li>
            <li>ETA impact · +5.5 hours</li>
            <li>Re-provision hub · Jeddah Islamic Port</li>
          </ul>
        </div>
      </div>
    </>
  )
}
