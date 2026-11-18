# Gate B Completion Report + Gate C Approval Request

Branch: `claude/portfolio-3d-dark-light-lk25tq` · Date: 2026-11-18 · Base: `main` @ `0ef2530`

## 0. Factual audit (before editing)

Sources compared: the old `public/resume.pdf` (text extracted), `src/content/*`, every case-study page and screenshot, git history (all branches, no tags), Vercel deployment records (via GitHub deployment and status APIs), and the owner's confirmed facts in this brief.

| Topic             | Old resume                     | Site before this pass          | Owner-confirmed (now on site + resume)                                               |
| ----------------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------ |
| Rapsora title     | Full Stack Developer Intern    | Software Engineering Intern    | **Full Stack Developer**                                                             |
| Rapsora dates     | Jan 2026 – June 2026           | Jan 2026 – Oct 2026            | **Jan 2026 – Oct 2026**                                                              |
| Androcoders title | Software Development Intern    | Web Developer Intern           | **Software Engineering Intern**                                                      |
| Androcoders dates | May 2025 – July 2025           | May 2025 – Jul 2025            | **May 2025 – Sep 2025** (internship 15 May – 15 Jul 2025, then training to Sep 2025) |
| Education         | Aug 2022 – May 2026, CGPA 7.24 | Oct 2022 – Jul 2026, no status | **Oct 2022 – Jul 2026, Graduated, CGPA 7.24**                                        |
| PLEDGE            | "Currently performing…"        | completed, QA only             | completed, QA only                                                                   |
| Kanpur            | "Ongoing"                      | ≈ mid-May – early-Sep 2026     | ≈ mid-May – early-Sep 2026                                                           |
| AaoSeekhe         | "AaoSeekhe.in"                 | aaoseekhe.com                  | aaoseekhe.com, dates to be confirmed                                                 |
| Knowledge Hub     | absent                         | Rapsora, client unnamed        | Rapsora, client unnamed, confirmed scope only                                        |

**Owner facts that changed since Gate A:** Rapsora "Software Engineering Intern" → "Full Stack Developer". Androcoders "Web Developer Intern" → "Software Engineering Intern", ending Jul → Sep 2025. Education status is now "Graduated". The latest brief wins in every case.

## 1. Changes completed

- **Career facts** (`src/content/career.ts`): new titles and dates. Androcoders has `phases` (Internship / Training), so the training period isn't presented as employment. Education adds `status` and `grade`. These now show in the career.log, /about, the knowledge base and JSON-LD (`hasCredential`).
- **Resume:** `/resume` is a web document (sidebar, "On this page", Copy Markdown, Download PDF) built from `career.ts` + `src/content/resume.ts`. `npm run resume:pdf` prints it to **`public/resume.pdf`**: one A4 page, ATS-friendly static TrueType fonts. Checks passed: 1 page; all key facts present in the extracted text; no replacement characters; no outdated phrases; the served file matches byte for byte. The old PDF is no longer the production download (on this branch).
- **Shynr:** the copy now says Haversine checks the distance of _reported_ coordinates and does not prove GPS authenticity or stop spoofing. Same note added to the 3D lab. "PERIMETER SECURE" → "INSIDE PERIMETER".
- **Knowledge Hub:** renamed "Enterprise SharePoint Knowledge Hub". Shows only confirmed scope (SharePoint Online, SPFx 1.20, React, TypeScript; Homepage, Library, SME Finder Phase 2B; `.getPaged()` lazy loading). PnPjs, CAML, Microsoft Graph and presence are held back, and their diagrams are no longer shown. New original illustrations.
- **Kanpur privacy:** screenshots 02, 03, 07 and 09 now use blurred versions (names, phone numbers, emails, addresses, CoA numbers and faces). Originals removed from `public/`.
- **Confidential client name** removed from `docs/archive/*` (six files) and from the e2e test, which now compares SHA-256 hashes.
- **Mascot "Node"** added for Gate C review (see §12).

## 2. Files modified

