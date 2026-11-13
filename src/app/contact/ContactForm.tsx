"use client"

import React, { useState } from "react"
import { ArrowUpRight, Copy, Check, Mail } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const directEmail = "shivamsinghabc439@gmail.com"

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback if clipboard API is blocked
      const textArea = document.createElement("textarea")
      textArea.value = directEmail
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error")
      setErrorMessage("Please fill out all required fields.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success && !data.mocked) {
        setStatus("success")
        setFormData({ name: "", company: "", email: "", message: "" })
      } else {
        setStatus("error")
        setErrorMessage(
          data.error ||
            "Unable to deliver message at this time. Please send an email directly to shivamsinghabc439@gmail.com."
        )
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error occurred. Please contact shivamsinghabc439@gmail.com directly.")
    }
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="grid-container gap-y-16 lg:gap-y-0 relative z-10">
        
        {/* Left Editorial Info */}
        <div className="col-span-full lg:col-span-5">
          <span className="text-mono-label text-text-tertiary mb-8 block tracking-widest">{`// 04. CONTACT`}</span>
          <h1 className="text-[clamp(3rem,6vw,80px)] font-display font-light leading-[1.05] tracking-tight mb-8">
            Let&apos;s build <br />
            <span className="italic text-text-secondary">systems.</span>
          </h1>
          <p className="text-[1.1rem] text-text-secondary leading-relaxed mb-12 max-w-md">
            I am open to software engineering opportunities and technical collaborations. Whether you have an engineering challenge, an open role, or want to discuss full-stack architecture, send a note and I&apos;ll get back to you within 24 hours.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="group">
              <span className="text-mono-label text-text-tertiary block mb-2">DIRECT EMAIL</span>
              <div className="flex flex-wrap items-center gap-3">
                <a 
                  href={`mailto:${directEmail}`} 
                  className="text-[1rem] sm:text-[1.15rem] text-text transition-colors hover:text-cyan-400 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 break-all sm:break-normal font-mono"
                  aria-label="Send email to shivamsinghabc439@gmail.com"
                >
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  {directEmail}
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="group">
              <span className="text-mono-label text-text-tertiary block mb-2">SOCIAL & CODE</span>
              <div className="flex gap-6">
                <a 
                  href="https://github.com/shivamsinghsp"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-[1.05rem] text-text-secondary transition-colors hover:text-white inline-flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  GitHub
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/shivam2105-"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-[1.05rem] text-text-secondary transition-colors hover:text-white inline-flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <div className="rounded-2xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-xl p-8 sm:p-10 md:p-12 shadow-2xl">
            <div className="mb-6 pb-6 border-b border-white/[0.08]">
              <h2 className="text-xl font-display font-medium text-white mb-1">
                Initiate Contact
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Responses delivered within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div aria-live="polite">
                {status === "success" && (
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>✓ [MESSAGE_SENT] Thank you for reaching out. I will get back to you shortly.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 font-mono text-xs">
                    ✕ [ERROR] {errorMessage || "Failed to send message. Please email directly."}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono tracking-wider text-slate-400">
                    FULL NAME <span className="text-cyan-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50 placeholder:text-slate-600 text-sm font-mono"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-mono tracking-wider text-slate-400">
                    COMPANY / TEAM
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50 placeholder:text-slate-600 text-sm font-mono"
                    placeholder="e.g. Acme Corp / Engineering Team"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono tracking-wider text-slate-400">
                  EMAIL ADDRESS <span className="text-cyan-400">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50 placeholder:text-slate-600 text-sm font-mono"
                  placeholder="e.g. alex@company.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono tracking-wider text-slate-400">
                  MESSAGE <span className="text-cyan-400">*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  rows={4}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none disabled:opacity-50 placeholder:text-slate-600 text-sm font-mono"
                  placeholder="Tell me about your engineering project, team, or opportunity..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center justify-center font-mono font-bold text-xs uppercase tracking-wider rounded-xl bg-white text-slate-950 hover:bg-cyan-300 transition-all h-12 px-8 self-start shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{status === "loading" ? "TRANSMITTING..." : "SEND MESSAGE ↗"}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
