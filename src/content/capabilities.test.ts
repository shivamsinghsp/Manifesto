import { describe, expect, it } from "vitest"
import { capabilities } from "./capabilities"
import { skillGroups } from "./skills"

describe("hero capabilities", () => {
  const known = new Set(skillGroups.flatMap((g) => g.items))

  it("only names technologies listed in skills.ts", () => {
    for (const c of capabilities) {
      for (const tech of c.detail.split(" · ")) expect(known.has(tech), tech).toBe(true)
    }
  })

  it("has between four and six nodes with unique ids", () => {
    expect(capabilities.length).toBeGreaterThanOrEqual(4)
    expect(capabilities.length).toBeLessThanOrEqual(6)
    expect(new Set(capabilities.map((c) => c.id)).size).toBe(capabilities.length)
  })
})
