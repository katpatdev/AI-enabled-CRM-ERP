import { useState } from 'react'
import { cruises } from '../mockData'

const STEPS = ['Cruise', 'Passengers', 'Cabin', 'Meals', 'Insurance', 'Payment', 'Confirmation']

export default function Bookings() {
  const [step, setStep] = useState(0)
  const [cruiseId, setCruiseId] = useState(cruises[0].id)
  const [passengers, setPassengers] = useState(2)
  const [cabin, setCabin] = useState('Balcony')
  const [meal, setMeal] = useState('Halal')
  const [insurance, setInsurance] = useState(true)
  const [done, setDone] = useState(false)

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
    if (step === STEPS.length - 2) setDone(true)
  }

  return (
    <>
      <h1 className="page-title">Booking wizard</h1>
      <p className="page-sub">Guided booking flow. Payment is simulated for the prototype.</p>
      <div className="steps">
        {STEPS.map((s, i) => (
          <span key={s} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>{i + 1}. {s}</span>
        ))}
      </div>
      <div className="panel">
        {step === 0 && (
          <div className="form-row">
            <label>Choose cruise</label>
            <select value={cruiseId} onChange={(e) => setCruiseId(e.target.value)}>
              {cruises.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.destination}</option>)}
            </select>
          </div>
        )}
        {step === 1 && (
          <div className="form-row">
            <label>Passengers</label>
            <input type="number" min={1} max={6} value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} />
          </div>
        )}
        {step === 2 && (
          <div className="form-row">
            <label>Cabin</label>
            <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
              {['Interior', 'Oceanview', 'Balcony', 'Suite'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        )}
        {step === 3 && (
          <div className="form-row">
            <label>Meals</label>
            <select value={meal} onChange={(e) => setMeal(e.target.value)}>
              {['Halal', 'Vegetarian', 'Standard'].map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        )}
        {step === 4 && (
          <div className="form-row">
            <label>
              <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} /> Travel medical insurance
            </label>
          </div>
        )}
        {step === 5 && (
          <div>
            <p>Simulated payment for {passengers} guests · {cabin} · {meal}{insurance ? ' · insured' : ''}.</p>
            <p className="muted">No card data is collected in this prototype.</p>
          </div>
        )}
        {step === 6 && done && (
          <div className="toast">
            <strong>Booking successful.</strong> Confirmation CRM-88421 sent. Loyalty points will post after embarkation.
          </div>
        )}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</button>
          {step < STEPS.length - 1 && (
            <button className="btn btn-primary" type="button" onClick={next}>
              {step === STEPS.length - 2 ? 'Confirm payment' : 'Continue'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
