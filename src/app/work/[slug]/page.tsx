import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { ProjectExplorer } from "@/components/engineering/ProjectExplorer"
import { ArchitectureDiagram } from "@/components/engineering/ArchitectureDiagram"
import React from "react"

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return { title: "Not Found" }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  }
}

function getOwnershipLabel(role: string): string {
  const lower = role.toLowerCase()
  if (lower.includes("solo")) return "End-to-end / Solo"
  if (lower.includes("lead")) return "Lead / Primary"
  return "Core Contributor"
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  // Compute section numbering offset
  const sectionOffset = project.metrics ? 3 : 2 // 1=OVERVIEW, 2=SNAPSHOT (or METRICS), ...

  return (
    <article className="pb-24">
      {/* Case Study Header */}
      <header className="pt-32 pb-24 md:pt-48 md:pb-32 border-b border-border bg-blueprint bg-fixed">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-8 mb-16">
            <span className="text-mono-label text-text-tertiary mb-6 block uppercase">{`// CASE_STUDY: ${project.category}`}</span>
            <h1 className="text-display mb-8">{project.title}</h1>
            <p className="text-body-large text-text-secondary leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          
          <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border">
            <div>
              <h3 className="text-mono-label text-text-tertiary mb-3 border-b border-border-muted pb-2">ROLE</h3>
              <p className="text-body-small text-text">{project.role}</p>
            </div>
            <div>
              <h3 className="text-mono-label text-text-tertiary mb-3 border-b border-border-muted pb-2">TIMELINE</h3>
              <p className="text-body-small text-text">{project.timeline}</p>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h3 className="text-mono-label text-text-tertiary mb-3 border-b border-border-muted pb-2">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-mono-label text-text bg-surface border border-border px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* External Project Links */}
          {project.links && project.links.length > 0 && (
            <div className="col-span-full flex flex-wrap gap-4 pt-8">
              {project.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border text-mono-label text-text hover:bg-surface hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                  <span className="text-text-tertiary">↗</span>
                </a>
              ))}
            </div>
          )}

          {/* Interactive Project Explorer */}
          {project.explorerTabs && project.explorerTabs.length > 0 && (
            <div className="col-span-full">
              <ProjectExplorer tabs={project.explorerTabs} />
            </div>
          )}
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full max-w-[1440px] mx-auto border-b border-border">
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden flex items-center justify-center text-text-tertiary bg-surface filter grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100 animate-scan">
          {project.heroImage.src ? (
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <span className="font-mono text-sm">[HERO IMAGE: {project.heroImage.alt}]</span>
          )}
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="grid-container grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0">
              <h2 className="text-mono-label text-text-tertiary">01. OVERVIEW</h2>
            </div>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-9 prose prose-invert max-w-3xl">
            {project.longDescription.map((p, i) => (
              <p key={i} className="text-body-large text-text-secondary mb-8 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Project Snapshot — Compact Technical Metadata */}
      <section className="py-12 border-b border-border bg-surface">
        <div className="grid-container">
          <div className="col-span-full grid grid-cols-2 md:grid-cols-4 gap-0 border border-border">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
              <div className="text-mono-label text-text-tertiary mb-3">ROLE</div>
              <div className="text-body-small text-text">{project.role}</div>
            </div>
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
              <div className="text-mono-label text-text-tertiary mb-3">OWNERSHIP</div>
              <div className="text-body-small text-text">{getOwnershipLabel(project.role)}</div>
            </div>
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
              <div className="text-mono-label text-text-tertiary mb-3">TIMELINE</div>
              <div className="text-body-small text-text">{project.timeline || "—"}</div>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-mono-label text-text-tertiary mb-3">TYPE</div>
              <div className="text-body-small text-text">{project.category}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      {project.metrics && (
        <section className="py-24 md:py-32 border-b border-border bg-surface">
          <div className="grid-container">
            <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border last:border-0 relative">
                  <div className="absolute top-4 left-4 text-mono-label text-text-tertiary">{`0${i + 1}`}</div>
                  <div className="text-display-secondary text-text mb-4 mt-4">{metric.value}</div>
                  <div className="text-mono-label text-text-secondary">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Dynamic Content */}
      {project.caseStudy && (
        <div className="case-study-content">
          {project.caseStudy.map((section, index) => (
            <section key={index} className="py-24 md:py-32 border-b border-border">
              <div className="grid-container grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
                
                {/* Left Column: Section Title */}
                <div className="col-span-full md:col-span-4 lg:col-span-3">
                  <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0">
                    <h2 className="text-mono-label text-text-tertiary">
                      {`0${sectionOffset + index}. ${section.title || section.category || 'SECTION'}`}
                    </h2>
                  </div>
                </div>

                {/* Right Column: Content */}
                <div className="col-span-full md:col-span-8 lg:col-span-9">
                  
                  {/* Text Section */}
                  {section.type === "text" && (
                    <div className="prose prose-invert max-w-3xl">
                      <p className="text-body-large text-text-secondary leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  )}

                  {/* Product Feature Section */}
                  {section.type === "product-feature" && (
                    <div className="flex flex-col gap-12">
                      
                      {/* 1. Real Screenshot */}
                      {section.image && (
                        <figure className="w-full relative group">
                          <div className="absolute inset-0 bg-surface border border-border transition-all duration-[600ms] ease-out-expo translate-x-2 translate-y-2 opacity-100 z-0" />
                          <div className="relative z-10 border border-border bg-surface p-2 corner-marks">
                            <div className="relative aspect-[16/9] w-full overflow-hidden text-text-tertiary flex items-center justify-center bg-surface-alt">
                              {section.image.src ? (
                                <Image
                                  src={section.image.src}
                                  alt={section.image.alt}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="text-mono-label uppercase">[ IMAGE RESERVED ]</div>
                              )}
                            </div>
                          </div>
                          {section.image.caption && (
                            <figcaption className="mt-4 text-mono-label text-text-tertiary text-right pr-2">
                              {section.image.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* 2. Technical Explanation */}
                      {section.content && (
                        <div className="prose prose-invert max-w-3xl">
                          {Array.isArray(section.content) ? (
                            section.content.map((p, i) => (
                              <p key={i} className="text-body-large text-text-secondary leading-relaxed mb-4 last:mb-0">{p}</p>
                            ))
                          ) : (
                            <p className="text-body-large text-text-secondary leading-relaxed">
                              {section.content}
                            </p>
                          )}
                        </div>
                      )}

                      {/* 3. Real SVG Architecture Diagram */}
                      {section.diagram && (
                        <figure className="w-full mx-auto relative tech-frame">
                          <ArchitectureDiagram
                            src={section.diagram.src}
                            alt={section.diagram.alt}
                          />
                          {section.diagram.caption && (
                            <figcaption className="mt-4 text-mono-label text-text-tertiary text-right">
                              {section.diagram.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      {/* 4. Implementation Logic Block */}
                      {section.implementation && section.implementation.length > 0 && (
                        <div className="bg-surface-alt border border-border p-6 md:p-8 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
                          <h4 className="text-mono-label text-text-tertiary mb-6 relative z-10 border-b border-border-muted pb-2 inline-block">IMPLEMENTATION</h4>
                          <div className="font-mono text-[12px] leading-relaxed relative z-10 text-text-secondary">
                            {section.implementation.map((step, i) => (
                              <React.Fragment key={i}>
                                <div>{step}</div>
                                {i < section.implementation!.length - 1 && (
                                  <div className="text-accent my-2">↓</div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Two Column Section */}
                  {section.type === "two-column" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-body-large text-text-secondary leading-relaxed">{section.leftCol}</p>
                      </div>
                      <div>
                        <p className="text-body-large text-text-secondary leading-relaxed">{section.rightCol}</p>
                      </div>
                    </div>
                  )}

                  {/* Diagram Standalone Section */}
                  {section.type === "diagram" && section.diagram && (
                    <div className="flex flex-col gap-8">
                      {section.content && (
                        <p className="text-body-large text-text-secondary leading-relaxed">
                          {section.content}
                        </p>
                      )}
                      
                      <figure className="w-full mx-auto relative tech-frame">
                        <ArchitectureDiagram
                          src={section.diagram.src}
                          alt={section.diagram.alt}
                        />
                        {section.diagram.caption && (
                          <figcaption className="mt-4 text-mono-label text-text-tertiary text-right">
                            {section.diagram.caption}
                          </figcaption>
                        )}
                      </figure>
                    </div>
                  )}

                  {/* Image Standalone Section */}
                  {section.type === "image" && section.image && (
                    <div className="flex flex-col gap-8">
                      {section.content && (
                        <div className="prose prose-invert max-w-3xl">
                          {Array.isArray(section.content) ? (
                            section.content.map((p, i) => (
                              <p key={i} className="text-body-large text-text-secondary leading-relaxed">{p}</p>
                            ))
                          ) : (
                            <p className="text-body-large text-text-secondary leading-relaxed">{section.content}</p>
                          )}
                        </div>
                      )}
                      <figure className="w-full relative group">
                        <div className="absolute inset-0 bg-surface border border-border transition-all duration-[600ms] ease-out-expo translate-x-3 translate-y-3 opacity-100 z-0" />
                        <div className="relative z-10 border border-border bg-surface p-2 corner-marks">
                          <div className="relative aspect-[16/9] flex items-center justify-center text-text-tertiary overflow-hidden filter grayscale opacity-90 transition-all duration-700 hover:grayscale-0 hover:opacity-100 animate-scan">
                            {section.image.src ? (
                              <Image
                                src={section.image.src}
                                alt={section.image.alt}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-surface flex items-center justify-center border border-border-muted">
                                <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/70 uppercase">
                                  [ INTERFACE PLATE RESERVED ]
                               </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {section.image.caption && (
                          <figcaption className="mt-6 border-t border-border-muted pt-2 text-mono-label text-text-secondary text-right relative z-10">
                            {section.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    </div>
                  )}

                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  )
}
