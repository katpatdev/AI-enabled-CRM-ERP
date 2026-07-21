import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function Loyalty() {
  const { guestId } = useOutletContext()
  const [guest, setGuest] = useState(null)
  const [msg, setMsg] = useState('')

  async function load() {
    setGuest(await api.guest(guestId))
  }

  useEffect(() => {
    load()
  }, [guestId])

  async function redeem(points, reason) {
    setMsg('')
    try {
      const g = await api.redeemLoyalty({ guest_id: guestId, points, reason })
      setGuest(g)
      setMsg(`Redeemed ${points} points for ${reason}.`)
    } catch (e) {
      setMsg(e.message)
    }
  }

  if (!guest) return <p className="muted">Loading…</p>

  const next =
    guest.loyalty_tier === 'Pearl'
      ? { label: 'Gold', need: Math.max(0, 5000 - guest.loyalty_points) }
      : guest.loyalty_tier === 'Gold'
        ? { label: 'Diamond', need: Math.max(0, 10000 - guest.loyalty_points) }
        : null

  return (
    <div className="grid-2">
      <div className="panel">
        <h3>Pearl Points</h3>
        <div className="stat">{guest.loyalty_points.toLocaleString()}</div>
        <p className="muted">
          Tier: <strong>{guest.loyalty_tier}</strong>
        </p>
        {next && next.need > 0 && (
          <p className="muted">{next.need.toLocaleString()} points to {next.label}</p>
        )}
        {next && next.need === 0 && <p className="muted">Ready to progress toward {next.label}</p>}
        <ul className="list" style={{ marginTop: '1rem' }}>
          <li>Earn 1 point per SAR spent onboard</li>
          <li>Complimentary dining still earns a courtesy 75 points</li>
          <li>Diamond spa bookings get 15% off yield price</li>
        </ul>
        {msg && <div className="toast">{msg}</div>}
      </div>
      <div className="panel">
        <h3>Redeem rewards</h3>
        <div className="cta-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <button
            className="btn btn-secondary"
            onClick={() => redeem(500, 'specialty Arabic coffee')}
          >
            500 pts · Specialty coffee
          </button>
          <button className="btn btn-secondary" onClick={() => redeem(500, 'mini-bar refill')}>
            500 pts · Mini-bar refill
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => redeem(2000, 'spa add-on massage upgrade')}
          >
            2000 pts · Spa upgrade
          </button>
        </div>
      </div>
    </div>
  )
}
