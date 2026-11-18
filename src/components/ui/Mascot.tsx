"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

/**
 * "Node" — an original mascot: a small isometric cube with a face, echoing the
 * hero's build cube. Pure SVG + CSS (no canvas, no libraries).
 * - Eyes follow the pointer on fine-pointer devices only (one rAF per move).
 * - Blinks on a CSS timer. Everything is static under reduced motion or on touch.
 * - Decorative: aria-hidden, never focusable, pointer-events off (never blocks content).
 */
export function Mascot({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const pupils = useRef<SVGGElement>(null)

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
        const k = Math.min(1, d / 260) * 2.2
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
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M20 34 L60 54 L60 104 L20 84 Z"
            className="fill-surface-alt stroke-accent"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M100 34 L60 54 L60 104 L100 84 Z"
            className="fill-accent/15 stroke-accent"
            strokeWidth="1.6"
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
          {/* "Screen face" drawn flat, then skewed onto the cube's left face (isometric). */}
          <g transform="skewY(26.565)">
            <rect
              x="25"
              y="33"
              width="30"
              height="27"
              rx="4"
              className="fill-bg stroke-text/20"
              strokeWidth="1"
            />
            <g className="mascot-eyes">
              <g ref={pupils} className="mascot-pupils">
                <rect x="31" y="40" width="5" height="9" rx="2.5" className="fill-accent" />
                <rect x="44" y="40" width="5" height="9" rx="2.5" className="fill-accent" />
              </g>
            </g>
            <rect x="35.5" y="53" width="9" height="1.6" rx="0.8" className="fill-text/40" />
          </g>
          {/* code glyph on the right face */}
          <path
            d="M72 66 L67 70 L72 74 M88 58 L93 62 L88 66 M84 54 L76 78"
            className="fill-none stroke-accent-text"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  )
}
