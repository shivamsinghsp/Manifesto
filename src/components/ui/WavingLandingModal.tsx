"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import WavingPortfolioLanding, {
  WavingPortfolioLandingProps,
} from "@/components/ui/waving-portfolio-landing"
import { X, Palette } from "lucide-react"

export type PosterThemeKey = "cyan" | "gold" | "emerald" | "terracotta"

export interface PosterThemeOption {
  id: PosterThemeKey
  name: string
  accent: string
  paper: string
  ink: string
  skin: string
  previewColor: string
}

export const POSTER_THEMES: Record<PosterThemeKey, PosterThemeOption> = {
  cyan: {
    id: "cyan",
    name: "Cyber Cyan",
    accent: "#00E5FF", // Electric Cyan matching Shivam's portfolio branding
    paper: "#070A11", // Deep Obsidian Midnight (matches portfolio bg)
    ink: "#F1F5F9", // Crisp slate
    skin: "#F5EBE1", // Natural warm skin tone
    previewColor: "#00E5FF",
  },
  gold: {
    id: "gold",
    name: "Champagne Gold",
    accent: "#F2C069", // Warm, prestigious, elegant gold
    paper: "#070A11", // Deep Obsidian Midnight
    ink: "#F1F5F9",
    skin: "#F5EBE1",
    previewColor: "#F2C069",
  },
  emerald: {
    id: "emerald",
    name: "Mint Emerald",
    accent: "#10B981", // Refined tech emerald
    paper: "#070A11",
    ink: "#F1F5F9",
    skin: "#F5EBE1",
    previewColor: "#10B981",
  },
  terracotta: {
    id: "terracotta",
    name: "Warm Editorial",
    accent: "#C25E3E", // Soft Japanese risograph terracotta
    paper: "#F4EFE6", // Gentle muted warm cream
    ink: "#18181B",
    skin: "#F4EFE6",
    previewColor: "#C25E3E",
  },
}

interface WavingLandingModalProps extends Partial<WavingPortfolioLandingProps> {
  /** Called after the close animation finishes */
  onClosed?: () => void
  defaultTheme?: PosterThemeKey
}

export function WavingLandingModal({
  onClosed,
  defaultTheme = "cyan",
  name = "Shivam",
  year = "2026",
  roles = ["Full Stack Engineer", "Systems Architect"],
  lettersLeft = ["P", "F"],
  giantLetter = "O",
  lettersRight = ["RT", "LIO"],
  title = "Shivam Singh — Portfolio",
  signature = "SHIVAM/SINGH",
  greeting = "Hi there!",
  intro = true,
}: WavingLandingModalProps) {
  // Opened on demand from the footer ("Say hi") — never auto-opens.
  const [isOpen, setIsOpen] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<PosterThemeKey>(defaultTheme)

  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const posterCardRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(false) // tracks previous isOpen for open→closed transitions

  const currentTheme = POSTER_THEMES[selectedTheme]

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      onClosed?.()
    }, 280)
  }, [onClosed])

  // Focus management: auto-focus on open, restore on genuine close only
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      wasOpenRef.current = true
      // Move focus into dialog on open (onto the Enter Portfolio action)
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else if (wasOpenRef.current) {
      // Only restore focus on a genuine open → closed transition
      wasOpenRef.current = false
      previousActiveElement.current?.focus()
    }
  }, [isOpen])

  // Keyboard navigation & Focus Trap (Escape to close, Tab contained inside dialog)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
        return
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          // Shift + Tab: wrap from first to last
          if (
            document.activeElement === firstElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab: wrap from last to first
          if (
            document.activeElement === lastElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Pop-up Overlay */}
      {isOpen && (
        <div
          ref={backdropRef}
          onPointerDown={(e) => {
            // If the click is on the backdrop or anywhere outside the poster card, enter portfolio
            if (
              posterCardRef.current &&
              !posterCardRef.current.contains(e.target as Node) &&
              !(e.target as Element).closest("button")
            ) {
              handleClose()
            }
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-3 backdrop-blur-md transition-opacity duration-300 sm:p-5 md:p-8 ${
            isClosing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Waving Portfolio Intro Poster"
        >
          {/* Dialog Content Container for Focus Trap */}
          <div ref={dialogRef} className="flex w-full max-w-5xl flex-col items-center">
            {/* Top Bar with Dismiss Controls & Live Palette Selector */}
            <div className="mb-2 flex w-full select-none flex-wrap items-center justify-between gap-3 px-1">
              {/* Color Switcher Pills */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md">
                <span className="flex items-center gap-1 pl-2 pr-1 font-mono text-[10px] text-slate-400">
                  <Palette className="h-3 w-3 text-cyan-400" />
                  <span className="hidden sm:inline">Theme:</span>
                </span>
                {(Object.keys(POSTER_THEMES) as PosterThemeKey[]).map((key) => {
                  const t = POSTER_THEMES[key]
                  const isActive = selectedTheme === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedTheme(key)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] transition-all duration-200 ${
                        isActive
                          ? "border border-white/20 bg-white/15 font-medium text-white shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                          : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className="inline-block h-2 w-2 shrink-0 rounded-full shadow-sm"
                        style={{ backgroundColor: t.previewColor }}
                      />
                      <span>{t.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Enter Portfolio Dismiss Button */}
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                type="button"
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 active:scale-95"
              >
                <span>ENTER PORTFOLIO</span>
                <X className="h-3.5 w-3.5 text-white/80" />
              </button>
            </div>

            {/* Poster Container Card */}
            <div
              ref={posterCardRef}
              className={`relative h-[82vh] max-h-[740px] w-full overflow-hidden rounded-2xl border shadow-[0_0_60px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
              style={{
                backgroundColor: currentTheme.paper,
                borderColor: `${currentTheme.accent}33`,
                boxShadow: `0 0 60px ${currentTheme.accent}15`,
              }}
            >
              <WavingPortfolioLanding
                key={selectedTheme}
                name={name}
                year={year}
                roles={roles}
                lettersLeft={lettersLeft}
                giantLetter={giantLetter}
                lettersRight={lettersRight}
                title={title}
                signature={signature}
                greeting={greeting}
                accent={currentTheme.accent}
                paper={currentTheme.paper}
                ink={currentTheme.ink}
                skin={currentTheme.skin}
                intro={intro}
                height="100%"
              />
            </div>

            {/* Bottom Hint Action */}
            <div className="mt-2 select-none text-center">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer font-mono text-[11px] text-white/50 transition-colors hover:text-white focus:underline focus:outline-none"
              >
                Click anywhere outside the poster or press ESC to enter portfolio ↓
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WavingLandingModal
