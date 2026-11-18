"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { isMotionReduced } from "@/lib/motion-preference"

/**
 * Route-change curtain: a thin blueprint panel sweeps across after client navigation.
 * Never runs on the initial page load, so it cannot affect LCP.
 */
export function RouteTransition() {
  const pathname = usePathname()
  const first = useRef(true)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (isMotionReduced()) return
    // Shared-element (View Transition) navigations animate themselves.
    if (document.documentElement.dataset.vt === "1") return
    setKey((k) => k + 1)
  }, [pathname])

  if (key === 0) return null
  return (
    <div
      key={key}
      aria-hidden="true"
      className="route-curtain pointer-events-none fixed inset-0 z-[1100]"
    >
      <style>{`
        .route-curtain{background:linear-gradient(90deg,transparent,rgb(var(--c-glow) / .08) 40%,rgb(var(--c-bg) / .96) 50%,rgb(var(--c-glow) / .08) 60%,transparent);
          animation:curtain 650ms cubic-bezier(.16,1,.3,1) forwards;transform:translateX(-100%)}
        @keyframes curtain{to{transform:translateX(100%)}}
      `}</style>
    </div>
  )
}
