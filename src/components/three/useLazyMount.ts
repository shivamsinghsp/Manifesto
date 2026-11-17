"use client"

import { useEffect, useState } from "react"
import { supportsWebGL } from "@/lib/device"

/**
 * Decides when (and whether) to mount a WebGL scene:
 *  - never during SSR, never before the browser is idle after load (keeps LCP/TBT clean)
 *  - only once the container is near the viewport
 *  - "unsupported" if WebGL is unavailable → render the static fallback
 */
export function useLazyMount(inView: boolean) {
  const [state, setState] = useState<"pending" | "ready" | "unsupported">("pending")
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    const done = () => setIdle(true)
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
      if (ric) ric(done, { timeout: 2500 })
      else setTimeout(done, 600)
    }
    if (document.readyState === "complete") schedule()
    else window.addEventListener("load", schedule, { once: true })
    return () => window.removeEventListener("load", schedule)
  }, [])

  useEffect(() => {
    if (state !== "pending" || !idle || !inView) return
    setState(supportsWebGL() ? "ready" : "unsupported")
  }, [idle, inView, state])

  return state
}
