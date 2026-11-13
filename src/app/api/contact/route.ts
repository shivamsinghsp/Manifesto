import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // 1. Strict server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      )
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      )
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || "shivamsinghabc439@gmail.com"

    // If API key is not configured, do not display fake success
    if (!apiKey) {
      console.warn("[API Contact] RESEND_API_KEY is not set on this server instance:", {
        from: name,
        email,
        company,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json(
        {
          success: false,
          error: "Direct message gateway is awaiting API credentials. Please send your note directly to shivamsinghabc439@gmail.com.",
        },
        { status: 503 }
      )
    }

    // 2. Instantiate Resend only when API key is present
    const resend = new Resend(apiKey)

    const formattedMessage = [
      `Name: ${name.trim()}`,
      company ? `Company / Team: ${company.trim()}` : null,
      `Email: ${email.trim()}`,
      `\nMessage:\n${message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n")

    // Send the email using Resend
    const result = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `New Portfolio Inquiry from ${name.trim()}${company ? ` (${company.trim()})` : ""}`,
      replyTo: email.trim(),
      text: formattedMessage,
    })

    if (result.error) {
      console.error("[API Contact Resend Error]:", result.error)
      return NextResponse.json(
        { success: false, error: "Email delivery failed. Please contact shivamsinghabc439@gmail.com directly." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    console.error("[API Contact Error]:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process transmission. Please email shivamsinghabc439@gmail.com directly." },
      { status: 500 }
    )
  }
}
