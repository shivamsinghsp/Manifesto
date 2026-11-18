"use client"

import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  Copy,
  FileDown,
  FileText,
  Hand,
  Monitor,
  Moon,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from "lucide-react"
import { NAV_LINKS, site } from "@/content/site"
import { projects } from "@/content/projects"
import { searchPortfolio } from "@/lib/search"
import { setMotionReduced, useReducedMotion } from "@/lib/motion-preference"
import { useThemeSwitch } from "@/components/theme/useThemeSwitch"

export const OPEN_PALETTE_EVENT = "open-command-palette"
export const OPEN_POSTER_EVENT = "open-intro-poster"

const EASTER_EGG = /^sudo\s+hire\s+shivam$/i

const itemClass =
  "flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-3 text-sm text-text-secondary outline-none data-[selected=true]:bg-accent/10 data-[selected=true]:text-text"
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-text-tertiary"

/** Ctrl/Cmd+K palette: pages, projects, "Ask Shivam's Work" answers and site actions. */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [toast, setToast] = useState<string | null>(null)
  const router = useRouter()
  const reduced = useReducedMotion()
  const { switchTo } = useThemeSwitch()
  const returnFocus = useRef<HTMLElement | null>(null)

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])
  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setToast(null)
    returnFocus.current?.focus?.({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (open) close()
        else show()
      }
    }
    const onOpen = () => show()
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [open, show, close])

  const answers = useMemo(
    () => (query.trim().length > 2 ? searchPortfolio(query).slice(0, 3) : []),
    [query]
  )
  const egg = EASTER_EGG.test(query.trim())

  const run = (fn: () => void) => () => {
    fn()
    close()
  }
  const go = (href: string) => run(() => router.push(href))

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(o) => (o ? show() : close())}
      label="Command palette"
      shouldFilter={!egg}
      overlayClassName="fixed inset-0 z-[1500] bg-bg/70 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[12vh] z-[1501] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
    >
      <div className="flex items-center gap-2 border-b border-border px-4">
        <Terminal className="h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search pages and projects, or ask about Shivam's work…"
          className="h-14 w-full bg-transparent font-mono text-sm text-text outline-none placeholder:text-text-tertiary"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-tertiary sm:block">
          ESC
        </kbd>
      </div>
      <Command.List className="max-h-[min(60vh,460px)] overflow-y-auto p-2">
        {egg ? (
          <div
            className="m-2 rounded-xl border border-accent/40 bg-accent/10 p-4 font-mono text-sm text-text"
            role="status"
          >
            <p className="text-accent-text">[sudo] access granted ✓</p>
            <p className="mt-1 text-text-secondary">Request queued. Fastest route: {site.email}</p>
            <button
              type="button"
              onClick={go("/contact")}
              className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-cta-bg px-3 text-xs uppercase tracking-wider text-cta-text"
            >
              Open contact <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <Command.Empty className="px-3 py-6 text-center text-sm text-text-tertiary">
              No matches. Try “geofencing”, “SharePoint” or “resume”.
            </Command.Empty>

            {answers.length > 0 && (
              <Command.Group heading="Ask Shivam's Work" className={groupClass} forceMount>
                {answers.map((a) => (
                  <Command.Item
                    key={a.id}
                    value={`answer ${a.id} ${query}`}
                    onSelect={a.projectSlug ? go(`/work/${a.projectSlug}`) : run(() => {})}
                    className={`${itemClass} items-start py-2.5`}
                    forceMount
                  >
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-text"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-3 text-[13px] leading-relaxed">{a.answer}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group heading="Pages" className={groupClass}>
              {[
                { href: "/", label: "Home" },
                ...NAV_LINKS,
                { href: "/playground", label: "Engineering Playground" },
                { href: "/resume", label: "Resume" },
              ].map((l) => (
                <Command.Item
                  key={l.href}
                  value={`page ${l.label}`}
                  onSelect={go(l.href)}
                  className={itemClass}
                >
                  <ArrowRight className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
                  {l.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Case studies" className={groupClass}>
              {projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`project ${p.title} ${p.tags.join(" ")}`}
                  onSelect={go(`/work/${p.slug}`)}
                  className={itemClass}
                >
                  <FileText className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
                  <span className="flex-1 truncate">{p.title}</span>
                  <span className="hidden font-mono text-[11px] text-text-tertiary sm:block">
                    {p.role}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className={groupClass}>
              <Command.Item
                value="theme light"
                onSelect={run(() => switchTo("light"))}
                className={itemClass}
              >
                <Sun className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Theme: Light
              </Command.Item>
              <Command.Item
                value="theme dark"
                onSelect={run(() => switchTo("dark"))}
                className={itemClass}
              >
                <Moon className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Theme: Dark
              </Command.Item>
              <Command.Item
                value="theme system"
                onSelect={run(() => switchTo("system"))}
                className={itemClass}
              >
                <Monitor className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Theme: System
              </Command.Item>
              <Command.Item
                value="reduce motion toggle animations"
                onSelect={run(() => setMotionReduced(!reduced))}
                className={itemClass}
              >
                <Zap className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
                {reduced ? "Turn animations back on" : "Reduce motion"}
              </Command.Item>
              <Command.Item
                value="copy email address"
                onSelect={() => {
                  navigator.clipboard?.writeText(site.email).then(
                    () => setToast("Email copied"),
                    () => setToast(site.email)
                  )
                }}
                className={itemClass}
              >
                <Copy className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Copy email
                {toast && (
                  <span className="ml-auto font-mono text-[11px] text-accent-text">{toast}</span>
                )}
              </Command.Item>
              <Command.Item
                value="download resume pdf cv"
                onSelect={run(() => window.open(site.resumePath, "_blank", "noopener"))}
                className={itemClass}
              >
                <FileDown className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Download
                resume (PDF)
              </Command.Item>
              <Command.Item
                value="say hi intro poster wave"
                onSelect={run(() => window.dispatchEvent(new Event(OPEN_POSTER_EVENT)))}
                className={itemClass}
              >
                <Hand className="h-4 w-4 text-text-tertiary" aria-hidden="true" /> Say hi (open the
                intro poster)
              </Command.Item>
            </Command.Group>
          </>
        )}
      </Command.List>
      <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-text-tertiary">
        <span>↑↓ navigate · ↵ open</span>
        <span className="hidden sm:inline">psst: try “sudo hire shivam”</span>
      </div>
    </Command.Dialog>
  )
}

/** Button that opens the palette (shows the right shortcut for the platform). */
export function CommandTrigger({ className }: { className?: string }) {
  const [mac, setMac] = useState(false)
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform)), [])
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
      aria-label="Open command palette"
      aria-keyshortcuts="Control+K Meta+K"
      className={className}
    >
      <Terminal className="h-4 w-4" aria-hidden="true" />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden rounded border border-border px-1.5 font-mono text-[10px] text-text-tertiary sm:inline">
        {mac ? "⌘K" : "Ctrl K"}
      </kbd>
    </button>
  )
}
