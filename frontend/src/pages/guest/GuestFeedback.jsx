import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function GuestFeedback() {
  const { guestId } = useOutletContext()
  const [rows, setRows] = useState([])
  const [rating, setRating] = useState(5)
  const [category, setCategory] = useState('Dining')
  const [comment, setComment] = useState('')
  const [msg, setMsg] = useState('')

  async function load() {
    setRows(await api.feedback(guestId))
  }

  useEffect(() => {
    load()
  }, [guestId])

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.createFeedback({ guest_id: guestId, rating, category, comment })
      setComment('')
      setMsg('Thank you. Feedback recorded with AI sentiment tag.')
      await load()
    } catch (err) {
      setMsg(err.message)
    }
  }

  return (
    <div className="grid-2">
      <div className="panel">
        <h3>Share feedback</h3>
        <p className="muted">Sentiment is auto-tagged for the ops CRM inbox.</p>
        <form onSubmit={submit}>
          <div className="form-row">
            <label className="muted">Rating</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="muted">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {['Dining', 'Excursion', 'Cabin', 'Spa', 'General'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="muted">Comment</label>
            <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        {msg && <div className="toast">{msg}</div>}
      </div>
      <div className="panel">
        <h3>Your recent feedback</h3>
        <ul className="list">
          {rows.map((r) => (
            <li key={r.id}>
              <strong>
                {r.rating}/5 · {r.category}
              </strong>{' '}
              <span className={`tag ${r.sentiment === 'Negative' ? 'alert' : 'ok'}`}>
                {r.sentiment}
              </span>
              <div className="muted">{r.comment}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
