"use client"

/** Skip link that always moves keyboard focus to <main>, whatever scroll library is active. */
export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        const main = document.getElementById("main")
        if (!main) return
        e.preventDefault()
        main.focus({ preventScroll: true })
        main.scrollIntoView({ block: "start" })
        history.replaceState(null, "", "#main")
      }}
      className="sr-only-focusable fixed left-4 top-3 z-[2000] rounded-lg bg-cta-bg px-4 py-3 font-mono text-xs uppercase tracking-wider text-cta-text"
    >
      Skip to content
    </a>
  )
}
