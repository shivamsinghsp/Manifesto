export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/** Words that must keep their casing in labels. */
const KEEP = new Set([
  "QA",
  "ATS",
  "RBAC",
  "HRMS",
  "CMS",
  "API",
  "APIs",
  "SME",
  "UI",
  "UX",
  "SPFx",
  "M365",
  "PLEDGE",
  "GPS",
  "ISR",
])
const KEEP_LOWER = new Map([...KEEP].map((w) => [w.toLowerCase(), w]))

/**
 * Title-cases a label without mangling acronyms or hyphenated words:
 * "QA PROTOCOL" → "QA Protocol", "MULTI-TIER ROLE" → "Multi-Tier Role".
 */
export function titleCase(s: string): string {
  return s
    .split(/(\s+|-)/)
    .map((part) => {
      if (/^\s+$|^-$/.test(part) || !part) return part
      const known = KEEP_LOWER.get(part.toLowerCase())
      if (known) return known
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    })
    .join("")
}
