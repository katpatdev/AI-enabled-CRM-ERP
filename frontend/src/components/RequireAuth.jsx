import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth'
import AppShell from './AppShell'

export default function RequireAuth() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <AppShell />
}
