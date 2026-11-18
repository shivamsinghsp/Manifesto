"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV_LINKS, site } from "@/content/site"
import { MotionToggle } from "@/components/motion/MotionToggle"
import { EmailLink } from "@/components/ui/EmailLink"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  // Close on navigation
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const first = panel.current?.querySelector<HTMLElement>("a, button")
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        trigger.current?.focus({ preventScroll: true })
      }
      if (e.key === "Tab" && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a, button")
        const a = items[0],
          b = items[items.length - 1]
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault()
          b.focus()
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault()
          a.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-button border border-border text-text transition-colors hover:bg-surface-alt"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        id="mobile-menu"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        // Closed: removed from the tab order and the accessibility tree.
        inert={!open}
        className={cn(
          "fixed inset-0 z-[1000] flex-col bg-bg/[0.98] backdrop-blur-xl",
          open ? "flex" : "hidden"
        )}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-border px-[var(--gutter)]">
          <span className="font-display text-xl text-text">{site.shortName}</span>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              trigger.current?.focus({ preventScroll: true })
            }}
            className="flex h-11 w-11 items-center justify-center rounded-button border border-border text-text transition-colors hover:bg-surface-alt"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-[var(--gutter)]">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li
                  key={link.href}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={cn(open && "animate-reveal-up")}
                >
                  <NextLink
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-headline flex items-baseline gap-4 border-b border-border py-4 transition-colors",
                      active ? "text-accent-hover" : "text-text hover:text-accent-hover"
                    )}
                  >
                    <span className="font-mono text-xs text-text-tertiary">{link.index}</span>
                    {link.label}
                  </NextLink>
                </li>
              )
            })}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-2">
            <EmailLink className="inline-flex min-h-[44px] items-center font-mono text-sm text-text-secondary hover:text-accent-hover" />
            <MotionToggle className="-ml-3" />
          </div>
        </nav>
      </div>
    </div>
  )
}
