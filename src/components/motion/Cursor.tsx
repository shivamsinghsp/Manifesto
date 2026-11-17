"use client"

import { useEffect, useRef, useState } from "react"
import { hasFinePointer, useReducedMotion } from "@/lib/motion-preference"

const INTERACTIVE =
  "a, button, [role='button'], [role='switch'], input, textarea, select, label, [data-cursor]"

/** Trailing ring cursor for mouse/trackpad users. The native cursor stays visible. */
export function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setEnabled(hasFinePointer() && !reduced)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [reduced])

  useEffect(() => {
    if (!enabled || !ring.current) return
    const el = ring.current
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf = 0,
      active = false,
      visible = false

    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${active ? 1.9 : 1})`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      tx = e.clientX
      ty = e.clientY
      if (!visible) {
        visible = true
        el.style.opacity = "1"
        x = tx
        y = ty
      }
      const next = !!(e.target as Element | null)?.closest?.(INTERACTIVE)
      if (next !== active) {
        active = next
        el.dataset.active = String(active)
      }
      kick()
    }
    const onLeave = () => {
      visible = false
      el.style.opacity = "0"
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="border-accent-hover/70 data-[active=true]:bg-accent-hover/15 pointer-events-none fixed left-0 top-0 z-[1300] h-8 w-8 rounded-full border opacity-0 mix-blend-difference transition-[opacity,background-color,scale] duration-200"
      style={{ willChange: "transform" }}
    />
  )
}
