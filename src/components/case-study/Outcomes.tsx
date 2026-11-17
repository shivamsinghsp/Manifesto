import type { ProjectOutcome } from "@/content/projects"

/** Outcomes / impact grid. Values come verbatim from the project record. */
export function Outcomes({ items }: { items: ProjectOutcome[] }) {
  return (
    <ul className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
      {items.map((o, i) => (
        <li key={o.label} className="relative border-b border-r border-border p-6 md:p-8">
          <span className="absolute left-4 top-4 text-mono-label text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-5 font-display text-[clamp(2rem,1.6rem+1.6vw,3rem)] leading-none text-text">{o.value}</p>
          <p className="mt-3 text-body-small text-text-secondary">{o.label}</p>
        </li>
      ))}
    </ul>
  )
}
