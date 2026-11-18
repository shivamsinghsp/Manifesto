# Phase 1 Audit: 3D Playful Upgrade

Date: 2026-11-18 · Base: `main` @ `0ef2530` (PR #3 merged) · Auditor: Claude Code

## 0. Headline finding: the repo is ahead of the live site

The brief says the site is "half-migrated": only `/playground` and `/work/pledge-portal-qa` use the new template. **That describes the live deployment, not `main`.**
PR #3 (`feature/3d-portfolio-upgrade`) was merged into `main` at 01:38 IST today. It already moved **every** route onto the new template (skip link, canonical, per-route OG, Reduce Motion, shared Header/Footer).

Evidence: production build of `main` served locally, with `curl` on 10 routes:

| Route                                                      | `<title>`                            | canonical / og:url | og:image              |
| ---------------------------------------------------------- | ------------------------------------ | ------------------ | --------------------- |
| `/`                                                        | Shivam Singh — Software Engineer     | ✅ own URL         | ✅ `/opengraph-image` |
| `/work`, `/experience`, `/about`, `/resume`, `/playground` | unique per route                     | ✅                 | ✅                    |
| `/contact`                                                 | **Contact \| Shivam Singh** (unique) | ✅                 | ✅                    |
| `/work/*` (5)                                              | unique per project                   | ✅                 | ✅ per-project card   |

**Likely cause:** Vercel production hasn't redeployed since the merge (the build failed, or the deploy is stuck or still queued). This sandbox's proxy blocks `myportfolio-gilt-xi-63.vercel.app`, so I couldn't diff the live HTML directly.
**Action for you:** open Vercel → Deployments and check the latest `main` deployment. My work builds on `main`, so the fixes reach production with the next successful deploy.

Baseline on `main`: `build` ✅ · `lint` ✅ (0 warnings) · `type-check` ✅ · `vitest` 23/23 ✅. First-load JS: `/` 179 kB, `/work/[slug]` 174 kB, shared 103 kB.

`design-references/` **is not in the repo or the working tree**, so I can't see the seven reference images. I worked from your written description of each one. Add the folder locally if you want me to compare against them (it's now gitignored).

## 1. Audit items (a–p)

| #   | Claim                                                                       | Verdict on `main`                    | Notes / action                                                                                                                                                                                                                                                                                                                         |
| --- | --------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| a   | og:url = shivamsingh.dev; no canonical/og:image; /contact reuses home title | **Refuted on `main`** (true on live) | All URLs come from `NEXT_PUBLIC_SITE_URL` (fallback: the Vercel domain). Phase 3 still adds: `og:image` that works in both themes, `theme-color` per theme, and JSON-LD built from career data.                                                                                                                                        |
| b   | Footer Email plain text on old routes                                       | **Refuted on `main`**                | One `EmailLink` (mailto) everywhere.                                                                                                                                                                                                                                                                                                   |
| c   | /work/shynr numbering 01 → 03                                               | **Refuted on `main`**                | Generated sequentially (01 Overview, 02 Outcomes, 03…). Covered by an e2e test.                                                                                                                                                                                                                                                        |
| d   | Stray "Intro Poster" text; hidden "Say hi" with no trigger                  | **Partly confirmed**                 | Stray hero text is gone. The trigger exists only as a footer link, "Say hi — open the intro poster", so it's hard to find. Phase 5 makes it discoverable (palette command + hero chip).                                                                                                                                                |
| e   | /work omits PLEDGE                                                          | **Refuted on `main`**                | /work lists all 5 projects.                                                                                                                                                                                                                                                                                                            |
| f   | Career-fact contradictions                                                  | **Confirmed: 9 places**              | See §2.                                                                                                                                                                                                                                                                                                                                |
| g   | Education only on /experience                                               | **Partly confirmed**                 | Shown on /experience and /about, plus `alumniOf` in JSON-LD. Missing from home and the knowledge base gets the dates wrong ("2022–2026" with no months).                                                                                                                                                                               |
| h   | Inconsistent tier labels                                                    | **Mostly fixed**                     | "Tier" labels are replaced by `category`. "QA Engagement" remains as a category, which is fine. I'll make all labels consistent title case.                                                                                                                                                                                            |
| i   | PLEDGE TOC "Qa Protocol" / "Multi-tier"                                     | **Confirmed**                        | `work/[slug]/page.tsx` lower-cases titles and then capitalises each word. Fix: add an explicit `navLabel` per section, and a helper that keeps acronyms and hyphenated words intact.                                                                                                                                                   |
| j   | Duplicated nav / Reduce-motion / TOC in DOM                                 | **Confirmed, mostly harmless**       | Hidden copies use `display:none`, so they're already out of the a11y tree. Two `<nav aria-label="Case study sections">` share a label, which is OK because only one is ever shown. Phase 3 adds `inert` to the closed mobile dialog and renders one MotionToggle per breakpoint.                                                       |
| k   | PLEDGE reuses `qa-workflow.svg` twice                                       | **Confirmed**                        | Used as the hero image and the section 03 diagram. Fix: a dedicated themed hero illustration (original SVG).                                                                                                                                                                                                                           |
| l   | Hume AI: no demo/GitHub link, not in archive                                | **Confirmed**                        | A public repo exists: `shivamsinghsp/new-hume-ai`. I'll link it **only after you confirm** it's the same project, and add it to /work as an "Experiment" card. The "July 2025" timeline overlaps the Androcoders internship. Please confirm.                                                                                           |
| m   | Contact form                                                                | **Already solid**                    | zod (shared), honeypot + timing trap, rate limit, size caps, timeout, field errors, mailto fallback. Delivery depends on `RESEND_API_KEY` + a verified `CONTACT_FROM_EMAIL`, which aren't set (env check pending). Needs light-theme styling.                                                                                          |
| n   | WebGL fallback, mobile, image sizes, bundle, leaks                          | **Mostly fixed**                     | Static fallback ✅. `deviceSizes` capped at 1920 (no 3840 requests) ✅. DPR caps ✅. Disposal ✅. Pause offscreen ✅. To do: re-verify after theming, since the canvases will get uniform updates.                                                                                                                                     |
| o   | Hard-coded colours; diagrams assume dark                                    | **Confirmed: large**                 | ~250 hard-coded colour usages in 35 files (top: GeofencingLab 62, WavingLandingModal 31, WorkAssistant 24, og 15, GeoScene 15, page.tsx 12, Header/Footer `bg-[#0A0E17]`). **All 13 SVG diagrams** use white/`#00FFFF` strokes on transparent, so they'd be invisible on a light background. None use `currentColor` or CSS variables. |
| p   | Kanpur & PLEDGE claims vs fact sources                                      | **Confirmed: serious**               | See §3 and §4.                                                                                                                                                                                                                                                                                                                         |

