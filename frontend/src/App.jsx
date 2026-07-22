import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth'
import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Boarding from './pages/Boarding'
import Cruises from './pages/Cruises'
import BookingsPage from './pages/BookingsPage'
import Assistant from './pages/Assistant'
import FaithCabin from './pages/FaithCabin'
import Knowledge from './pages/Knowledge'
import NotificationsPage from './pages/NotificationsPage'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import CRM from './pages/CRM'
import Analytics from './pages/Analytics'
import Support from './pages/Support'
import Finance from './pages/Finance'
import InvoicesPage from './pages/InvoicesPage'
import EmployeePortal from './pages/EmployeePortal'
import Admin from './pages/Admin'
import Audit from './pages/Audit'
import ThreatMap from './pages/ThreatMap'
import HalalIoT from './pages/HalalIoT'
import MaintenancePage from './pages/MaintenancePage'

function EmployeeOnly({ children }) {
  const { isEmployee } = useAuth()
  if (!isEmployee) return <Navigate to="/app/dashboard" replace />
  return children
}

function HomeRedirect() {
  const { user } = useAuth()
  if (user) return <Navigate to="/app/dashboard" replace />
  return <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="boarding" element={<Boarding />} />
            <Route path="cruises" element={<Cruises />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="faith" element={<FaithCabin />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="crm" element={<EmployeeOnly><CRM /></EmployeeOnly>} />
            <Route path="analytics" element={<EmployeeOnly><Analytics /></EmployeeOnly>} />
            <Route path="support" element={<EmployeeOnly><Support /></EmployeeOnly>} />
            <Route path="finance" element={<EmployeeOnly><Finance /></EmployeeOnly>} />
            <Route path="invoices" element={<EmployeeOnly><InvoicesPage /></EmployeeOnly>} />
            <Route path="employee" element={<EmployeeOnly><EmployeePortal /></EmployeeOnly>} />
            <Route path="admin" element={<EmployeeOnly><Admin /></EmployeeOnly>} />
            <Route path="audit" element={<EmployeeOnly><Audit /></EmployeeOnly>} />
            <Route path="threat-map" element={<EmployeeOnly><ThreatMap /></EmployeeOnly>} />
            <Route path="halal-iot" element={<EmployeeOnly><HalalIoT /></EmployeeOnly>} />
            <Route path="maintenance" element={<EmployeeOnly><MaintenancePage /></EmployeeOnly>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
