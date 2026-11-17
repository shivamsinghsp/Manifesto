import NextLink from "next/link"
import { NAV_LINKS, site } from "@/content/site"
import { EmailLink } from "@/components/ui/EmailLink"
import { IntroPosterButton } from "@/components/ui/IntroPosterButton"

const linkClass = "inline-flex min-h-[32px] items-center text-body-small text-text-secondary transition-colors duration-200 hover:text-accent-hover"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#070A12]/95 pb-8 pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint opacity-10" />
      <div className="grid-container relative z-10 gap-y-12">
        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h2 className="mb-5 border-b border-border-muted pb-2 text-mono-label text-text-tertiary">01. Navigation</h2>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NextLink href={l.href} className={linkClass}>{l.label === "Work" ? "Selected Work" : l.label}</NextLink>
              </li>
            ))}
            <li><NextLink href="/playground" className={linkClass}>Engineering Playground</NextLink></li>
          </ul>
        </div>

        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h2 className="mb-5 border-b border-border-muted pb-2 text-mono-label text-text-tertiary">02. Contact</h2>
          <ul className="flex flex-col gap-1">
            <li><EmailLink className={linkClass}>Email</EmailLink></li>
            <li><a href={site.socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>

        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h2 className="mb-5 border-b border-border-muted pb-2 text-mono-label text-text-tertiary">03. Resources</h2>
          <ul className="flex flex-col gap-1">
            <li><a href={site.resumePath} className={linkClass}>Resume (PDF)</a></li>
            <li><IntroPosterButton className={linkClass} /></li>
          </ul>
        </div>

        <div className="col-span-full md:col-span-12 lg:col-span-3">
          <h2 className="mb-5 border-b border-border-muted pb-2 text-mono-label text-text-tertiary">04. Metadata</h2>
          <p className="text-body-small text-text-secondary">
            Built with Next.js, React Three Fiber, GSAP & Tailwind CSS. Designed with systems thinking.
          </p>
        </div>

        <div className="col-span-full mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-mono-label text-text-tertiary">© {new Date().getFullYear()} {site.name}</p>
          <p className="text-mono-label text-text-tertiary">{`// END_OF_DOCUMENT`}</p>
        </div>
      </div>
    </footer>
  )
}
