"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { getPerfTier, type PerfTier } from "@/lib/device"
import { useReducedMotion } from "@/lib/motion-preference"

const ChipPhysics = dynamic(() => import("./ChipPhysics"), { ssr: false })

/** Loads the physics sandbox only when the footer is near; static grid otherwise. */
export function FooterSandbox({ chips }: { chips: string[] }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [tier, setTier] = useState<PerfTier>("mid")

  useEffect(() => setTier(getPerfTier()), [])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), {
      rootMargin: "300px",
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const staticGrid = (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {chips.map((c) => (
        <li
          key={c}
          className="rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-text"
        >
          {c}
        </li>
      ))}
    </ul>
  )

  return (
    <div ref={ref}>
      {/* Screen readers always get the plain list. */}
      <ul className="sr-only">
        {chips.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {near && !reduced ? (
        <ChipPhysics chips={chips} tier={tier} />
      ) : (
        <div aria-hidden={!reduced}>{staticGrid}</div>
      )}
    </div>
  )
}
