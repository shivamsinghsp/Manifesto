/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from "react"

interface ArchitectureDiagramProps {
  src: string
  alt: string
}

export function ArchitectureDiagram({ src, alt }: ArchitectureDiagramProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-6 border border-dashed border-border-muted bg-surface/50 w-full">
        <span className="text-mono-label text-text-tertiary uppercase text-center mb-2">
          [ DIAGRAM UNAVAILABLE ]
        </span>
        <span className="text-body-small text-text-secondary text-center">
          Diagram failed to load. Technical explanation continues below.
        </span>
      </div>
    )
  }

  return (
    <div className="w-full bg-surface-alt border border-border p-4 md:p-8 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain filter grayscale transition-all duration-700 hover:grayscale-0 relative z-10"
        onError={() => setError(true)}
      />
    </div>
  )
}
