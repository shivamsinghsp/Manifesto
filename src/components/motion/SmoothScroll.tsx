"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/lib/motion-preference"

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled when motion is reduced and on touch-first devices (native scrolling is better there).
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    // Touch devices keep native momentum scrolling; Lenis would only add a per-frame loop there.
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return
    // No `anchors`: Lenis would swallow in-page links (incl. the skip link) without moving focus.
    const lenis = new Lenis({ duration: 1.1, autoRaf: false })
    lenisInstance = lenis
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [reduced])

  // New route → start at the top and re-measure triggers.
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true, force: true })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
