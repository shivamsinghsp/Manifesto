import type { ReactNode } from "react"

/** Shared frame for playground models: title bar, body and an honesty note. */
export function LabFrame({
  file,
  note,
  children,
}: {
  file: string
  note: string
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-md">
      <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
        </span>
        <span className="font-mono text-xs text-text-secondary">{file}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      <p className="border-t border-border bg-chip px-4 py-2.5 font-mono text-[11px] leading-relaxed text-text-tertiary sm:px-6">
        {note}
      </p>
    </div>
  )
}

export const chipBtn =
  "inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-border bg-chip px-3 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-50 aria-pressed:border-accent aria-pressed:bg-accent/10 aria-pressed:text-accent-text aria-checked:border-accent aria-checked:bg-accent/10 aria-checked:text-accent-text"
