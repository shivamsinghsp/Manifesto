import { Download, FileText } from "lucide-react"
import { site } from "@/content/site"
import { periodLabel } from "@/content/career"
import { resume, resumeMarkdown, RESUME_SECTIONS, type ResumeItem } from "@/content/resume"
import { CopyMarkdown } from "@/components/resume/CopyMarkdown"
import { buttonClass } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Resume",
  description: `${resume.name}: ${resume.headline}. Experience, projects, skills and education — the same content as the downloadable PDF.`,
  path: "/resume",
})

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="resume-section scroll-mt-28">
      <h2
        id={`${id}-h`}
        className="mb-3 border-b border-border pb-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent-text"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Item({ item }: { item: ResumeItem }) {
  return (
    <div className="resume-item">
      {item.heading && (
        <h4 className="text-[0.95rem] font-medium text-text">
          {item.heading}
          {item.meta && <span className="font-normal text-text-secondary"> · {item.meta}</span>}
        </h4>
      )}
      <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-text-tertiary">
        {item.bullets.map((b) => (
          <li key={b} className="text-[0.92rem] leading-relaxed text-text-secondary">
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ResumePage() {
  const r = resume
  const markdown = resumeMarkdown()
  return (
    <div className="resume-page container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[14rem_1fr]">
      {/* Sidebar: actions + "On this page" */}
      <aside className="resume-aside lg:sticky lg:top-28 lg:self-start" aria-label="Resume tools">
        <p className="text-mono-label mb-4 text-text-tertiary">{"// RESUME.md"}</p>
        <div className="flex flex-wrap gap-2 lg:flex-col">
          <a
            href={site.resumePath}
            download="Shivam-Singh-Resume.pdf"
            className={buttonClass("primary")}
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
          </a>
          <CopyMarkdown markdown={markdown} className={buttonClass("secondary")} />
        </div>
        <nav aria-label="On this page" className="mt-8 hidden lg:block">
          <p className="text-mono-label mb-3 text-text-tertiary">On this page</p>
          <ol className="space-y-1 border-l border-border">
            {RESUME_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="-ml-px block border-l border-transparent py-1 pl-3 text-sm text-text-secondary transition-colors hover:border-accent hover:text-text"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <article className="resume-doc rounded-card border border-border bg-surface p-6 shadow-md sm:p-10">
        <header className="mb-6 border-b border-border pb-5">
          <h1 className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight text-text">
            {r.name}
          </h1>
          <p className="mt-1 text-text-secondary">{r.headline}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-secondary">
            <span>{r.contact.location}</span>
            <a href={`mailto:${r.contact.email}`} className="hover:text-accent-text">
              {r.contact.email}
            </a>
            <span className="hidden print:inline">{r.contact.phone}</span>
            <a href={`https://${r.contact.website}`} className="hover:text-accent-text">
              {r.contact.website}
            </a>
            <a href={`https://${r.contact.github}`} className="hover:text-accent-text">
              {r.contact.github}
            </a>
            <a href={`https://${r.contact.linkedin}`} className="hover:text-accent-text">
              {r.contact.linkedin}
            </a>
          </p>
        </header>

        <div className="space-y-6">
          <Section id="summary" title="Summary">
            <p className="text-[0.95rem] leading-relaxed text-text-secondary">{r.summary}</p>
          </Section>

          <Section id="experience" title="Experience">
            <div className="space-y-5">
              {r.roles.map((role) => (
                <div key={role.engagement.id} className="resume-role">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-medium text-text">
                      {role.engagement.title}
                      <span className="font-normal text-text-secondary">
                        {" "}
                        · {role.engagement.organization.name}
                      </span>
                    </h3>
                    <p className="font-mono text-xs text-text-secondary">
                      {periodLabel(role.engagement.period)}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] text-text-tertiary">
                    {[role.subtitle, role.location].filter(Boolean).join(" · ")}
                  </p>
                  <div className="mt-2 space-y-2.5">
                    {role.items.map((it) => (
                      <Item key={it.heading || it.bullets[0]} item={it} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects">
            {r.projects.map((p) => (
              <Item key={p.heading} item={p} />
            ))}
          </Section>

          <Section id="skills" title="Skills">
            <dl className="grid gap-1 text-[0.92rem]">
              {r.skills.map((s) => (
                <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-2">
                  <dt className="font-medium text-text">{s.label}</dt>
                  <dd className="text-text-secondary">{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="education" title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium text-text">
                {r.education.engagement.organization.name}
                <span className="font-normal text-text-secondary">
                  , {r.education.engagement.organization.location}
                </span>
              </h3>
              <p className="font-mono text-xs text-text-secondary">
                {periodLabel(r.education.engagement.period)}
              </p>
            </div>
            <p className="text-[0.92rem] text-text-secondary">{r.education.line}</p>
          </Section>

          <Section id="achievements" title="Achievements">
            <ul className="list-disc space-y-1 pl-5 text-[0.92rem] text-text-secondary marker:text-text-tertiary">
              {r.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Section>
        </div>

        <p className="resume-note mt-8 flex items-center gap-2 font-mono text-[11px] text-text-tertiary">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          The PDF is generated from this page, so both always match.
        </p>
      </article>
    </div>
  )
}
