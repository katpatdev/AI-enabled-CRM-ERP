import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { api } from '../../api'

export default function Bookings() {
  const { guestId } = useOutletContext()
  const [bookings, setBookings] = useState([])

  async function load() {
    setBookings(await api.bookings(guestId))
  }

  useEffect(() => {
    load()
  }, [guestId])

  async function cancel(id) {
    await api.cancelBooking(id)
    await load()
  }

  return (
    <div className="panel">
      <h3>My bookings</h3>
      {bookings.length === 0 ? (
        <p className="muted">No bookings yet. Try Experiences or the concierge.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Sync</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.booking_type}</td>
                <td>
                  {b.title}
                  <div className="muted">{b.details}</div>
                </td>
                <td>{b.amount_sar ? `${b.amount_sar} SAR` : 'Incl.'}</td>
                <td>
                  <span className={`tag ${b.status === 'cancelled' ? 'alert' : 'ok'}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <span className={`tag ${b.synced_at ? 'ok' : 'alert'}`}>
                    {b.synced_at ? 'synced' : 'pending'}
                  </span>
                </td>
                <td>
                  {b.status !== 'cancelled' && (
                    <button className="btn btn-danger" style={{ padding: '0.35rem 0.7rem' }} onClick={() => cancel(b.id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
