"use client"

import React from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function Reveal({ 
  children, 
  className, 
  delay = 0,
  direction = "up"
}: RevealProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [hasRevealed, setHasRevealed] = React.useState(false)

  React.useEffect(() => {
    if (isIntersecting && !hasRevealed) {
      setHasRevealed(true)
    }
  }, [isIntersecting, hasRevealed])

  // Subtle translations (12px = 3)
  const directionClasses = {
    up: "translate-y-3",
    down: "-translate-y-3",
    left: "translate-x-3",
    right: "-translate-x-3",
    none: "translate-y-0 translate-x-0"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all opacity-0",
        directionClasses[direction],
        hasRevealed && "opacity-100 translate-y-0 translate-x-0",
        className
      )}
      style={{ 
        transitionDuration: "var(--duration-slow)",
        transitionTimingFunction: "var(--ease-out-expo)",
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  )
}
