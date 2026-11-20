"use client"

import { ThemeProvider as NextThemes, useTheme } from "next-themes"
import { useEffect, type ReactNode } from "react"

export const THEME_STORAGE_KEY = "theme"
const META_COLORS = { light: "#F3F1EC", dark: "#0E0E0D" } as const

/** Keeps <meta name="theme-color"> in step with the chosen theme (not just the OS). */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
      m.setAttribute("content", META_COLORS[resolvedTheme])
    })
  }, [resolvedTheme])
  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes
      attribute="data-theme"
      storageKey={THEME_STORAGE_KEY}
      defaultTheme="system"
      enableSystem
      themes={["light", "dark"]}
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemes>
  )
}
