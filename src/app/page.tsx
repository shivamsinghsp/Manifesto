import NextLink from "next/link"
import { projects } from "@/data/projects"
import { experiences } from "@/data/experience"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { Timeline } from "@/components/ui/Timeline"
import { Link } from "@/components/ui/Link"
import { buttonBaseStyles, buttonVariants, buttonSizes } from "@/components/ui/button"
import { HeroSystem } from "@/components/ui/HeroSystem"
import { WorkAssistant } from "@/components/engineering/WorkAssistant"
import { WavingLandingModal } from "@/components/ui/WavingLandingModal"
import { cn } from "@/lib/utils"

export default function Home() {
  const featuredProject = projects.find(p => p.slug === "shynr")
  const otherProjects = projects.filter(p => p.slug !== "shynr").slice(0, 3)
  const recentExperience = experiences.slice(0, 2).map(exp => ({
    date: exp.dateRange,
    title: `${exp.title} — ${exp.organization}`,
    description: exp.description
  }))

  return (
    <>
      {/* Interactive Waving Landing Poster Overlay / Pop-up */}
      <WavingLandingModal />

      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24 border-b border-border bg-atmosphere relative">
        <div className="grid-container items-center gap-y-12 lg:gap-y-0">
          <div className="col-span-full lg:col-span-7 flex flex-col items-start relative z-10">
            <h1 className="text-display mb-6 leading-[1.05] tracking-tight text-text">
              <span className="block">Engineering</span>
              <span className="block italic text-text-secondary">systems that</span>
              <span className="block">ship.</span>
            </h1>
            <p className="text-body-large text-text-secondary max-w-md mb-8">
              Hi, I&apos;m Shivam. I build full-stack web applications, enterprise platforms, and interactive digital products — from architecture to deployment.
            </p>
            <div className="flex flex-wrap gap-4">
              <NextLink 
                href="/work"
                className={cn(buttonBaseStyles, buttonVariants.primary, buttonSizes.md)}
              >
                View Selected Work
              </NextLink>
              <NextLink 
                href="/about"
                className={cn(buttonBaseStyles, buttonVariants.secondary, buttonSizes.md)}
              >
                Read Manifesto
              </NextLink>
            </div>
          </div>
          <div className="col-span-full lg:col-span-5 relative h-[300px] md:h-[420px] rounded-2xl border border-white/10 bg-[#0E1322]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
             <HeroSystem />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-12 mb-16 border-b border-border pb-6 flex items-end justify-between">
            <div>
              <h2 className="text-mono-label text-text-tertiary mb-3">{`// 01. FEATURED`}</h2>
              <h3 className="text-display-secondary">Selected Case Study</h3>
            </div>
            <Link href="/work" variant="cta">View Archive</Link>
          </div>

          <div className="col-span-full">
            {featuredProject && (
              <ProjectCard
                featured
                title={featuredProject.title}
                description={featuredProject.shortDescription}
                category={featuredProject.category}
                href={`/work/${featuredProject.slug}`}
                imageSrc={featuredProject.heroImage.src}
                imageAlt={featuredProject.heroImage.alt}
              />
            )}
          </div>
        </div>
      </section>

      {/* Ask Shivam's Work */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
        <div className="grid-container relative z-10">
          <div className="col-span-full lg:col-span-12 mb-12">
            <h2 className="text-mono-label text-text-tertiary mb-3">{`// 02. EXPLORE`}</h2>
            <h3 className="text-display-secondary">Project Intelligence</h3>
          </div>
          <div className="col-span-full lg:col-span-10 lg:col-start-2">
            <WorkAssistant />
          </div>
        </div>
      </section>

      {/* Other Projects Section */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border bg-surface">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-12 mb-16 border-b border-border pb-6">
            <h2 className="text-mono-label text-text-tertiary mb-3">{`// 03. RECENT`}</h2>
            <h3 className="text-display-secondary">Other Projects</h3>
          </div>
          
          {otherProjects.map((project) => (
            <div key={project.slug} className="col-span-full md:col-span-4 lg:col-span-4 mb-8 md:mb-0">
              <ProjectCard
                title={project.title}
                description={project.shortDescription}
                category={project.category}
                href={`/work/${project.slug}`}
                imageSrc={project.heroImage.src}
                imageAlt={project.heroImage.alt}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Playground Teaser */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border bg-bg relative overflow-hidden">
        <div className="grid-container relative z-10">
          <div className="col-span-full lg:col-span-12 mb-16 border-b border-border pb-6 flex items-end justify-between">
            <div>
              <h2 className="text-mono-label text-text-tertiary mb-3">{`// 04. LABS`}</h2>
              <h3 className="text-display-secondary">Engineering Playground</h3>
            </div>
            <Link href="/playground" variant="cta">Enter Labs</Link>
          </div>
          
          <div className="col-span-full lg:col-span-12">
            <div className="rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-8 md:p-12 shadow-2xl group hover:border-cyan-500/30 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[2px] bg-cyan-400 rounded-full"></span>
                    <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-medium">INTERACTIVE MODEL</span>
                  </div>
                  <h4 className="text-3xl font-display font-medium text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">Geospatial Validation</h4>
                  <p className="text-base text-slate-300 mb-8 leading-relaxed">
                    Explore a high-precision, interactive 2D model demonstrating the Haversine distance algorithm and geofencing validation engine developed for the Shynr HRMS platform.
                  </p>
                  <NextLink 
                    href="/playground"
                    className={cn(buttonBaseStyles, buttonVariants.secondary, buttonSizes.md)}
                  >
                    Open Geofencing Lab ↗
                  </NextLink>
                </div>
                <div className="relative aspect-video rounded-xl border border-white/10 bg-[#070A12] flex items-center justify-center transition-all duration-500 overflow-hidden shadow-inner group-hover:border-cyan-500/40">
                  <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
                  {/* Radar animation representation */}
                  <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 relative z-10">
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#00B8D4" strokeWidth="0.8" strokeDasharray="3 3" className="animate-[spin_20s_linear_infinite]" opacity="0.8" />
                    <circle cx="50" cy="50" r="18" fill="rgba(0,184,212,0.08)" stroke="#00B8D4" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
                    <line x1="50" y1="50" x2="68" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
                    <circle cx="68" cy="68" r="4" fill="#070A12" stroke="#00B8D4" strokeWidth="1" />
                    <circle cx="68" cy="68" r="1.5" fill="#00B8D4" className="animate-ping" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Snapshot */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border">
        <div className="grid-container gap-y-16 lg:gap-y-0">
          <div className="col-span-full lg:col-span-4 border-t lg:border-t-0 lg:border-r border-border pt-8 lg:pt-0 lg:pr-8">
            <h2 className="text-mono-label text-text-tertiary mb-3">{`// 05. BACKGROUND`}</h2>
            <h3 className="text-display-secondary mb-8">Where I&apos;ve Been</h3>
            <p className="text-body-large text-text-secondary mb-12">
              My engineering work spans full-stack product development, enterprise platforms, and interactive web applications.
            </p>
            <Link href="/experience" variant="cta">Full Timeline</Link>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <Timeline items={recentExperience} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-bg text-center border-b border-border">
        <div className="relative z-10 grid-container">
          <div className="col-span-full flex flex-col items-center">
            <h2 className="text-display mb-8">
              Let&apos;s build <br/> <i className="text-text-secondary">something.</i>
            </h2>
            <p className="text-body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <NextLink 
              href="/contact"
              className={cn(buttonBaseStyles, buttonVariants.primary, buttonSizes.lg)}
            >
              Initiate Contact
            </NextLink>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-blueprint opacity-50 pointer-events-none" />
      </section>
    </>
  )
}
