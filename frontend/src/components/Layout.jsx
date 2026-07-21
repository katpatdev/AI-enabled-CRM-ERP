import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Layout() {
  const [sync, setSync] = useState(null)

  useEffect(() => {
    api.syncStatus().then(setSync).catch(() => {})
    const t = setInterval(() => {
      api.syncStatus().then(setSync).catch(() => {})
    }, 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app-shell">
      <header className="topnav">
        <NavLink to="/" className="brand">
          Mare <span>Arabia</span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/guest" className={({ isActive }) => (isActive ? 'active' : '')}>
            Guest CRM
          </NavLink>
          <NavLink to="/ops" className={({ isActive }) => (isActive ? 'active' : '')}>
            Ops ERP
          </NavLink>
        </nav>
        {sync && (
          <span className={`badge ${sync.edge_online ? 'online' : 'offline'}`}>
            {sync.edge_online ? 'Edge online' : 'Edge offline'}
            {sync.pending_count > 0 ? ` · ${sync.pending_count} queued` : ''}
          </span>
        )}
      </header>
      <Outlet />
    </div>
  )
}
