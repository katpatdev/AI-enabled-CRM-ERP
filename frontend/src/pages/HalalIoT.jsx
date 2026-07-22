import { coldChainSeries } from '../mockData'

export default function HalalIoT() {
  const points = coldChainSeries
  const max = -17
  const min = -19
  const w = 560
  const h = 160
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((v - min) / (max - min)) * (h - 20) - 10
      return `${i === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')

  return (
    <>
      <h1 className="page-title">Halal cold-chain IoT</h1>
      <p className="page-sub">Cold storage health with Shariah-compliance indicator for the pitch demo.</p>
      <div className="grid-2">
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3>Cold Store A · Halal protein</h3>
            <span className="tag ok">Shariah-Compliant: Blockchain Verified</span>
          </div>
          <svg className="chart-line" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Temperature chart">
            <path d={path} fill="none" stroke="#22c55e" strokeWidth="3" />
            <text x="8" y="14" fill="#94a3b8" fontSize="12">Target -18°C</text>
          </svg>
          <p className="muted">Hardcoded safe series for prototype. Live IoT + ledger can replace this feed.</p>
        </div>
        <div className="panel">
          <h3>Compliance checklist</h3>
          <ul className="list">
            <li><span className="tag ok">OK</span> Temperature band held</li>
            <li><span className="tag ok">OK</span> Segregation from non-Halal cargo</li>
            <li><span className="tag ok">OK</span> Seal integrity logged</li>
            <li><span className="tag warn">Watch</span> Store B humidity (see ops sensors API)</li>
          </ul>
        </div>
      </div>
    </>
  )
}
