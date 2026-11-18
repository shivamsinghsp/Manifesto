"use client"

import { useTheme } from "next-themes"
import { useCallback } from "react"
import { isMotionReduced } from "@/lib/motion-preference"

export type ThemeChoice = "light" | "dark" | "system"

const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

/**
 * Switches theme with a circular View Transitions reveal from `origin`
 * (instant when reduced motion is on or the API is missing).
 */
export function useThemeSwitch() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const switchTo = useCallback(
    (next: ThemeChoice, origin?: { x: number; y: number }) => {
      const resolved = next === "system" ? systemTheme() : next
      const apply = () => {
        // Apply synchronously so the transition snapshots the new theme.
        const root = document.documentElement
        root.setAttribute("data-theme", resolved)
        root.style.colorScheme = resolved
        setTheme(next)
      }
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> }
      }
      if (!doc.startViewTransition || isMotionReduced() || resolved === resolvedTheme) {
        apply()
        return
      }
      const x = origin?.x ?? window.innerWidth - 40
      const y = origin?.y ?? 36
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const root = document.documentElement
      root.classList.add("theme-vt")
      const vt = doc.startViewTransition(apply)
      vt.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
            {
              duration: 560,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })
        .catch(() => {})
      vt.finished.finally(() => root.classList.remove("theme-vt"))
    },
    [resolvedTheme, setTheme]
  )

  return { theme: (theme ?? "system") as ThemeChoice, resolvedTheme, switchTo }
}