## 2. Career-fact contradictions (item f)

Authoritative: Rapsora **Jan 2026 – Oct 2026** (ended), Androcoders May–Jul 2025, B.Tech Oct 2022 – Jul 2026.

| #   | Location                                                             | Says                                                                                                                     | Problem                                                                                                              |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 1   | `content/experience.ts` (feeds home "Where I've been" + /experience) | "January 2026 – June 2026", "6-month internship"                                                                         | Wrong end date and duration. Lists only Shynr + PLEDGE (missing AaoSeekhe and Kanpur).                               |
| 2   | `content/knowledge.ts` `profile-experience`                          | "6-month … January–June 2026"                                                                                            | Wrong.                                                                                                               |
| 3   | `content/knowledge.ts` `kaa-overview`, `role-ownership`              | "independent client project"                                                                                             | Should be "Sole developer, at Rapsora Technologies".                                                                 |
| 4   | `content/knowledge.ts` `aao-seekhe-overview`                         | "independent … platform"                                                                                                 | Should be "solo full-stack developer, at Rapsora".                                                                   |
| 5   | `content/projects.ts` Kanpur                                         | role "Independent Full-Stack Developer", engagement "Client project", link to `kanpur-architects-association.vercel.app` | Wrong wording and wrong link (should be https://www.kanpurarchitects.in).                                            |
| 6   | `content/projects.ts` AaoSeekhe                                      | engagement "Independent project"                                                                                         | Should be Rapsora. Live link is `aaoseekhe.com`, while you call it **AaoSeekhe.in**. Please confirm the domain.      |
| 7   | `content/projects.ts` Shynr                                          | role "Primary Feature Developer", "under senior engineering review", "Full-Stack Engineering Internship"                 | Brief says **solo developer**. Engagement label is inconsistent with the job title.                                  |
| 8   | `content/projects.ts` PLEDGE                                         | timeline "March 2026 – May 2026 (During Rapsora Internship)"                                                             | Dates OK. Wording should drop "Internship" if the title isn't confirmed. Needs the public-portal context + link.     |
| 9   | `content/knowledge.ts` `shynr-rbac`                                  | "Super Admin = 100"                                                                                                      | Conflicts with projects.ts "Admin: 100" and your brief (Admin 100 / HR 50 / Employee 20 / User 10). Using the brief. |

Also: `site.jobTitle` "Software Engineer" is OK as a headline. JSON-LD has no `worksFor`/`alumniOf` dates. The footer has no career facts. The Manifesto (/about) has no dates. None of these contradict the facts.

**Durations are hard-coded strings everywhere** ("4 weeks", "~3.5 months", "~2 months"). No single source exists: `experience.ts`, `projects.ts` and `knowledge.ts` each state facts on their own.

**Job title.** `docs/archive/content-audit/USER_INPUT_REQUIRED.md` (your own input doc) gives **"Software Engineering Intern"**, so the repo supports it and I'll use it. The previous report noted the resume PDF says "Full Stack Developer Intern". Still flagged for you to confirm.

## 3. Kanpur Architect Association: claim verification

**No repo access.** Your GitHub list (via the session) has no Kanpur repo, and no `Aao-Seekhe` repo either, even though the site links `github.com/shivamsinghsp/Aao-Seekhe`. That link may 404. **So I can't infer dates from commits.** Evidence used instead: the 11 screenshots in `public/images/projects/kanpur-architects-association/`.

| Claim                                                               | Evidence                                                                                                                              | Verdict                                                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Admin portal                                                        | Screenshots 07–11: sidebar with Dashboard, Members, Events, Founders, Leadership CMS, Ad Campaigns, Inquiries, Applications, Settings | ✅ supported (UI)                                                                 |
| Ad/banner management                                                | Screenshot 10: "Create New Ad Campaign" (banner image, headline, sponsor). Dashboard shows "Active Ads"                               | ✅ supported (UI). Click tracking/scheduling: ⚠ unverified                        |
| Custom CMS                                                          | "Leadership CMS" (homepage profiles, paragraphs, signature)                                                                           | ✅ partially (leadership content). "MongoDB-backed CMS schemas" ⚠ unverified      |
| Events + calendar, draft/publish                                    | Screenshots 04–06, 11                                                                                                                 | Events ✅. Draft/publish states ⚠ unverified                                      |
| Geo-spatial architect search (2dsphere, `$near`)                    | Directory screenshot shows an **A–Z alphabetical index**, no map or distance UI                                                       | ❌ **unverified: remove** unless you show the code                                |
| RBAC / 3 auth flows (Admin email+TOTP, Architect OTP)               | Members Portal button only                                                                                                            | ⚠ unverified: soften to "admin and members portals"                               |
| "12 interconnected data models", "Next.js 16", ISR `revalidatePath` | none                                                                                                                                  | ⚠ unverified: remove numbers, keep "Next.js" (you state the live site is Next.js) |
| Timeline "mid-May – early Sep 2026"                                 | Events dated Jun 3 / Jun 28 2026; calendar screenshot shows Sep 2026                                                                  | Plausible. Marked **"to be confirmed"**                                           |

**🚨 Privacy (blocking).** Several screenshots show real people's personal data:

- `02-members.png`: member names, CoA numbers, emails, phone numbers, addresses. **Currently shown** on the case study.
- `07-admin-dashboards.png`: "Recent activity" with real member names. **Currently shown.**
- `09-admin-leadership-management.png`: executives' names, titles and portrait photos.
- `03-members-details.png`: your own profile with your phone, email and addresses.

Fix in Phase 3: stop displaying 02, 03, 07 and 09. Use only 01, 04, 05, 06, 10 and 11, after checking each for names (the 11 events table shows only event names and venues, which is OK). Where a name-bearing view is needed, use an **original UI illustration**. I won't delete the source files (they're yours), but they'll no longer be referenced. Say if you want them removed from the repo; note they'd stay in git history.

