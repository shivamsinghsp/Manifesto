# Final Report: 3D Playful Upgrade

Branch: `claude/portfolio-3d-dark-light-lk25tq` (based on `main` @ `0ef2530`). Companion docs: `docs/AUDIT.md` (Phase 1), `docs/PLAN.md` (Phase 2), `docs/GATE_B_REPORT.md` (facts, privacy, Vercel, contact form), `docs/OWNER_TODO.md`.

## Status

build ✅ · lint ✅ (0 warnings) · type-check ✅ · Vitest 38/38 ✅ · Playwright e2e 60 passed / 4 skipped (device-specific) ✅ · screenshot matrix 13 routes × 6 widths (320–1920) × 2 themes = 156 renders, 0 console errors, 0 failed requests, 0 horizontal overflow, one h1 each ✅

## Lighthouse (mobile, local production build)

| Route                                 | Before (main, dark only)¹ | After: light                        | After: dark           |
| ------------------------------------- | ------------------------- | ----------------------------------- | --------------------- |
| `/`                                   | 91 / 100 / 100 / 100      | 89–95 (median 92) / 100 / 100 / 100 | 91 / 100 / 100 / 100  |
| `/work`                               | 94 / 100 / 100 / 100      | 92 / 100 / 100 / 100                | 93 / 100 / 100 / 100  |
| `/work/shynr`                         | 94 / 100 / 100 / 100      | 91 / 100 / 100 / 100                | 92 / 100 / 100 / 100  |
| `/work/kanpur-architects-association` | 94 / 100 / 100 / 100      | 94 / 100 / 100 / 100                | 91 / 100 / 100 / 100  |
| `/work/aao-seekhe`                    | 93 / 100 / 100 / 100      | 91 / 100 / 100 / 100                | 94 / 100 / 100 / 100  |
| `/work/sharepoint-knowledge-hub`      | 93 / 100 / 100 / 100      | 94 / 100 / 100 / 100                | 94 / 100 / 100 / 100  |
| `/work/pledge-portal-qa`              | 93 / 100 / 100 / 100      | 92 / 100 / 100 / 100                | 92 / 100 / 100 / 100  |
| `/experience`                         | 95 / 100 / 100 / 100      | 95 / 100 / 100 / 100                | 93 / 100 / 100 / 100  |
| `/about`                              | 94 / 100 / 100 / 100      | 93 / 100 / 100 / 100                | 95 / 100 / 100 / 100  |
| `/playground`                         | 95 / 100 / 100 / 100      | 93 / 100² / 100 / 100               | 92 / 100² / 100 / 100 |
| `/contact`                            | 94 / 100 / 100 / 100      | 92 / 100 / 100 / 100                | 93 / 100 / 100 / 100  |
| `/resume`                             | 96 / 100 / 100 / 100      | 92 / 100 / 100 / 100                | 92 / 100 / 100 / 100  |

¹ From `docs/UPGRADE_REPORT.md` (the previous pass; the site was dark-only). ² After fixing a heading-order issue in the ATS lab.
**Gap explained:** the home page's performance varies between runs (88, 92, 95 in three consecutive runs). Total blocking time comes from Next.js's own post-load work (route prefetching and hydration in its framework chunk), not from the new features: the 3D scene mounts on interaction or after 6 s, the command palette and matter-js load on demand, and the mascot is pure SVG/CSS. The rest of the pages stayed within 1–4 points of before while gaining a full light theme.

## What was found

Full list in `docs/AUDIT.md` and `docs/GATE_B_REPORT.md`. Highlights:

- The repo was ahead of the live site. Vercel deployed `main` successfully; the stale alias needs checking in Vercel → Domains.
- Career facts contradicted the owner's facts in 9 places, and durations were hard-coded.
- **The six Knowledge Hub screenshots exposed the confidential client's name, logo and a named employee.** The client name was also in `docs/archive` and in my own test.
- Kanpur screenshots showed members' contact details and executives' faces. Several Kanpur, Shynr and AaoSeekhe claims weren't backed by evidence.
- Section-nav acronyms were mangled. The skip link didn't move focus (Lenis swallowed in-page links). The theme menu jumped the scroll. 13 SVG diagrams were unreadable on light backgrounds.

