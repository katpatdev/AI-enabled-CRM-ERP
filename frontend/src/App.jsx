import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import GuestLayout from './pages/guest/GuestLayout'
import GuestHome from './pages/guest/GuestHome'
import Concierge from './pages/guest/Concierge'
import Experiences from './pages/guest/Experiences'
import Faith from './pages/guest/Faith'
import Loyalty from './pages/guest/Loyalty'
import Bookings from './pages/guest/Bookings'
import GuestFeedback from './pages/guest/GuestFeedback'
import OpsLayout from './pages/ops/OpsLayout'
import OpsOverview from './pages/ops/OpsOverview'
import YieldBoard from './pages/ops/YieldBoard'
import Invoices from './pages/ops/Invoices'
import ColdChain from './pages/ops/ColdChain'
import SyncPanel from './pages/ops/SyncPanel'
import Cabins from './pages/ops/Cabins'
import Maintenance from './pages/ops/Maintenance'
import Crew from './pages/ops/Crew'
import OpsFeedback from './pages/ops/OpsFeedback'

function GuestIndex() {
  return <Navigate to="/guest/1" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="guest" element={<GuestIndex />} />
          <Route path="guest/:guestId" element={<GuestLayout />}>
            <Route index element={<GuestHome />} />
            <Route path="concierge" element={<Concierge />} />
            <Route path="experiences" element={<Experiences />} />
            <Route path="faith" element={<Faith />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="feedback" element={<GuestFeedback />} />
          </Route>
          <Route path="ops" element={<OpsLayout />}>
            <Route index element={<OpsOverview />} />
            <Route path="yield" element={<YieldBoard />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="cold-chain" element={<ColdChain />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="crew" element={<Crew />} />
            <Route path="feedback" element={<OpsFeedback />} />
            <Route path="sync" element={<SyncPanel />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
