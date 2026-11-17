"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Tracks whether a canvas should be rendering: it must be (near) the viewport and
 * the tab must be visible. Consumers switch R3F's `frameloop` to "never" otherwise.
 */
export function useCanvasGovernor<T extends HTMLElement>(rootMargin = "100px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    })
    io.observe(el)
    const onVis = () => setTabVisible(document.visibilityState === "visible")
    onVis()
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [rootMargin])

  return { ref, inView, active: inView && tabVisible }
}