`src/content/{career,projects,knowledge,skills,site}.ts`, `src/app/{layout,page,globals.css}`, `src/app/{about,experience,resume}/page.tsx`, `src/components/ui/{CareerLog,WavingLandingModal,waving-portfolio-landing}.tsx`, `src/components/engineering/playgrounds/{GeoLab,GeofencingLab}.tsx`, `src/components/motion/{Cursor,Preloader,RouteTransition}.tsx`, `public/diagrams/projects/sharepoint-knowledge-hub/{library-ui,sme-finder-ui}.svg`, `tests/site.spec.ts`, `docs/archive/content-audit/*` (redaction), `package.json` (`resume:pdf` script), `public/resume.pdf` (replaced).
**Added:** `src/content/resume.ts`, `src/content/resume.test.ts`, `src/components/resume/CopyMarkdown.tsx`, `src/components/ui/Mascot.tsx`, `scripts/resume-pdf.mjs`, `public/images/projects/kanpur-architects-association/*-redacted.png` (4).

## 3. Files removed

- `public/images/projects/kanpur-architects-association/{02-members,03-members-details,07-admin-dashboards,09-admin-leadership-management}.png`. Replaced by blurred versions.
- Earlier at Gate B: `public/images/projects/sharepoint-knowledge-hub/*.png` (6, confidential) and the unverifiable Kanpur diagrams (architecture, geo-search, ad-tracking).

## 4. Claims removed

Shynr: 33 commits, 6 models, "senior engineering review", "Primary Feature Developer". AaoSeekhe: 34 commits, ~2 months. Kanpur: 2dsphere/`$near`, TOTP/OTP auth, 12 models, Next.js 16, ISR/`revalidatePath`, ad click tracking and scheduling. Knowledge Hub: ~4 months, 0 external backends, 3 data sources, live presence; PnPjs/CAML/Graph held back (see §6). Skills: PnPjs, Fluent UI and CAML removed from the stack list. The poster's "Systems Architect" is gone everywhere.

## 5. Claims verified (and the evidence)

- All career titles and dates: owner brief (latest).
- Kanpur public pages and admin modules: screenshots.
- Knowledge Hub scope and `.getPaged()`: owner brief.
- Library filters and SME email/Teams actions: seen in the original screenshots (now illustrated).
- Androcoders 15+ pages and 5-member team, PLEDGE QA duties, Hume EVI stack: owner's previous resume.
- Private repos: anonymous git access is refused for both.

## 6. Awaiting owner confirmation

