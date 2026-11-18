/** Infinite ticker. CSS only; pauses on hover/focus and stops under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-row flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((t) => (
        <li
          key={t}
          className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-text-secondary"
        >
          {t}
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee group relative flex overflow-hidden border-y border-border py-4">
      {row(false)}
      {row(true)}
    </div>
  )
}
