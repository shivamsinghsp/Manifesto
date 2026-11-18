# PROGRESS

Resume point for the 3D playful upgrade. Details: `docs/AUDIT.md` (Phase 1), `docs/PLAN.md` (Phase 2), `docs/OWNER_TODO.md` (things only the owner can do).

## Status: ⛔ waiting at Gate B (foundation + theme system + template migration)

## Done

- **Gate A** approved, with owner clarifications (title, dates, repos, Knowledge Hub = Rapsora + confidential, Kanpur claims).
- **Single source of truth:** `src/content/career.ts` + `src/lib/dates.ts`. `experience.ts` is deleted. Projects, knowledge base, JSON-LD, timeline and /playground all derive from it. Guard test: `src/content/career.test.ts`.
- **Content fact-check:** Kanpur (sole developer at Rapsora, kanpurarchitects.in, screenshot-verified features only, new site-map diagram). PLEDGE (QA-only notice, public context, Public portal link, original hero). AaoSeekhe and Shynr (solo developer at Rapsora; private repos shown as chips). Knowledge Hub (Rapsora, SPFx 1.20, Phase 2B, client unnamed).
- **Confidentiality:** the six Knowledge Hub screenshots showed the client's branding and people. Removed from `public/` and replaced with original illustrations. An e2e test guards it.
- **Theme system:** next-themes Light/Dark/System with no flash. RGB-channel tokens. AA-checked light palette. Theme menu with View Transitions circular reveal. theme-color sync. Diagrams inlined and themed. 3D palette updates materials without remounting.
- **Fixes:** TOC acronyms (`navLabel` + `titleCase`). Same-month periods. Skip link focus (Lenis anchors removed). Theme menu focus no longer scrolls. Mobile menu `inert`.
- **career.log** timeline on Home and /experience.

## Verification at Gate B

- build ✅ · lint ✅ (0 warnings) · type-check ✅ · vitest 34/34 ✅ · Playwright e2e 55 passed / 3 skipped (device-specific).
- Screenshot matrix: 13 routes × 6 widths × 2 themes = 156 renders, 0 console errors, 0 failed requests, 0 horizontal overflow, 1 h1 each.
- Theme checks: saved theme applied at DOMContentLoaded (no flash). Toggle persists across reload. Meta theme-color follows the choice. Same `<canvas>` element survives a toggle. No errors.
- Lighthouse mobile (local prod build), P / A / BP / SEO:
  - light: `/` 96/100/100/100 · `/work/shynr` 93/100/100/100 · `/experience` 97/100/100/100 · `/playground` 94/100/100/100 · `/contact` 97/100/100/100
  - dark: `/` 93/100/100/100 · `/work/shynr` 93/100/100/100 · `/experience` 96/100/100/100 · `/playground` 95/100/100/100 · `/contact` 94/100/100/100

## Next (after Gate B)

1. Floating pill nav + Ctrl/Cmd+K palette (cmdk) wired to "Ask Shivam's Work", theme and motion.
2. Hero: status chips, typed terminal intro, profile.json card from career.ts, build-cube scene (Option A), mascot → **Gate C**.

## Decisions

- Branch `claude/portfolio-3d-dark-light-lk25tq` (session policy).
- Rapsora title "Software Engineering Intern" (owner-confirmed).
- Private repos are rendered as non-link chips, not removed.
- 3D material colours for the geofence city are paired per theme inside `GeoScene.tsx` (scene art, not UI tokens).
- Intro-poster palettes are artwork presets. Their controls sit on a fixed dark scrim in both themes.

## Open questions

See `docs/OWNER_TODO.md`.
