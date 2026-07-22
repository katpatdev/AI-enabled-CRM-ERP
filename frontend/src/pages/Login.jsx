import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'

export default function Login() {
  const { user, login, loginAs } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/app/dashboard" replace />

  function submit(e) {
    e.preventDefault()
    const res = login(username, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/app/dashboard')
  }

  function quick(role) {
    loginAs(role)
    navigate('/app/dashboard')
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <p className="muted" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.72rem', marginBottom: '0.75rem' }}>
            Maritime AI Platform
          </p>
          <h1>
            Cruise<span>OS</span>
          </h1>
          <p>AI Enterprise Operating System for Cruise Tourism across the Arabian Sea and Red Sea.</p>
        </div>
        <div className="login-form-wrap">
          <h2 className="page-title" style={{ fontSize: '1.35rem' }}>Sign in</h2>
          <p className="page-sub">Hardcoded demo IAM. Guest and employee portals.</p>

          <div className="role-cards">
            <button type="button" className="role-card" onClick={() => quick('guest')}>
              <strong>Continue as Guest</strong>
              <span>Passenger experience · boarding · AI concierge</span>
            </button>
            <button type="button" className="role-card" onClick={() => quick('employee')}>
              <strong>Continue as Employee</strong>
              <span>Shipboard operations · CRM · ERP · finance</span>
            </button>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-row">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="guest or employee" autoComplete="username" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="abcd" autoComplete="current-password" />
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
              Enter CruiseOS
            </button>
          </form>
          <p className="muted" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            Demo credentials: guest / abcd · employee / abcd
          </p>
        </div>
      </div>
    </div>
  )
}
