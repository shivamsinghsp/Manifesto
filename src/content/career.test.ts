import { readdirSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { engagements, isCurrent, projectContext, rapsora } from "./career"
import { projects } from "./projects"
import { portfolioKnowledge } from "./knowledge"

const ROOT = path.resolve(__dirname, "..")
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|mdx?)$/.test(f) ? [p] : []
  })

describe("career facts (single source of truth)", () => {
  it("Rapsora engagement is Jan 2026 – Oct 2026 and has ended", () => {
    expect(rapsora.period).toMatchObject({ start: "2026-01", end: "2026-10" })
    expect(rapsora.title).toBe("Full Stack Developer")
    expect(isCurrent(rapsora, new Date("2026-11-18"))).toBe(false)
  })

  it("Androcoders is a separate Software Engineering Intern role, May – Sep 2025, with internship and training phases", () => {
    const a = engagements.find((e) => e.id === "androcoders")!
    expect(a.title).toBe("Software Engineering Intern")
    expect(a.period).toMatchObject({ start: "2025-05", end: "2025-09" })
    expect(a.phases?.map((p) => p.label)).toEqual(["Internship", "Training"])
    expect(a.projects ?? []).toHaveLength(0)
  })

  it("education is CSJMU B.Tech IT, Oct 2022 – Jul 2026, graduated, CGPA 7.24", () => {
    const e = engagements.find((x) => x.id === "csjmu")!
    expect(e.period).toMatchObject({ start: "2022-10", end: "2026-07" })
    expect(e.status).toBe("Graduated")
    expect(e.grade).toMatch(/7\.24/)
  })

  it("every project has a career context and vice versa", () => {
    for (const p of projects) expect(projectContext(p.slug), p.slug).toBeDefined()
    const slugs = new Set(projects.map((p) => p.slug))
    for (const e of engagements)
      for (const pr of e.projects ?? []) expect(slugs.has(pr.slug)).toBe(true)
  })

  it("no file outside career.ts states career dates or durations", () => {
    const allowed = new Set(["content/career.ts", "lib/dates.ts"])
    const month =
      "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)"
    const patterns = [
      new RegExp(`\\b${month}\\s+(?:\\d{1,2},?\\s+)?20\\d\\d\\b`),
      /\b\d+(?:\.\d+)?[- ]?(?:month|week)s?\b(?!\w)/i,
      /\b20\d\d\s*[–-]\s*20\d\d\b/,
    ]
    const offenders: string[] = []
    for (const file of walk(ROOT)) {
      const rel = path.relative(ROOT, file).replace(/\\/g, "/")
      if (allowed.has(rel) || rel.endsWith(".test.ts")) continue
      const lines = readFileSync(file, "utf8").split("\n")
      lines.forEach((line, i) => {
        if (patterns.some((re) => re.test(line))) offenders.push(`${rel}:${i + 1}: ${line.trim()}`)
      })
    }
    expect(offenders).toEqual([])
  })

  it("knowledge base never calls the Rapsora role current or 6 months", () => {
    const text = JSON.stringify(portfolioKnowledge)
    expect(text).not.toMatch(/6-month|January–June|currently (?:working|employed)/i)
    expect(text).toMatch(/Jan 2026 – Oct 2026/)
  })
})
