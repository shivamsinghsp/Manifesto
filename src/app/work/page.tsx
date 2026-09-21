import { Metadata } from "next"
import NextLink from "next/link"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/ui/ProjectCard"

export const metadata: Metadata = {
  title: "Work — Shivam Singh",
  description: "Full-stack applications, enterprise platforms, and production-grade products by Shivam Singh.",
}

export default function WorkPage() {
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 border-b border-border bg-blueprint bg-fixed">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-8">
            <span className="text-mono-label text-text-tertiary mb-6 block">{`// 01. ARCHIVE`}</span>
            <h1 className="text-display mb-8">Selected Work</h1>
            <p className="text-body-large text-text-secondary max-w-2xl leading-relaxed">
              A selection of full-stack applications, enterprise platforms, and production-grade products — each built with specific engineering decisions documented.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-b border-border">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-12 mb-16 border-b border-border-muted pb-4">
            <h2 className="text-mono-label text-text-tertiary">FEATURED CASE STUDY</h2>
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

      <section className="py-24 md:py-32 border-b border-border">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-12 mb-16 border-b border-border-muted pb-4">
            <h2 className="text-mono-label text-text-tertiary">INDEX</h2>
          </div>
          
          <div className="col-span-full lg:col-span-12">
            <div className="flex flex-col border-t border-border mt-4">
              {otherProjects.map((project, index) => (
                <NextLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-border transition-colors duration-300 hover:bg-surface-alt/50 focus:outline-none focus-visible:bg-surface-alt px-4 -mx-4 md:px-6 md:-mx-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 flex-grow">
                    <span className="text-mono-label text-text-tertiary w-12 group-hover:text-text-secondary transition-colors">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-1 w-full md:w-1/4">
                      <h3 className="text-subheading font-display group-hover:text-text-secondary transition-colors">{project.title}</h3>
                      <span className="text-mono-label text-text-tertiary md:hidden">{project.category}</span>
                    </div>
                    <p className="text-body-small text-text-secondary mt-2 md:mt-0 max-w-xl hidden md:block">
                      {project.shortDescription}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-end w-1/4">
                    <span className="text-mono-label text-text-tertiary text-right">{project.category}</span>
                  </div>
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
