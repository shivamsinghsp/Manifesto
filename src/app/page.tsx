import type { CSSProperties } from "react"
import NextLink from "next/link"
import { ArrowDown } from "lucide-react"
import { projects } from "@/content/projects"
import { availability, education, rapsora, RAPSORA_SHORT, work } from "@/content/career"
import { site } from "@/content/site"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { CareerLog } from "@/components/ui/CareerLog"
import { CtaLink } from "@/components/ui/Link"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ProfilePhoto } from "@/components/ui/ProfilePhoto"
import { buttonClass } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/Magnetic"
import { HeroCanvas } from "@/components/sections/HeroCanvas"
import { HeroSteps } from "@/components/sections/HeroSteps"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { WorkAssistant } from "@/components/engineering/WorkAssistant"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({ path: "/" })

const line = (i: number) => ({ "--i": i }) as CSSProperties

export default function Home() {
  const featured = projects.find((p) => p.slug === "shynr") ?? projects[0]
  const others = projects.filter((p) => p.slug !== featured.slug)

  return (
    <>
      {/* ── Hero: pinned on desktop; scroll drives the 5-step sequence ── */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="hero-track bg-atmosphere relative border-b border-border"
      >
        <div className="lg:sticky lg:top-[var(--header-h)] lg:h-[calc(100svh-var(--header-h))] lg:min-h-[560px]">
          <div className="grid-container h-full items-center gap-y-10 py-12 md:py-16 lg:py-0">
            <div className="relative z-10 col-span-full flex flex-col items-start lg:col-span-6">
              <p className="text-mono-label animate-reveal-fade mb-6 text-text-tertiary">{`// ${site.jobTitle} · Full-stack`}</p>
              <h1 id="hero-title" className="text-display mb-7 text-text">
                <span className="line-mask">
                  <span style={line(0)}>Engineering </span>
                </span>
                <span className="line-mask">
                  <span style={line(1)} className="italic text-text-secondary">
                    systems that{" "}
                  </span>
                </span>
                <span className="line-mask">
                  <span style={line(2)}>ship.</span>
                </span>
              </h1>
              <p
                className="text-body-large animate-rise mb-9 max-w-md text-text-secondary"
                style={{ animationDelay: "200ms" }}
              >
                Hi, I&apos;m Shivam. I build full-stack web applications, enterprise platforms, and
                interactive digital products — from architecture to deployment.
              </p>
              <div
                className="animate-rise mb-10 flex flex-wrap gap-3"
                style={{ animationDelay: "280ms" }}
              >
                <Magnetic>
                  <NextLink href="/work" className={buttonClass("primary")}>
                    View selected work
                  </NextLink>
                </Magnetic>
                <Magnetic>
                  <NextLink href="/contact" className={buttonClass("secondary")}>
                    Get in touch
                  </NextLink>
                </Magnetic>
              </div>
              <div
                className="animate-reveal-fade w-full max-w-lg"
                style={{ animationDelay: "600ms" }}
              >
                <HeroSteps />
              </div>
            </div>
            <div className="relative col-span-full h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#0E1322]/60 sm:h-[420px] lg:col-span-6 lg:h-[min(640px,76vh)] lg:border-transparent lg:bg-transparent">
              <HeroCanvas />
            </div>
          </div>
          <p
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-text-tertiary lg:flex"
          >
            SCROLL <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" />
          </p>
        </div>
      </section>

      {/* ── 01 Featured ── */}
      <section id="work" aria-labelledby="featured-h" className="section-y border-b border-border">
        <div className="container-x">
          <SectionHeading
            id="featured-h"
            label="01. FEATURED"
            title="Selected case study"
            action={<CtaLink href="/work">View archive</CtaLink>}
          />
          <div data-reveal>
            <ProjectCard project={featured} featured />
          </div>
        </div>
      </section>

      {/* ── 02 Explore ── */}
      <section
        id="explore"
        aria-labelledby="explore-h"
        className="section-y relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="bg-blueprint pointer-events-none absolute inset-0 opacity-10"
        />
        <div className="container-x relative">
          <SectionHeading id="explore-h" label="02. EXPLORE" title="Project intelligence" />
          <div className="mx-auto max-w-3xl" data-reveal>
            <WorkAssistant />
          </div>
        </div>
      </section>

      {/* ── 03 Recent ── */}
      <section
        aria-labelledby="recent-h"
        className="section-y bg-surface/60 border-b border-border"
      >
        <div className="container-x">
          <SectionHeading
            id="recent-h"
            label="03. RECENT"
            title="Engineered systems"
            action={<CtaLink href="/work">All projects</CtaLink>}
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2" data-reveal-stagger>
            {others.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 04 Stack ── */}
      <section
        id="stack"
        aria-labelledby="stack-h"
        className="section-y relative overflow-hidden border-b border-border"
      >
        <div className="container-x">
          <SectionHeading id="stack-h" label="04. STACK" title="Tools I build with" />
          <SkillsSection />
        </div>
      </section>

      {/* ── 05 Labs ── */}
      <section id="labs" aria-labelledby="labs-h" className="section-y border-b border-border">
        <div className="container-x">
          <SectionHeading
            id="labs-h"
            label="05. LABS"
            title="Engineering playground"
            action={<CtaLink href="/playground">Enter labs</CtaLink>}
          />
          <div
            className="bg-surface/70 hover:border-accent/30 group rounded-2xl border border-white/10 p-6 shadow-2xl transition-colors duration-300 md:p-12"
            data-reveal
          >
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div>
                <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-hover">
                  <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-accent-hover" />
                  Interactive model
                </p>
                <h3 className="mb-4 font-display text-3xl text-text">Geospatial validation</h3>
                <p className="text-body-large mb-8 text-text-secondary">
                  A 3D map model of the Haversine distance check and geofencing rules behind
                  Shynr&apos;s attendance flow. Drag a user pin, resize the fence, and watch the
                  validation update live.
                </p>
                <NextLink href="/playground" className={buttonClass("secondary")}>
                  Open the Geofencing Lab ↗
                </NextLink>
              </div>
              <div
                aria-hidden="true"
                className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#070A12]"
                data-parallax="0.12"
              >
                <div className="bg-blueprint absolute inset-0 opacity-20" />
                <svg viewBox="0 0 100 100" className="relative z-10 h-1/2 w-1/2">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#00B8D4"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                    className="origin-center motion-safe:animate-[spin_20s_linear_infinite]"
                    opacity="0.8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="18"
                    fill="rgba(0,184,212,0.08)"
                    stroke="#00B8D4"
                    strokeWidth="0.5"
                  />
                  <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
                  <line
                    x1="50"
                    y1="50"
                    x2="68"
                    y2="68"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                  />
                  <circle cx="68" cy="68" r="4" fill="#070A12" stroke="#00B8D4" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 Background ── */}
      <section id="experience" aria-labelledby="bg-h" className="section-y border-b border-border">
        <div className="grid-container gap-y-12">
          <div className="col-span-full lg:col-span-4" data-reveal>
            <p className="text-mono-label mb-3 text-text-tertiary">{"// 06. BACKGROUND"}</p>
            <h2 id="bg-h" className="text-display-secondary mb-6">
              Where I&apos;ve been
            </h2>
            <p className="text-body-large mb-8 text-text-secondary">
              {rapsora.title} at {RAPSORA_SHORT}, where I delivered {rapsora.projects?.length}{" "}
              projects, and {work[1].title} at {work[1].organization.name} before that.{" "}
              {availability.label}.
            </p>
            <CtaLink href="/experience">Full timeline</CtaLink>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <CareerLog items={[...work, ...education]} compact />
          </div>
        </div>
      </section>

      {/* ── 07 About ── */}
      <section
        id="about"
        aria-labelledby="about-h"
        className="section-y bg-surface/60 border-b border-border"
      >
        <div className="grid-container items-center gap-y-10">
          <div
            className="col-span-full mx-auto w-full max-w-[340px] md:col-span-3 lg:col-span-4 lg:max-w-[380px]"
            data-reveal
          >
            <ProfilePhoto />
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6" data-reveal>
            <p className="text-mono-label mb-3 text-text-tertiary">{"// 07. ABOUT"}</p>
            <h2 id="about-h" className="text-display-secondary mb-6">
              Systems <span className="italic text-text-secondary">over</span> symptoms.
            </h2>
            <p className="text-body-large mb-5 text-text-secondary">
              I enjoy turning complex requirements into clear systems, building practical
              interfaces, and improving the way people interact with technology.
            </p>
            <p className="text-body-large mb-8 text-text-secondary">
              I approach engineering with a systems mindset: understand the problem first, simplify
              where possible, and build solutions that are maintainable rather than merely
              functional.
            </p>
            <CtaLink href="/about">Read the manifesto</CtaLink>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section
        id="contact"
        aria-labelledby="cta-h"
        className="section-y relative overflow-hidden text-center"
      >
        <div
          aria-hidden="true"
          className="bg-blueprint pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="container-x relative flex flex-col items-center" data-reveal>
          <h2 id="cta-h" className="text-display mb-8">
            {site.ctaHeadline.lead} <br />
            <span className="italic text-text-secondary">{site.ctaHeadline.emphasis}</span>
          </h2>
          <p className="text-body-large mx-auto mb-12 max-w-2xl text-text-secondary">
            {availability.detail} Send a note and I&apos;ll get back to you.
          </p>
          <Magnetic>
            <NextLink href="/contact" className={buttonClass("primary", "lg")}>
              Start a conversation
            </NextLink>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
