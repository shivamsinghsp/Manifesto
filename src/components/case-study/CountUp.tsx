"use client"

import { useEffect, useRef, useState } from "react"
import { isMotionReduced } from "@/lib/motion-preference"

/**
 * Counts up to an integer when it scrolls into view. The server HTML already
 * contains the final value, so it is correct without JS or with reduced motion.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || isMotionReduced() || value < 2) return
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 900
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / dur)
          setShown(Math.round(value * (1 - Math.pow(1 - k, 3))))
          if (k < 1) raf = requestAnimationFrame(tick)
        }
        setShown(0)
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
