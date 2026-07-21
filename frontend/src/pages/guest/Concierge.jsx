import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function Concierge() {
  const { guestId } = useOutletContext()
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Marhaba. I am your Mare Arabia concierge. Ask about Halal dining, shore excursions, spa, loyalty points, or prayer facilities.',
    },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [meta, setMeta] = useState(null)

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || busy) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: msg }])
    setBusy(true)
    try {
      const res = await api.chat(guestId, msg)
      setMeta(res)
      setMessages((m) => [...m, { role: 'bot', text: res.reply }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: `Error: ${e.message}` }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>AI Concierge</h3>
        <span className="tag">{meta ? meta.mode : 'ready'}</span>
      </div>
      <p className="muted">
        Hybrid RAG grounded in ship menus, itineraries, and policies
        {meta?.sources?.length ? `. Sources: ${meta.sources.join(', ')}` : ''}
      </p>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role === 'user' ? 'user' : 'bot'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="chips">
        {[
          'Suggest a Halal dinner tonight',
          'Best excursion in Jeddah for walking?',
          'Where can I pray and how do I find Qibla?',
          'It is very hot. Indoor ideas?',
          'How many loyalty points do I have?',
        ].map((q) => (
          <button key={q} type="button" className="chip" onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the concierge…"
          disabled={busy}
        />
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? '…' : 'Send'}
        </button>
      </form>
    </div>
  )
}
