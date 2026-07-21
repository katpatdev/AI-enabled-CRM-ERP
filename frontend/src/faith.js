/** Qibla bearing and approximate prayer times for ship GPS. */

const MAKKAH = { lat: 21.4225, lon: 39.8262 }

function toRad(d) {
  return (d * Math.PI) / 180
}

function toDeg(r) {
  return (r * 180) / Math.PI
}

export function qiblaBearing(lat, lon) {
  const φ1 = toRad(lat)
  const φ2 = toRad(MAKKAH.lat)
  const Δλ = toRad(MAKKAH.lon - lon)
  const y = Math.sin(Δλ)
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ)
  return (toDeg(Math.atan2(y, x)) + 360) % 360
}

/** Rough solar-based prayer times (demo, not astronomical precision). */
export function approxPrayerTimes(lat, date = new Date()) {
  const day = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      86400000,
  )
  const decl = 23.44 * Math.sin(toRad((360 / 365) * (day - 81)))
  const latR = toRad(lat)
  const cosHA = (Math.sin(toRad(-0.83)) - Math.sin(latR) * Math.sin(toRad(decl))) /
    (Math.cos(latR) * Math.cos(toRad(decl)))
  const ha = toDeg(Math.acos(Math.min(1, Math.max(-1, cosHA))))
  const noon = 12.0
  const sunrise = noon - ha / 15
  const sunset = noon + ha / 15

  const fmt = (h) => {
    const hh = Math.floor(h)
    const mm = Math.round((h - hh) * 60)
    return `${String(hh).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`
  }

  return {
    Fajr: fmt(sunrise - 1.2),
    Dhuhr: fmt(noon + 0.1),
    Asr: fmt(noon + ha / 15 * 0.55),
    Maghrib: fmt(sunset + 0.05),
    Isha: fmt(sunset + 1.35),
  }
}
