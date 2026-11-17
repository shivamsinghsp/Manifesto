# Portfolio Upgrades & Changes Implemented

**Date:** November 13, 2026  
**Status:** Completed & Integrated

---

## 1. Contact Page Cleanup & Communication Upgrades
- **Template Artifact Elimination:**
  - Removed all occurrences of `Ahdeetai`, `ScrollX UI`, `support@scrollxui.com`, and generic template text from `src/components/ui/contact-with-globe.tsx`.
  - Removed dead component `src/components/ui/demo.tsx`.
- **Contact Form Overhaul (`src/app/contact/ContactForm.tsx`):**
  - Updated headline to `"Let's build systems."` and badge to `"// 04. CONTACT"`.
  - Added company/team field with placeholder `"e.g. Acme Corp / Engineering Team"`.
  - Updated placeholders: `"e.g. Alex Morgan"`, `"e.g. alex@company.com"`, and `"Tell me about your engineering project, team, or opportunity..."`.
  - Integrated 1-click clipboard copy for `shivamsinghabc439@gmail.com` with real-time feedback (`COPIED`) and fallback for restricted environments.
  - Added direct accessible `mailto:` link with keyboard navigation support.
- **Serverless API Reliability (`src/app/api/contact/route.ts`):**
  - Eliminated mock/fake submission success: If `RESEND_API_KEY` is not present, the endpoint returns a clear 503 response directing users to email `shivamsinghabc439@gmail.com` directly rather than falsely reporting delivery.
  - Added strict server-side validation for name, email format, and message length.

---

## 2. Employment Timeline Clarification
- **Rapsora Technologies (`src/data/experience.ts`):**
  - Set date range to `January 2026 – June 2026` (internship duration).
  - Explicitly defined the relationship between the 6-month internship and the 4-week Shynr product delivery milestone.
  - Divided Rapsora contributions into verified work streams:
    1. Core Shynr HRMS platform architecture and rapid delivery sprint (Jan 15 – Feb 9, 2026).
    2. PLEDGE Portal functional & regression testing.
  - Clarified that Aao Seekhe is an independent web application rather than an internal Rapsora deliverable.
- **Shynr Case Study (`src/data/projects.ts`):**
  - Updated timeline to `Jan 15 – Feb 9, 2026 (4-week core product sprint during Rapsora internship)`.
  - Clarified that the initial platform was implemented during this intensive 4-week delivery sprint under senior engineering review.

---

## 3. Calibrated Ownership & Role Terminology
- **Scrubbed Exaggerated Terminology:**
  - Removed all instances of `"100% ownership"`, `"sole developer"`, `"built entire platform end-to-end"`, and contradictory titles (`"Lead Full-Stack Developer — Solo Developer"`).
- **Standardized Recruiter-Grade Roles:**
  - **Shynr:** `Full-Stack Engineering Intern — Primary Feature Developer`
  - **Kanpur Architects Association (KAA):** `Independent Full-Stack Developer — Client Project`
  - **Aao Seekhe.in:** `Full-Stack Web Developer — Independent Project`
  - **Enterprise Knowledge Hub:** `Enterprise Frontend Engineer — SPFx / React`
  - **PLEDGE Portal:** `QA & Verification Engineer`
  - **Hume AI Voice Assistant:** `Independent Developer`
- **Ownership Badging (`src/app/work/[slug]/page.tsx`):**
  - Updated `getOwnershipLabel()` to render consistent, verified ownership badges:
    - `Independent Client Delivery`
    - `Primary Feature Developer`
    - `Independent Project`
    - `Enterprise Contributor`
    - `QA & Verification Engineer`

---

## 4. Dedicated PLEDGE QA & Verification Case Study
- **Added Project Entry (`pledge-portal-qa`):**
  - Category: `Tier 2: System`
  - Role: `QA & Verification Engineer`
  - Timeline: `March 2026 – May 2026 (During Rapsora Internship)`
  - Description: *"Functional testing, workflow validation, defect documentation and regression verification for the Government of Uttar Pradesh's PLEDGE portal."*
- **Visual Assets:**
  - Designed `public/diagrams/projects/pledge/qa-workflow.svg` (5-stage verification protocol).
  - Designed `public/diagrams/projects/pledge/multi-role-testing.svg` (Citizen to Administration validation matrix).
- **Editorial Integrity:**
  - Explicitly documented manual QA testing methodology.
  - Explained technical differences between functional acceptance testing, regression testing after developer fixes, and automated testing.
  - Guarded government data confidentiality (no confidential data, internal URLs, or credentials exposed).
- **Integration Across Surfaces:**
  - Featured on homepage Recent Projects section (balanced 2x2 grid).
  - Featured in the Work Archive index (`/work`).
  - Added dedicated knowledge Q&A in `portfolio-knowledge.ts` and `WorkAssistant.tsx`.
- **Resource Download Enhancement (`Footer.tsx`):**
  - Standardized resume download to a native download anchor with `target="_blank" rel="noopener noreferrer" download`.

