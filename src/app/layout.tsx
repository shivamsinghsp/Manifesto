import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ClientChrome } from "@/components/motion/ClientChrome"
import { MOTION_BOOT_SCRIPT } from "@/lib/motion-preference"
import { metadataBase, pageMetadata } from "@/lib/seo"
import { SITE_URL, site } from "@/content/site"
import { skillGroups } from "@/content/skills"
import { experiences } from "@/content/experience"

const plexSerif = IBM_Plex_Serif({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-plex-serif",
  display: "swap",
})
const plexSans = IBM_Plex_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
})
const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase,
  ...pageMetadata({ path: "/" }),
  title: { default: `${site.name} — ${site.jobTitle}`, template: `%s | ${site.name}` },
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0A0E17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

function JsonLd() {
  const education = experiences.find((e) => e.type === "Education")
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: `${site.name} — Portfolio`,
        url: SITE_URL,
        description: site.description,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: site.name,
        url: SITE_URL,
        email: `mailto:${site.email}`,
        jobTitle: site.jobTitle,
        description: site.description,
        address: { "@type": "PostalAddress", addressLocality: "Kanpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
        ...(education && { alumniOf: { "@type": "CollegeOrUniversity", name: education.organization } }),
        knowsAbout: skillGroups.flatMap((g) => g.items).slice(0, 20),
        sameAs: [site.socials.github, site.socials.linkedin],
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      // Static, build-time data only — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-3 z-[2000] rounded-lg bg-cta-bg px-4 py-3 font-mono text-xs uppercase tracking-wider text-cta-text"
        >
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main" tabIndex={-1} className="min-h-[60vh] outline-none">
          {children}
        </main>
        <Footer />
        <ClientChrome />
      </body>
    </html>
  )
}
