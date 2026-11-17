/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
  src: string
  alt: string
  width: number
  height: number
}

/** SVG architecture diagram that "draws in" (top-to-bottom wipe) as it enters the viewport. */
export function ArchitectureDiagram({ src, alt, width, height }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
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

  if (error) {
    return (
      <div className="bg-surface/50 flex w-full flex-col items-center justify-center border border-dashed border-border-muted py-6">
        <span className="text-mono-label mb-2 text-center uppercase text-text-tertiary">
          Diagram unavailable
        </span>
        <span className="text-body-small text-center text-text-secondary">{alt}</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-lg border border-border bg-surface-alt p-4 md:p-8"
    >
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0 opacity-20"
      />
      <div
        aria-hidden="true"
        className={cn(
          "bg-accent-hover/60 pointer-events-none absolute inset-x-0 top-0 h-px shadow-[0_0_14px_rgba(0,229,255,0.8)] transition-transform duration-[1100ms] ease-out-expo",
          visible ? "translate-y-[2000px] opacity-0" : "translate-y-0"
        )}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn(
          "diagram-reveal relative z-10 h-auto w-full object-contain",
          visible && "is-visible"
        )}
        onError={() => setError(true)}
      />
    </div>
  )
}
