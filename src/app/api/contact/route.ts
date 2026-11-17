import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema, CONTACT_LIMITS, fieldErrorsFrom } from "@/lib/contact"
import { rateLimit } from "@/lib/rate-limit"
import { site } from "@/content/site"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 12_000
const SEND_TIMEOUT_MS = 10_000

const json = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers })

function clientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for")
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0)
  if (length > MAX_BODY_BYTES) {
    return json({ success: false, error: "Message is too large." }, 413)
  }

  let raw: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) {
      return json({ success: false, error: "Message is too large." }, 413)
    }
    raw = JSON.parse(text)
  } catch {
    return json({ success: false, error: "Invalid request." }, 400)
  }

  const body = (raw ?? {}) as Record<string, unknown>

  // Honeypot + timing trap. Respond as if successful so bots learn nothing.
  const honeypot = typeof body.website === "string" ? body.website : ""
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0
  if (honeypot.trim() !== "" || (startedAt > 0 && Date.now() - startedAt < CONTACT_LIMITS.minFillMs)) {
    return json({ success: true })
  }

  const limited = rateLimit(`contact:${clientIp(request)}`)
  if (!limited.ok) {
    return json(
      {
        success: false,
        error: `Too many messages from this connection. Please try again in ${Math.ceil(limited.retryAfterSec / 60)} minute(s) or email ${site.email}.`,
      },
      429,
      { "Retry-After": String(limited.retryAfterSec) }
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return json(
      { success: false, error: "Please correct the highlighted fields.", fieldErrors: fieldErrorsFrom(parsed.error) },
      400
    )
  }
  const { name, company, email, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not configured; message not sent.")
    return json(
      {
        success: false,
        error: `The contact form isn't connected yet. Please email ${site.email} directly.`,
      },
      503
    )
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL || site.email
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>"

  const text = [
    `Name: ${name}`,
    company ? `Company / Team: ${company}` : null,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n")

  try {
    const resend = new Resend(apiKey)
    const result = await Promise.race([
      resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject: `Portfolio inquiry from ${name}${company ? ` (${company})` : ""}`.slice(0, 200),
        text,
      }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), SEND_TIMEOUT_MS)),
    ])

    if (result.error) {
      console.error("[contact] Resend error:", result.error.name)
      return json({ success: false, error: `Delivery failed. Please email ${site.email} directly.` }, 502)
    }
    return json({ success: true })
  } catch (err) {
    console.error("[contact] send failed:", err instanceof Error ? err.message : "unknown")
    return json({ success: false, error: `Delivery failed. Please email ${site.email} directly.` }, 502)
  }
}

export function GET() {
  return json({ success: false, error: "Method not allowed." }, 405, { Allow: "POST" })
}
