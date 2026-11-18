# Phase 2 Plan: 3D Playful Upgrade (Gate A)

## Principles

1. **Evolve, don't rebuild.** `main` already has the new template, the R3F scenes, the canvas governor, Lenis/GSAP, the contact API and the tests. Every slice extends these.
2. **One source of truth.** A new `src/content/career.ts` holds the typed career and engagement facts. `experience.ts`, the project role/engagement/timeline fields, `knowledge.ts`, JSON-LD and metadata all derive from it. A unit test fails the build if any content file contains a hard-coded career date or duration string.
3. **Every commit is deployable.** Each one passes lint, types, unit tests and build.

## Design system

### Colour tokens (CSS variables, `[data-theme]` on `<html>`)

| Token                                                                                               | Dark (unchanged)        | Light (new: warm paper, not grey-on-white) |
| --------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------ |
| `--color-bg`                                                                                        | `#0A0E17`               | `#F6F4EF`                                  |
| `--color-surface`                                                                                   | `#111728`               | `#FFFFFF`                                  |
| `--color-surface-alt`                                                                               | `#162036`               | `#EEEBE3`                                  |
| `--color-text`                                                                                      | `#F1F3F7` (16–17:1)     | `#14171F` (15–18:1)                        |
| `--color-text-secondary`                                                                            | `#A8AFBF` (7.4–8.8:1)   | `#3D4452` (8.2–9.8:1)                      |
| `--color-text-tertiary`                                                                             | `#8590A4` (5.0–6.0:1)   | `#5A6170` (5.2–6.2:1)                      |
| `--color-accent` (text use)                                                                         | `#00E5FF` (10.5:1+)     | `#005F70` (6.1–7.3:1)                      |
| `--color-accent` (fills/strokes)                                                                    | `#00B8D4`               | `#00758A` (4.5:1+)                         |
| `--color-border`                                                                                    | `rgba(255,255,255,.10)` | `rgba(20,23,31,.12)`                       |
| new `--color-chip-bg/-fg`, `--color-focus`, `--color-glow`, `--color-diagram-*`, `--color-canvas-*` |                         |                                            |

All ratios were computed against bg, surface and surface-alt. This fixes the anti-example (07): no grey-on-white muted text, and every panel takes surface tokens. Hard-coded `bg-[#…]`, `text-white/…` and `border-white/…` are replaced by semantic Tailwind tokens. An ESLint `no-restricted-syntax` rule plus a unit test flag new hex values in `src/components`.

### Theme mechanics

