import { leaderboard, employeeTasks } from '../mockData'
import { useAuth } from '../auth'

export default function EmployeePortal() {
  const { user } = useAuth()
  return (
    <>
      <h1 className="page-title">Employee portal</h1>
      <p className="page-sub">{user.displayName} · {user.title} · {user.department}</p>
      <div className="grid-2">
        <div className="panel">
          <h3>Today's tasks</h3>
          <ul className="list">
            {employeeTasks.map((t) => (
              <li key={t.id}>
                <span className={`tag ${t.done ? 'ok' : 'warn'}`}>{t.done ? 'Done' : 'Open'}</span> {t.task}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Performance</h3>
          <ul className="list">
            <li>Assigned customers · 18</li>
            <li>Attendance · Present</li>
            <li>Leaves remaining · 9 days</li>
            <li>Sales MTD · SAR 86,400</li>
            <li>Commission · SAR 4,320</li>
          </ul>
        </div>
        <div className="panel">
          <h3>Leaderboard</h3>
          <ul className="list">
            {leaderboard.map((l, i) => (
              <li key={l.name}>#{i + 1} {l.name} · SAR {l.sales.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
