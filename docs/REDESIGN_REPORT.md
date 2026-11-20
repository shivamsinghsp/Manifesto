# Redesign report: audit, design direction, fixes, verification

Branch: `redesign/engine-hero-mobile-nav` · Base: `main` @ the merge of PR #7 (2026-11-18).

## 1. Audit

I inspected the live site (`myportfolio-gilt-xi-63.vercel.app`) in a cloud browser at 500px and 1366px. I also reviewed the repository and ran a local production build through a Playwright matrix (11 routes × 9 widths × 2 themes).

| Section         | Issue                                                                                                                                                                                                     | Severity | Resolution                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| Mobile nav      | The "full-screen" menu rendered inside the header pill. The links spilled transparently over the hero text (reproduced on the live site).                                                                 | Critical | Root cause fixed (see §4).                                                                              |
| Mobile nav      | Scroll lock only set `body { overflow: hidden }`. Lenis scrolls with `window.scrollTo`, which ignores `overflow`, so on fine-pointer windows narrower than 1024px the page kept scrolling under the menu. | High     | Lock `<html>` and `<body>`, call `lenis.stop()` / `start()`, and compensate for the scrollbar.          |
| Mobile nav      | A link to the current page left the menu open, because the close relied only on a `pathname` change.                                                                                                      | High     | Every menu link closes the menu on click.                                                               |
| Mobile nav      | Resizing to ≥1024px while the menu was open left a hidden overlay holding the scroll lock.                                                                                                                | Medium   | `matchMedia` listener closes the menu.                                                                  |
| Mobile nav      | Open and close were a `display` toggle, so the menu vanished with no exit animation. Initial focus went to the close button.                                                                              | Medium   | Opacity/visibility transition with an instant `visibility` flip on open. Focus lands on the first link. |
| Hero            | The mascot was clipped at the bottom of the canvas box. An unlayered `.mascot { position: relative }` rule overrode Tailwind's `absolute`.                                                                | Medium   | Rule removed.                                                                                           |
| Hero 3D         | The 27-cube "build cube" read as generic floating blocks, and it ran on low-end devices (only DPR was reduced).                                                                                           | Medium   | Replaced (see §3). Low-tier devices keep a static SVG.                                                  |
| Build           | `next/font/google` fetches fonts at build time. Builds fail on restricted networks (they failed here).                                                                                                    | Medium   | Fonts self-hosted from npm through `next/font/local`.                                                   |
| Footer          | The full skills list appeared three times on one page: the Stack section, a marquee, and the chip sandbox.                                                                                                | Medium   | Marquee removed. The sandbox heading no longer duplicates the section title.                            |
| Visual identity | Cyan-on-navy, blue and indigo radial "atmosphere" gradients, glow shadows, and a `// 0X.` code-comment label on every section. The combination reads as templated.                                        | Medium   | New palette, type and chapter headings (see §2).                                                        |
| Hero            | Four status chips, a typed terminal line and the headline all competed in the first viewport.                                                                                                             | Low      | Chips merged into two quiet mono rows.                                                                  |
| Playground      | Arbitrary shadow classes with spaces (`shadow-[0_0_15px_rgb(var(--c-glow) / 0.3)]`) are invalid, so Tailwind never generated them.                                                                        | Low      | Removed.                                                                                                |
| Code            | `HeroSystem.tsx` was unused, and the build cube is now superseded.                                                                                                                                        | Low      | Deleted.                                                                                                |
| Tests           | The e2e menu test only asserted `toBeVisible()`, so it passed while the bug was live.                                                                                                                     | Low      | New test asserts viewport size, scroll lock, focus and close paths.                                     |
| Repo hygiene    | `shivamsinghsp/Portfolio` (Aug 2025, a different template) looks like the portfolio but isn't the deployed code.                                                                                          | Low      | Not changed. Consider archiving it or pointing its README here.                                         |

Checked with no issues found: one `h1` per page, no horizontal overflow, no console errors and no failed requests across all 198 renders. The contact form validates and only shows success when the API returns it, the honeypot works, and the rate limiter works. Skip link, theme persistence and the command palette also work.

## 2. Design direction

**Palette: warm graphite and paper, one signal accent.** Neutrals carry a slight warm cast instead of blue-black, and colour is used only where it means something: the active state, links, the current step.

| Token          | Dark                 | Light                |
| -------------- | -------------------- | -------------------- |
| Background     | `#0E0E0D`            | `#F3F1EC`            |
| Surface / alt  | `#161614`, `#1F1F1C` | `#FBFAF7`, `#E8E5DD` |
| Text primary   | `#EDEAE3`            | `#151412`            |
| Text secondary | `#ACA79D`            | `#48453F`            |
| Text tertiary  | `#8A857C`            | `#68645C`            |
| Accent         | `#FF5E1F`            | `#C2410C`            |
| Accent text    | `#FF804D`            | `#9E3208` (7.6:1)    |
| Borders        | text @ 11% / 5%      | text @ 14% / 7%      |

I removed the multi-hue body and hero gradients and kept a single faint warm light from above. All glow shadows are gone. Skill-group colours are muted so the accent stays dominant.

**Typography: two families.** _Instrument Serif_ handles display: a high-contrast editorial face, set large with tight leading (hero up to 7rem, line-height 0.96). _Geist_ handles UI and body, and its mono cut handles metadata, labels and indices. Mono labels are smaller with wider tracking (11px / 0.14em).

