"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/lib/motion-preference"

gsap.registerPlugin(ScrollTrigger)

/**
 * Declarative scroll effects:
 *  - [data-reveal]          fade/slide in when entering the viewport (below-the-fold only, so no flash)
 *  - [data-reveal-stagger]  reveals direct children in sequence
 *  - [data-parallax="0.2"]  vertical parallax, speed relative to scroll
 * Content is fully visible without JS; effects are progressive enhancement.
 */
export function ScrollEffects() {
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const vh = window.innerHeight
      const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!below(el)) return
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true, fastScrollEnd: true },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        if (!below(group)) return
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15")
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        )
      })
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => {
      window.removeEventListener("load", refresh)
      ctx.revert()
    }
  }, [reduced, pathname])

  return null
}
