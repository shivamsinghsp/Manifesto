import { Metadata } from "next"
import { experiences } from "@/data/experience"
import { Timeline } from "@/components/ui/Timeline"
import { ArrowDown } from "lucide-react"
import { Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, education, and recognition — a chronological ledger of my engineering journey.",
}

export default function ExperiencePage() {
  const workExperience = experiences
    .filter(exp => exp.type === "Work")
    .map(exp => ({
      date: exp.dateRange,
      title: `${exp.title} — ${exp.organization}`,
      description: exp.description,
      projects: exp.projects?.map(p => ({
        title: p.title,
        description: p.description
      }))
    }))

  const eduExperience = experiences
    .filter(exp => exp.type === "Education")
    .map(exp => ({
      date: exp.dateRange,
      title: `${exp.title} — ${exp.organization}`,
      description: exp.description
    }))

  const recognitions = experiences
    .filter(exp => exp.type === "Recognition")

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 border-b border-border bg-blueprint bg-fixed">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-8">
            <span className="text-mono-label text-text-tertiary mb-6 block">{`// 02. TIMELINE`}</span>
            <h1 className="text-display mb-8">Experience</h1>
            <p className="text-body-large text-text-secondary max-w-2xl leading-relaxed mb-8">
              A chronological ledger of my professional journey, highlighting the teams I&apos;ve worked with and the systems we&apos;ve built.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
                <span className="text-cyan-400">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 border-b border-border">
        <div className="grid-container gap-y-12 md:gap-y-0">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0 flex md:block items-center justify-between">
              <div>
                <h2 className="text-mono-label text-text-tertiary mb-2">{`// CATEGORY`}</h2>
                <h3 className="text-display-secondary text-[2rem]">Professional</h3>
              </div>
              <ArrowDown className="w-5 h-5 text-text-tertiary md:mt-8 hidden md:block" />
            </div>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-7">
            <Timeline items={workExperience} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 border-b border-border">
        <div className="grid-container gap-y-12 md:gap-y-0">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0 flex md:block items-center justify-between">
              <div>
                <h2 className="text-mono-label text-text-tertiary mb-2">{`// CATEGORY`}</h2>
                <h3 className="text-display-secondary text-[2rem]">Education</h3>
              </div>
              <ArrowDown className="w-5 h-5 text-text-tertiary md:mt-8 hidden md:block" />
            </div>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-7">
            <Timeline items={eduExperience} />
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border">
        <div className="grid-container gap-y-12 md:gap-y-0">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0 flex md:block items-center justify-between">
              <div>
                <h2 className="text-mono-label text-text-tertiary mb-2">{`// CATEGORY`}</h2>
                <h3 className="text-display-secondary text-[2rem]">Recognition</h3>
              </div>
              <Award className="w-5 h-5 text-text-tertiary md:mt-8 hidden md:block" />
            </div>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-7">
            <Timeline
              items={recognitions.map(rec => ({
                title: `${rec.title} — ${rec.organization}`,
                description: rec.description
              }))}
            />
          </div>
        </div>
      </section>
    </>
  )
}
