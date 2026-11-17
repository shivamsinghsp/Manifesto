"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MobileNav } from "./MobileNav"
import { NAV_LINKS, site } from "@/content/site"
import { MotionToggle } from "@/components/motion/MotionToggle"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-[900] flex h-[var(--header-h)] items-center justify-between border-b px-[var(--gutter)] backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-white/[0.08] bg-[#0A0E17]/85" : "border-transparent bg-[#0A0E17]/40"
      )}
    >
      <NextLink
        href="/"
        className="group flex min-h-[44px] items-center gap-2 font-display text-xl tracking-tight text-text transition-colors hover:text-accent-hover"
        aria-label={`${site.name} — home`}
      >
        <span aria-hidden="true" className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-accent-hover opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-block h-2 w-2 rounded-full bg-accent-hover" />
        </span>
        {site.shortName}
      </NextLink>

      <div className="hidden items-center gap-2 md:flex">
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex min-h-[44px] items-center px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200",
                      active ? "text-accent-hover" : "text-text-secondary hover:text-text"
                    )}
                  >
                    <span className="mr-1.5 text-text-tertiary">{link.index}.</span>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-2 h-px origin-left bg-accent-hover transition-transform duration-300 ease-out-expo",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </NextLink>
                </li>
              )
            })}
          </ul>
        </nav>
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/10" />
        <MotionToggle />
      </div>

      <MobileNav />
    </header>
  )
}
