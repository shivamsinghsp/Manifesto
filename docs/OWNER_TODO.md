# Owner TODO: items only you can confirm or supply

Updated: Gate B. Everything here is flagged on the site, not invented or hidden.

## Must do

1. **Replace `public/resume.pdf`.** The current PDF contradicts the site and the career facts:
   - "Full Stack Developer Intern, Jan 2026 – June 2026" → **Software Engineering Intern, Jan 2026 – Oct 2026**
   - PLEDGE "Currently performing…" → the engagement has ended
   - Androcoders "Software Development Intern" → **Web Developer Intern**
   - CSJMU "Aug 2022 – May 2026" → **Oct 2022 – Jul 2026**
   - Kanpur "Ongoing", AaoSeekhe ".in", missing Knowledge Hub
2. **Confidential client in git history.** The six Knowledge Hub screenshots showed the client's name, logo and a named employee. I removed them from the site and from `public/`, but this GitHub repo is **public**, so they're still in its history. If that matters, rewrite history (e.g. `git filter-repo --path public/images/projects/sharepoint-knowledge-hub --invert-paths`) and force-push. That's your call; I haven't done it.
3. **Vercel production looks stale.** The live site doesn't match `main`. Check Vercel → Deployments.

## Dates to confirm (shown as "to be confirmed")

- **AaoSeekhe**: no dates. Its repo (`shivamsinghsp/Aao-Seekhe`) is private or not visible to me, so I couldn't read commit history.
- **Enterprise Knowledge Hub**: no dates given.
- **Hume EVI assistant**: "Jul 2025 (to be confirmed)". `shivamsinghsp/new-hume-ai` has one commit (2025-08-21) and is Hume's official EVI Next.js starter (its README still has merge-conflict markers). It doesn't confirm July 2025, so it isn't linked. Send me the real repo or a record.
- **Kanpur**: shown as "≈ mid-May – early-Sep 2026", as you specified (approximate).
- **Education**: dates shown, but the site doesn't say whether the degree is completed. Tell me if you've graduated.

## Repositories

- `shivamsinghsp/Shynr-Productions` and `shivamsinghsp/Aao-Seekhe` are **private** (anonymous access refused). They show as "GitHub: private repo, available on request" instead of a link that 404s. Make them public and set `private: false` in `src/content/projects.ts` to turn them back into links.

## Claims removed as unverifiable (send evidence to restore)

- Shynr: "33 verified commits", "6 MongoDB data models", "under senior engineering review", "Primary Feature Developer" (now **Solo developer**, as you specified).
- AaoSeekhe: "34 verified commits", "~2 months".
- Kanpur: geo-spatial search (2dsphere / `$near`), Admin email+TOTP and Architect OTP auth, "12 interconnected data models", Next.js 16, ISR `revalidatePath`, ad click tracking and scheduling, and the old architecture / geo-search / ad-tracking diagrams.
- Knowledge Hub: "~4 months", "0 external backends", "3 data sources". The case-study text still mentions PnPjs, CAML and Microsoft Graph from earlier records. I can't verify those (client code is confidential), so please confirm.
- Intro poster: "Systems Architect" role, replaced with "Software Engineer / Full-Stack Developer".

## Decisions you made that I want on record

- Kanpur screenshots 02, 03, 07 and 09 show members' names, phone numbers, emails and executives' photos. They're displayed because you approved them. Revisit if any member objects.
- "Kanpur Architect Association" (singular) matches the association's own logo. Tell me if you prefer "Architects".

## Still to come (Gate C onward)

- Mascot approval (Gate C).
- Contact form delivery: set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified domain) and `CONTACT_TO_EMAIL` in Vercel.
- Company logos for the career.log: monogram tiles are used unless you supply logos you're allowed to use.
