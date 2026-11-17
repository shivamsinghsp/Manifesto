/**
 * Renders the "01\nProblem\n→ Solution" blocks stored in projects.ts as structured cards.
 */
export function Challenges({ content }: { content: string }) {
  const blocks = content
    .split(/\n\s*\n/)
    .map((b) => b.split("\n").map((l) => l.trim()).filter(Boolean))
    .filter((b) => b.length)

  return (
    <ol className="flex flex-col gap-4" data-reveal-stagger>
      {blocks.map((lines, i) => {
        const numbered = /^\d{2}$/.test(lines[0])
        const index = numbered ? lines[0] : String(i + 1).padStart(2, "0")
        const rest = numbered ? lines.slice(1) : lines
        const [title, ...body] = rest
        const problem = body.filter((l) => !l.startsWith("→"))
        const solutions = body.filter((l) => l.startsWith("→")).map((l) => l.replace(/^→\s*/, ""))
        return (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5 rounded-xl border border-border bg-surface/60 p-5 md:p-7">
            <span className="font-mono text-sm text-accent-hover">{index}</span>
            <div>
              <h3 className="text-subheading text-text">{title}</h3>
              {problem.map((p, k) => (
                <p key={k} className="mt-3 text-body-large text-text-secondary">{p}</p>
              ))}
              {solutions.map((s, k) => (
                <p key={k} className="mt-4 flex gap-3 border-t border-border pt-4 text-body-large text-text">
                  <span aria-hidden="true" className="font-mono text-accent-hover">→</span>
                  <span><span className="sr-only">Solution: </span>{s}</span>
                </p>
              ))}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
