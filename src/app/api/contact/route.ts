import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // 1. Basic server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      )
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || "shivamsinghabc439@gmail.com"

    // If API key is not configured (e.g. local dev / preview), handle gracefully
    if (!apiKey) {
      console.warn("[API Contact] RESEND_API_KEY is not set. Simulating message dispatch in development:", {
        name,
        email,
        contactEmail,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json({
        success: true,
        mocked: true,
        message: "Message received (Development simulation mode)",
      })
    }

    // 2. Instantiate Resend only when API key is present
    const resend = new Resend(apiKey)

    // Send the email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `New Portfolio Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true, ...data })
  } catch (error) {
    console.error("[API Contact Error]:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