**Layout.** Section headings now open like chapters. A rule runs across the top, the accent index and label sit in a three-column gutter, and the heading is offset into the remaining nine columns. On mobile they stack. With the headings carrying the rule, the home page no longer needs a border under every section.

**Animation.** Nothing new runs constantly. The engine drifts slowly (0.08 rad/s), pauses while you hover a node, and respects reduced motion with on-demand rendering and static poses.

## 3. The new 3D centrepiece: "digital innovation engine"

`src/components/three/EngineScene.tsx` replaces `BuildCubeScene.tsx`.

- **Structure.** Five octagonal plates stacked bottom-up and narrowing as the system is refined: IDEA → DESIGN → ARCHITECTURE → CODE → PRODUCT. A spine runs through them and carries one data pulse.
- **Scroll narrative.** The existing hero step rail drives the scene. Plates at or below the current step are built (solid), later ones stay as ghosted outlines. The active plate gets accent edges and a floating label, and the camera eases to a new height for each step.
- **Capabilities.** Six nodes sit on an orbit around the ARCHITECTURE layer and wire back to the core once that layer is built. Hover (or tap) shows a small label. The labels come from `src/content/capabilities.ts`, which builds them from `skills.ts`, and a unit test fails if a node names a technology the Stack section doesn't list.
- **Cost.** Shared geometries, one material per plate, no post-processing, and a contact shadow baked once (`frames={1}`). The frame loop stops off-screen and in background tabs (existing governor), and DPR is capped by tier.
- **Fallbacks.** Low-tier devices (save-data, ≤2 cores or ≤2 GB) and browsers without WebGL get `HeroFallback.tsx`, a static isometric SVG with the same composition, so no 3D is forced there.
- **Labels.** drei `<Html>` rendered empty under React 19 in this setup. Labels are plain DOM over the canvas, and the scene writes their projected position each frame without re-rendering React.

## 4. Functionality report

**Mobile navigation root cause.** The overlay (`fixed inset-0`) was a descendant of the header pill, which has `backdrop-filter: blur()`. Any `filter`, `backdrop-filter` or `transform` on an ancestor becomes the containing block for `position: fixed` descendants. So the overlay was sized to the 52px pill instead of the viewport, and its content overflowed without a background. `MobileNav` now portals the overlay to `<body>`. The rest of the menu was rewritten around that fix:

- Scroll is locked on both roots and Lenis is paused while the menu is open.
- Escape, the close button and any link close the menu. Focus moves to the first link on open, Tab is trapped inside, and focus returns to the trigger on close.
- The menu closes when the viewport grows to desktop, and `inert` removes the closed menu from the tab order and the accessibility tree.

**Tests run (local production build, Chrome 1xx, emulated devices):**

- `npm run lint` (0 warnings), `npm run type-check`, `npm test` (40/40, including two new capability tests), `npm run build`.
- `npx playwright test`: 63 passed, 5 skipped by design (device-specific). New tests:
  - **Mobile menu regression:** checks viewport-sized overlay, scroll lock, no overflow, focus on open and close, two open/close cycles, closing on navigation, and closing on a same-route link.
  - **Low-tier fallback:** confirms low-tier devices keep the static SVG.
  - **3D hero:** now pins a mid-tier device profile so the result is deterministic.
- **Menu script** at 320, 360, 375, 390, 414 and 768px: every check passes with 0 console errors, and resizing to desktop while open releases the lock.
- **Route matrix:** 11 routes × 9 widths (320 to 1920) × 2 themes = 198 renders. No overflow, no console errors, no failed requests, one `h1` each.

## 5. Performance

Lighthouse 12, mobile preset, median of 3 runs. Both builds were served locally from the same 2-core sandbox, so absolute scores run lower than on a typical laptop or Vercel's edge. "Before" is `main` built with identical self-hosted IBM Plex files, because Google Fonts was unreachable here.

| Page          | Perf (before → after) | LCP           | TBT          | CLS           | Bytes        |
| ------------- | --------------------- | ------------- | ------------ | ------------- | ------------ |
| `/`           | 86 → **88**           | 3.33 → 3.27 s | 276 → 214 ms | 0.004 → 0.005 | 468 → 460 KB |
| `/work/shynr` | 91 → **92**           | 2.92 → 3.18 s | 250 → 136 ms | 0 → 0         | 438 → 465 KB |
| `/contact`    | 94 → 93               | 3.04 → 3.03 s | 23 → 35 ms   | 0 → 0         | 382 → 411 KB |

Accessibility, Best Practices and SEO scored 100 on every page, before and after. The new fonts are latin-subset variable files, and only the display face is preloaded. My first attempt shipped the full variable Geist fonts and lost about 0.3 s of LCP until I switched to the subsets.

## 6. Limitations and owner actions

- **Not deployed or pushed.** This session had no write access to the repository. Apply the patch, push the branch, open a PR, and Vercel's existing Git integration will build a preview. No environment variables changed (`RESEND_API_KEY` etc. are as documented in the README).
- **No real devices.** Testing used emulated mobile viewports in Chrome. iOS Safari scroll locking uses the standard `overflow: hidden` on `<html>`, which iOS 16+ honours, but please check it on a phone.
- **Restyled, not restructured.** Project cards, case-study pages, the playground and the resume page took the new tokens and type but keep their layout.
- **Resume PDF not regenerated.** `public/resume.pdf` is untouched. Run `npm run resume:pdf` if you want its mono headings in Geist Mono.
- **Stack section.** The "Drag to rotate" hint still appears if the stack canvas fails to start. This is low impact and pre-existing.
