import { describe, expect, it } from "vitest"
import { resumeMarkdown } from "./resume"

describe("resume content", () => {
  const md = resumeMarkdown()
  it("states the owner-confirmed roles, dates and education", () => {
    for (const fact of [
      "Full Stack Developer, Rapsora Technologies Private Limited (Jan 2026 – Oct 2026)",
      "Software Engineering Intern, Androcoders (May 2025 – Sep 2025)",
      "Internship: May 15 – Jul 15, 2025; Training: Jul 2025 – Sep 2025",
      "(Oct 2022 – Jul 2026)",
      "Graduated",
      "CGPA 7.24",
      "aaoseekhe.com",
    ])
      expect(md).toContain(fact)
  })
  it("contains none of the outdated or unsupported claims", () => {
    for (const bad of [
      /Currently/i,
      /Ongoing/i,
      /aaoseekhe\.in/i,
      /June 2026/,
      /Aug 2022/,
      /Web Developer Intern/,
      /Full Stack Developer Intern/,
      /Systems Architect/i,
      /\d+ (verified )?commits/i,
    ])
      expect(md).not.toMatch(bad)
  })
})
