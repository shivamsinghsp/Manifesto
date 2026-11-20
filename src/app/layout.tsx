import type { Metadata, Viewport } from "next"
import Script from "next/script"
import localFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SkipLink } from "@/components/layout/SkipLink"
import { ClientChrome } from "@/components/motion/ClientChrome"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { MOTION_BOOT_SCRIPT } from "@/lib/motion-preference"
import { metadataBase, pageMetadata } from "@/lib/seo"
import { SITE_URL, site } from "@/content/site"
import { skillGroups } from "@/content/skills"
import { education } from "@/content/career"

// Two families: Instrument Serif (display) + Geist (UI/body, with its mono cut for metadata).
// Self-hosted from npm so builds never depend on reaching Google Fonts.
const instrument = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
})
// Latin-subset variable files (~29 KB / ~23 KB). Not preloaded: the display face is the LCP text.
const geistSans = localFont({
  src: "../../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
})
const geistMono = localFont({
  src: "../../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F1EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0D" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
}

function JsonLd() {
  const edu = education[0]
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kanpur",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        ...(edu && {
          alumniOf: { "@type": "CollegeOrUniversity", name: edu.organization.name },
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: edu.title,
          },
        }),
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrument.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Script id="motion-boot" strategy="beforeInteractive">
            {MOTION_BOOT_SCRIPT}
          </Script>
          <SkipLink />
          <JsonLd />
          <Header />
          <main id="main" tabIndex={-1} className="min-h-[60vh] outline-none">
            {children}
          </main>
          <Footer />
          <ClientChrome />
        </ThemeProvider>
      </body>
    </html>
  )
}
