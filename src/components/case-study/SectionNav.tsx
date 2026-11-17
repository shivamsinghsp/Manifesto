"use client"

import { useEffect, useRef, useState } from "react"
import { getLenis } from "@/components/motion/SmoothScroll"
import { isMotionReduced } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

export interface NavSection {
  id: string
  label: string
  index: string
}

/** Sticky in-page navigation: a side rail on desktop, a scrollable chip bar on mobile. */
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id)
  const chipBar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  // Keep the active chip in view on mobile
  useEffect(() => {
    const chip = chipBar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [active])

  const go = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -120 })
    else el.scrollIntoView({ behavior: isMotionReduced() ? "auto" : "smooth" })
    history.replaceState(null, "", `#${id}`)
    el.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true })
    setActive(id)
  }

  const items = sections.map((s) => ({ ...s, on: s.id === active }))

  return (
    <>
      {/* Mobile / tablet chip bar */}
      <nav aria-label="Case study sections" className="sticky top-[var(--header-h)] z-[880] border-b border-border bg-bg/90 backdrop-blur-md 2xl:hidden">
        <div ref={chipBar} className="no-scrollbar flex gap-2 overflow-x-auto px-[var(--gutter)] py-2.5">
          {items.map((s) => (
            <a
              key={s.id}
              data-id={s.id}
              href={`#${s.id}`}
              onClick={go(s.id)}
              aria-current={s.on ? "location" : undefined}
              className={cn(
                "inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-full border px-3 font-mono text-[11px] uppercase tracking-wider transition-colors",
                s.on ? "border-accent/50 bg-accent/10 text-accent-hover" : "border-white/10 text-text-secondary"
              )}
            >
              <span className="text-text-tertiary">{s.index}</span>
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop rail */}
      <nav aria-label="Case study sections" className="fixed left-6 top-1/2 z-[880] hidden -translate-y-1/2 2xl:block">
        <ol className="flex flex-col gap-1 border-l border-white/10">
          {items.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={s.on ? "location" : undefined}
                className={cn(
                  "group -ml-px flex min-h-[32px] max-w-[11rem] items-center gap-2 border-l py-1 pl-3 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  s.on ? "border-accent-hover text-accent-hover" : "border-transparent text-text-tertiary hover:text-text-secondary"
                )}
              >
                <span>{s.index}</span>
                <span className={cn("truncate transition-opacity", "rounded bg-bg/90 px-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")}>{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
