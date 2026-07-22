import { useState } from 'react'
import { customers, timeline } from '../mockData'

export default function CRM() {
  const [selected, setSelected] = useState(customers[0])
  const [summary, setSummary] = useState(null)

  return (
    <>
      <h1 className="page-title">Customer CRM</h1>
      <p className="page-sub">360 profiles with loyalty, CLV, churn risk, and lifecycle timeline.</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Customers</h3>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Tier</th><th>AI score</th><th>CLV</th></tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => { setSelected(c); setSummary(null) }}>
                  <td>{c.name}</td>
                  <td><span className="tag gold">{c.loyalty}</span></td>
                  <td>{c.aiScore}</td>
                  <td>SAR {c.clv.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3>{selected.name}</h3>
            <button className="btn btn-primary" type="button" onClick={() => setSummary(
              `${selected.name} is a high-value ${selected.loyalty} guest. Prefers ${selected.preferredCabin}, ${selected.food} dining. Travels ~${selected.travelHistory} times. Likely interested in premium Red Sea packages. Recommend VIP discount.`,
            )}>
              Generate AI summary
            </button>
          </div>
          <ul className="list">
            <li>Email · {selected.email}</li>
            <li>Phone · {selected.phone}</li>
            <li>Nationality · {selected.nationality}</li>
            <li>Preferred cabin · {selected.preferredCabin}</li>
            <li>Food · {selected.food}</li>
            <li>Medical · {selected.medical}</li>
            <li>Passport expiry · {selected.passportExpiry}</li>
            <li>Last cruise · {selected.lastCruise}</li>
            <li>Total spending · SAR {selected.totalSpending.toLocaleString()}</li>
            <li>Churn risk · <span className={`tag ${selected.churnRisk === 'Low' ? 'ok' : 'warn'}`}>{selected.churnRisk}</span></li>
          </ul>
          {summary && <div className="toast">{summary}</div>}
          <h3 style={{ marginTop: '1rem' }}>Customer timeline</h3>
          <ul className="timeline">
            {timeline.map((t, i) => (
              <li key={i}><strong>{t.year}</strong> · {t.event}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
