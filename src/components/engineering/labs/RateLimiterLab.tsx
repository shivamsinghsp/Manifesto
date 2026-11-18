"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { LabFrame, chipBtn } from "./LabFrame"

const LIMIT = 5
/** The real window is 10 minutes; the model compresses it to 10 seconds. */
const WINDOW_MS = 10_000

/** Fixed-window rate limiter, same algorithm as this site's contact API (src/lib/rate-limit.ts). */
export function RateLimiterLab() {
  const [count, setCount] = useState(0)
  const [resetAt, setResetAt] = useState(0)
  const [now, setNow] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timer.current = setInterval(() => setNow(Date.now()), 200)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const windowOpen = resetAt > now
  const used = windowOpen ? count : 0
  const left = windowOpen ? Math.max(0, Math.ceil((resetAt - now) / 1000)) : 0

  const send = () => {
    const t = Date.now()
    setNow(t)
    if (resetAt <= t) {
      setCount(1)
      setResetAt(t + WINDOW_MS)
      setLog((l) => [`200 OK · remaining ${LIMIT - 1}`, ...l].slice(0, 6))
      return
    }
    if (count >= LIMIT) {
      setLog((l) =>
        [`429 Too Many Requests · retry in ${Math.ceil((resetAt - t) / 1000)}s`, ...l].slice(0, 6)
      )
      return
    }
    setCount(count + 1)
    setLog((l) => [`200 OK · remaining ${LIMIT - count - 1}`, ...l].slice(0, 6))
  }

  return (
    <LabFrame
      file="rate-limit.ts"
      note="Runs the same fixed-window algorithm as this site's contact API (5 requests per window per IP). The 10-minute window is compressed to 10 seconds here."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <div
            className="mb-3 flex gap-2"
            aria-label={`${used} of ${LIMIT} requests used`}
            role="img"
          >
            {Array.from({ length: LIMIT }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-10 flex-1 rounded-md border transition-colors",
                  i < used ? "border-accent bg-accent/30" : "border-border bg-chip"
                )}
              />
            ))}
          </div>
          <p className="mb-4 font-mono text-xs text-text-secondary">
            {used}/{LIMIT} used · {windowOpen ? `window resets in ${left}s` : "window idle"}
          </p>
          <button type="button" onClick={send} className={chipBtn}>
            Send request
          </button>
        </div>
        <ul
          aria-live="polite"
          className="min-h-[150px] space-y-1.5 rounded-lg border border-border bg-surface-alt/60 p-3 font-mono text-[12px]"
        >
          {log.length === 0 && <li className="text-text-tertiary">Send a few requests quickly…</li>}
          {log.map((l, i) => (
            <li key={i} className={l.startsWith("429") ? "text-error" : "text-success"}>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </LabFrame>
  )
}
