import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props {
  /** e.g. "01. FEATURED" — rendered as the mono "// 01. FEATURED" label */
  label: string
  title: ReactNode
  as?: "h1" | "h2"
  action?: ReactNode
  className?: string
  id?: string
}

/** Mono label + display heading pair used to open every section. */
export function SectionHeading({ label, title, as: Tag = "h2", action, className, id }: Props) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b border-border pb-6 md:mb-16",
        className
      )}
    >
      <div data-reveal>
        <p className="text-mono-label mb-3 text-text-tertiary">{`// ${label}`}</p>
        <Tag id={id} className="text-display-secondary">
          {title}
        </Tag>
      </div>
      {action}
    </div>
  )
}
