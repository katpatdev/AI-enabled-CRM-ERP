/** CruiseOS mock enterprise dataset for MVP+ demos */

export const insights = [
  {
    id: 1,
    title: 'Arabian Pearl under-occupied',
    body: 'Cruise Arabian Pearl is only 42% occupied. Recommend launching a weekend promotion.',
    impact: 'Potential revenue increase $52,000',
  },
  {
    id: 2,
    title: 'VIP Red Sea upsell',
    body: '12 Diamond guests have open spa credits. Bundle Pearl Spa + Al-Balad tour.',
    impact: 'Estimated ancillary +$18,400',
  },
  {
    id: 3,
    title: 'Jeddah embarkation congestion',
    body: 'Morning pier queue trending high. Stagger arrival windows by loyalty tier.',
    impact: 'Reduce terminal wait ~14 minutes',
  },
  {
    id: 4,
    title: 'Halal cold-store B watch',
    body: 'Cold Store B humidity near upper band. Pre-dispatch HVAC tech before Aqaba call.',
    impact: 'Avoid spoilage risk on 28kg hammour',
  },
]

export const kpis = {
  todaysBookings: 186,
  todaysRevenue: 428500,
  occupancy: 78,
  shipsAtSea: 3,
  pendingTickets: 14,
  checkIns: 92,
  checkOuts: 61,
  weatherAlerts: 2,
}

export const cruises = [
  {
    id: 'c1',
    name: 'Arabian Pearl',
    ship: 'MS Horizon Pearl',
    destination: 'Muscat → Jeddah → Aqaba',
    departure: '2026-08-02',
    arrival: '2026-08-07',
    occupancy: 42,
    weather: 'Clear, 33°C',
    captain: 'Capt. Yasmin Al-Rashid',
    cabinsLeft: 214,
    status: 'Low occupancy',
    image: 'pearl',
  },
  {
    id: 'c2',
    name: 'Red Sea Grand Tour',
    ship: 'MS Coral Majesty',
    destination: 'Jeddah → Yanbu → Aqaba',
    departure: '2026-08-10',
    arrival: '2026-08-15',
    occupancy: 88,
    weather: 'Warm breeze',
    captain: 'Capt. Omar Saleh',
    cabinsLeft: 41,
    status: 'On schedule',
    image: 'coral',
  },
  {
    id: 'c3',
    name: 'Gulf Heritage Crossing',
    ship: 'MS Desert Star',
    destination: 'Muscat → Dubai layover → Jeddah',
    departure: '2026-08-18',
    arrival: '2026-08-24',
    occupancy: 71,
    weather: 'Moderate seas',
    captain: 'Capt. Nora Haddad',
    cabinsLeft: 96,
    status: 'Delayed 3h',
    image: 'desert',
  },
]

export const customers = [
  {
    id: 1,
    name: 'Layla Al-Harbi',
    email: 'layla@example.com',
    phone: '+966 50 123 4567',
    nationality: 'Saudi Arabia',
    loyalty: 'Diamond',
    preferredCabin: 'Suite A-1204',
    food: 'Halal',
    medical: 'None',
    passportExpiry: '2031-04-12',
    lastCruise: 'Red Sea Grand Tour',
    totalSpending: 48200,
    aiScore: 94,
    clv: 126000,
    churnRisk: 'Low',
    travelHistory: 6,
  },
  {
    id: 2,
    name: 'James Okonkwo',
    email: 'james@example.com',
    phone: '+234 80 555 0199',
    nationality: 'Nigeria',
    loyalty: 'Pearl',
    preferredCabin: 'Balcony B-0808',
    food: 'Vegetarian',
    medical: 'Limited stairs',
    passportExpiry: '2028-11-02',
    lastCruise: 'Arabian Pearl',
    totalSpending: 9100,
    aiScore: 71,
    clv: 34000,
    churnRisk: 'Medium',
    travelHistory: 2,
  },
  {
    id: 3,
    name: 'Mei Chen',
    email: 'mei@example.com',
    phone: '+65 8123 4567',
    nationality: 'Singapore',
    loyalty: 'Gold',
    preferredCabin: 'Oceanview A-0412',
    food: 'Halal-friendly',
    medical: 'None',
    passportExpiry: '2027-01-19',
    lastCruise: 'Gulf Heritage Crossing',
    totalSpending: 22300,
    aiScore: 83,
    clv: 67000,
    churnRisk: 'Low',
    travelHistory: 4,
  },
]

export const timeline = [
  { year: '2024', event: 'Booked first cruise' },
  { year: '2024', event: 'Completed Red Sea trip' },
  { year: '2024', event: 'Gave 5-star review' },
  { year: '2025', event: 'Birthday coupon sent' },
  { year: '2025', event: 'Booked again (suite)' },
  { year: '2026', event: 'Upgraded to Diamond VIP' },
]

