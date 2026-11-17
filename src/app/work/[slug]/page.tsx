import type { Metadata } from "next"
import Image from "next/image"
import NextLink from "next/link"
import { notFound } from "next/navigation"
import { Fragment, type ReactNode } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { projects, type CaseStudySection, type ProjectImage } from "@/content/projects"
import { ArchitectureDiagram } from "@/components/engineering/ArchitectureDiagram"
import { SectionNav, type NavSection } from "@/components/case-study/SectionNav"
import { ReadingProgress } from "@/components/case-study/ReadingProgress"
import { Outcomes } from "@/components/case-study/Outcomes"
import { Challenges } from "@/components/case-study/Challenges"
import { pageMetadata } from "@/lib/seo"
import { slugify } from "@/lib/slug"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Not found" }
  return pageMetadata({
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    path: `/work/${slug}`,
    image: `/work/${slug}/opengraph-image`,
  })
}

const pad = (n: number) => String(n).padStart(2, "0")

function Paragraphs({ content }: { content?: string | string[] }) {
  if (!content) return null
  const list = Array.isArray(content) ? content : [content]
  return (
    <div className="max-w-3xl space-y-5">
      {list.map((p, i) => (
        <p key={i} className="text-body-large whitespace-pre-line text-text-secondary">
          {p}
        </p>
      ))}
    </div>
  )
}

