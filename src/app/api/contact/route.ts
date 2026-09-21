import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    // Instantiate Resend inside the request handler to prevent build-time crashes when env vars are missing
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const body = await request.json()
    const { name, email, message } = body

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Ensure the CONTACT_EMAIL environment variable is set
    const contactEmail = process.env.CONTACT_EMAIL
    
    if (!contactEmail) {
      console.error("CONTACT_EMAIL environment variable is not configured.")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // Uses Resend's default testing domain if custom not verified
      to: [contactEmail],
      subject: `New Portfolio Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json(data)
  } catch {
    // Return a safe error message without exposing internal details
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
