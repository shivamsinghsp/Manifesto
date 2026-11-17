"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Mail } from "lucide-react"
import { contactSchema, CONTACT_LIMITS, fieldErrorsFrom, type ContactField, type FieldErrors } from "@/lib/contact"
import { mailto, site } from "@/content/site"
import { buttonClass } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"
const EMPTY = { name: "", company: "", email: "", message: "" }

export function ContactForm() {
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const startedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => { startedAt.current = Date.now() }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard blocked — the mailto link remains available */
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: value }))
    if (errors[name as ContactField]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const focusFirstError = (errs: FieldErrors) => {
    const first = (["name", "email", "company", "message"] as ContactField[]).find((k) => errs[k])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) {
      const errs = fieldErrorsFrom(parsed.error)
      setErrors(errs)
      setStatus("error")
      setMessage("Please correct the highlighted fields.")
      focusFirstError(errs)
      return
    }

    setStatus("loading")
    setMessage("")
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
        signal: controller.signal,
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) {
        setStatus("success")
        setMessage("Message sent — thank you. I'll get back to you soon.")
        setData(EMPTY)
        setErrors({})
      } else {
        if (body.fieldErrors) {
          setErrors(body.fieldErrors)
          focusFirstError(body.fieldErrors)
        }
        setStatus("error")
        setMessage(body.error || `Something went wrong. Please email ${site.email} directly.`)
      }
    } catch (err) {
      setStatus("error")
      setMessage(
        err instanceof DOMException && err.name === "AbortError"
          ? "The request timed out. Please try again or email me directly."
          : "A network error occurred. Please try again or email me directly."
      )
    } finally {
      clearTimeout(timeout)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  const fallbackMailto = mailto(
    `Portfolio inquiry from ${data.name || "a visitor"}`,
    `Hello Shivam,\n\n${data.message}\n\n— ${data.name}${data.company ? `\n${data.company}` : ""}`
  )

  const fieldClass = (field: ContactField) =>
    cn(
      "w-full rounded-xl border bg-white/[0.04] px-4 py-3 font-mono text-sm text-text transition-colors placeholder:text-text-tertiary/70 focus:border-accent-hover focus:outline-none focus:ring-1 focus:ring-accent-hover disabled:opacity-50",
      errors[field] ? "border-rose-400/70" : "border-white/10"
    )
  const labelClass = "mb-2 block font-mono text-xs uppercase tracking-wider text-text-secondary"
  const errorText = (field: ContactField) =>
    errors[field] ? <p id={`${field}-error`} className="mt-1.5 font-mono text-xs text-rose-300">{errors[field]}</p> : null
  const describedBy = (field: ContactField, extra?: string) => [errors[field] ? `${field}-error` : "", extra ?? ""].filter(Boolean).join(" ") || undefined
  const loading = status === "loading"

  return (
    <section className="section-y relative">
      <div className="grid-container gap-y-14">
        <div className="col-span-full lg:col-span-5">
          <p className="mb-8 text-mono-label text-text-tertiary">{"// 04. CONTACT"}</p>
          <h1 className="mb-8 text-display">
            {site.ctaHeadline.lead} <br />
            <span className="italic text-text-secondary">{site.ctaHeadline.emphasis}</span>
          </h1>
          <p className="mb-12 max-w-md text-body-large text-text-secondary">
            I&apos;m open to software engineering opportunities and technical collaborations. Whether you have an engineering challenge, an open role, or want to discuss full-stack architecture, send a note and I&apos;ll get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-2 text-mono-label text-text-tertiary">Direct email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={mailto()} className="group inline-flex min-h-[44px] items-center gap-2 break-all font-mono text-base text-text transition-colors hover:text-accent-hover sm:text-lg">
                  <Mail className="h-4 w-4 shrink-0 text-accent-hover" aria-hidden="true" />
                  {site.email}
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 font-mono text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-text"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                  <span className="sr-only"> email address</span>
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-mono-label text-text-tertiary">Elsewhere</p>
              <div className="flex gap-6">
                {[["GitHub", site.socials.github], ["LinkedIn", site.socials.linkedin]].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 text-text-secondary transition-colors hover:text-text">
                    {label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full lg:col-span-6 lg:col-start-7">
          <div className="rounded-2xl border border-white/10 bg-[#0E1322]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="mb-6 border-b border-white/[0.08] pb-6">
              <h2 className="mb-1 font-display text-xl text-text">Send a message</h2>
              <p className="font-mono text-xs text-text-secondary">Fields marked * are required.</p>
            </div>

            <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
              {status === "success" && (
                <div className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}
              {status === "error" && (
                <div className="mb-5 flex flex-col gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{message}</span>
                  </p>
                  {Object.keys(errors).filter((k) => errors[k as ContactField]).length === 0 && (
                    <a href={fallbackMailto} className="inline-flex min-h-[36px] items-center gap-1.5 self-start rounded-lg border border-accent/40 bg-accent/10 px-3 font-mono text-xs text-accent-hover hover:bg-accent/20">
                      Open in your email app <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5" aria-busy={loading}>
              {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Name <span aria-hidden="true" className="text-accent-hover">*</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" required maxLength={CONTACT_LIMITS.name} value={data.name} onChange={onChange} disabled={loading} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={fieldClass("name")} placeholder="Alex Morgan" />
                  {errorText("name")}
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Company / team</label>
                  <input id="company" name="company" type="text" autoComplete="organization" maxLength={CONTACT_LIMITS.company} value={data.company} onChange={onChange} disabled={loading} aria-invalid={!!errors.company} aria-describedby={describedBy("company")} className={fieldClass("company")} placeholder="Acme Corp" />
                  {errorText("company")}
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email <span aria-hidden="true" className="text-accent-hover">*</span></label>
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={CONTACT_LIMITS.email} value={data.email} onChange={onChange} disabled={loading} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={fieldClass("email")} placeholder="alex@company.com" />
                {errorText("email")}
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message <span aria-hidden="true" className="text-accent-hover">*</span></label>
                <textarea id="message" name="message" rows={5} required maxLength={CONTACT_LIMITS.messageMax} value={data.message} onChange={onChange} disabled={loading} aria-invalid={!!errors.message} aria-describedby={describedBy("message", "message-count")} className={cn(fieldClass("message"), "resize-y")} placeholder="Tell me about the role, project or problem…" />
                <div className="mt-1.5 flex justify-between gap-4">
                  {errorText("message") ?? <span />}
                  <p id="message-count" className="shrink-0 font-mono text-[11px] text-text-tertiary">
                    {data.message.trim().length}/{CONTACT_LIMITS.messageMax}
                  </p>
                </div>
              </div>

              <button type="submit" disabled={loading} className={buttonClass("primary", "md", "mt-1 self-start")}>
                {loading ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>) : (<>Send message <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
