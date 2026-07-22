import { notifications } from '../mockData'

export default function NotificationsPage() {
  return (
    <>
      <h1 className="page-title">Notification center</h1>
      <p className="page-sub">Payments, bookings, complaints, delays, weather, visa, and CRM reminders.</p>
      <div className="panel">
        <ul className="list">
          {notifications.map((n) => (
            <li key={n.id}>
              <strong>{n.title}</strong> <span className="tag">{n.kind}</span>
              <div>{n.body}</div>
              <div className="muted">{n.time} ago</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
