"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export function CopyMarkdown({ markdown, className }: { markdown: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle")
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(markdown)
          setState("copied")
        } catch {
          setState("error")
        }
        setTimeout(() => setState("idle"), 2000)
      }}
    >
      {state === "copied" ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy Markdown"}
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Resume copied as Markdown" : ""}
      </span>
    </button>
  )
}
