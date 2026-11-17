import { renderOgImage, OG_SIZE } from "@/lib/og"
import { site } from "@/content/site"

export const alt = `${site.name} — ${site.jobTitle}`
export const size = OG_SIZE
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: site.tagline,
    subtitle: `${site.name} — full-stack engineer building web applications, enterprise platforms and interactive products.`,
  })
}
