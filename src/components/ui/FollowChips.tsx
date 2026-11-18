"use client"

import { useEffect, useRef } from "react"
import { hasFinePointer, isMotionReduced } from "@/lib/motion-preference"

/**
 * Tag chips that trail the cursor over a project image (fine pointers only).
 * Purely decorative: the same tags are always shown as static chips in the card body.
 */
export function FollowChips({ tags }: { tags: string[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host || !hasFinePointer()) return
    let frame = 0
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) frame = requestAnimationFrame(tick)
      else frame = 0
    }
    const onMove = (e: PointerEvent) => {
      if (isMotionReduced()) return
      const r = host.getBoundingClientRect()
      tx = Math.min(e.clientX - r.left + 14, r.width - el.offsetWidth - 8)
      ty = Math.min(e.clientY - r.top + 14, r.height - el.offsetHeight - 8)
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onEnter = (e: PointerEvent) => {
      if (isMotionReduced()) return
      const r = host.getBoundingClientRect()
      x = tx = e.clientX - r.left + 14
      y = ty = e.clientY - r.top + 14
      el.style.opacity = "1"
    }
    const onLeave = () => {
      el.style.opacity = "0"
    }
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerenter", onEnter)
    host.addEventListener("pointerleave", onLeave)
    return () => {
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerenter", onEnter)
      host.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ opacity: 0 }}
      className="pointer-events-none absolute left-0 top-0 z-20 flex max-w-[70%] flex-wrap gap-1.5 transition-opacity duration-200"
    >
      {tags.slice(0, 3).map((t) => (
        <span
          key={t}
          className="rounded-full border border-accent/40 bg-surface/90 px-2.5 py-1 font-mono text-[11px] text-accent-text shadow-md backdrop-blur"
        >
          {t}
        </span>
      ))}
    </div>
  )
}
