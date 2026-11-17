import { beforeEach, describe, expect, it } from "vitest"
import { contactSchema, fieldErrorsFrom } from "./contact"
import { __resetRateLimit, rateLimit } from "./rate-limit"

const valid = { name: "Alex", company: "", email: "alex@company.com", message: "Hello, I'd like to talk." }

describe("contactSchema", () => {
  it("accepts a valid message and trims fields", () => {
    const r = contactSchema.safeParse({ ...valid, name: "  Alex  " })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.name).toBe("Alex")
  })
  it("rejects missing name, bad email and short message with field errors", () => {
    const r = contactSchema.safeParse({ name: " ", email: "nope", message: "hi" })
    expect(r.success).toBe(false)
    if (!r.success) {
      const e = fieldErrorsFrom(r.error)
      expect(Object.keys(e).sort()).toEqual(["email", "message", "name"])
    }
  })
  it("enforces length caps", () => {
    expect(contactSchema.safeParse({ ...valid, name: "a".repeat(101) }).success).toBe(false)
    expect(contactSchema.safeParse({ ...valid, message: "a".repeat(5001) }).success).toBe(false)
  })
})

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimit())
  it("allows `limit` requests per window then blocks", () => {
    const now = 1_000_000
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", 5, 60_000, now).ok).toBe(true)
    const blocked = rateLimit("ip", 5, 60_000, now)
    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfterSec).toBe(60)
  })
  it("resets after the window", () => {
    for (let i = 0; i < 5; i++) rateLimit("ip", 5, 60_000, 0)
    expect(rateLimit("ip", 5, 60_000, 60_001).ok).toBe(true)
  })
  it("tracks keys independently", () => {
    for (let i = 0; i < 5; i++) rateLimit("a", 5, 60_000, 0)
    expect(rateLimit("b", 5, 60_000, 0).ok).toBe(true)
  })
})
