"use client"

import { useEffect, useState } from "react"
import { isMotionReduced } from "@/lib/motion-preference"

const KEY = "boot-seen"

/**
 * First-visit "boot sequence": a progress rule along the top edge and a mono counter.
 * It never covers the headline or CTA (so it can't delay LCP), and is skipped
 * on later navigations, on repeat visits in a session and with reduced motion.
 */
export function Preloader() {
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === "1"
      sessionStorage.setItem(KEY, "1")
    } catch {}
    if (seen || isMotionReduced()) return

    let raf = 0
    const start = performance.now()
    const MIN = 900,
      MAX = 2200
    let loaded = document.readyState === "complete"
    const onLoad = () => {
      loaded = true
    }
    window.addEventListener("load", onLoad)

    const tick = (now: number) => {
      const t = now - start
      const target = loaded && t > MIN ? 100 : Math.min(92, (t / MAX) * 100)
      setProgress((p) => Math.min(100, Math.max(p ?? 0, (p ?? 0) + (target - (p ?? 0)) * 0.12)))
      if (t < MAX + 800 && !(loaded && t > MIN + 400)) raf = requestAnimationFrame(tick)
      else setProgress(100)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  if (progress === null) return null
  const done = progress >= 99.5
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[1250] transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"}`}
      onTransitionEnd={() => done && setProgress(null)}
    >
      <div
        className="h-[2px] origin-left bg-accent-hover shadow-[0_0_12px_rgba(0,229,255,0.7)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <div className="bg-bg/80 absolute right-4 top-3 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] tracking-widest text-accent-hover backdrop-blur">
        BOOT {String(Math.round(progress)).padStart(3, "0")}%
      </div>
    </div>
  )
}
