import { availability, education, periodLabel, work } from "@/content/career"
import { site } from "@/content/site"
import { skillGroups } from "@/content/skills"

/** A "profile.json" card. Every value is read from career.ts / site.ts / skills.ts. */
export function ProfileCard() {
  const edu = education[0]
  const data: [string, string | string[]][] = [
    ["name", site.name],
    ["role", site.jobTitle + " / Full-Stack Developer"],
    ["location", site.location],
    ["status", availability.label],
    [
      "experience",
      work.map(
        (w) =>
          `${w.title} @ ${w.organization.name.replace(" Private Limited", "")} (${periodLabel(w.period)})`
      ),
    ],
    ["education", `${edu.title}, ${edu.organization.name.split(",")[0]} (${edu.status})`],
    ["stack", skillGroups.flatMap((g) => g.items).slice(0, 8)],
  ]
  const str = (s: string) => <span className="text-accent-text">&quot;{s}&quot;</span>
  return (
    <figure className="overflow-hidden rounded-card border border-border bg-surface shadow-lg">
      <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-text-tertiary/40" />
        </span>
        <figcaption className="font-mono text-xs text-text-secondary">profile.json</figcaption>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-text sm:p-5">
        <code>
          {"{\n"}
          {data.map(([k, val], i) => (
            <span key={k}>
              {"  "}
              <span className="text-text-secondary">&quot;{k}&quot;</span>
              {": "}
              {Array.isArray(val) ? (
                <>
                  {"[\n"}
                  {val.map((x, j) => (
                    <span key={x}>
                      {"    "}
                      {str(x)}
                      {j < val.length - 1 ? ",\n" : "\n"}
                    </span>
                  ))}
                  {"  ]"}
                </>
              ) : (
                str(val)
              )}
              {i < data.length - 1 ? ",\n" : "\n"}
            </span>
          ))}
          {"}"}
        </code>
      </pre>
    </figure>
  )
}