## What was fixed / added

- **One source of truth** (`src/content/career.ts`) with computed periods and durations, and a test that fails if any other file states a career date or duration.
- **Fact corrections:** Full Stack Developer at Rapsora (Jan–Oct 2026); Software Engineering Intern at Androcoders (May–Sep 2025, internship + training phases); B.Tech IT, graduated Jul 2026, CGPA 7.24; project roles and dates (Shynr Jan 15 – Feb 9 2026, PLEDGE Mar–May 2026, Kanpur ≈ mid-May – early Sep 2026, Knowledge Hub Jun–Sep 2026, AaoSeekhe Jul–Aug 2026, Hume EVI Jun–Jul 2025); Shynr roles Super Admin 100 · Sub Admin 50 · Employee 20 · User 10; Microsoft Graph added; unverifiable metrics removed.
- **Privacy:** confidential screenshots removed and replaced with original illustrations; Kanpur screenshots blurred; client name scrubbed from the tree; GPS-spoofing caveat added.
- **Theme system:** Light / Dark / System with no flash, persisted; RGB-channel tokens checked against WCAG AA; View Transitions circular reveal (instant under reduced motion); themed 3D (materials update in place, no remount); theme-color sync; inline themed diagrams.
- **Personality and 3D:** floating pill nav; **Ctrl/Cmd+K command palette** (pages, case studies, live "Ask Shivam's Work" answers, theme/motion/email/resume/poster actions, `sudo hire shivam` easter egg); status chips; typed terminal line (decorative, h1 stays text); "say hi" chip opening the intro poster; **build-cube hero** (27 instanced blocks morph IDEA → DESIGN → ARCHITECTURE → CODE → PRODUCT on scroll); **mascot "Node"** (approved); career.log timeline; profile.json card; project cards with corner brackets, 3D tilt, cursor-following tag chips (static chips always shown); count-up outcome stats; self-drawing diagrams.
- **Labs:** 3D geofencing lab (kept), plus RBAC sandbox, ATS pipeline board, QA state-machine simulator, rate-limiter visualiser, and the Hume EVI card.
- **Footer:** marquee ticker; matter-js chip sandbox (drag/throw, REDROP; lazy, paused offscreen, static under reduced motion); giant footer name.
- **Resume:** `/resume` web document (sidebar, On this page, Copy Markdown, Download PDF) and a generated one-page, ATS-friendly `public/resume.pdf` (`npm run resume:pdf`).

## Not built (decided)

- **GitHub heatmap:** skipped. It needs a `GITHUB_TOKEN` in Vercel, and I couldn't check from here whether your contribution data is dense enough to look good. Easy to add later as a cached server fetch.
- **UI sounds:** skipped (optional, and off by default in the brief).

## Kanpur Architect Association live site: localhost canonical

Its canonical, `og:url` and `og:image` point to `http://localhost:3000`. Fix in **that** project (not this repo): set the production site URL used for `metadataBase` (e.g. `NEXT_PUBLIC_SITE_URL=https://www.kanpurarchitects.in`) in its Vercel Production environment and redeploy. If `metadataBase` is hard-coded, change it to read that variable.

## Resume PDF

`public/resume.pdf` has been **replaced** with the generated version, per your later instruction (the first brief said not to touch it). It matches the site exactly. Regenerate with `npm run build && npm run resume:pdf` whenever `career.ts` or `resume.ts` changes.

## Remaining owner actions

1. **Merge this branch into `main`.** Production still serves the confidential screenshots, the unredacted Kanpur images and the old resume until you do. I can open the PR on request.
2. Authorise or decline the git-history rewrite (`docs/GATE_B_REPORT.md` §7).
3. Check the `myportfolio-gilt-xi-63.vercel.app` alias in Vercel → Domains.
4. Contact form keys (you're handling these): `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified domain), `CONTACT_TO_EMAIL`; then send a test message.
5. Still unconfirmed: PnPjs / CAML on the Knowledge Hub, the real Hume EVI repository, and what the "5,000+" figure means (stays unpublished).
6. Optional: supply company logos you're allowed to use (monograms are used until then); fix the Kanpur canonical as above.
