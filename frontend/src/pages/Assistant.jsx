import { useState } from 'react'
import { matchCopilot } from '../mockData'
import { api } from '../api'

const PROMPTS = [
  "Show today's bookings",
  'Who are my VIP customers?',
  'Generate invoice',
  'Which cruise has lowest occupancy?',
  'Recommend marketing campaign',
  'Summarize customer',
  'Predict revenue',
  'Find delayed cruises',
  'Suggest Halal dinner / excursion',
]

export default function Assistant() {
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: 'Navora Copilot. Enterprise natural-language operations for cruise and cargo fleets.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || busy) return
    setInput('')
    setMsgs((m) => [...m, { role: 'user', text: msg }])
    setBusy(true)
    const lower = msg.toLowerCase()
    try {
      if (lower.includes('excursion') || lower.includes('food') || lower.includes('dinner') || lower.includes('halal') || lower.includes('prayer')) {
        try {
          const res = await api.chat(1, msg)
          setMsgs((m) => [...m, { role: 'bot', text: res.reply }])
        } catch {
          setMsgs((m) => [...m, { role: 'bot', text: matchCopilot(msg) }])
        }
      } else {
        setMsgs((m) => [...m, { role: 'bot', text: matchCopilot(msg) }])
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <h1 className="page-title">Navora Copilot</h1>
      <p className="page-sub">Enterprise AI assistant for bookings, cargo schedules, VIPs, occupancy, finance, and guest personalization.</p>
      <div className="panel">
        <div className="copilot-body" style={{ height: 360 }}>
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.role === 'user' ? 'user' : 'bot'}`}>{m.text}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '0.75rem 0' }}>
          {PROMPTS.map((p) => (
            <button key={p} type="button" className="ai-chip" onClick={() => send(p)}>{p}</button>
          ))}
        </div>
        <form className="copilot-form" style={{ border: 'none', padding: 0 }} onSubmit={(e) => { e.preventDefault(); send() }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Copilot..." style={{ flex: 1 }} />
          <button className="btn btn-primary" type="submit" disabled={busy}>Send</button>
        </form>
      </div>
    </>
  )
}
