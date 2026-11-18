# PROGRESS

Resume point for the 3D playful upgrade. Details: `docs/AUDIT.md` (Phase 1), `docs/PLAN.md` (Phase 2).

## Status: ⛔ waiting at Gate A (audit + plan)

## Done

- Phase 1 audit (read-only). Baseline on `main` @ 0ef2530: build, lint, types and 23/23 unit tests all pass.
- `design-references/` added to `.gitignore`. The folder isn't present in the repo.
- Git history secret scan: clean.

## Next (after Gate A approval)

1. `src/content/career.ts` single source of truth + derived content + duration utils + tests.
2. Content and privacy fixes (Kanpur screenshots, PLEDGE context, role wording, TOC labels).
3. Theme system → Gate B.

## Decisions

- `main` already has the new template on every route. The live site is stale (check Vercel deployments).
- Job title "Software Engineering Intern", supported by `docs/archive/content-audit/USER_INPUT_REQUIRED.md`. The resume PDF says "Full Stack Developer Intern", so confirmation is still needed.
- Hero = Option A (build cube), evolving the existing HeroScene.
- Add next-themes, cmdk, matter-js (lazy). Skip Framer Motion, rapier, postprocessing.
- Light palette: warm paper `#F6F4EF`. All text tokens ≥ 4.5:1.
- Kanpur screenshots 02, 03, 07 and 09 contain personal data and will no longer be displayed.
- Branch: `claude/portfolio-3d-dark-light-lk25tq` (session policy).

## Open questions for owner

1. Rapsora job title: "Software Engineering Intern" (site, input doc) vs "Full Stack Developer Intern" (resume)?
2. Kanpur + AaoSeekhe dates: no repos are accessible to me, so I can't read commit history. Kanpur stays "mid-May – early Sep 2026 (to be confirmed)", from screenshot evidence. AaoSeekhe: "to be confirmed". Add the repos to the session, or give me the dates.
3. AaoSeekhe domain: `aaoseekhe.com` (current link) or `aaoseekhe.in`? Its GitHub link (`shivamsinghsp/Aao-Seekhe`) isn't visible to me. Is it private, renamed or deleted?
4. Shynr GitHub: `shivamsinghsp/Shynr-Productions` or `rapsoratechnologies/Shynr-`?
5. Hume AI: is `shivamsinghsp/new-hume-ai` the project? Is "July 2025" correct?
6. Enterprise Knowledge Hub: part of the Rapsora engagement or separate?
7. Kanpur unverifiable claims (geo-search/2dsphere, TOTP/OTP auth, 12 models, ISR): remove, or point me to the code?
8. Should the personal-data Kanpur screenshots be deleted from the repo too? They'd remain in git history.
