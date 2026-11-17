import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { absoluteUrl } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "monthly"],
    ["/work", 0.9, "monthly"],
    ["/about", 0.8, "monthly"],
    ["/experience", 0.7, "monthly"],
    ["/playground", 0.6, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/resume", 0.5, "yearly"],
  ]
  return [
    ...routes.map(([path, priority, changeFrequency]) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority })),
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]
}