export const tickets = [
  { id: 'T-1042', customer: 'Mei Chen', category: 'Cabin', priority: 'High', status: 'New', aiReply: 'Offer room move to quieter midship cabin and complimentary tea set.' },
  { id: 'T-1043', customer: 'James Okonkwo', category: 'Accessibility', priority: 'Medium', status: 'Assigned', aiReply: 'Confirm elevator escort for Deck 8 dining at 19:00.' },
  { id: 'T-1044', customer: 'Omar Farouk', category: 'Excursion', priority: 'Low', status: 'In Progress', aiReply: 'Reschedule Wadi Rum to seated viewing package.' },
  { id: 'T-1045', customer: 'Sara Nasser', category: 'Billing', priority: 'High', status: 'Resolved', aiReply: 'Refund spa add-on and issue loyalty apology points.' },
  { id: 'T-1046', customer: 'Layla Al-Harbi', category: 'Dining', priority: 'Medium', status: 'New', aiReply: 'Reserve Al Bahar Kabsa tasting for two tonight.' },
]

export const notifications = [
  { id: 1, title: 'Payment Received', body: 'SAR 2,480 from Layla Al-Harbi', kind: 'finance', time: '2m' },
  { id: 2, title: 'Booking Confirmed', body: 'Wadi Rum Safari · Cabin A-1204', kind: 'booking', time: '12m' },
  { id: 3, title: 'Customer Complaint', body: 'Ticket T-1042 opened', kind: 'support', time: '28m' },
  { id: 4, title: 'Cruise Delayed', body: 'Gulf Heritage Crossing +3h', kind: 'ops', time: '1h' },
  { id: 5, title: 'Weather Alert', body: 'Red Sea heat advisory 36°C', kind: 'weather', time: '2h' },
  { id: 6, title: 'Visa Expiring', body: 'Mei Chen passport insurance check pending', kind: 'compliance', time: '3h' },
  { id: 7, title: 'Birthday Reminder', body: 'Send Diamond perk to Sara Nasser', kind: 'crm', time: '5h' },
]

export const knowledgeArticles = [
  { id: 'kb1', title: 'Refund Policy', tags: 'refund payment', body: 'Full refund up to 30 days before sailing. 50% within 14 days. No-shows are non-refundable except medical with documentation.' },
  { id: 'kb2', title: 'GCC Visa Guidance', tags: 'visa travel documents', body: 'Multi-port Arabian Sea to Red Sea itineraries may require valid passport (6+ months) and travel medical insurance. GCC Unified Visa integration is planned.' },
  { id: 'kb3', title: 'Cruise Safety Brief', tags: 'safety muster', body: 'Muster drill is mandatory within 24 hours of embarkation. Life jackets are in cabin wardrobes. Emergency signals are explained on cabin screens.' },
  { id: 'kb4', title: 'Halal Dining', tags: 'food halal meals', body: 'Al Bahar and select galleys are Halal certified. Cross-contamination protocols are enforced in Cold Store A.' },
  { id: 'kb5', title: 'Cabin Information', tags: 'cabin suite balcony', body: 'Suites include Qibla display, quiet-hours mode, and mini-bar. Accessibility cabins are near aft elevators.' },
  { id: 'kb6', title: 'Travel Insurance', tags: 'insurance medical', body: 'Travel medical insurance is recommended for multi-country ports (Oman, KSA, Jordan).' },
  { id: 'kb7', title: 'Medical Services', tags: 'medical clinic', body: 'Ship clinic on Deck 3 midship. Emergency response 24/7. Declare allergies at embarkation.' },
  { id: 'kb8', title: 'Faith Facilities', tags: 'prayer qibla', body: 'Prayer room Deck 4 midship. Cabin app shows Qibla and prayer times from ship GPS.' },
]

export const activityFeed = [
  'Ahmed booked Arabian Pearl suite',
  'Maria answered ticket T-1043',
  'Ali generated ZATCA invoice MA-SIM-00088',
  'John approved refund SAR 420',
  'Sarah created customer Sara Nasser',
  'AI generated Red Sea itinerary package',
  'Nora closed HVAC work order WO-221',
  'Finance cleared B2B invoice STD-00012',
]

export const auditLogs = [
  { time: '11:12', text: 'Employee edited booking BK-8841' },
  { time: '11:15', text: 'Customer cancelled reservation BK-8790' },
  { time: '11:18', text: 'Invoice generated MA-SIM-00088' },
  { time: '11:22', text: 'AI recommended Diamond spa discount' },
  { time: '11:25', text: 'Marketing campaign draft created' },
  { time: '11:31', text: 'Housekeeping marked cabin A-0412 Ready' },
  { time: '11:40', text: 'Edge sync flushed 3 offline POS sales' },
]

