"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"
import { OPEN_PALETTE_EVENT } from "./events"

// cmdk + search data load only the first time the palette is opened.
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false })

/** Listens for Ctrl/Cmd+K (or the trigger button) and mounts the palette on first use. */
export function LazyCommandPalette() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (loaded) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setLoaded(true)
      }
    }
    const onOpen = () => setLoaded(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [loaded])
  return loaded ? <CommandPalette defaultOpen /> : null
}

/** Button that opens the palette (shows the right shortcut for the platform). */
export function CommandTrigger({ className }: { className?: string }) {
  const [mac, setMac] = useState(false)
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), [])
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      aria-label="Open command palette"
      aria-keyshortcuts="Control+K Meta+K"
      className={className}
    >
      <Terminal className="h-4 w-4" aria-hidden="true" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden rounded border border-border px-1.5 font-mono text-[10px] text-text-tertiary sm:inline">
        {mac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  )
}