function Screenshot({ image }: { image: ProjectImage }) {
  return (
    <figure className="w-full" data-reveal>
      <div className="bg-surface/70 relative overflow-hidden rounded-2xl border border-white/10 p-2 shadow-2xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface-alt">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 66vw, 860px"
            className="object-cover object-top"
          />
        </div>
      </div>
      {image.caption && (
        <figcaption className="text-mono-label mt-3 text-right text-text-tertiary">
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function Implementation({ steps }: { steps: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-alt p-6 md:p-8">
      <div
        aria-hidden="true"
        className="bg-blueprint pointer-events-none absolute inset-0 opacity-10"
      />
      <h3 className="text-mono-label relative mb-5 inline-block border-b border-border-muted pb-2 text-text-tertiary">
        Implementation flow
      </h3>
      <ol
        className="relative flex flex-col font-mono text-[13px] leading-relaxed text-text-secondary"
        data-reveal-stagger
      >
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col">
            <span className="flex gap-3">
              <span className="text-text-tertiary">{pad(i + 1)}</span>
              {step}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="my-1.5 pl-7 text-accent">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function SectionBody({ section }: { section: CaseStudySection }) {
  if (
    section.type === "text" &&
    typeof section.content === "string" &&
    /^\d{2}\n/.test(section.content)
  ) {
    return <Challenges content={section.content} />
  }
  return (
    <div className="flex flex-col gap-10">
      {section.type === "image" || section.type === "product-feature"
        ? section.image && <Screenshot image={section.image} />
        : null}
      <Paragraphs content={section.content} />
      {section.type === "two-column" && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <p className="text-body-large text-text-secondary">{section.leftCol}</p>
          <p className="text-body-large text-text-secondary">{section.rightCol}</p>
        </div>
      )}
      {section.diagram && (
        <figure className="w-full">
          <ArchitectureDiagram {...section.diagram} />
          <figcaption className="text-mono-label mt-3 text-right text-text-tertiary">
            {section.diagram.caption}
          </figcaption>
        </figure>
      )}
      {section.implementation && section.implementation.length > 0 && (
        <Implementation steps={section.implementation} />
      )}
    </div>
  )
}

function Block({
  id,
  index,
  title,
  children,
  alt,
}: {
  id: string
  index: string
  title: string
  children: ReactNode
  alt?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`section-y scroll-mt-32 border-b border-border ${alt ? "bg-surface/60" : ""}`}
    >
      <div className="grid-container gap-y-8">
        <div className="col-span-full md:col-span-3">
          <div className="border-b border-border pb-3 md:sticky md:top-32 md:border-b-0 md:border-t md:pt-4">
            <h2
              id={`${id}-h`}
              tabIndex={-1}
              className="text-mono-label text-text-tertiary outline-none"
            >
              <span className="text-accent-hover">{index}.</span> {title}
            </h2>
          </div>
        </div>
        <div className="col-span-full md:col-span-5 lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()
  const project = projects[idx]
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  // Sequential numbering: 01 Overview, 02 Outcomes, then every case-study section.
  const sections: (NavSection & { section?: CaseStudySection })[] = [
    { id: "overview", label: "Overview", index: "01" },
    { id: "outcomes", label: "Outcomes", index: "02" },
    ...(project.caseStudy ?? []).map((s, i) => ({
      id: slugify(s.title || s.category || `section-${i + 3}`),
      label: (s.title || s.category || "Section")
        .toLowerCase()
        .replace(/(^|\s)\S/g, (c) => c.toUpperCase()),
      index: pad(i + 3),
      section: s,
    })),
  ]

  const facts = [
    { label: "Role", value: project.role },
    { label: "Engagement", value: project.engagement },
    { label: "Timeline", value: project.timeline ?? "—" },
    { label: "Type", value: project.category },
  ]

  return (
    <article id="case-study" className="pb-8">
      <ReadingProgress targetId="case-study" />

      <header className="bg-blueprint border-b border-border pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="grid-container">
          <div className="col-span-full mb-8">
            <NextLink
              href="/work"
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-text-secondary transition-colors hover:text-accent-hover"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All selected work
            </NextLink>
          </div>
          <div className="col-span-full mb-12 lg:col-span-9">
            <p className="text-mono-label animate-reveal-up mb-5 text-text-tertiary">{`// CASE STUDY · ${project.category}`}</p>
            <h1 className="text-display mb-6">{project.title}</h1>
            <p className="text-body-large max-w-3xl text-text-secondary">
              {project.shortDescription}
            </p>
          </div>

          <dl className="col-span-full grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-8 xs:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-mono-label mb-2 border-b border-border-muted pb-2 text-text-tertiary">
                  {f.label}
                </dt>
                <dd className="text-body-small text-text">{f.value}</dd>
              </div>
            ))}
            <div className="xs:col-span-2 lg:col-span-4">
              <dt className="text-mono-label mb-2 border-b border-border-muted pb-2 text-text-tertiary">
                Technologies
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <li
                      key={t}
                      className="text-mono-label rounded border border-border bg-surface px-2 py-1 normal-case tracking-normal text-text"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          {project.links && project.links.length > 0 && (
            <div className="col-span-full flex flex-wrap gap-3 pt-8">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono-label inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 text-text transition-colors hover:border-accent hover:text-accent-hover"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] border-b border-border">
        <div
          className="relative aspect-[16/9] overflow-hidden bg-surface md:aspect-[21/9]"
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="from-bg/70 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>
      </div>

      <SectionNav sections={sections.map(({ id, label, index }) => ({ id, label, index }))} />

      <Block id="overview" index="01" title="Overview">
        <Paragraphs content={project.longDescription} />
      </Block>

      <Block id="outcomes" index="02" title="Outcomes / Impact" alt>
        <Outcomes items={project.outcomes} />
      </Block>

      {sections.slice(2).map((s, i) => (
        <Fragment key={s.id}>
          <Block id={s.id} index={s.index} title={s.section?.title || s.label} alt={i % 2 === 1}>
            {s.section && <SectionBody section={s.section} />}
          </Block>
        </Fragment>
      ))}

      <nav aria-label="More case studies" className="border-b border-border bg-surface">
        <div className="grid-container py-10 md:py-14">
          <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2">
            <NextLink
              href={`/work/${prev.slug}`}
              className="hover:border-accent/50 group flex min-h-[44px] flex-col gap-2 rounded-xl border border-border p-6 transition-colors"
            >
              <span className="text-mono-label inline-flex items-center gap-2 text-text-tertiary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </span>
              <span className="text-subheading text-text group-hover:text-accent-hover">
                {prev.title}
              </span>
            </NextLink>
            <NextLink
              href={`/work/${next.slug}`}
              className="hover:border-accent/50 group flex min-h-[44px] flex-col items-end gap-2 rounded-xl border border-border p-6 text-right transition-colors"
            >
              <span className="text-mono-label inline-flex items-center gap-2 text-text-tertiary">
                Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-subheading text-text group-hover:text-accent-hover">
                {next.title}
              </span>
            </NextLink>
          </div>
          <div className="col-span-full mt-6 flex justify-center">
            <NextLink
              href="/playground"
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-sm text-text-secondary hover:text-accent-hover"
            >
              Explore the Engineering Playground{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NextLink>
          </div>
        </div>
      </nav>
    </article>
  )
}