export const leaderboard = [
  { name: 'Ali', sales: 182000 },
  { name: 'Maria', sales: 161500 },
  { name: 'John', sales: 148200 },
  { name: 'Ahmed', sales: 132900 },
]

export const employeeTasks = [
  { id: 1, task: 'Escort VIP embarkation window 10:00', done: false },
  { id: 2, task: 'Follow up ticket T-1042', done: false },
  { id: 3, task: 'Confirm Halal provision PO Jeddah', done: true },
  { id: 4, task: 'Brief captain on Red Sea advisory', done: false },
]

export const zatcaFeed = [
  { id: 'Z1', item: 'Spa Treatment', amount: 280, status: 'ZATCA Cleared', type: 'B2C' },
  { id: 'Z2', item: 'Retail Boutique', amount: 95, status: 'ZATCA Cleared', type: 'B2C' },
  { id: 'Z3', item: 'Port Provisions Co.', amount: 12500, status: 'ZATCA Cleared', type: 'B2B' },
  { id: 'Z4', item: 'Specialty Dining', amount: 0, status: 'Pending Report', type: 'B2C' },
  { id: 'Z5', item: 'Shore Excursion', amount: 420, status: 'ZATCA Cleared', type: 'B2C' },
]

export const coldChainSeries = [-18.1, -18.0, -17.9, -18.2, -18.0, -17.8, -18.1, -18.0, -18.3, -18.0, -17.9, -18.1]

export const maintenanceAlerts = [
  { id: 'M1', title: 'Deck 4 HVAC Efficiency Drop Detected', detail: 'Predicted failure window 36h. Spare filter available.', status: 'Open' },
  { id: 'M2', title: 'Elevator EL-07 vibration anomaly', detail: 'Assign Tech. Rami during next sea day.', status: 'Open' },
]

export const copilotReplies = {
  bookings: 'Today: 186 bookings across 3 ships. Top seller: Red Sea Grand Tour (88% occupancy).',
  vip: 'VIP Diamond guests onboard: Layla Al-Harbi, Sara Nasser. Recommend spa + heritage bundle.',
  invoice: 'Draft invoice ready: Spa Treatment SAR 280 + 15% VAT = SAR 322. Status simulated ZATCA Cleared.',
  occupancy: 'Lowest occupancy: Arabian Pearl at 42%. Recommend weekend promo (+$52k potential).',
  marketing: 'Campaign draft: "Red Sea Escape Weekend" · 15% off balcony · target Pearl/Gold guests with no booking in 90 days.',
  summarize: 'Customer Layla Al-Harbi: high-value Diamond, Halal preference, 6 cruises, CLV SAR 126k, churn risk Low.',
  revenue: 'Predicted 7-day revenue: SAR 3.1M (+12%). Best destination signal: Jeddah/Al-Balad packages.',
  delayed: 'Delayed: Gulf Heritage Crossing (+3h). Notify 96 waitlisted cabin guests and rebook excursions.',
  default: 'CruiseOS Copilot online. Try: show bookings, VIP customers, occupancy, invoice, marketing, forecast, delayed cruises.',
}

export function matchCopilot(message) {
  const m = message.toLowerCase()
  if (m.includes('booking')) return copilotReplies.bookings
  if (m.includes('vip')) return copilotReplies.vip
  if (m.includes('invoice')) return copilotReplies.invoice
  if (m.includes('occup')) return copilotReplies.occupancy
  if (m.includes('market') || m.includes('campaign')) return copilotReplies.marketing
  if (m.includes('summar')) return copilotReplies.summarize
  if (m.includes('revenue') || m.includes('forecast') || m.includes('predict')) return copilotReplies.revenue
  if (m.includes('delay')) return copilotReplies.delayed
  if (m.includes('excursion') || m.includes('food') || m.includes('dinner') || m.includes('halal')) {
    return 'Recommended: 1) Jeddah Al-Balad Heritage Walk 2) Wadi Rum Sunset Safari 3) Al Bahar Halal Kabsa tasting on Deck 8.'
  }
  return copilotReplies.default
}

export function searchIndex() {
  return [
    ...customers.map((c) => ({ type: 'Customer', title: c.name, path: '/app/crm', hint: c.loyalty })),
    ...cruises.map((c) => ({ type: 'Cruise', title: c.name, path: '/app/cruises', hint: c.destination })),
    ...tickets.map((t) => ({ type: 'Ticket', title: t.id, path: '/app/support', hint: t.customer })),
    ...knowledgeArticles.map((k) => ({ type: 'Knowledge', title: k.title, path: '/app/knowledge', hint: k.tags })),
    { type: 'Invoice', title: 'ZATCA Monitor', path: '/app/finance', hint: 'Finance' },
    { type: 'Employee', title: 'Aisha Rahman', path: '/app/employee', hint: 'Guest Services' },
  ]
}
