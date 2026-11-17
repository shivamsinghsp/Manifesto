import { describe, expect, it } from "vitest"
import { searchPortfolio } from "./search"
import { projects } from "@/content/projects"

describe("searchPortfolio", () => {
  it("finds the geofencing answer in Shynr", () => {
    const [top] = searchPortfolio("Which project used geofencing?")
    expect(top?.projectSlug).toBe("shynr")
  })
  it("returns nothing for stop-word-only queries", () => {
    expect(searchPortfolio("what is the")).toEqual([])
  })
  it("only links to case studies that exist", () => {
    const slugs = new Set(projects.map((p) => p.slug))
    for (const q of ["mongodb", "sharepoint", "qa", "geo search", "forms"]) {
      for (const r of searchPortfolio(q)) if (r.projectSlug) expect(slugs.has(r.projectSlug)).toBe(true)
    }
  })
})

describe("project content integrity", () => {
  it("every project has outcomes and no internal 'Tier' labels", () => {
    for (const p of projects) {
      expect(p.outcomes.length).toBeGreaterThan(0)
      expect(JSON.stringify(p)).not.toMatch(/Tier \d/)
    }
  })
})
