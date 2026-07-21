const API_BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export const api = {
  health: () => request('/api/v1/health'),
  guests: () => request('/api/v1/guests'),
  guest: (id) => request(`/api/v1/guests/${id}`),
  itinerary: () => request('/api/v1/itinerary'),
  offers: (type) => request(type ? `/api/v1/offers?offer_type=${type}` : '/api/v1/offers'),
  bookings: (guestId) =>
    request(guestId ? `/api/v1/bookings?guest_id=${guestId}` : '/api/v1/bookings'),
  createBooking: (body) =>
    request('/api/v1/bookings', { method: 'POST', body: JSON.stringify(body) }),
  cancelBooking: (id) => request(`/api/v1/bookings/${id}/cancel`, { method: 'POST' }),
  chat: (guest_id, message) =>
    request('/api/v1/concierge/chat', {
      method: 'POST',
      body: JSON.stringify({ guest_id, message }),
    }),
  inventory: () => request('/api/v1/inventory'),
  sensors: () => request('/api/v1/sensors'),
  sensorTick: () => request('/api/v1/sensors/simulate-tick', { method: 'POST' }),
  invoices: () => request('/api/v1/invoices'),
  createInvoice: (body) =>
    request('/api/v1/invoices', { method: 'POST', body: JSON.stringify(body) }),
  fleet: () => request('/api/v1/fleet/snapshot'),
  syncStatus: () => request('/api/v1/sync/status'),
  syncEvents: () => request('/api/v1/sync/events'),
  setEdge: (edge_online) =>
    request('/api/v1/sync/edge', {
      method: 'POST',
      body: JSON.stringify({ edge_online }),
    }),
  flushSync: () => request('/api/v1/sync/flush', { method: 'POST' }),
  cabins: () => request('/api/v1/cabins'),
  updateCabin: (id, body) =>
    request(`/api/v1/cabins/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  workOrders: () => request('/api/v1/work-orders'),
  createWorkOrder: (body) =>
    request('/api/v1/work-orders', { method: 'POST', body: JSON.stringify(body) }),
  updateWorkOrder: (id, body) =>
    request(`/api/v1/work-orders/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  feedback: (guestId) =>
    request(guestId ? `/api/v1/feedback?guest_id=${guestId}` : '/api/v1/feedback'),
  createFeedback: (body) =>
    request('/api/v1/feedback', { method: 'POST', body: JSON.stringify(body) }),
  crew: () => request('/api/v1/crew'),
  notifications: (guestId) =>
    request(guestId ? `/api/v1/notifications?guest_id=${guestId}` : '/api/v1/notifications'),
  markNotificationRead: (id) => request(`/api/v1/notifications/${id}/read`, { method: 'POST' }),
  redeemLoyalty: (body) =>
    request('/api/v1/loyalty/redeem', { method: 'POST', body: JSON.stringify(body) }),
}
