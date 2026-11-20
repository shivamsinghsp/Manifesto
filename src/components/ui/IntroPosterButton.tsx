"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// The poster is ~1k lines of animation code — only download it when asked for.
const WavingLandingModal = dynamic(() => import("./WavingLandingModal"), { ssr: false })

export function IntroPosterButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  // Also opened from the command palette and the hero "say hi" chip.
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener("open-intro-poster", onOpen)
    return () => window.removeEventListener("open-intro-poster", onOpen)
  }, [])
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Say hi — open the intro poster
      </button>
      {open && <WavingLandingModal defaultTheme="terracotta" onClosed={() => setOpen(false)} />}
    </>
  )
}
