# Phase 8G: Evidence-First Case Study Correction

## Overview
This document serves as the historical record for **Step 8G**, a corrective phase that shifted the portfolio's case studies from being theoretical, text-heavy documentation into visual, evidence-first engineering case studies.

## 1. What was too theoretical
Previously, major technical sections (such as Authentication, ATS workflows, and CMS functionality) relied entirely on long paragraphs of text. Architecture diagrams were also often placed before the user could see what was actually built.

The following sections were fundamentally corrected to be evidence-first:
- **Shynr**: Job Portal, Authentication & RBAC, HRMS Admin, Geospatial Attendance.
- **KAA**: Public Directory, Admin Platform, Ad/Banner Engine.
- **Aao Seekhe**: Interactive UI, Forms & Submission Workflows, API Pipeline.
- **SharePoint Knowledge Hub**: Knowledge Library, SME Finder.

## 2. Screenshot Changes
Screenshots are no longer small, decorative additions. They are now the primary visual evidence, presented side-by-side with concise technical implementation details.

- **Shynr**: Integrated `01-homepage.png`, `02-job-portal.png`, `12-login-page.png`, `04-admin-dashboard.png`, and `11-admin-attendance-locations.png`.
- **KAA**: Integrated `01-kaa-homepage.png`, `02-members.png`, `07-admin-dashboards.png`, and `10-ads-management.png`.
- **Aao Seekhe**: Integrated `03-aaoseekhe-homepage.png`, `01-pop-ups-1.png`, and `05-contact-us.png`.
- **SharePoint**: Renamed the confidential `bat` prefixed files to generic names (`01-home.png`, `02-knowledge-library.png`, `03-sme-finder.png`) and integrated them as the primary visual evidence.

## 3. Diagram Fixes
- Replaced the `next/image` implementation for SVG architecture diagrams with a standard `<img>` tag combined with a robust `onError` fallback handler. This guarantees that SVGs scale correctly without arbitrary Next.js Image constraints and ensures that if a diagram is missing, it fails gracefully rather than leaving a massive empty gap.
- The `Shynr` broken architecture image was resolved by correcting the SVG path and rendering pipeline.

## 4. Layout Changes
- **Reduced Whitespace**: Removed the massive `py-24 md:py-32` padding on individual sections, tightening the editorial rhythm to `py-16 md:py-24`.
- **Product-Feature Block**: Introduced a new split-layout component. On desktop, it features a large, bleeding screenshot on the left and a dense technical explanation with a code-like implementation flow on the right. On mobile, this stacks vertically (`SCREENSHOT ↓ CAPTION ↓ TECHNICAL EXPLANATION`).
- **Eliminated Fixed Heights**: All components now size dynamically based on their content and aspect ratios (`aspect-[16/9]`, `aspect-[21/9]`), ensuring no empty whitespace gaps.

## 5. Content Changes
- Long paragraphs describing "how the ATS works" or "how validation works" were rewritten into punchy, scannable implementation blocks.
- **Example**: Instead of a paragraph explaining the form pipeline, the Aao Seekhe case study now displays a step-by-step flow: `React Hook Form ↓ Zod Validation ↓ Next.js API Route ↓ XSS Sanitization ↓ SMTP`.

## 6. Responsive QA
The new layout was validated across mobile, tablet, and desktop breakpoints. The side-by-side `product-feature` blocks stack cleanly on `320px - 768px` viewports, ensuring mobile visitors immediately see the product screenshots before the technical explanations.

## 7. Validation
- **Build**: PASS (`next build` succeeded with no errors).
- **Lint**: PASS (`0` warnings).
- **Images/Diagrams**: PASS (All verified against the filesystem).
- **Routes**: PASS (Static generation for all case study routes succeeded).
