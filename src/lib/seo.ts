import type { Metadata } from "next"
import { SITE_URL, site } from "@/content/site"

interface PageMeta {
  title?: string
  description?: string
  /** Route path, e.g. "/work/shynr". Used for the canonical URL and og:url. */
  path: string
}

/** Builds per-route metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({ title, description = site.description, path }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.jobTitle}`
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: `${site.name} — Portfolio`,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}

export const metadataBase = new URL(SITE_URL)
