"use client"

import { useSyncExternalStore } from "react"

/**
 * Motion preference = OS `prefers-reduced-motion` overridden by the on-site toggle.
 * The toggle writes `data-motion="reduce" | "full"` on <html> (see MOTION_BOOT_SCRIPT).
 */
export const MOTION_STORAGE_KEY = "motion-pref"

/** Runs in <head> before paint so the first frame already respects the saved choice. */
export const MOTION_BOOT_SCRIPT = `(function(){try{var p=localStorage.getItem("${MOTION_STORAGE_KEY}");if(p==="reduce"||p==="full"){document.documentElement.setAttribute("data-motion",p)}}catch(e){}})();`

function systemPrefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function isMotionReduced(): boolean {
  if (typeof document === "undefined") return false
  const attr = document.documentElement.getAttribute("data-motion")
  if (attr === "reduce") return true
  if (attr === "full") return false
  return systemPrefersReduced()
}

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", cb)
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] })
  return () => {
    mq.removeEventListener("change", cb)
    mo.disconnect()
  }
}

/** `true` when animation should be minimised. SSR snapshot is `false` (full markup, CSS handles the rest). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, isMotionReduced, () => false)
}

export function setMotionReduced(reduce: boolean) {
  const next = reduce ? "reduce" : systemPrefersReduced() ? "full" : null
  const el = document.documentElement
  if (next) el.setAttribute("data-motion", next)
  else el.removeAttribute("data-motion")
  try {
    if (next) localStorage.setItem(MOTION_STORAGE_KEY, next)
    else localStorage.removeItem(MOTION_STORAGE_KEY)
  } catch {
    /* storage unavailable (private mode) — preference lasts for this page view */
  }
}

/** Fine pointer + hover = mouse/trackpad. Used to gate cursor, tilt and magnetic effects. */
export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
}