## 4. PLEDGE

Current copy is QA-only ✅ and has the synthetic-data statement ✅. Missing: public context (DIEP, Government of UP; private industrial parks + MSME growth; online applications, approvals and fund tracking; the acronym's full form) and a **"Public portal" → https://pledgeup.in** link.
Wording to remove: "managing industrial infrastructure" is vague and "rock-solid" is filler. Nothing implies you built it ✅. No authenticated screens ✅ (diagrams only).

## 5. Other findings

- **Shynr GitHub link** points to `shivamsinghsp/Shynr-Productions`, but the repo visible to me is `rapsoratechnologies/Shynr-` (public, last push Feb 9 2026, which matches the sprint end). Please confirm which one to link.
- Enterprise Knowledge Hub isn't in CAREER FACTS. It's shown with no employer ("Enterprise engineering team"), so it doesn't contradict anything. I'll keep it as is and flag it. If it was a Rapsora project, tell me and it moves under the engagement.
- Recognition entries (hackathon, ICSCIS, CodeQuezt) are undated. I'll keep them undated.
- Secrets: scanned the full `git log -p` for API-key, token, password and Mongo-URI patterns. **Nothing found.** Only `.env.example` has ever been committed.
- `public/resume.pdf` is untouched (it's on the do-not-modify list).
