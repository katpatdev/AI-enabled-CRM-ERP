import { useState } from 'react'
import { matchCopilot } from '../mockData'

export default function Copilot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([
    { role: 'bot', text: 'CruiseOS Copilot ready. Ask about bookings, VIPs, occupancy, invoices, delays, or campaigns.' },
  ])

  function send(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setMsgs((m) => [...m, { role: 'user', text }, { role: 'bot', text: matchCopilot(text) }])
    setInput('')
  }

  return (
    <div className="copilot">
      {open && (
        <div className="copilot-panel">
          <div className="copilot-head">CruiseOS Copilot</div>
          <div className="copilot-body">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.role === 'user' ? 'user' : 'bot'}`}>{m.text}</div>
            ))}
          </div>
          <form className="copilot-form" onSubmit={send}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Copilot..." style={{ flex: 1 }} />
            <button className="btn btn-primary" type="submit">Send</button>
          </form>
        </div>
      )}
      <button type="button" className="copilot-fab" onClick={() => setOpen((v) => !v)}>
        {open ? 'Close' : 'CruiseOS Copilot'}
      </button>
    </div>
  )
}
