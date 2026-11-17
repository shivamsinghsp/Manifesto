/** Mean Earth radius in metres (IUGG). Matches the value used by Shynr's attendance API. */
export const EARTH_RADIUS_M = 6371e3

const toRad = (deg: number) => (deg * Math.PI) / 180
const toDeg = (rad: number) => (rad * 180) / Math.PI

export interface LatLon {
  lat: number
  lon: number
}

/** Great-circle distance in metres between two WGS84 points (Haversine formula). */
export function haversineMeters(a: LatLon, b: LatLon): number {
  const phi1 = toRad(a.lat)
  const phi2 = toRad(b.lat)
  const dPhi = toRad(b.lat - a.lat)
  const dLambda = toRad(b.lon - a.lon)
  const h =
    Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

/**
 * Local tangent-plane projection around `origin` (equirectangular).
 * Accurate to well under 0.1% within a few kilometres — the scale of a geofence.
 * x = metres east, y = metres north.
 */
export function toLocalMeters(p: LatLon, origin: LatLon): { x: number; y: number } {
  return {
    x: toRad(p.lon - origin.lon) * Math.cos(toRad(origin.lat)) * EARTH_RADIUS_M,
    y: toRad(p.lat - origin.lat) * EARTH_RADIUS_M,
  }
}

/** Inverse of {@link toLocalMeters}. */
export function fromLocalMeters(x: number, y: number, origin: LatLon): LatLon {
  return {
    lat: origin.lat + toDeg(y / EARTH_RADIUS_M),
    lon: origin.lon + toDeg(x / (EARTH_RADIUS_M * Math.cos(toRad(origin.lat)))),
  }
}

export type GeofenceStatus = "in_range" | "near_edge" | "outside"

/**
 * 3-state validation used by the lab:
 * outside   → distance > radius
 * near_edge → inside, but within 18% of the radius or 20 m of the boundary (GPS jitter zone)
 * in_range  → otherwise
 */
export function classifyGeofence(distance: number, radius: number): GeofenceStatus {
  if (distance > radius) return "outside"
  if (distance >= radius * 0.82 || radius - distance <= 20) return "near_edge"
  return "in_range"
}
