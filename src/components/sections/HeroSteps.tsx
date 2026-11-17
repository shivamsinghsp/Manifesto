"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { heroSteps } from "@/content/hero"
import { setHeroProgress, setHeroStep, useHeroStep } from "@/lib/hero-store"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

/**
 * Accessible step rail for the hero sequence. Scroll progress through the hero
 * advances the active step; each step is also a button (touch/keyboard friendly).
 */
export function HeroSteps() {
  const active = useHeroStep()

  useEffect(() => {
    const track = document.getElementById("hero")
    if (!track) return
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setHeroProgress(self.progress),
    })
    // When the hero isn't pinned (mobile / reduced motion) map progress across its own height.
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => {
      st.vars.end = mq.matches ? "bottom bottom" : "bottom top"
      st.refresh()
    }
    sync()
    mq.addEventListener("change", sync)
    return () => {
      mq.removeEventListener("change", sync)
      st.kill()
    }
  }, [])

  const step = heroSteps[active]

  return (
    <div className="w-full">
      <ol className="grid grid-cols-5 gap-1.5" aria-label="Engineering sequence">
        {heroSteps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setHeroStep(i)}
              aria-current={i === active ? "step" : undefined}
              className={cn(
                "group flex min-h-[44px] w-full flex-col items-start justify-center gap-1.5 rounded-md px-1 text-left transition-colors",
                i === active ? "text-accent-hover" : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-[2px] w-full origin-left rounded-full transition-all duration-500 ease-out-expo",
                  i <= active ? "bg-accent-hover" : "bg-white/10",
                  i === active && "shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                )}
              />
              <span className="font-mono text-[11px] leading-tight tracking-wide">
                <span className="block">0{i + 1}</span>
                <span className="sr-only sm:not-sr-only sm:block sm:truncate"> {s.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p
        className="mt-3 min-h-[3rem] font-mono text-xs leading-relaxed text-text-secondary"
        aria-live="polite"
      >
        <span className="text-accent-hover">{`0${active + 1} / ${step.label}`}</span> —{" "}
        {step.annotation}
      </p>
    </div>
  )
}
