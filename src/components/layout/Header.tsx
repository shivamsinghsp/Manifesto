"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { MobileNav } from "./MobileNav"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/work", label: "01. WORK" },
  { href: "/experience", label: "02. EXPERIENCE" },
  { href: "/about", label: "03. MANIFESTO" },
  { href: "/contact", label: "04. CONTACT" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-[900] h-16 bg-bg border-b border-border flex items-center justify-between px-4 sm:px-6 md:px-8 animate-reveal-fade delay-100">
      <NextLink 
        href="/" 
        className="font-display font-medium text-[18px] text-text hover:text-text-secondary transition-colors focus:outline-none focus-visible:outline-1 focus-visible:outline-text focus-visible:outline-offset-4"
      >
        SHIVAM
      </NextLink>
      
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href)
          
          return (
            <NextLink
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-mono-label transition-colors duration-200 focus:outline-none focus-visible:outline-1 focus-visible:outline-text focus-visible:outline-offset-4 group py-2",
                isActive ? "text-text" : "text-text-secondary hover:text-text"
              )}
            >
              {isActive ? `[ ${link.label} ]` : link.label}
              
              {/* Active / Hover Underline */}
              <span className={cn(
                "absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ease-out-expo",
                isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-text-secondary"
              )} />
            </NextLink>
          )
        })}
      </nav>

      <MobileNav />
    </header>
  )
}

