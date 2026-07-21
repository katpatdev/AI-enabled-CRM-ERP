import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function Experiences() {
  const { guestId } = useOutletContext()
  const [offers, setOffers] = useState([])
  const [filter, setFilter] = useState('all')
  const [msg, setMsg] = useState('')

  async function load() {
    setOffers(await api.offers())
  }

  useEffect(() => {
    load()
  }, [])

  const shown = offers.filter((o) => filter === 'all' || o.offer_type === filter)

  async function book(offer) {
    setMsg('')
    try {
      const b = await api.createBooking({
        guest_id: guestId,
        booking_type: offer.offer_type,
        title: offer.title,
        offer_id: offer.id,
        details: `Booked from Experiences catalog (${offer.port})`,
      })
      setMsg(`Confirmed ${b.title} for ${b.amount_sar ? `${b.amount_sar} SAR` : 'included'}. Points earned.`)
      await load()
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <div>
      <div className="panel-head" style={{ marginBottom: '1rem' }}>
        <div>
          <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
            Experiences catalog
          </h3>
          <p className="section-sub">Yield-aware pricing updates as demand and fill rise.</p>
        </div>
        <div className="chips">
          {['all', 'dining', 'excursion', 'spa'].map((f) => (
            <button
              key={f}
              type="button"
              className={`chip ${filter === f ? 'active-chip' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {msg && <div className="toast">{msg}</div>}
      <div className="grid-2">
        {shown.map((o) => (
          <div className="panel offer-card" key={o.id}>
            <div className="panel-head">
              <h3>{o.title}</h3>
              <span className="tag">{o.offer_type}</span>
            </div>
            <p className="muted">{o.description}</p>
            <ul className="list" style={{ marginTop: '0.75rem' }}>
              <li>
                Port · {o.port}
              </li>
              <li>
                Fill · {o.fill_pct}% ({o.remaining} left)
              </li>
              <li>
                Price ·{' '}
                {o.base_price_sar === 0 ? (
                  'Included'
                ) : (
                  <>
                    <strong>{o.yield_price_sar} SAR</strong>
                    {o.yield_price_sar !== o.base_price_sar && (
                      <span className="muted"> (base {o.base_price_sar})</span>
                    )}
                  </>
                )}
              </li>
              {o.dietary_tags && <li>Tags · {o.dietary_tags}</li>}
            </ul>
            <button
              className="btn btn-primary"
              style={{ marginTop: '0.75rem' }}
              disabled={o.remaining <= 0}
              onClick={() => book(o)}
            >
              {o.remaining <= 0 ? 'Sold out' : 'Book now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
