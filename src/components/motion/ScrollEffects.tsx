"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/lib/motion-preference"

gsap.registerPlugin(ScrollTrigger)

/**
 * Declarative scroll effects:
 *  - [data-reveal]          fade/slide in when entering the viewport
 *  - [data-reveal-stagger]  reveals direct children in sequence
 *  - [data-parallax="0.2"]  vertical parallax (GSAP ScrollTrigger scrub)
 *
 * Reveals are position-based rather than event-based: on every (rAF-throttled) scroll/resize
 * we reveal anything whose top is above the fold line, including elements the user has already
 * scrolled past. A fast fling or a busy main thread can therefore never leave content hidden.
 * Only elements that start below the fold are ever hidden, so there is no flash and
 * no-JS / reduced-motion users always see everything.
 */
export function ScrollEffects() {
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return
    const vh = () => window.innerHeight
    type Item = { el: HTMLElement; targets: Element[]; stagger: number }
    let pending: Item[] = []

    const collect = (selector: string, stagger: boolean) =>
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.getBoundingClientRect().top <= vh() * 0.92) return
        const targets = stagger ? Array.from(el.children) : [el]
        gsap.set(targets, { autoAlpha: 0, y: stagger ? 24 : 28 })
        pending.push({ el, targets, stagger: stagger ? 0.08 : 0 })
      })
    collect("[data-reveal]", false)
    collect("[data-reveal-stagger]", true)

    let raf = 0
    const check = () => {
      raf = 0
      const line = vh() * 0.88
      pending = pending.filter((item) => {
        if (item.el.getBoundingClientRect().top > line) return true
        gsap.to(item.targets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
          stagger: item.stagger,
          overwrite: true,
        })
        return false
      })
      if (!pending.length) detach()
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    const detach = () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    schedule()

    const ctx = gsap.context(() => {
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

    return () => {
      cancelAnimationFrame(raf)
      detach()
      // Never leave anything hidden when the effect is torn down (route change, motion toggle).
      pending.forEach((item) =>
        gsap.set(item.targets, { clearProps: "opacity,visibility,transform" })
      )
      ctx.revert()
    }
  }, [reduced, pathname])

  return null
}
