"use client"

import { useEffect, useRef } from "react"

/** Thin bar under the header showing progress through the case study. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = document.getElementById(targetId)
      if (!el || !bar.current) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1
      bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [targetId])
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-[var(--header-h)] z-[890] h-[2px] bg-transparent"
    >
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-accent-hover shadow-[0_0_10px_rgb(var(--c-glow)/0.6)]"
      />
    </div>
  )
}
