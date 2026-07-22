import { createContext, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS = {
  guest: {
    username: 'guest',
    password: 'abcd',
    role: 'guest',
    displayName: 'Layla Al-Harbi',
    cabin: 'A-1204',
    tier: 'Diamond',
  },
  employee: {
    username: 'employee',
    password: 'abcd',
    role: 'employee',
    displayName: 'Aisha Rahman',
    title: 'Guest Concierge Lead',
    department: 'Guest Services',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('cruiseos_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('cruiseos_user', JSON.stringify(user))
    else localStorage.removeItem('cruiseos_user')
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isGuest: user?.role === 'guest',
      isEmployee: user?.role === 'employee',
      login(username, password) {
        const key = String(username || '').trim().toLowerCase()
        const account = USERS[key]
        if (!account || account.password !== password) {
          return { ok: false, error: 'Invalid credentials. Try guest/abcd or employee/abcd.' }
        }
        const { password: _, ...safe } = account
        setUser(safe)
        return { ok: true, user: safe }
      },
      loginAs(role) {
        const account = USERS[role]
        if (!account) return
        const { password: _, ...safe } = account
        setUser(safe)
      },
      logout() {
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