1. AaoSeekhe dates (repo private; I can't read its history).
2. Knowledge Hub dates; PnPjs / CAML / Microsoft Graph usage; what the "5,000+" figure measures.
3. Hume EVI: date (Jul 2025 per the old resume) and the real source repo. `new-hume-ai` is Hume's starter template with one commit on 2025-08-21, so it isn't linked.
4. **Shynr roles:** the first brief gave four levels (Admin 100 / HR 50 / Employee 20 / User 10). This brief and the old resume list Admin, Employee and User. The site and resume keep the four-level version. Confirm whether HR exists.
5. Microsoft Graph is on your old resume's skills list but not on the new resume. Confirm before I add it back.
6. Phone number `+91-9832012260` is printed on the PDF only, as on your previous resume (not on the web page). Remove it if you prefer.

## 7. Git history cleanup status: NOT performed (needs your authorisation)

Inspected: all branches; no tags exist.

- The six confidential screenshots exist at exactly one path, `public/images/projects/sharepoint-knowledge-hub/`. They were introduced in `ca0dd93` (2026-09-21) and are present at the tip of `origin/main`, `origin/feature/3d-portfolio-upgrade` and `origin/feature-interactive-poster-and-geofencing-lab`. No copies were found under other paths (same blob hashes checked).
- The client's name appears in text in `docs/archive/content-audit/*` and the older `content-audit/*` path, at the tips of those three branches.
- The original Kanpur 02/03/07/09 screenshots (personal data) are also in history.
- No credentials or tokens were found anywhere in history.

**Most urgent:** production is built from `main`, which still serves the six screenshots and the docs naming the client. Merging this branch removes them from the live site immediately. History rewrite is a separate, later step. The plan, to run only after you approve and tell collaborators:

```bash
git clone --mirror https://github.com/shivamsinghsp/Manifesto.git && cd Manifesto.git
printf 'British American Tobacco==>[confidential client]\nregex:\\bBAT\\b==>[client]\n' > ../replacements.txt
git filter-repo --invert-paths \
  --path public/images/projects/sharepoint-knowledge-hub \
  --path public/images/projects/kanpur-architects-association/02-members.png \
  --path public/images/projects/kanpur-architects-association/03-members-details.png \
  --path public/images/projects/kanpur-architects-association/07-admin-dashboards.png \
  --path public/images/projects/kanpur-architects-association/09-admin-leadership-management.png \
  --replace-text ../replacements.txt
git push --force --mirror
```

Afterwards: delete stale branches, ask GitHub Support to purge cached views, and re-check with `git log --all -- public/images/projects/sharepoint-knowledge-hub` (should be empty). Forks, clones, search-engine and CDN caches cannot be reached by this, so the content may persist outside the repo.

## 8. Vercel deployment status

- The Vercel ↔ GitHub integration is active (project `my_portfolio`).
- **Production:** deployment of `main` @ `0ef2530` succeeded on 2026-11-17 20:09 UTC (`myportfolio-2eiajarjy-…vercel.app`). So the "stale" production is probably not a failed build. Either the `myportfolio-gilt-xi-63.vercel.app` alias isn't attached to this project's production, or you saw the site before that deploy or through a cache. I can't open `*.vercel.app` from this sandbox, so check Vercel → Project → Domains.
- **Previews:** every push to this branch has deployed successfully (e.g. `3cd5696` → `myportfolio-i72o8altm-…vercel.app`). Review the current branch there.
- **Not done:** merging to `main` or promoting to production (needs your go-ahead).
- No `vercel.json`; defaults are fine for Next 15.

## 9. Contact form status

Server-side only (no secret names in the client bundle). Shared zod validation, honeypot plus time trap, per-IP rate limit, size caps, timeout, clear success/error states. **Awaiting configuration:** without `RESEND_API_KEY` the API returns 503 with "email me directly" (verified). Add in Vercel → Settings → Environment Variables (Production + Preview):

- `RESEND_API_KEY`: from resend.com
- `CONTACT_FROM_EMAIL`: e.g. `Portfolio <hello@your-verified-domain>`; the domain must be verified in Resend
- `CONTACT_TO_EMAIL`: your inbox

Then send a test message from the preview URL. Real delivery is untested until then.

## 10. Remaining owner actions

1. **Merge this branch to `main`.** That removes the confidential screenshots from production and ships the new resume. Ask me to open the PR if you want.
2. Authorise (or decline) the history rewrite in §7.
3. Check the production domain alias in Vercel (§8).
4. Add the contact env vars (§9).
5. Answer §6.
6. Approve or reject the mascot (§12).
7. Supply company logos if you want them (monograms stay otherwise; nothing scraped).

## 11. Outstanding technical issues

- The live Kanpur site's canonical, og:url and og:image point to `http://localhost:3000`. Fix in that project: set its site URL / `metadataBase` env var (e.g. `NEXT_PUBLIC_SITE_URL=https://www.kanpurarchitects.in`) in its Vercel production environment and redeploy.
- The resume PDF must be regenerated (`npm run build && npm run resume:pdf`) whenever `career.ts` or `resume.ts` changes. It isn't automatic on deploy.
- Plan items not yet built (after Gate C): pill nav with ⌘K palette, typed terminal hero, build-cube scene, labs (RBAC / ATS / QA state machine / rate limiter), marquee and physics footer.

## Verification (this pass)

build ✅ · lint ✅ · type-check ✅ · vitest 38/38 ✅ · Playwright e2e 55 passed / 3 skipped (device-specific) · screenshot matrix 156 renders (13 routes × 6 widths × 2 themes): 0 console errors, 0 failed requests, 0 overflow. Lighthouse mobile (P/A/BP/SEO): `/` 91/100/100/100 light, 92/100/100/100 dark; `/resume` 94/100/100/100 (after the heading fix); Kanpur 92–93/100/100/100; Knowledge Hub 93/100/100/100.

## 12. Gate C: approval request

Ready for review on the preview deployment:

- **Mascot "Node":** an original isometric cube with a face and a code glyph, bottom-left of the hero visual. SVG + CSS only, so no measurable performance cost. Eyes follow a mouse pointer; it blinks and bobs; it's static on touch and under Reduce Motion. Decorative (`aria-hidden`). It doesn't cover the headline, CTAs or step rail at any width. Turn it off with `site.features.mascot = false`.

**Please confirm:** (a) keep the mascot as is, (b) change its look or position, or (c) remove it. Gate C stays open until you answer.
