"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MobileNav } from "./MobileNav"
import { NAV_LINKS, site } from "@/content/site"
import { MotionToggle } from "@/components/motion/MotionToggle"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { CommandTrigger } from "@/components/command/CommandPalette"
import { cn } from "@/lib/utils"

/** Floating pill navigation. The outer <header> keeps the layout height (--header-h). */
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
    <header className="sticky top-0 z-[900] flex h-[var(--header-h)] items-center px-[var(--gutter)]">
      <div
        className={cn(
          "mx-auto flex h-[52px] w-full max-w-[1100px] items-center justify-between gap-2 rounded-full border pl-4 pr-1.5 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 md:h-14 md:pl-5",
          scrolled
            ? "border-border bg-header shadow-md"
            : "border-border shadow-none [background-color:color-mix(in_srgb,var(--color-header)_55%,transparent)]"
        )}
      >
        <NextLink
          href="/"
          className="group flex min-h-[44px] items-center gap-2 font-display text-lg tracking-tight text-text transition-colors hover:text-accent-text"
          aria-label={`${site.name} — home`}
        >
          <span aria-hidden="true" className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-accent" />
          </span>
          {site.shortName}
        </NextLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-[40px] items-center rounded-full px-3 font-mono text-xs uppercase tracking-wider transition-colors duration-200",
                      active
                        ? "bg-accent/10 text-accent-text"
                        : "text-text-secondary hover:bg-chip hover:text-text"
                    )}
                  >
                    <span className="mr-1.5 text-text-tertiary">{link.index}.</span>
                    {link.label}
                  </NextLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <CommandTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-text" />
          <MotionToggle compact className="hidden md:inline-flex" />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
