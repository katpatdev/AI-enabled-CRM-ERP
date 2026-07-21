import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function YieldBoard() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    api.offers().then(setOffers)
  }, [])

  return (
    <div className="panel">
      <h3>Dynamic yield board</h3>
      <p className="muted">
        Prices lift with demand score and fill rate. Guests see live yield price in Experiences.
      </p>
      <table className="table" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Offer</th>
            <th>Type</th>
            <th>Fill</th>
            <th>Demand</th>
            <th>Base</th>
            <th>Yield price</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o.id}>
              <td>
                {o.title}
                <div className="muted">{o.port}</div>
              </td>
              <td>{o.offer_type}</td>
              <td>
                <div className="meter">
                  <div className="meter-fill" style={{ width: `${o.fill_pct}%` }} />
                </div>
                <span className="muted">
                  {o.booked}/{o.capacity}
                </span>
              </td>
              <td>{(o.demand_score * 100).toFixed(0)}%</td>
              <td>{o.base_price_sar || 'Incl.'}</td>
              <td>
                <strong>{o.base_price_sar ? `${o.yield_price_sar} SAR` : 'Incl.'}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
