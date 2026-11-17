"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { hasFinePointer, isMotionReduced } from "@/lib/motion-preference"

/** Pulls its child gently toward the pointer. No-op on touch or with reduced motion. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer()) return
    const onMove = (e: PointerEvent) => {
      if (isMotionReduced()) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
    }
    const reset = () => { el.style.transform = "" }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", reset)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", reset)
    }
  }, [strength])

  return (
    <span ref={ref} className={`inline-flex transition-transform duration-300 ease-out-expo ${className ?? ""}`}>
      {children}
    </span>
  )
}
