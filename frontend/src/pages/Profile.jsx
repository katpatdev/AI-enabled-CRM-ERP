import { useAuth } from '../auth'

export default function Profile() {
  const { user, isGuest } = useAuth()
  return (
    <>
      <h1 className="page-title">Profile</h1>
      <p className="page-sub">Signed-in identity for this Navora session.</p>
      <div className="panel">
        <ul className="list">
          <li>Name · {user.displayName}</li>
          <li>Username · {user.username}</li>
          <li>Role · <span className="tag gold">{user.role}</span></li>
          {isGuest ? (
            <>
              <li>Cabin · {user.cabin}</li>
              <li>Loyalty · {user.tier}</li>
            </>
          ) : (
            <>
              <li>Title · {user.title}</li>
              <li>Department · {user.department}</li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
