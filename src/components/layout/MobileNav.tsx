"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { NAV_LINKS, site } from "@/content/site"
import { MotionToggle } from "@/components/motion/MotionToggle"
import { EmailLink } from "@/components/ui/EmailLink"
import { getLenis } from "@/components/motion/SmoothScroll"
import { cn } from "@/lib/utils"

const FOCUSABLE = 'a[href], button:not([disabled]), [role="switch"]'

/**
 * Full-screen mobile menu.
 *
 * Root cause of the old bug: the overlay was rendered *inside* the header pill, which uses
 * `backdrop-filter`. Any filter/backdrop-filter/transform on an ancestor becomes the containing
 * block for `position: fixed` children, so `fixed inset-0` resolved to the 52px pill instead of
 * the viewport — the links spilled out over the page with no background behind them.
 * The overlay is now portalled to <body>, so it is always viewport-sized.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) trigger.current?.focus({ preventScroll: true })
  }, [])

  // Route changed (back/forward, programmatic navigation) → close without stealing focus.
  useEffect(() => setOpen(false), [pathname])

  // Growing past the lg breakpoint shows the desktop nav; never leave a hidden, locked overlay.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const body = document.body
    const scrollbar = window.innerWidth - html.clientWidth
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPadding: body.style.paddingRight,
    }
    // Lock both roots (iOS Safari honours <html>) and pause Lenis, which otherwise keeps
    // scrolling the page underneath on wheel/trackpad input.
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    getLenis()?.stop()

    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    // Focus the first navigation link, not the close button: it's what the user came for.
    const firstLink = panel.current?.querySelector<HTMLElement>("nav a")
    requestAnimationFrame(() => firstLink?.focus({ preventScroll: true }))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== "Tab") return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.paddingRight = prev.bodyPadding
      getLenis()?.start()
      document.removeEventListener("keydown", onKey)
    }
  }, [open, close])

  const overlay = (
    <div
      id="mobile-menu"
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // Closed: removed from the tab order and the accessibility tree.
      inert={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col bg-bg text-text lg:hidden",
        "ease-out-expo motion-reduce:transition-none",
        // Visibility flips instantly on open (so focus can move in on the first frame) and only
        // after the fade on close.
        open
          ? "visible opacity-100 [transition:opacity_300ms]"
          : "invisible opacity-0 [transition:opacity_300ms,visibility_0s_linear_300ms]"
      )}
    >
      <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-[var(--gutter)]">
        <NextLink
          href="/"
          onClick={() => close(false)}
          className="flex min-h-[44px] items-center gap-2 font-display text-xl tracking-tight"
        >
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
          {site.shortName}
        </NextLink>
        <button
          type="button"
          onClick={() => close()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-text"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-[var(--gutter)] pb-8 pt-6"
      >
        <p className="text-mono-label mb-4 text-text-tertiary">Index</p>
        <ul className="border-t border-border">
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={cn(
                  "border-b border-border transition-[opacity,transform] duration-500 ease-out-expo motion-reduce:transition-none",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
              >
                <NextLink
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  // Also closes when the link points at the current page (pathname won't change).
                  onClick={() => close(false)}
                  className={cn(
                    "group flex min-h-[64px] items-center justify-between gap-4 py-3 font-display text-[clamp(2.25rem,9vw,3.25rem)] leading-none tracking-tight transition-colors",
                    active ? "text-accent-text" : "text-text hover:text-accent-text"
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 font-mono text-xs text-text-tertiary">{link.index}</span>
                    {link.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                  />
                </NextLink>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto flex flex-col gap-1 pt-10">
          <p className="text-mono-label mb-2 text-text-tertiary">Contact</p>
          <EmailLink className="inline-flex min-h-[44px] items-center break-all text-base text-text hover:text-accent-text" />
          <div className="flex flex-wrap items-center gap-x-6">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-sm text-text-secondary hover:text-accent-text"
            >
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-sm text-text-secondary hover:text-accent-text"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <MotionToggle className="-ml-3" />
          </div>
        </div>
      </nav>
    </div>
  )

  return (
    <div className="lg:hidden">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-text transition-colors hover:bg-chip"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  )
}
