"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import WavingPortfolioLanding, { WavingPortfolioLandingProps } from "@/components/ui/waving-portfolio-landing"
import { X, Hand, Palette } from "lucide-react"

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
    accent: "#00E5FF",       // Electric Cyan matching Shivam's portfolio branding
    paper: "#070A11",        // Deep Obsidian Midnight (matches portfolio bg)
    ink: "#F1F5F9",          // Crisp slate
    skin: "#F5EBE1",         // Natural warm skin tone
    previewColor: "#00E5FF",
  },
  gold: {
    id: "gold",
    name: "Champagne Gold",
    accent: "#F2C069",       // Warm, prestigious, elegant gold
    paper: "#070A11",        // Deep Obsidian Midnight
    ink: "#F1F5F9",
    skin: "#F5EBE1",
    previewColor: "#F2C069",
  },
  emerald: {
    id: "emerald",
    name: "Mint Emerald",
    accent: "#10B981",       // Refined tech emerald
    paper: "#070A11",
    ink: "#F1F5F9",
    skin: "#F5EBE1",
    previewColor: "#10B981",
  },
  terracotta: {
    id: "terracotta",
    name: "Warm Editorial",
    accent: "#C25E3E",       // Soft Japanese risograph terracotta
    paper: "#F4EFE6",        // Gentle muted warm cream
    ink: "#18181B",
    skin: "#F4EFE6",
    previewColor: "#C25E3E",
  },
}

interface WavingLandingModalProps extends Partial<WavingPortfolioLandingProps> {
  /** Whether to automatically show the modal when the portfolio opens */
  autoOpen?: boolean
  defaultTheme?: PosterThemeKey
}

export function WavingLandingModal({
  autoOpen = true,
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
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<PosterThemeKey>(defaultTheme)
  
  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const currentTheme = POSTER_THEMES[selectedTheme]

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
    }
  }, [autoOpen])

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 280)
  }, [])

  // Focus management: Trap focus inside dialog, auto-focus on open, restore on close
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      // Move focus into dialog on open (onto the Enter Portfolio action)
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      // Restore focus to launcher button or previous element
      if (launcherRef.current) {
        launcherRef.current.focus()
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
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
          if (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab: wrap from last to first
          if (document.activeElement === lastElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  // Prevent background body scroll & mark background inert while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      // Mark main content container inert if present
      const mainContainer = document.querySelector("main") || document.querySelector("article")
      if (mainContainer) {
        mainContainer.setAttribute("aria-hidden", "true")
        if ("inert" in mainContainer) {
          ;(mainContainer as any).inert = true
        }
      }

      return () => {
        document.body.style.overflow = ""
        if (mainContainer) {
          mainContainer.removeAttribute("aria-hidden")
          if ("inert" in mainContainer) {
            ;(mainContainer as any).inert = false
          }
        }
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Floating launcher badge when modal is closed */}
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Replay intro poster"
          className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black text-[#F1F5F9] text-xs font-mono border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 group"
          style={{
            borderColor: `${currentTheme.accent}40`,
          }}
        >
          <Hand 
            className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform origin-bottom" 
            style={{ color: currentTheme.accent }}
          />
          <span>Intro Poster</span>
        </button>
      )}

      {/* Pop-up Overlay */}
      {isOpen && (
        <div
          ref={backdropRef}
          onPointerDown={(e) => {
            // "when clicked outside it then the portfolio should open"
            if (e.target === backdropRef.current) {
              handleClose()
            }
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
            isClosing ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Waving Portfolio Intro Poster"
        >
          {/* Dialog Content Container for Focus Trap */}
          <div ref={dialogRef} className="w-full max-w-5xl flex flex-col items-center">
            {/* Top Bar with Dismiss Controls & Live Palette Selector */}
            <div className="w-full flex flex-wrap justify-between items-center gap-3 mb-2 px-1 select-none">
              {/* Color Switcher Pills */}
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-mono text-slate-400 pl-2 pr-1 flex items-center gap-1">
                  <Palette className="w-3 h-3 text-cyan-400" />
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
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
                        isActive
                          ? "bg-white/15 text-white font-medium shadow-[0_0_10px_rgba(255,255,255,0.15)] border border-white/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span 
                        className="w-2 h-2 rounded-full inline-block shrink-0 shadow-sm" 
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
                className="ml-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono border border-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <span>ENTER PORTFOLIO</span>
                <X className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>

            {/* Poster Container Card */}
            <div 
              className={`relative w-full h-[82vh] max-h-[740px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border transition-all duration-300 ${
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

            {/* Bottom Hint */}
            <div className="mt-2 text-center select-none">
              <span className="text-[10px] font-mono text-white/50">
                Click anywhere outside the poster or press ESC to enter portfolio
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WavingLandingModal
