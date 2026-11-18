"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useThemeSwitch, type ThemeChoice } from "./useThemeSwitch"

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
]

/** Theme menu: Light / Dark / System. The choice is saved; there is no flash on load. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, switchTo } = useThemeSwitch()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node))
        setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        btn.current?.focus()
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const items = [
          ...(menu.current?.querySelectorAll<HTMLElement>("[role=menuitemradio]") ?? []),
        ]
        const i = items.indexOf(document.activeElement as HTMLElement)
        const next =
          e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length
        items[next]?.focus()
      }
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    menu.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Before mount the saved theme is unknown on the server: render a neutral icon.
  const Icon = !mounted ? Sun : resolvedTheme === "dark" ? Moon : Sun

  const choose = (value: ThemeChoice) => {
    const rect = btn.current?.getBoundingClientRect()
    switchTo(
      value,
      rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
    )
    setOpen(false)
    btn.current?.focus()
  }

  return (
    <div className={cn("relative", className)}>
      <button
        ref={btn}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={
          mounted ? `Theme: ${theme}${theme === "system" ? ` (${resolvedTheme})` : ""}` : "Theme"
        }
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-chip hover:text-text"
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={menu}
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-[calc(100%+8px)] z-[1100] min-w-[9.5rem] overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg"
        >
          {OPTIONS.map(({ value, label, Icon: I }) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === value}
              onClick={() => choose(value)}
              className={cn(
                "flex min-h-[40px] w-full items-center gap-3 rounded-lg px-3 text-left font-mono text-xs uppercase tracking-wider transition-colors",
                theme === value
                  ? "bg-accent/10 text-accent-text"
                  : "text-text-secondary hover:bg-chip hover:text-text"
              )}
            >
              <I className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
