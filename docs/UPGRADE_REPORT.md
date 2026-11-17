# 3D Portfolio Upgrade — Report

Branch: `feature/3d-portfolio-upgrade` · Base: `main` @ `73eacfa`

## Verification (final state)

| Check | Result |
| --- | --- |
| `npm run build` | ✅ passes (Next.js 15.5.29) |
| `npm run lint` (ESLint, 0 warnings allowed) | ✅ clean |
| `npm run type-check` | ✅ clean |
| `npm test` (Vitest) | ✅ 23/23 |
| `npm run test:e2e` (Playwright, desktop + Pixel 7) | ✅ 49 passed, 3 skipped (device-specific tests) |
| Screenshot matrix: 13 routes × 320/375/768/1024/1440/1920 | ✅ 0 console errors, 0 failed requests, 0 horizontal overflow |
| `npm audit --omit=dev` | ✅ 0 vulnerabilities (was 25, including 3 critical) |
| Hydration stability | ✅ 216/216 route renders clean under parallel load |

### Lighthouse (mobile, local production build)

| Route | Before (P / A / BP / SEO) | After (P / A / BP / SEO) |
| --- | --- | --- |
| `/` | 86 / 95 / 100 / 100 | **91 / 100 / 100 / 100** |
| `/work` | — | 94 / 100 / 100 / 100 |
| `/work/shynr` | 98 / 94 / 100 / 100 | 94 / 100 / 100 / 100 |
| `/work/kanpur-architects-association` | — | 94 / 100 / 100 / 100 |
| `/work/aao-seekhe` | — | 93 / 100 / 100 / 100 |
| `/work/sharepoint-knowledge-hub` | — | 93 / 100 / 100 / 100 |
| `/work/pledge-portal-qa` | — | 93 / 100 / 100 / 100 |
| `/experience` | — | 95 / 100 / 100 / 100 |
| `/about` | — | 94 / 100 / 100 / 100 |
| `/playground` | 99 / 96 / 96 / 100 | 95 / 100 / 100 / 100 |
| `/contact` | 99 / 98 / 100 / 100 | 94 / 100 / 100 / 100 |
| `/resume` | — | 96 / 100 / 100 / 100 |

Notes:
- Subpage performance dropped 4–5 points because every page now ships GSAP and a richer type system (three IBM Plex families). The score is still ≥ 90 everywhere. Remaining Lighthouse flags are Next.js framework items: render-blocking CSS, a small amount of legacy-JS polyfill and unused framework JS.
- These are lab numbers from a local server. The live Vercel numbers will differ, usually for the better thanks to the CDN, HTTP/2 and Brotli.

## Audit items (a–i)

| Item | Outcome |
| --- | --- |
| a) wrong `og:url` domain | Fixed. Every URL comes from `NEXT_PUBLIC_SITE_URL`, with a fallback to the Vercel domain. Canonical tags were added to every route. |
| b) no `og:image` / `twitter:image` | Fixed. A generated site-wide card plus one card per case study. Present on every route. |
| c) duplicated titles/descriptions | All routes were already unique in the repo; the live site is stale. Hardened anyway: per-route `og:title` and `og:description`, and a 404 page with `noindex` and no canonical. |
| d) footer Email | Already a `mailto:` in the repo. Now there is a single `EmailLink` component, used everywhere, that never opens a new tab. |
| e) case-study numbering | Fixed in every case study. Sections now run 01 Overview, 02 Outcomes, 03…; covered by an e2e test. |
| f) "Intro Poster" + h1 without spaces | The poster is opt-in from the footer ("Say hi"), lazy-loaded, and never auto-opens. The h1's accessible name is now "Engineering systems that ship." (covered by an e2e test). |
| g) next/image sizing | Correct `sizes` everywhere. `priority` only on LCP candidates. AVIF/WebP. `deviceSizes` capped at 1920, so no 3840px requests. |
| h) contact form | Shared zod validation, honeypot plus timing trap, rate limiting, size caps, timeouts, field-level errors, loading/success/error states and a mailto fallback. Delivery needs the Resend keys (see below). |
| i) copy consistency | The closing line is "Let's build *systems.*" everywhere, driven by `site.ctaHeadline`. Roles are split into **role** and **engagement**, with no "X — Y" duplication. |

## Remaining TODOs — content only you can supply or confirm

1. **Profile photo:** add `public/images/profile.jpg` and set `site.photo` in `src/content/site.ts`. A monogram frame shows until then.
2. **Resend setup:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in Vercel. Real delivery needs a sender on a domain verified in Resend.
3. **`NEXT_PUBLIC_SITE_URL`:** set it in Vercel (to the Vercel domain or your own).
4. **Resume vs site conflicts.** The site keeps the repo values until you confirm which is correct:
   - Rapsora title: "Software Engineering Intern" (site) vs "Full Stack Developer Intern" (resume).
   - Androcoders title: "Web Developer Intern" vs "Software Development Intern".
   - B.Tech dates: "October 2022 – July 2026" vs "Aug 2022 – May 2026".
   - Aao Seekhe: the site says "Independent project"; the resume lists it under Rapsora ("contributed to the development and deployment").
5. **Skills not shown:** the resume lists Java, SQL, MySQL and AWS (EC2, S3), but no project on the site demonstrates them. Add them to `src/content/skills.ts` if you want them shown.
6. **Shynr role levels:** `projects.ts` says "Admin: 100", while `knowledge.ts` says "Super Admin = 100". Confirm the correct name.
7. **Outcome gaps:** Enterprise Knowledge Hub and PLEDGE have no quantitative impact data (e.g. adoption, defects found, time saved). Their Outcomes blocks use only stated facts. Add measured results if you have them.
8. **Image weight:** the source PNGs total 18 MB. They are served optimised (AVIF/WebP), but compressing the originals would speed up builds and first optimisation.

## Suggestions for later
- Use Upstash Redis for a global contact-form rate limit.
- Add MDX case studies for longer write-ups.
- Self-host a subset of Plex for the OG images so they match the site typography.
- Add Vercel Analytics or Speed Insights for real-user Core Web Vitals.
- Upgrade to Next 16 once R3F/drei support is confirmed.
