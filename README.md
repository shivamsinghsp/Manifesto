# Shivam Singh — Portfolio

An engineer's portfolio with a "systems thinking" look: mono labels, case-study depth, a 3D system-architecture hero, an interactive tech-stack orbit and a 3D geofencing lab.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · React Three Fiber + drei (three.js) · GSAP ScrollTrigger · Lenis · zod · Resend · Vitest · Playwright

---

## Quick start

```bash
npm ci
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

| Script                            | What it does                                                                                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                     | Dev server                                                                                                                                                 |
| `npm run build` / `npm start`     | Production build / serve it                                                                                                                                |
| `npm run lint`                    | ESLint (`next/core-web-vitals` + TypeScript), zero warnings allowed                                                                                        |
| `npm run type-check`              | `tsc --noEmit`                                                                                                                                             |
| `npm test`                        | Vitest unit tests (geo maths, contact validation, rate limiting, search, content integrity)                                                                |
| `npm run test:e2e`                | Playwright suite on desktop + mobile (starts `npm start`; run `npm run build` first)                                                                       |
| `npm run format` / `format:check` | Prettier (with Tailwind class sorting)                                                                                                                     |
| `npm run resume:pdf`              | Prints `/resume` to `public/resume.pdf` (A4, must be one page). Run `npm run build` first; set `PW_CHROMIUM_PATH` if Playwright's browser isn't installed. |

CI (`.github/workflows/playwright.yml`) runs lint → types → unit → build → e2e on pushes and PRs to `main`.

> Running `next dev` and `next start` at the same time? Give dev its own build dir: `NEXT_DIST_DIR=.next-dev npm run dev`.

---

## Environment variables

| Name                   | Required                               | Purpose                                                                                                                                                                              |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Recommended                            | Canonical origin (no trailing slash). Drives canonical tags, `og:url`, sitemap, robots and JSON-LD. Defaults to `https://myportfolio-gilt-xi-63.vercel.app`.                         |
| `RESEND_API_KEY`       | For the contact form                   | API key from [resend.com](https://resend.com). Without it the form shows an honest "email me directly" fallback.                                                                     |
| `CONTACT_TO_EMAIL`     | Optional                               | Inbox that receives messages (defaults to the email in `src/content/site.ts`).                                                                                                       |
| `CONTACT_FROM_EMAIL`   | Optional, but needed for real delivery | Sender address on a **domain verified in Resend**, e.g. `Portfolio <hello@yourdomain.com>`. The default `onboarding@resend.dev` only delivers to the Resend account owner's address. |

Set these in **Vercel → Project → Settings → Environment Variables** for Production and Preview. Never commit `.env*` files; only `.env.example` is tracked.

---

## Editing content

All content is typed and lives in `src/content/`. Pages, metadata, JSON-LD, the sitemap and OG images all read from these files.

| File            | What's in it                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.ts`       | Name, title, email, socials, resume path, nav, closing CTA line, **profile photo path**                                                                                                                   |
| **`career.ts`** | **Single source of truth for career facts**: engagements (Rapsora, Androcoders), education, the role and dates of every project, independent work, recognitions and availability. Durations are computed. |
| `projects.ts`   | Case-study content: category, description, tags, links, **outcomes**, sections (`product-feature`, `text`, `diagram`, `image`, `two-column`). Role, engagement and timeline are pulled from `career.ts`.  |
| `skills.ts`     | Stack groups shown in the 3D orbit and the accessible list (only list technologies you've actually used)                                                                                                  |
| `knowledge.ts`  | Answers behind "Ask Shivam's Work" (keyword-scored; see `src/lib/search.ts`). Career answers are generated from `career.ts`.                                                                              |
| `hero.ts`       | The five-step IDEA → PRODUCT sequence                                                                                                                                                                     |

### Editing career facts (`src/content/career.ts`)

- Dates are `"YYYY-MM"` or `"YYYY-MM-DD"`. Durations ("10 mos", "26 days (≈4 weeks)") and labels ("Jan 2026 – Oct 2026") are computed in `src/lib/dates.ts`.
- Unknown dates: `{ start: null, end: null, confirmed: false }` renders **"Dates to be confirmed"**.
- Unverified dates: `confirmed: false` adds "(to be confirmed)". Approximate dates: `approximate: true` plus optional `startQualifier` / `endQualifier` ("mid", "early").
- To add a project, add a `ProjectRole` under its engagement (or `independentProjects`) **and** a matching entry in `projects.ts`. The build fails if they don't match.
- `src/content/career.test.ts` fails if any other source file states a month-year date, a "N months/weeks" duration or a year range. That keeps facts in one place.
- `public/resume.pdf` **is generated** from `career.ts` + `src/content/resume.ts` (bullet wording) by `npm run resume:pdf`. Regenerate and commit it whenever either file changes.

### Privacy rules for assets

- Never commit screenshots that show a confidential client's name or logo, or real people's names, contact details or faces. Use original illustrations or blurred copies (see `*-redacted.png`).
- Files in `public/` can be downloaded by URL even when no page uses them, so remove sensitive originals rather than just unlinking them.
- Feature switches live in `site.features` (`mascot` is pending owner approval).

**Rules for content:** outcomes and metrics must be facts stated in the project record or the resume. Case-study sections are numbered automatically (01 Overview, 02 Outcomes, then each section in order). A `text` section written as `01\nProblem\n→ Solution` renders as structured challenge cards.

**Adding your photo:** put a square image (≥ 800px) at `public/images/profile.jpg` and set `photo: "/images/profile.jpg"` in `src/content/site.ts`. Until then a monogram frame is shown.

**Adding a project:** add an entry to `projects.ts`, put screenshots in `public/images/projects/<slug>/` and diagrams in `public/diagrams/projects/<slug>/`, and include each diagram's viewBox `width`/`height`. The route, sitemap entry and OG image are generated automatically.

---

## Theming

- Light / Dark / System via `next-themes` (`data-theme` on `<html>`, saved in `localStorage["theme"]`, applied before first paint).
- All colours are CSS variables in `src/app/globals.css`, stored as RGB channels (`--c-text: 20 23 31`) so Tailwind opacity modifiers work (`bg-accent/10`). Don't hard-code hex values in components; add a token.
- Diagrams in `public/diagrams` use `dg-*` classes backed by `--dg-*` variables and are inlined at build time (`src/lib/svg.ts`), so they follow the theme. They still render (dark) as standalone files.
- 3D scenes read `--canvas-*` variables through `useScenePalette()`; toggling updates materials in place without remounting the canvas.

## Structure

```
src/
  app/                    routes (App Router), metadata routes (sitemap, robots, manifest, OG/Twitter images, icons), /api/contact
  components/
    layout/               Header, MobileNav, Footer
    sections/             Hero (canvas, steps, fallback), SkillsSection
    case-study/           SectionNav, ReadingProgress, Outcomes, Challenges
    engineering/          WorkAssistant ("Ask Shivam's Work"), ArchitectureDiagram, playgrounds/ (GeoLab 3D + GeofencingLab 2D fallback)
    three/                R3F scenes (HeroScene, SkillsScene, GeoScene) + canvas governor, lazy mount, textures, error boundary
    motion/               SmoothScroll (Lenis), ScrollEffects (reveals/parallax), Preloader, RouteTransition, TransitionLink (View Transitions), Cursor, Magnetic, MotionToggle
    theme/                ThemeProvider (next-themes), ThemeToggle, useThemeSwitch (View Transitions reveal)
    ui/                   ProjectCard, ProjectMedia, CareerLog, TiltCard, Timeline, SectionHeading, EmailLink, ProfilePhoto, buttons
  content/                typed content (see above)
  lib/                    geo (Haversine + projection), contact schema, rate limiter, seo, device tiering, motion preference, search
tests/site.spec.ts        Playwright e2e
```

### How the 3D stays fast and accessible

- Every canvas is decorative (`aria-hidden`); the real information is always HTML (step rail, stack list, geofence readout).
- Scenes load through `next/dynamic` (`ssr: false`) and mount only once the section is near the viewport **and** the visitor has interacted (or after an idle fallback), so they never compete with LCP or input readiness.
- Device pixel ratio is capped at 1 on low-end devices, 1.5 on touch/mid-range and 2 on desktop. Particle counts scale with the device tier. There is no post-processing: glow comes from additive sprites.
- Render loops stop when a canvas is offscreen or the tab is hidden. Geometries and textures are disposed on unmount. The city in the geofence lab is a single instanced mesh.
- If WebGL isn't available or the context fails, a static SVG fallback or the 2D lab is shown instead.
- `prefers-reduced-motion` and the on-site **Reduce motion** switch (saved in `localStorage`) turn off smooth scrolling, reveals, the hero pin, the cursor, tilt and magnetic effects, and switch scenes to on-demand rendering.

### Contact form

Client and server share one zod schema (`src/lib/contact.ts`). The API adds a body-size cap, a honeypot plus a time-to-submit trap, a per-IP rate limit (5 per 10 minutes, kept in memory per instance — swap in Upstash Redis for strict global limits) and a 10 s send timeout. It returns field-level errors.

### Notable dependencies

| Package                                            | Why                                                                                                                                                                                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `three`, `@react-three/fiber`, `@react-three/drei` | Declarative WebGL scenes with React lifecycle (automatic disposal, suspense, performance monitor). `three` is pinned to 0.182 because later versions log a deprecation warning from R3F's internal clock. |
| `gsap` (+ ScrollTrigger)                           | Scroll-linked hero progress and parallax                                                                                                                                                                  |
| `lenis`                                            | Smooth wheel scrolling on desktop (off on touch and with reduced motion)                                                                                                                                  |
| `zod`                                              | One validation schema for client and server                                                                                                                                                               |
| `resend`                                           | Email delivery for the contact form                                                                                                                                                                       |
