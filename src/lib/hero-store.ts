"use client"

import { useSyncExternalStore } from "react"

/**
 * Tiny external store shared by the hero's DOM step rail and the WebGL scene.
 * The scene reads `heroState` inside useFrame (no React re-render per frame).
 */
export const heroState = { progress: 0, step: 0 }
const listeners = new Set<() => void>()

export function setHeroProgress(p: number) {
  const progress = Math.min(1, Math.max(0, p))
  const step = Math.min(4, Math.floor(progress * 5))
  const changed = step !== heroState.step
  heroState.progress = progress
  heroState.step = step
  if (changed) listeners.forEach((l) => l())
}

export function setHeroStep(step: number) {
  heroState.step = step
  heroState.progress = (step + 0.5) / 5
  listeners.forEach((l) => l())
}

export function useHeroStep() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => heroState.step,
    () => 0
  )
}
