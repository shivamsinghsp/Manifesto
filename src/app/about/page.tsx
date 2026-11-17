import { experiences } from "@/content/experience"
import { site } from "@/content/site"
import { ProfilePhoto } from "@/components/ui/ProfilePhoto"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Manifesto",
  description: "Shivam Singh's background, engineering philosophy and education — systems over symptoms.",
  path: "/about",
})

const principles = [
  { title: "Robust systems", body: "I prefer fixing root causes over patching symptoms. A well-designed system architecture prevents entire classes of bugs from ever existing." },
  { title: "Performance is accessibility", body: "A fast website isn't a luxury; it's a requirement for global accessibility. I optimize for Core Web Vitals because speed directly impacts the user experience." },
  { title: "Content is the interface", body: "Design should support the content, not overshadow it. I build interfaces that get out of the way and let the core information shine." },
]

export default function AboutPage() {
  const education = experiences.filter((e) => e.type === "Education")
  return (
    <>
      <section className="relative border-b border-border bg-atmosphere py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" />
        <div className="container-x relative">
          <p className="mb-8 text-mono-label text-text-tertiary animate-reveal-fade">{"// 03. MANIFESTO"}</p>
          <h1 className="mb-10 font-display text-[clamp(3rem,1.5rem+7vw,7.5rem)] leading-[1.02] tracking-tight">
            <span className="line-mask"><span style={{ ["--i" as string]: 0 }}>Systems </span></span>
            <span className="line-mask"><span style={{ ["--i" as string]: 1 }} className="italic text-text-secondary">over </span></span>
            <span className="line-mask"><span style={{ ["--i" as string]: 2 }}>Symptoms.</span></span>
          </h1>
          <p className="max-w-3xl text-[clamp(1.15rem,1rem+0.8vw,1.5rem)] leading-relaxed text-text-secondary">
            I am a Full-Stack Engineer who believes that the best software is invisible — it simply works, getting out of the way so users can accomplish their goals.
          </p>
        </div>
      </section>

      <section aria-labelledby="journey-h" className="section-y border-b border-border">
        <div className="grid-container gap-y-12">
          <div className="col-span-full mx-auto w-full max-w-[360px] md:col-span-3 md:max-w-none lg:col-span-4" data-reveal>
            <ProfilePhoto />
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6" data-reveal>
            <p className="mb-3 text-mono-label text-text-tertiary">{"// 01. THE JOURNEY"}</p>
            <h2 id="journey-h" className="mb-8 text-display-secondary italic">The journey</h2>
            <p className="mb-6 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.8] text-text-secondary">
              I&apos;m interested in the engineering behind products that need to work reliably at scale. I enjoy turning complex requirements into clear systems, building practical interfaces, and improving the way people interact with technology. My work spans full-stack development, enterprise platforms, product engineering, and interactive web applications.
            </p>
            <p className="mb-10 text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.8] text-text-secondary">
              I approach engineering with a systems mindset: understand the problem first, simplify where possible, and build solutions that are maintainable rather than merely functional. I&apos;m particularly interested in backend architecture, APIs, developer tooling, and products that solve real operational problems.
            </p>
            <a href={site.resumePath} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 font-mono text-xs uppercase tracking-wider text-text transition-colors hover:border-accent/50 hover:text-accent-hover">
              Resume (PDF) <span aria-hidden="true" className="text-accent-hover">↗</span>
            </a>
          </div>
        </div>
      </section>

      {education.length > 0 && (
        <section aria-labelledby="edu-h" className="section-y border-b border-border bg-surface/60">
          <div className="container-x">
            <p className="mb-3 text-mono-label text-text-tertiary">{"// 02. EDUCATION"}</p>
            <h2 id="edu-h" className="mb-10 text-display-secondary">Education</h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {education.map((e) => (
                <li key={e.id} className="rounded-2xl border border-border bg-surface p-6 md:p-8" data-reveal>
                  {e.dateRange && <p className="text-mono-label text-text-secondary">{e.dateRange}</p>}
                  <h3 className="mt-3 text-subheading text-text">{e.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent-hover">{e.organization}</p>
                  <p className="mt-4 text-body-small text-text-secondary">{e.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="philosophy-h" className="section-y border-b border-border">
        <div className="grid-container gap-y-12">
          <div className="col-span-full md:col-span-3">
            <div className="md:sticky md:top-28">
              <p className="mb-3 text-mono-label text-text-tertiary">{"// 03. PHILOSOPHY"}</p>
              <h2 id="philosophy-h" className="text-display-secondary italic">Philosophy</h2>
            </div>
          </div>
          <ol className="col-span-full flex flex-col gap-20 md:col-span-5 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <li key={p.title} className="group relative border-l border-border pl-8" data-reveal>
                <span aria-hidden="true" className="absolute left-[-4px] top-3 h-[7px] w-[7px] bg-text transition-all duration-500 group-hover:scale-150 group-hover:bg-accent-hover" />
                <p className="mb-2 font-mono text-xs text-text-tertiary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-5 text-display-secondary text-[clamp(1.8rem,1.4rem+1.6vw,2.5rem)] text-text">{p.title}</h3>
                <p className="max-w-2xl text-[clamp(1.05rem,1rem+0.3vw,1.25rem)] leading-[1.8] text-text-secondary">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