- `next-themes` with `attribute="data-theme"`, Light / Dark / System, saved in localStorage. Its blocking inline script prevents a flash of the wrong theme.
- `viewport.themeColor` given as a `[{media: dark}, {media: light}]` pair. `color-scheme` set per theme.
- The toggle uses `document.startViewTransition` with a `clip-path: circle()` reveal from the button. It falls back to an instant swap under reduced motion or without browser support.
- **3D:** one `useThemeColors()` hook reads computed CSS variables and pushes them into materials, uniforms, fog and lights through refs. Canvases are transparent (`alpha`). Additive "glow" sprites drop to about 25% opacity in light mode. The canvas is never remounted.
- **Diagrams:** the 13 SVGs get rewritten to use `currentColor` + CSS variables, then **inlined** through a small server component (they're static files I control) so they inherit the theme. The self-drawing animation moves to `stroke-dashoffset` on the inlined paths.
- **Screenshots:** a framed `Screenshot` component with token border and shadow. Lighter shadow plus a 1px hairline in light mode.
- **OG images:** a neutral design that reads in either client theme (dark card, high contrast).

### Type and motion

- Keep IBM Plex Serif (display), Sans (body), Mono (labels). A pixel/mono accent font for **short labels only** (chips, `// 01.`, terminal prompt). I'll reuse Plex Mono rather than add another font family (protects LCP).
- Motion tokens already exist (`--ease-out-expo`, 150/300/400/600 ms). Add the "playful" spring easing for chips and mascot only.

## Hero 3D: Option A ("build cube"). Recommended.

**Why:** it tells the systems-thinking story (IDEA → DESIGN → ARCHITECTURE → CODE → PRODUCT) that the site is built around, and it **reuses** `HeroScene` + `hero-store` + `HeroSteps`, which already map scroll to those five steps. Option B (tech blocks) would duplicate the Skills orbit and the new physics footer.
The current abstract node scene evolves into one morphing object: wireframe sketch cube (IDEA) → face panels / grid UI (DESIGN) → exploded layered blocks with connectors (ARCHITECTURE) → glyph-textured faces (CODE) → solid bevelled product cube with a soft shadow (PRODUCT). Built from instanced primitives and lerped transforms, with no model files.
The headline, typed terminal intro, status chips, CTAs and profile.json card are server-rendered HTML. The canvas mounts after interaction or idle, as it does now. LCP stays a text node.

## Per-section concepts

| Section          | Concept                                                                                                                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nav              | Floating pill (logo dot · links · `⌘K` · theme toggle · motion toggle in overflow). Full-screen sheet on mobile, made `inert` when closed.                                                                                                                                                                                |
| Command palette  | `cmdk`. Searches pages, projects and sections, and has "Ask Shivam's Work" answers inline (reuses `lib/search.ts` over `knowledge.ts`). Actions: theme, reduce motion, copy email, open resume, "Say hi" poster.                                                                                                          |
| Hero             | Status chips (`● open to opportunities`, `~/shivam`, `software engineer`). Typed terminal intro, decorative only (`aria-hidden`; the h1 stays real text). `profile.json` card generated from `career.ts` + `site.ts`.                                                                                                     |
| Mascot           | Original "Node": a small rounded-cube character (ties to the build cube). Plain SVG + CSS, blinks and looks toward the cursor. Hidden under reduced motion, static on touch. **Needs your approval at gate C.**                                                                                                           |
| Experience       | `career.log` timeline cards: monogram logo tile (no third-party logos unless you supply them), tags, computed durations ("10 mos"), nested engagement projects, education.                                                                                                                                                |
| Project cards    | Corner-bracket frame, 3D tilt (existing `TiltCard`), floating tag chips that follow the cursor on desktop and are static on touch.                                                                                                                                                                                        |
| Case studies     | Existing sticky nav + progress. Add count-up stats (Outcomes), inlined self-drawing diagrams, theme-aware frames.                                                                                                                                                                                                         |
| Playground       | Keep GeoLab. Add **RBAC sandbox**, **ATS pipeline board** (drag + keyboard), **QA state-machine simulator** (Draft → Submitted → Under Review → Approved/Rejected, illegal transitions blocked), **rate-limiter visualiser** (token bucket mirroring `lib/rate-limit.ts`), **Hume AI card**. All plain DOM/SVG, no WebGL. |
| /resume          | Web document: sidebar, "On this page" TOC, Copy Markdown (generated from `career.ts`), download `/resume.pdf`.                                                                                                                                                                                                            |
| Marquee + footer | CSS marquee ticker (pauses on hover/focus and under reduced motion). Physics sandbox with `matter-js`, lazy-loaded when the footer is near, with real stack chips, drag/throw, REDROP button. A static chip grid under reduced motion or on low-end devices. Giant footer name.                                           |
| Easter eggs      | (1) Konami / typing `sudo hire shivam` in the palette triggers a confetti-free "access granted" terminal toast. (2) Clicking the mascot 5× makes it build a tiny cube. "Say hi" poster moves into the palette and a hero chip.                                                                                            |
| GitHub heatmap   | Server fetch with `GITHUB_TOKEN`, `revalidate: 86400`, graceful fallback. Ships only if activity looks dense. I'll report the numbers first.                                                                                                                                                                              |
| Sounds           | Optional, **off by default**, toggle in the palette. Likely skipped unless time allows.                                                                                                                                                                                                                                   |

## Dependencies

| Package                       | Decision                                        | Reason                                                                                                                                        |
| ----------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-themes`                 | **Add** (~2 kB)                                 | No-flash theme script, System mode, sync across tabs.                                                                                         |
| `cmdk`                        | **Add** (~6 kB gz)                              | Accessible combobox palette (ARIA, keyboard), unstyled so it themes cleanly.                                                                  |
| `matter-js` (+ types)         | **Add, lazy** (~25 kB gz, only near the footer) | 2D drag/throw physics for chips. Far lighter than a 3D engine.                                                                                |
| Lenis                         | **Keep** (already installed)                    |                                                                                                                                               |
| GSAP + ScrollTrigger          | **Keep** (already installed)                    | Reveals, scroll-scrubbed hero, count-ups.                                                                                                     |
| Framer Motion                 | **Skip**                                        | It would duplicate GSAP and add about 30 kB. CSS + GSAP cover page transitions and springs.                                                   |
| `@react-three/rapier`         | **Skip**                                        | About 1 MB WASM for a feature that 2D matter-js handles. Would hurt mobile Lighthouse.                                                        |
| `@react-three/postprocessing` | **Skip**                                        | Bloom costs a full-screen pass. Additive sprites already fake the glow, and light mode wants little or none. Revisit only if gate C needs it. |

## Execution order (vertical slices; ⛔ = approval gate)

1. ⛔ **Gate A**: this audit + plan.
2. `career.ts` single source + derived experience/projects/knowledge/JSON-LD + duration utils + tests.
3. Content fixes: PLEDGE context and portal link; Kanpur wording, link and privacy-safe screenshots; AaoSeekhe / Shynr roles; title-case helper; PLEDGE hero illustration; Hume card; `inert` hidden copies.
4. Theme system: tokens, next-themes, toggle with view transition, token sweep (35 files), SVG diagram rewrite + inlining, themed 3D hook, theme-color, contrast test.
5. Screenshot matrix (6 widths × 2 themes × all routes) + console capture + Lighthouse. ⛔ **Gate B**.
6. Pill nav + ⌘K palette. Hero chips/terminal/profile.json. Build-cube scene. Mascot. ⛔ **Gate C** (with Lighthouse).
7. Timeline, project cards, case-study polish, playground labs, /resume doc, marquee + physics footer, easter eggs, heatmap decision.
8. Contact styling + env verification, README, final matrix + Lighthouse, final report.

## Branch

The session's git policy pins development to **`claude/portfolio-3d-dark-light-lk25tq`**, so I'm committing there instead of `feature/3d-playful-upgrade`. Tell me if you want it mirrored or renamed. Nothing goes to `main`.
