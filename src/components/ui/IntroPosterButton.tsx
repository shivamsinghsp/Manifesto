"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { useTheme } from "next-themes"

// The poster is ~1k lines of animation code — only download it when asked for.
const WavingLandingModal = dynamic(() => import("./WavingLandingModal"), { ssr: false })

export function IntroPosterButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const { resolvedTheme } = useTheme()
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
      {open && (
        <WavingLandingModal
          defaultTheme={resolvedTheme === "light" ? "terracotta" : "cyan"}
          onClosed={() => setOpen(false)}
        />
      )}
    </>
  )
}
