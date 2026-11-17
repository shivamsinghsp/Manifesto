"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useCanvasGovernor } from "@/components/three/useCanvasGovernor"
import { useLazyMount } from "@/components/three/useLazyMount"
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary"
import { getPerfTier, type PerfTier } from "@/lib/device"
import { useReducedMotion } from "@/lib/motion-preference"
import { HeroFallback } from "./HeroFallback"

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false })

/** Decorative WebGL layer for the hero. The static SVG renders first and stays if WebGL is unavailable. */
export function HeroCanvas() {
  const { ref, inView, active } = useCanvasGovernor<HTMLDivElement>()
  const mount = useLazyMount(inView)
  const reduced = useReducedMotion()
  const [tier, setTier] = useState<PerfTier>("mid")
  const [shown, setShown] = useState(false)
  useEffect(() => setTier(getPerfTier()), [])
  useEffect(() => {
    if (mount !== "ready") return
    const id = setTimeout(() => setShown(true), 120)
    return () => clearTimeout(id)
  }, [mount])

  const fallback = <HeroFallback />
  return (
    <div ref={ref} aria-hidden="true" className="relative h-full w-full">
      <div className={`absolute inset-0 transition-opacity duration-700 ${shown ? "opacity-0" : "opacity-100"}`}>{fallback}</div>
      {mount === "ready" && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${shown ? "opacity-100" : "opacity-0"}`}>
          <CanvasErrorBoundary fallback={fallback}>
            <HeroScene tier={tier} reduced={reduced} active={active} />
          </CanvasErrorBoundary>
        </div>
      )}
    </div>
  )
}
