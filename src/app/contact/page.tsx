"use client"

import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export default function ContactPage() {
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
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 relative">
      <div className="grid-container grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10">
        
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
          <div className="border border-border bg-surface p-6 sm:p-8 md:p-12 relative group" style={{ perspective: "var(--perspective-standard)" }}>
            <div className="absolute inset-0 bg-surface border border-border transition-all duration-[600ms] ease-out-expo translate-x-3 translate-y-3 opacity-100 z-0 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8 bg-surface">
              {status === "success" && (
                <div className="p-4 border border-accent bg-accent/10 text-accent font-mono text-sm">
                  [MESSAGE_SENT] Thank you for reaching out.
                </div>
              )}
              {status === "error" && (
                <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 font-mono text-sm">
                  [ERROR] Failed to send message. Please try again.
                </div>
              )}
              
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="text-mono-label text-text-tertiary">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  className="bg-surface-alt/10 border-b border-border-muted px-0 py-3 text-text focus:outline-none focus:border-b-text focus:bg-surface-alt/30 transition-colors disabled:opacity-50 placeholder:text-text-tertiary"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-mono-label text-text-tertiary">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  className="bg-surface-alt/10 border-b border-border-muted px-0 py-3 text-text focus:outline-none focus:border-b-text focus:bg-surface-alt/30 transition-colors disabled:opacity-50 placeholder:text-text-tertiary"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="text-mono-label text-text-tertiary">MESSAGE</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                  rows={4}
                  className="bg-surface-alt/10 border-b border-border-muted px-0 py-3 text-text focus:outline-none focus:border-b-text focus:bg-surface-alt/30 transition-colors resize-none disabled:opacity-50 placeholder:text-text-tertiary"
                  placeholder="How can I help you?"
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading"}
                className="group relative inline-flex items-center justify-center font-mono font-medium text-[12px] uppercase tracking-wider leading-none transition-all duration-300 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-none overflow-hidden bg-cta-bg text-cta-text hover:text-black focus-visible:outline-text before:absolute before:inset-0 before:bg-white before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 [&>*]:relative [&>*]:z-10 self-start h-12 px-8 mt-4"
              >
                <span>{status === "loading" ? "SENDING..." : "SEND MESSAGE"}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
