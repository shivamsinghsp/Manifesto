import type { Metadata } from "next"
import { SITE_URL, site } from "@/content/site"

interface PageMeta {
  title?: string
  description?: string
  /** Route path, e.g. "/work/shynr". Used for the canonical URL and og:url. */
  path: string
  /** Override the social image (defaults to the site-wide generated card). */
  image?: string
}

/** Builds per-route metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description = site.description,
  path,
  image = "/opengraph-image",
}: PageMeta): Metadata {
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
      // Child metadata replaces openGraph wholesale, so restate the generated default image.
      images: [
        { url: image, width: 1200, height: 630, alt: title ?? `${site.name} — ${site.jobTitle}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image === "/opengraph-image" ? "/twitter-image" : image],
    },
  }
}

export const metadataBase = new URL(SITE_URL)
