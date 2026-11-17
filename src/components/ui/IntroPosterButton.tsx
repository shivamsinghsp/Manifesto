"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

// The poster is ~1k lines of animation code — only download it when asked for.
const WavingLandingModal = dynamic(() => import("./WavingLandingModal"), { ssr: false })

export function IntroPosterButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        Say hi — open the intro poster
      </button>
      {open && <WavingLandingModal onClosed={() => setOpen(false)} />}
    </>
  )
}
