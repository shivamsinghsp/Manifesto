"use client"

import { setMotionReduced, useReducedMotion } from "@/lib/motion-preference"
import { cn } from "@/lib/utils"

export function MotionToggle({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={() => setMotionReduced(!reduced)}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 font-mono text-xs text-text-secondary transition-colors hover:text-text",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-block h-4 w-7 rounded-full border transition-colors",
          reduced ? "bg-accent/30 border-accent" : "border-border bg-white/5"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all",
            reduced ? "left-[14px] bg-accent-hover" : "left-[2px] bg-text-tertiary"
          )}
        />
      </span>
      <span>Reduce motion</span>
    </button>
  )
}
