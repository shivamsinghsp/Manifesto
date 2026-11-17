"use client"

import { useEffect, useState } from "react"
import { supportsWebGL } from "@/lib/device"

let interacted = false
const waiters = new Set<() => void>()
const EVENTS = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const

function onFirstInteraction() {
  if (interacted) return
  interacted = true
  EVENTS.forEach((e) => window.removeEventListener(e, onFirstInteraction))
  waiters.forEach((w) => w())
  waiters.clear()
}

/** Resolves on the visitor's first interaction, or after `fallbackMs` of idle time. */
function whenEngaged(cb: () => void, fallbackMs: number) {
  if (interacted) {
    cb()
    return () => {}
  }
  if (waiters.size === 0)
    EVENTS.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { passive: true, once: true })
    )
  waiters.add(cb)
  const t = window.setTimeout(() => {
    const ric = (
      window as Window & {
        requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number
      }
    ).requestIdleCallback
    if (ric) ric(onFirstInteraction, { timeout: 2000 })
    else onFirstInteraction()
  }, fallbackMs)
  return () => {
    waiters.delete(cb)
    clearTimeout(t)
  }
}

/**
 * Decides when (and whether) to mount a WebGL scene:
 *  - never during SSR, and not during the initial load window — the scene mounts on the
 *    first interaction (or after an idle fallback), so shader compilation and the first
 *    frames never compete with LCP / input readiness
 *  - only once the container is near the viewport
 *  - "unsupported" if WebGL is unavailable → render the static fallback
 */
export function useLazyMount(inView: boolean, fallbackMs = 6000) {
  const [state, setState] = useState<"pending" | "ready" | "unsupported">("pending")
  const [engaged, setEngaged] = useState(false)

  useEffect(() => whenEngaged(() => setEngaged(true), fallbackMs), [fallbackMs])

  useEffect(() => {
    if (state !== "pending" || !engaged || !inView) return
    setState(supportsWebGL() ? "ready" : "unsupported")
  }, [engaged, inView, state])

  return state
}
