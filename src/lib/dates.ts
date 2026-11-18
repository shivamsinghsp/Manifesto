/**
 * Date helpers for career data. Dates are ISO strings: "YYYY-MM" (month precision)
 * or "YYYY-MM-DD" (day precision). Everything is computed — nothing is hard-coded.
 */

export interface Period {
  /** "YYYY-MM" or "YYYY-MM-DD". Null when the date is not known yet. */
  start: string | null
  /** "YYYY-MM" or "YYYY-MM-DD". Null when the date is not known yet. */
  end: string | null
  /** False when the owner has not confirmed these dates. Rendered as "to be confirmed". */
  confirmed: boolean
  /** True when the owner gave the dates as approximate. Rendered with "≈". */
  approximate?: boolean
  /** Optional qualifiers for approximate edges, e.g. "mid", "early". */
  startQualifier?: "early" | "mid" | "late"
  endQualifier?: "early" | "mid" | "late"
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

interface Parsed {
  y: number
  m: number // 1-12
  d?: number
}

export function parseIso(s: string): Parsed {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(s)
  if (!match) throw new Error(`Invalid career date "${s}" (expected YYYY-MM or YYYY-MM-DD)`)
  const [, y, m, d] = match
  const parsed: Parsed = { y: Number(y), m: Number(m) }
  if (parsed.m < 1 || parsed.m > 12) throw new Error(`Invalid month in "${s}"`)
  if (d) parsed.d = Number(d)
  return parsed
}

/** "Jan 2026", or "Jan 15, 2026" with day precision. */
export function formatDate(s: string, style: "short" | "long" = "short"): string {
  const p = parseIso(s)
  const month = (style === "short" ? MONTHS_SHORT : MONTHS_LONG)[p.m - 1]
  return p.d ? `${month} ${p.d}, ${p.y}` : `${month} ${p.y}`
}

const qualify = (q: Period["startQualifier"], text: string) => (q ? `${q}-${text}` : text)

/**
 * Consistent range label: "Jan 2026 – Oct 2026", "Jan 15 – Feb 9, 2026",
 * "≈ mid-May – early-Sep 2026", or "Dates to be confirmed".
 */
export function formatPeriod(p: Period, style: "short" | "long" = "short"): string {
  if (!p.start || !p.end) return "Dates to be confirmed"
  const a = parseIso(p.start)
  const b = parseIso(p.end)
  const months = style === "short" ? MONTHS_SHORT : MONTHS_LONG
  let label: string
  if (a.d && b.d && a.y === b.y) {
    label = `${months[a.m - 1]} ${a.d} – ${months[b.m - 1]} ${b.d}, ${b.y}`
  } else if (p.approximate && a.y === b.y) {
    label = `${qualify(p.startQualifier, months[a.m - 1])} – ${qualify(p.endQualifier, months[b.m - 1])} ${b.y}`
  } else {
    label = `${formatDate(p.start, style)} – ${formatDate(p.end, style)}`
  }
  if (p.approximate) label = `≈ ${label}`
  if (!p.confirmed) label = `${label} (to be confirmed)`
  return label
}

/** Inclusive whole months, e.g. Jan–Oct = 10. */
export function monthsBetween(start: string, end: string): number {
  const a = parseIso(start)
  const b = parseIso(end)
  return (b.y - a.y) * 12 + (b.m - a.m) + 1
}

/** Inclusive day count for day-precision periods. */
export function daysBetween(start: string, end: string): number {
  const a = parseIso(start)
  const b = parseIso(end)
  if (!a.d || !b.d) throw new Error("daysBetween needs day-precision dates")
  const ms = Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)
  return Math.round(ms / 86_400_000) + 1
}

/** Human duration: "26 days (≈4 weeks)", "10 mos", "3 yrs 10 mos". Null if dates are unknown. */
export function formatDuration(p: Period): string | null {
  if (!p.start || !p.end) return null
  const a = parseIso(p.start)
  const b = parseIso(p.end)
  let out: string
  if (a.d && b.d) {
    const days = daysBetween(p.start, p.end)
    out = days < 14 ? `${days} days` : `${days} days (≈${Math.round(days / 7)} weeks)`
  } else {
    const total = monthsBetween(p.start, p.end)
    const yrs = Math.floor(total / 12)
    const mos = total % 12
    const parts = [
      yrs ? `${yrs} yr${yrs > 1 ? "s" : ""}` : "",
      mos ? `${mos} mo${mos > 1 ? "s" : ""}` : "",
    ]
    out = parts.filter(Boolean).join(" ")
  }
  return p.approximate ? `≈ ${out}` : out
}

/** True when the period ended before `now`. */
export function hasEnded(p: Period, now: Date = new Date()): boolean {
  if (!p.end) return false
  const e = parseIso(p.end)
  // End of the stated month (or day).
  const endTs = e.d ? Date.UTC(e.y, e.m - 1, e.d + 1) : Date.UTC(e.y, e.m, 1)
  return endTs <= now.getTime()
}

/** Machine-readable ISO for <time dateTime>. */
export const isoAttr = (s: string | null) => s ?? undefined
