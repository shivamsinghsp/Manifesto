import { haversineMeters } from "./geo"

/** Distance in whole metres. Kept for the 2D lab; see geo.ts for the full API. */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  return Math.round(haversineMeters({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }))
}
