import NextLink from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/content/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Selected Work",
  description: "Case studies of full-stack products, client platforms, enterprise SharePoint work and QA engineering by Shivam Singh.",
  path: "/work",
})

export default function WorkPage() {
  const [featured, ...others] = projects
  return (
    <>
      <section className="border-b border-border bg-blueprint py-16 md:py-24">
        <div className="container-x">
          <p className="mb-6 text-mono-label text-text-tertiary animate-reveal-fade">{"// 01. ARCHIVE"}</p>
          <h1 className="mb-8 text-display">Selected Work</h1>
          <p className="max-w-2xl text-body-large text-text-secondary">
            Full-stack applications, client platforms and enterprise systems — each documented with the engineering decisions behind it.
          </p>
        </div>
      </section>

      <section aria-labelledby="featured-h" className="section-y border-b border-border">
        <div className="container-x">
          <h2 id="featured-h" className="mb-10 border-b border-border-muted pb-4 text-mono-label text-text-tertiary">Featured case study</h2>
          <ProjectCard project={featured} featured priority />
        </div>
      </section>

      <section aria-labelledby="index-h" className="section-y border-b border-border">
        <div className="container-x">
          <h2 id="index-h" className="mb-10 border-b border-border-muted pb-4 text-mono-label text-text-tertiary">Index</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2" data-reveal-stagger>
            {others.map((p) => (
              <li key={p.slug}><ProjectCard project={p} /></li>
            ))}
          </ul>
          <ol className="mt-16 border-t border-border" aria-label="All projects">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <NextLink
                  href={`/work/${p.slug}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border py-5 transition-colors hover:bg-surface-alt/40 md:grid-cols-[3rem_1.2fr_2fr_auto] md:px-4"
                >
                  <span className="text-mono-label text-text-tertiary">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-subheading text-text group-hover:text-accent-hover">{p.title}</span>
                    <span className="mt-1 block text-mono-label text-text-tertiary md:hidden">{p.category}</span>
                  </span>
                  <span className="hidden text-body-small text-text-secondary md:block">{p.category} · {p.role}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-1 group-hover:text-accent-hover" />
                </NextLink>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
