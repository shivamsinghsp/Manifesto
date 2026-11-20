import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props {
  /** e.g. "01. FEATURED" — the number is set in the accent colour, the rest as a mono label */
  label: string
  title: ReactNode
  as?: "h1" | "h2"
  action?: ReactNode
  className?: string
  id?: string
}

/**
 * Opens every section like a chapter: a rule, the index and label in a narrow left column,
 * and the display heading offset to the right (stacks on small screens).
 */
export function SectionHeading({ label, title, as: Tag = "h2", action, className, id }: Props) {
  const m = /^(\d+)\.\s*(.*)$/.exec(label)
  return (
    <div
      className={cn(
        "mb-12 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-border pt-5 md:mb-16 lg:grid-cols-12",
        className
      )}
    >
      <p className="text-mono-label flex items-baseline gap-3 text-text-tertiary lg:col-span-3">
        {m ? (
          <>
            <span className="text-accent-text">{m[1]}</span>
            <span>{m[2]}</span>
          </>
        ) : (
          label
        )}
      </p>
      <div
        className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 lg:col-span-9"
        data-reveal
      >
        <Tag id={id} className="text-display-secondary max-w-[18ch] text-balance">
          {title}
        </Tag>
        {action}
      </div>
    </div>
  )
}
