import NextLink from "next/link"
import { ArrowUpRight } from "lucide-react"
import { durationLabel, isCurrent, periodLabel, type Engagement } from "@/content/career"
import { projects } from "@/content/projects"
import { cn } from "@/lib/utils"

/**
 * "career.log" timeline. Every date, duration and role is read from src/content/career.ts.
 * `compact` hides nested projects and highlights (used on the homepage).
 */
export function CareerLog({
  items,
  compact = false,
  headingLevel = 3,
  className,
}: {
  items: Engagement[]
  compact?: boolean
  headingLevel?: 3 | 4
  className?: string
}) {
  const H = `h${headingLevel}` as "h3" | "h4"
  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-surface", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="bg-text-tertiary/40 h-2.5 w-2.5 rounded-full" />
          <span className="bg-text-tertiary/40 h-2.5 w-2.5 rounded-full" />
          <span className="bg-text-tertiary/40 h-2.5 w-2.5 rounded-full" />
        </span>
        <span className="font-mono text-xs text-text-secondary">~/shivam/career.log</span>
      </div>
      <ol className="relative divide-y divide-border">
        {items.map((e) => {
          const duration = durationLabel(e.period)
          const current = isCurrent(e)
          return (
            <li key={e.id} className="relative p-5 sm:p-6" data-reveal>
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-subtle border border-border bg-surface-alt font-mono text-[10px] font-medium tracking-wider text-text"
                >
                  {e.organization.monogram}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <H className="text-subheading text-text">{e.title}</H>
                    <p className="font-mono text-xs text-text-secondary">
                      <time dateTime={e.period.start ?? undefined}>{periodLabel(e.period)}</time>
                      {duration && (
                        <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-text-tertiary">
                          {duration}
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent-text">
                    {e.organization.name}
                    {e.client && <span className="text-text-tertiary"> · client: {e.client}</span>}
                    {e.kind === "work" && !current && <span className="sr-only"> (ended)</span>}
                  </p>
                  <p className="text-body-small mt-3 max-w-2xl text-text-secondary">{e.summary}</p>

                  {!compact && e.projects && e.projects.length > 0 && (
                    <ul className="mt-5 grid gap-2">
                      {e.projects.map((pr) => {
                        const project = projects.find((p) => p.slug === pr.slug)
                        return (
                          <li key={pr.slug}>
                            <NextLink
                              href={`/work/${pr.slug}`}
                              className="bg-surface-alt/60 group flex flex-col gap-1 rounded-subtle border border-border px-4 py-3 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                            >
                              <span>
                                <span className="text-body-small font-medium text-text group-hover:text-accent-text">
                                  {project?.title ?? pr.slug}
                                </span>
                                <span className="block font-mono text-[11px] text-text-tertiary">
                                  {pr.role}
                                </span>
                              </span>
                              <span className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
                                {periodLabel(pr.period)}
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </span>
                            </NextLink>
                          </li>
                        )
                      })}
                    </ul>
                  )}

                  {e.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                      {e.tags.slice(0, compact ? 5 : undefined).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-chip px-2.5 py-0.5 font-mono text-[11px] text-chip-text"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
