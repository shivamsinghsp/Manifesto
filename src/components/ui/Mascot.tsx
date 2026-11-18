"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

/**
 * "Node" — an original mascot: a small isometric cube with a face, echoing the
 * hero's build cube. Pure SVG + CSS (no canvas, no libraries).
 * - Eyes follow the pointer on fine-pointer devices only (one rAF per move).
 * - Blinks on a CSS timer. Everything is static under reduced motion or on touch.
 * - Decorative: aria-hidden, never focusable, never covers content (pointer-events off
 *   except the small hit area for the wave).
 */
export function Mascot({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const pupils = useRef<SVGGElement>(null)
  const [wave, setWave] = useState(false)

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const el = root.current
        const g = pupils.current
        if (!el || !g) return
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height * 0.45)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 260) * 2.6
        g.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={cn("mascot pointer-events-none select-none", className)}
      data-reduced={reduced ? "" : undefined}
      data-print-hide
    >
      <svg viewBox="0 0 120 132" className="h-full w-full overflow-visible">
        {/* soft shadow */}
        <ellipse cx="60" cy="124" rx="30" ry="5" className="fill-text/10" />
        <g className="mascot-body">
          {/* cube: top, left, right faces */}
          <path
            d="M60 14 L100 34 L60 54 L20 34 Z"
            className="fill-surface stroke-accent"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M20 34 L60 54 L60 104 L20 84 Z"
            className="fill-surface-alt stroke-accent"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M100 34 L60 54 L60 104 L100 84 Z"
            className="fill-accent/15 stroke-accent"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* antenna: a tiny "node" */}
          <line
            x1="60"
            y1="14"
            x2="60"
            y2="3"
            className="stroke-accent"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="3" r="3.2" className="mascot-led fill-accent" />
          {/* face on the left face */}
          <g className="mascot-eyes">
            <ellipse
              cx="32"
              cy="62"
              rx="5.4"
              ry="6.2"
              className="fill-bg stroke-text/30"
              strokeWidth="1"
            />
            <ellipse
              cx="49"
              cy="70"
              rx="5.4"
              ry="6.2"
              className="fill-bg stroke-text/30"
              strokeWidth="1"
            />
            <g ref={pupils} className="mascot-pupils">
              <circle cx="32" cy="62.5" r="2.6" className="fill-text" />
              <circle cx="49" cy="70.5" r="2.6" className="fill-text" />
            </g>
          </g>
          <path
            d="M33 79 Q40 85 47 82"
            className="fill-none stroke-text/70"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* code glyph on the right face */}
          <path
            d="M72 66 L67 70 L72 74 M88 58 L93 62 L88 66 M84 54 L76 78"
            className="fill-none stroke-accent-text"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* waving hand (shown on hover/tap of the hit area) */}
        <g className={cn("mascot-hand", wave && "is-waving")}>
          <circle cx="106" cy="58" r="5.5" className="fill-surface stroke-accent" strokeWidth="2" />
        </g>
      </svg>
      <span
        className="pointer-events-auto absolute inset-[18%] rounded-full"
        onPointerEnter={() => setWave(true)}
        onPointerLeave={() => setWave(false)}
      />
    </div>
  )
}
