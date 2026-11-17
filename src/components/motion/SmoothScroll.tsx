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
 * Disabled when motion is reduced. Touch devices keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -80 }, autoRaf: false })
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
