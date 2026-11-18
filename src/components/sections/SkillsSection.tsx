"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { skillGroups, tooling, type SkillGroup } from "@/content/skills"
import { useCanvasGovernor } from "@/components/three/useCanvasGovernor"
import { useLazyMount } from "@/components/three/useLazyMount"
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary"
import { getPerfTier, type PerfTier } from "@/lib/device"
import { useReducedMotion } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

const SkillsScene = dynamic(() => import("@/components/three/SkillsScene"), { ssr: false })

/** Interactive stack orbit. The grouped list is the real content; the 3D cluster mirrors it. */
export function SkillsSection() {
  const [selected, setSelected] = useState<SkillGroup["id"] | null>(null)
  const { ref, inView, active } = useCanvasGovernor<HTMLDivElement>("200px")
  const mount = useLazyMount(inView)
  const reduced = useReducedMotion()
  const [tier, setTier] = useState<PerfTier>("mid")
  useEffect(() => setTier(getPerfTier()), [])

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <div
        ref={ref}
        aria-hidden="true"
        className="relative order-2 aspect-square w-full max-w-[560px] justify-self-center lg:order-1 lg:col-span-6"
      >
        <div className="absolute inset-[12%] rounded-full border border-dashed border-border-muted" />
        <div className="absolute inset-[30%] rounded-full border border-border-muted" />
        {mount === "ready" && (
          <CanvasErrorBoundary fallback={null}>
            <SkillsScene selected={selected} reduced={reduced} active={active} tier={tier} />
          </CanvasErrorBoundary>
        )}
        {mount === "ready" && (
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest text-text-tertiary">
            DRAG TO ROTATE
          </p>
        )}
      </div>

      <div className="order-1 lg:order-2 lg:col-span-6">
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Highlight a technology group"
        >
          {skillGroups.map((g) => {
            const on = selected === g.id
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(on ? null : g.id)}
                className={cn(
                  "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 font-mono text-xs uppercase tracking-wider transition-colors",
                  on
                    ? "border-text-tertiary bg-text/10 text-text"
                    : "border-border text-text-secondary hover:border-text-tertiary hover:text-text"
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: g.color }}
                />
                {g.label}
              </button>
            )
          })}
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2" data-reveal-stagger>
          {skillGroups.map((g) => (
            <div
              key={g.id}
              className={cn(
                "border-l pl-4 transition-opacity duration-300",
                selected && selected !== g.id ? "opacity-40" : "opacity-100"
              )}
              style={{ borderColor: `color-mix(in srgb, ${g.color} 40%, transparent)` }}
            >
              <dt
                className="mb-2 font-mono text-xs uppercase tracking-widest"
                style={{ color: g.color }}
              >
                {g.label}
              </dt>
              <dd className="text-body-small leading-relaxed text-text-secondary">
                {g.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-mono text-xs text-text-tertiary">Tooling: {tooling.join(" · ")}</p>
      </div>
    </div>
  )
}
