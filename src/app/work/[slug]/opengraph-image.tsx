import { renderOgImage, OG_SIZE } from "@/lib/og"
import { projects } from "@/content/projects"

export const alt = "Case study"
export const size = OG_SIZE
export const contentType = "image/png"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.shortDescription,
  })
}
