"use client"

import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" }) // Reset form
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 relative">
      <div className="grid-container gap-y-16 lg:gap-y-0 relative z-10">
        
        <div className="col-span-full lg:col-span-5">
          <span className="text-mono-label text-text-tertiary mb-8 block tracking-widest">{`// 04. CONTACT`}</span>
          <h1 className="text-[clamp(3rem,6vw,80px)] font-display font-light leading-[1.05] tracking-tight mb-8">
            Let&apos;s build <br />
            <span className="italic text-text-secondary">systems.</span>
          </h1>
          <p className="text-[1.1rem] text-text-secondary leading-relaxed mb-12 max-w-md">
            I am currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="group">
              <span className="text-mono-label text-text-tertiary block mb-2">EMAIL</span>
              <a 
                href="mailto:shivamsinghabc439@gmail.com" 
                className="text-[1rem] sm:text-[1.25rem] text-text transition-colors group-hover:text-accent inline-flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-4 ring-offset-bg break-all sm:break-normal"
              >
                shivamsinghabc439@gmail.com
                <ArrowUpRight className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
            <div className="group">
              <span className="text-mono-label text-text-tertiary block mb-2">SOCIAL</span>
              <div className="flex gap-6">
                <a 
                  href="https://github.com/shivamsinghsp"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-[1.1rem] text-text-secondary transition-colors hover:text-text focus:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-4 ring-offset-bg"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/shivam2105-"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-[1.1rem] text-text-secondary transition-colors hover:text-text focus:outline-none focus-visible:ring-1 focus-visible:ring-text focus-visible:ring-offset-4 ring-offset-bg"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <div className="rounded-2xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-xl p-8 sm:p-10 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {status === "success" && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-mono text-sm">
                  ✓ [MESSAGE_SENT] Thank you for reaching out. I will get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 font-mono text-sm">
                  ✕ [ERROR] Failed to send message. Please try again or email directly.
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono tracking-wider text-slate-400">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50 placeholder:text-slate-500 text-sm font-mono"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono tracking-wider text-slate-400">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50 placeholder:text-slate-500 text-sm font-mono"
                  placeholder="name@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono tracking-wider text-slate-400">MESSAGE</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  rows={4}
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none disabled:opacity-50 placeholder:text-slate-500 text-sm font-mono"
                  placeholder="How can I help you build or architect your system?"
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex items-center justify-center font-mono font-bold text-xs uppercase tracking-wider rounded-xl bg-white text-slate-950 hover:bg-cyan-300 transition-all h-12 px-8 self-start shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{status === "loading" ? "SENDING..." : "SEND MESSAGE ↗"}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
