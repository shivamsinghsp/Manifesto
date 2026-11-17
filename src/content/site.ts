/**
 * Single source of truth for identity, links and navigation.
 * Edit values here — every page, the footer, JSON-LD, sitemap and OG images read from this file.
 */

const FALLBACK_SITE_URL = "https://myportfolio-gilt-xi-63.vercel.app"

/** Canonical origin, without a trailing slash. Set NEXT_PUBLIC_SITE_URL in Vercel. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "")

export const site = {
  name: "Shivam Singh",
  shortName: "SHIVAM",
  jobTitle: "Software Engineer",
  tagline: "Engineering systems that ship.",
  description:
    "Full-stack engineer building web applications, enterprise platforms, and interactive digital products. Next.js, React, TypeScript, MongoDB, SharePoint.",
  email: "shivamsinghabc439@gmail.com",
  location: "Kanpur, Uttar Pradesh, India",
  resumePath: "/resume.pdf",
  /**
   * TODO(owner): add a portrait at /public/images/profile.jpg (square, ≥800px) and set the path here.
   * While null, a monogram frame is rendered instead.
   */
  photo: null as string | null,
  socials: {
    github: "https://github.com/shivamsinghsp",
    linkedin: "https://www.linkedin.com/in/shivam2105-",
  },
  /** Shared closing line used by the homepage CTA and the Contact page. */
  ctaHeadline: { lead: "Let's build", emphasis: "systems." },
} as const

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams()
  if (subject) params.set("subject", subject)
  if (body) params.set("body", body)
  const q = params.toString().replace(/\+/g, "%20")
  return `mailto:${site.email}${q ? `?${q}` : ""}`
}

export const NAV_LINKS = [
  { href: "/work", label: "Work", index: "01" },
  { href: "/experience", label: "Experience", index: "02" },
  { href: "/about", label: "Manifesto", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
] as const

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`
