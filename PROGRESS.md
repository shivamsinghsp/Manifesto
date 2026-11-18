# PROGRESS

Resume point for the 3D playful upgrade. Details: `docs/AUDIT.md` (Phase 1), `docs/PLAN.md` (Phase 2), `docs/OWNER_TODO.md` (things only the owner can do).

## Status: ✅ COMPLETE: see `docs/FINAL_REPORT.md`

Built in the final pass: pill nav + Ctrl/Cmd+K palette (lazy), build-cube hero, status chips, typed line, say-hi chip, profile.json card, four playground labs, project-card brackets and follow chips, count-up stats, marquee + matter-js footer sandbox, giant footer name. Final dates: Knowledge Hub Jun–Sep 2026, Hume Jun–Jul 2025. Verification: vitest 38/38, e2e 60/4 skipped, matrix 156/156 clean, Lighthouse ≥ 91 everywhere except the home page (median 92, range 88–95).

## Status (previous): ✅ Gate B complete · ✅ mascot approved (Gate C, owner answers applied)

### Owner answers applied (2026-11-18)

- Mascot kept; refined to a professional "screen face" (no googly eyes, smile or wave). Lighthouse `/` 92 light / 94 dark, CLS 0.009.
- Shynr roles: Super Admin 100 · Sub Admin 50 · Employee 20 · User 10 (matches `auth-rbac.svg`).
- Microsoft Graph added (skills, Knowledge Hub page, resume). Phone stays on the PDF. The "5,000+" figure stays unpublished.
- AaoSeekhe: Jul 2026 – Aug 2026 (confirmed).
- Resume PDF regenerated (one page).

Next from the plan: pill nav + ⌘K palette, typed terminal hero, build-cube scene, labs, marquee + physics footer.

Full report: `docs/GATE_B_REPORT.md`.

### Gate B completion pass (2026-11-18)

- Career facts updated per the latest owner brief (Rapsora Full Stack Developer; Androcoders Software Engineering Intern May–Sep 2025 with internship/training phases; graduated Jul 2026, CGPA 7.24).
- `/resume` web document + generated one-page ATS PDF (`npm run resume:pdf`).
- Knowledge Hub verified-only scope; GPS-spoofing caveat; Kanpur screenshots redacted; client name scrubbed from the tree.
- Mascot "Node" behind `site.features.mascot`, for Gate C.
- Vercel: production deploy of `main` @ 0ef2530 succeeded; every branch preview succeeds.
- Verification: vitest 38/38, e2e 55 passed / 3 skipped, matrix 156/156 clean, Lighthouse ≥ 91 / 100 / 100 / 100.

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
