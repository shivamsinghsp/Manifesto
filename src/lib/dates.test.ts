import { describe, expect, it } from "vitest"
import { formatDuration, formatPeriod, hasEnded, monthsBetween, daysBetween } from "./dates"

describe("dates", () => {
  it("formats month ranges consistently", () => {
    expect(formatPeriod({ start: "2026-01", end: "2026-10", confirmed: true })).toBe(
      "Jan 2026 – Oct 2026"
    )
  })
  it("formats same-year day ranges", () => {
    expect(formatPeriod({ start: "2026-01-15", end: "2026-02-09", confirmed: true })).toBe(
      "Jan 15 – Feb 9, 2026"
    )
  })
  it("marks unknown and unconfirmed dates", () => {
    expect(formatPeriod({ start: null, end: null, confirmed: false })).toBe("Dates to be confirmed")
    expect(formatPeriod({ start: "2025-07", end: "2025-07", confirmed: false })).toMatch(
      /to be confirmed/
    )
  })
  it("collapses single-month periods", () => {
    expect(formatPeriod({ start: "2025-07", end: "2025-07", confirmed: false })).toBe(
      "Jul 2025 (to be confirmed)"
    )
  })
  it("formats approximate ranges with qualifiers", () => {
    expect(
      formatPeriod({
        start: "2026-05",
        end: "2026-09",
        confirmed: true,
        approximate: true,
        startQualifier: "mid",
        endQualifier: "early",
      })
    ).toBe("≈ mid-May – early-Sep 2026")
  })
  it("computes durations from dates", () => {
    expect(monthsBetween("2026-01", "2026-10")).toBe(10)
    expect(formatDuration({ start: "2026-01", end: "2026-10", confirmed: true })).toBe("10 mos")
    expect(formatDuration({ start: "2025-05", end: "2025-07", confirmed: true })).toBe("3 mos")
    expect(formatDuration({ start: "2022-10", end: "2026-07", confirmed: true })).toBe(
      "3 yrs 10 mos"
    )
    expect(daysBetween("2026-01-15", "2026-02-09")).toBe(26)
    expect(formatDuration({ start: "2026-01-15", end: "2026-02-09", confirmed: true })).toBe(
      "26 days (≈4 weeks)"
    )
  })
  it("knows when a period has ended", () => {
    const p = { start: "2026-01", end: "2026-10", confirmed: true }
    expect(hasEnded(p, new Date("2026-10-31T12:00:00Z"))).toBe(false)
    expect(hasEnded(p, new Date("2026-11-18T00:00:00Z"))).toBe(true)
  })
})
