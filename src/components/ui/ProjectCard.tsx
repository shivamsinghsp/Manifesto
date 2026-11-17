import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { TransitionLink } from "@/components/motion/TransitionLink"
import { TiltCard } from "./TiltCard"
import { cn } from "@/lib/utils"
import type { Project } from "@/content/projects"

interface Props {
  project: Project
  featured?: boolean
  /** Only the LCP-candidate card should set this. */
  priority?: boolean
  className?: string
}

export function ProjectCard({ project, featured = false, priority = false, className }: Props) {
  const href = `/work/${project.slug}`
  const image = (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-surface-alt"
      style={{ viewTransitionName: `project-${project.slug}` }}
    >
      <div className={cn("relative w-full", featured ? "aspect-[16/10] sm:aspect-[16/9]" : "aspect-[16/10]")}>
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 1024px) 92vw, 680px" : "(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 600px"}
          className="object-cover object-top"
          data-parallax-img
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0E17]/60 via-transparent to-transparent" />
    </div>
  )

  if (featured) {
    return (
      <TiltCard max={3} className={cn("rounded-2xl", className)}>
        <TransitionLink
          href={href}
          className="group block h-full rounded-2xl border border-white/10 bg-surface/70 p-5 shadow-xl transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_16px_40px_-8px_rgba(0,184,212,0.18)] sm:p-8 md:p-10"
        >
          <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">{image}</div>
            <div className="flex flex-col lg:col-span-5">
              <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-hover">
                <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-accent-hover" />
                {project.category}
              </p>
              <h3 className="mb-4 font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-tight text-text transition-colors group-hover:text-accent-hover">
                {project.title}
              </h3>
              <p className="mb-8 text-body-large text-text-secondary">{project.shortDescription}</p>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-hover">
                Explore case study
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </TransitionLink>
      </TiltCard>
    )
  }

  return (
    <TiltCard className={cn("rounded-2xl", className)}>
      <TransitionLink
        href={href}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface/70 p-4 shadow-lg transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_12px_32px_-6px_rgba(0,184,212,0.15)] sm:p-6"
      >
        <article className="flex h-full flex-col">
          <div className="mb-5">{image}</div>
          <div className="mb-2.5 flex items-start justify-between gap-3">
            <h3 className="font-display text-xl text-text transition-colors group-hover:text-accent-hover">{project.title}</h3>
            <span className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">{project.category}</span>
          </div>
          <p className="mb-6 line-clamp-3 flex-grow text-body-small text-text-secondary">{project.shortDescription}</p>
          <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-4">
            <span className="font-mono text-xs text-text-secondary transition-colors group-hover:text-accent-hover">Read case study</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 text-text-tertiary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-hover" />
          </div>
        </article>
      </TransitionLink>
    </TiltCard>
  )
}
