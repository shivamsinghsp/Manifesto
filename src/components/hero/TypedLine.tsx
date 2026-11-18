"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/lib/motion-preference"

/**
 * Decorative terminal line that types itself out. aria-hidden: the real content
 * (h1 + paragraph) is plain HTML. Shows the full text instantly under reduced motion.
 */
export function TypedLine({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (reduced) return
    const line = lines[idx]
    if (chars < line.length) {
      const id = setTimeout(() => setChars((c) => c + 1), 38 + Math.random() * 40)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setIdx((i) => (i + 1) % lines.length)
      setChars(0)
    }, 2400)
    return () => clearTimeout(id)
  }, [chars, idx, lines, reduced])

  const text = reduced ? lines[0] : lines[idx].slice(0, chars)
  return (
    <p
      aria-hidden="true"
      className="h-5 overflow-hidden whitespace-nowrap font-mono text-[12px] leading-5 text-text-secondary sm:text-[13px]"
    >
      <span className="text-accent-text">shivam@portfolio</span>
      <span className="text-text-tertiary">:~$ </span>
      <span>{text}</span>
      <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-accent motion-safe:animate-pulse" />
    </p>
  )
}
