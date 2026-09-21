"use client"

import React, { useState, useEffect, useRef } from "react"
import NextLink from "next/link"
import { Menu, X } from "lucide-react"


const NAV_LINKS = [
  { href: "/work", label: "01. WORK" },
  { href: "/experience", label: "02. EXPERIENCE" },
  { href: "/about", label: "03. ABOUT" },
  { href: "/contact", label: "04. CONTACT" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="w-11 h-11 flex items-center justify-center border border-border rounded-button text-text hover:bg-surface-alt transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-bg flex flex-col" ref={menuRef}>
          <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 border-b border-border">
            <NextLink href="/" className="font-display font-bold text-[20px] text-text" onClick={() => setIsOpen(false)}>
              SHIVAM
            </NextLink>
            <button
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 flex items-center justify-center border border-border rounded-button text-text hover:bg-surface-alt transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                className="text-headline text-text hover:text-accent transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NextLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
