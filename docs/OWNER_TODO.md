# Owner TODO

Updated after the owner's Gate C answers (mascot kept, Shynr roles, phone, Microsoft Graph, AaoSeekhe dates). Full detail: `docs/GATE_B_REPORT.md`.

## Urgent

1. **Merge `claude/portfolio-3d-dark-light-lk25tq` into `main`.** `main` (production) still serves the six confidential Knowledge Hub screenshots, three docs naming the client, the unredacted Kanpur screenshots and the outdated resume PDF. Ask Claude to open the PR.
2. **History rewrite**: authorise or decline the `git filter-repo` plan in the report (§7). Not done; it needs a force-push.

## Configuration

3. Vercel → Domains: confirm `myportfolio-gilt-xi-63.vercel.app` is attached to the `my_portfolio` project's production. The latest `main` deployed successfully on 2026-11-17.
4. Contact form: add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified domain) and `CONTACT_TO_EMAIL`, then send a test message.

## Still to confirm

5. Knowledge Hub dates; PnPjs / CAML usage. The "5,000+" figure stays unpublished until its meaning and evidence are established.
6. Hume EVI date (Jul 2025 per the old resume) and the real repository.

## Resolved

- Mascot: **kept** (refined to a "screen face"; professional, responsive, no performance cost).
- Shynr roles: **Super Admin 100 · Sub Admin 50 · Employee 20 · User 10** (matches the RBAC diagram).
- Phone number on the PDF: keep.
- Microsoft Graph: used in the SharePoint project; added to skills, the Knowledge Hub page and the resume.
- AaoSeekhe: **Jul 2026 – Aug 2026**.

## Optional

7. Company logos (monograms are used until you supply logos you're allowed to use).
8. Kanpur live site: fix its localhost canonical/OG (set its site URL env var in that project).
