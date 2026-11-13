# Remaining Issues & Production Recommendations

**Date:** November 13, 2026  
**Status:** All Critical & High-Priority Blockers Resolved

---

## 1. Resolved in This Milestone
1. **Contact Page Navigation Lock:** Resolved by restoring the native `ContactForm.tsx` and eliminating synchronous main-thread DOM clearing loops.
2. **Template Remnants Scrubbed:** Eliminated `Ahdeetai`, `ScrollX UI`, `support@scrollxui.com`, and generic placeholder copy from the entire codebase.
3. **Employment Timeline Clarified:** Explicitly differentiated the 6-month Rapsora Technologies internship (`January 2026 – June 2026`) from the 4-week Shynr core product delivery sprint (`Jan 15 – Feb 9, 2026`).
4. **Ownership Claims Calibrated:** Replaced absolute terms (`100% ownership`, `sole developer`) with industry-standard role distinctions across all 5 projects.
5. **PLEDGE QA Case Study Added:** Created a dedicated Tier 2 engineering case study documenting manual QA and regression testing with custom vector architecture diagrams.
6. **Resume Affordance Upgraded:** Added direct download anchors with PDF metadata across Footer, Experience header, and Manifesto.

---

## 2. Post-Deployment Operational Recommendations
1. **Configure Resend API Credentials in Vercel:**
   - **Environment Variable:** `RESEND_API_KEY`
   - **Optional:** `CONTACT_EMAIL` (defaults to `shivamsinghabc439@gmail.com`).
   - *Current Behavior:* Until configured in Vercel project settings, `/api/contact` returns an honest status 503 instructing visitors to use the direct email link, preventing silent delivery failures.
2. **Canonical Domain Alignment:**
   - Currently, metadata points to `https://shivamsingh.dev`. If the primary production domain is `https://myportfolio-gilt-xi-63.vercel.app/` or another custom domain, update `metadataBase` in `src/app/layout.tsx` and `baseUrl` in `src/app/sitemap.ts` to match the canonical production URL.

