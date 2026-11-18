"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
  /** Inline SVG markup (first-party file read at build time). */
  svg: string
  alt: string
  width: number
  height: number
}

/**
 * Inline, theme-aware SVG diagram. Inlining lets the diagram use the site's CSS
 * variables, so it follows the light/dark theme. Its strokes draw in as it enters
 * the viewport (CSS only, skipped under reduced motion).
 */
export function ArchitectureDiagram({ svg, alt, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="diagram-frame relative w-full overflow-hidden rounded-lg border border-border bg-surface-alt p-4 md:p-8"
    >
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0 opacity-20"
      />
      <div
        role="img"
        aria-label={alt}
        data-armed={armed ? "" : undefined}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={cn(
          "diagram-draw relative z-10 w-full [&>svg]:h-full [&>svg]:w-full",
          visible && "is-visible"
        )}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}
