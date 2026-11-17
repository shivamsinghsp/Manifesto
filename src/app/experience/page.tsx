import { Award } from "lucide-react"
import { experiences } from "@/content/experience"
import { site } from "@/content/site"
import { Timeline } from "@/components/ui/Timeline"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Internships at Rapsora Technologies and Androcoders, B.Tech in Information Technology, and recognition — Shivam Singh's engineering timeline.",
  path: "/experience",
})

function Category({
  id,
  title,
  children,
  icon,
}: {
  id: string
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="section-y border-b border-border">
      <div className="grid-container gap-y-10">
        <div className="col-span-full md:col-span-3">
          <div className="flex items-center justify-between border-b border-border pb-4 md:sticky md:top-28 md:block md:border-b-0 md:border-t md:pt-4">
            <div>
              <p className="text-mono-label mb-2 text-text-tertiary">{"// CATEGORY"}</p>
              <h2 id={id} className="text-display-secondary text-[2rem]">
                {title}
              </h2>
            </div>
            {icon}
          </div>
        </div>
        <div className="col-span-full md:col-span-5 lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </section>
  )
}

export default function ExperiencePage() {
  const work = experiences
    .filter((e) => e.type === "Work")
    .map((e) => ({
      date: e.dateRange,
      title: e.title,
      subtitle: e.organization,
      description: e.description,
      projects: e.projects,
    }))
  const edu = experiences
    .filter((e) => e.type === "Education")
    .map((e) => ({
      date: e.dateRange,
      title: e.title,
      subtitle: e.organization,
      description: e.description,
    }))
  const rec = experiences
    .filter((e) => e.type === "Recognition")
    .map((e) => ({
      title: e.title,
      subtitle: e.organization,
      description: e.description,
    }))

  return (
    <>
      <section className="bg-blueprint border-b border-border py-16 md:py-24">
        <div className="container-x">
          <p className="text-mono-label animate-reveal-fade mb-6 text-text-tertiary">
            {"// 02. TIMELINE"}
          </p>
          <h1 className="text-display mb-8">Experience</h1>
          <p className="text-body-large mb-8 max-w-2xl text-text-secondary">
            A chronological ledger of my professional journey — the teams I&apos;ve worked with and
            the systems we built.
          </p>
          <a
            href={site.resumePath}
            className="hover:border-accent/50 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:text-accent-hover"
          >
            Resume (PDF){" "}
            <span aria-hidden="true" className="text-accent-hover">
              ↗
            </span>
          </a>
        </div>
      </section>
      <Category id="work-h" title="Professional">
        <Timeline items={work} />
      </Category>
      <Category id="edu-h" title="Education">
        <Timeline items={edu} />
      </Category>
      <Category
        id="rec-h"
        title="Recognition"
        icon={<Award className="h-5 w-5 text-text-tertiary md:mt-6" aria-hidden="true" />}
      >
        <Timeline items={rec} />
      </Category>
    </>
  )
}
