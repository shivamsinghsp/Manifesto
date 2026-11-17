import { cn } from "@/lib/utils"

export interface TimelineItem {
  date?: string
  title: string
  subtitle?: string
  description: string
  projects?: { title: string; description: string }[]
}

/** Vertical ledger. `headingLevel` keeps the document outline valid wherever it is used. */
export function Timeline({ items, className, headingLevel = 3 }: { items: TimelineItem[]; className?: string; headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as "h3" | "h4"
  const SubH = `h${headingLevel + 1}` as "h4" | "h5"
  return (
    <ol className={cn("relative border-l border-border pl-0", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative py-7 pl-8 first:pt-0" data-reveal>
          <span aria-hidden="true" className="absolute left-[-4px] top-9 h-[7px] w-[7px] bg-accent shadow-[0_0_10px_rgba(0,184,212,0.5)] [li:first-child>&]:top-2" />
          {item.date && <p className="text-mono-label text-text-secondary">{item.date}</p>}
          <H className="mt-2 text-subheading text-text">{item.title}</H>
          {item.subtitle && <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent-hover">{item.subtitle}</p>}
          <p className="mt-3 max-w-2xl text-body-large text-text-secondary">{item.description}</p>
          {item.projects && item.projects.length > 0 && (
            <ul className="mt-6 flex flex-col gap-4">
              {item.projects.map((p) => (
                <li key={p.title} className="border-l border-border-muted py-2 pl-6">
                  <SubH className="mb-2 text-mono-label text-accent-hover">{p.title}</SubH>
                  <p className="text-body-small text-text-secondary">{p.description}</p>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
