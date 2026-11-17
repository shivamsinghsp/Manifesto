import { describe, expect, it } from "vitest"
import {
  classifyGeofence,
  EARTH_RADIUS_M,
  fromLocalMeters,
  haversineMeters,
  toLocalMeters,
} from "./geo"
import { haversineDistance } from "./haversine"

const KANPUR = { lat: 26.4499, lon: 80.3319 }

describe("haversineMeters", () => {
  it("is zero for identical points", () => {
    expect(haversineMeters(KANPUR, KANPUR)).toBe(0)
  })

  it("matches one degree of latitude on the mean-radius sphere", () => {
    expect(haversineMeters({ lat: 0, lon: 0 }, { lat: 1, lon: 0 })).toBeCloseTo(
      (Math.PI / 180) * EARTH_RADIUS_M,
      6
    )
  })

  it("scales a degree of longitude by cos(latitude)", () => {
    const d = haversineMeters({ lat: 60, lon: 0 }, { lat: 60, lon: 1 })
    expect(d).toBeCloseTo((Math.PI / 180) * EARTH_RADIUS_M * Math.cos(Math.PI / 3), -1)
  })

  it("computes a known city pair (London → Paris ≈ 343.5 km)", () => {
    const d = haversineMeters({ lat: 51.5074, lon: -0.1278 }, { lat: 48.8566, lon: 2.3522 })
    expect(d / 1000).toBeGreaterThan(343)
    expect(d / 1000).toBeLessThan(344)
  })

  it("is symmetric", () => {
    const b = { lat: 26.46, lon: 80.35 }
    expect(haversineMeters(KANPUR, b)).toBeCloseTo(haversineMeters(b, KANPUR), 9)
  })

  it("handles the antimeridian", () => {
    const d = haversineMeters({ lat: 0, lon: 179.5 }, { lat: 0, lon: -179.5 })
    expect(d).toBeCloseTo((Math.PI / 180) * EARTH_RADIUS_M, 3)
  })

  it("legacy haversineDistance rounds to whole metres", () => {
    expect(haversineDistance(0, 0, 1, 0)).toBe(Math.round((Math.PI / 180) * EARTH_RADIUS_M))
  })
})

describe("local tangent-plane projection", () => {
  it("round-trips lat/lon ↔ metres", () => {
    const p = fromLocalMeters(123.4, -56.7, KANPUR)
    const back = toLocalMeters(p, KANPUR)
    expect(back.x).toBeCloseTo(123.4, 6)
    expect(back.y).toBeCloseTo(-56.7, 6)
  })

  it("agrees with Haversine to < 0.1% within 1 km of the origin", () => {
    for (const [x, y] of [
      [100, 0],
      [0, -250],
      [300, 400],
      [-700, 700],
      [480, -480],
    ]) {
      const d = haversineMeters(KANPUR, fromLocalMeters(x, y, KANPUR))
      const planar = Math.hypot(x, y)
      expect(Math.abs(d - planar) / planar).toBeLessThan(0.001)
    }
  })

  it("moves north for positive y and east for positive x", () => {
    const p = fromLocalMeters(50, 50, KANPUR)
    expect(p.lat).toBeGreaterThan(KANPUR.lat)
    expect(p.lon).toBeGreaterThan(KANPUR.lon)
  })
})

describe("classifyGeofence", () => {
  it("is outside only when distance exceeds the radius", () => {
    expect(classifyGeofence(100.01, 100)).toBe("outside")
    expect(classifyGeofence(100, 100)).not.toBe("outside")
  })
  it("flags the GPS-jitter caution zone (≥82% of radius or within 20 m)", () => {
    expect(classifyGeofence(82, 100)).toBe("near_edge")
    expect(classifyGeofence(79, 100)).toBe("in_range")
    expect(classifyGeofence(81, 100)).toBe("near_edge") // within 20 m of the edge
    expect(classifyGeofence(381, 400)).toBe("near_edge")
    expect(classifyGeofence(300, 400)).toBe("in_range")
  })
  it("treats tiny fences as all-caution (radius ≤ 20 m)", () => {
    expect(classifyGeofence(0, 20)).toBe("near_edge")
  })
})
