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
    <header className="sticky top-0 z-[900] h-[72px] bg-[#0A0E17]/80 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between px-4 sm:px-6 md:px-8 animate-reveal-fade delay-100">
      <NextLink 
        href="/" 
        className="font-display font-medium text-[20px] tracking-tight text-white hover:text-cyan-400 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-400 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
        SHIVAM
      </NextLink>
      
      <nav className="hidden md:flex items-center gap-2">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href)
          
          return (
            <NextLink
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-400",
                isActive 
                  ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 font-medium" 
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {link.label}
            </NextLink>
          )
        })}
      </nav>

      <MobileNav />
    </header>
  )
}

