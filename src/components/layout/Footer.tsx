import NextLink from "next/link"

const FOOTER_LINKS = {
  Navigation: [
    { label: "Selected Work", href: "/work" },
    { label: "Full Timeline", href: "/experience" },
    { label: "Manifesto", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Social: [
    { label: "GitHub", href: "https://github.com/shivamsinghsp" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shivam2105-" },
    { label: "Email", href: "mailto:shivamsinghabc439@gmail.com" },
  ],
  Resources: [
    { label: "Resume (PDF)", href: "/resume.pdf" },
  ]
}

export function Footer() {
  return (
    <footer className="bg-[#070A12]/95 border-t border-white/[0.08] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
      <div className="grid-container gap-y-12 lg:gap-y-0 relative z-10">
        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h4 className="text-mono-label text-text-tertiary mb-6 border-b border-border-muted pb-2">01. NAVIGATION</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.Navigation.map((link) => (
              <li key={link.label}>
                <NextLink href={link.href} className="text-body-small text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:underline">
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h4 className="text-mono-label text-text-tertiary mb-6 border-b border-border-muted pb-2">02. SOCIAL</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.Social.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-body-small text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h4 className="text-mono-label text-text-tertiary mb-6 border-b border-border-muted pb-2">03. RESOURCES</h4>
          <ul className="flex flex-col gap-3">
            {FOOTER_LINKS.Resources.map((link) => (
              <li key={link.label}>
                <NextLink href={link.href} className="text-body-small text-text-secondary hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:underline">
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-full md:col-span-4 lg:col-span-3">
          <h4 className="text-mono-label text-text-tertiary mb-6 border-b border-border-muted pb-2">04. METADATA</h4>
          <p className="text-body-small text-text-secondary">
            Built with Next.js & Tailwind CSS. Designed with systems thinking. No generic components.
          </p>
        </div>
        
        <div className="col-span-full mt-16 flex flex-col md:flex-row justify-between items-center border-t border-border pt-6">
          <p className="text-mono-label text-text-tertiary">
            © {new Date().getFullYear()} SHIVAM SINGH
          </p>
          <p className="text-mono-label text-text-tertiary mt-4 md:mt-0">
            {`// END_OF_DOCUMENT`}
          </p>
        </div>
      </div>
    </footer>
  )
}
