"use client"

import { useRef, type ReactNode, type PointerEvent } from "react"
import { hasFinePointer, isMotionReduced } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

/**
 * 3D tilt on mouse/trackpad. Children can opt into depth with
 * `data-depth="20"` (px of translateZ) — e.g. the screenshot layer.
 * Touch and reduced-motion users get a flat, fully functional card.
 */
export function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !hasFinePointer() || isMotionReduced()) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`)
      el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`)
      el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty("--px", `${(px * -14).toFixed(1)}px`)
      el.style.setProperty("--py", `${(py * -10).toFixed(1)}px`)
    })
  }
  const reset = () => {
    cancelAnimationFrame(frame.current)
    const el = ref.current
    if (!el) return
    ;["--rx", "--ry", "--px", "--py"].forEach((v) => el.style.setProperty(v, v.startsWith("--r") ? "0deg" : "0px"))
  }

  return (
    <div className="h-full [perspective:1200px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={cn("tilt-card relative h-full [transform-style:preserve-3d]", className)}
      >
        {children}
        <span aria-hidden="true" className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
      </div>
    </div>
  )
}
