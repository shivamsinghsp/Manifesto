# Functionality Test Report

**Date:** November 13, 2026  
**Test Environment:** Node.js v24.21.0, Next.js 14.2.35 Production Server, Chromium Headless  
**Scope:** Route inventory, client transitions, redirect integrity, form validation, and copy utilities.

---

## 1. Route Inventory & Verification Results

| Route | HTTP Status | Title / Primary Anchor | Status |
| :--- | :--- | :--- | :--- |
| `/` | 200 OK | "Engineering systems that ship." / HeroSystem | PASSED |
| `/work` | 200 OK | "Selected Work" / Archive Header | PASSED |
| `/work/shynr` | 200 OK | "Shynr — HRMS & Job Portal" | PASSED |
| `/work/kanpur-architects-association` | 200 OK | "Kanpur Architects Association" | PASSED |
| `/work/aao-seekhe` | 200 OK | "Aao Seekhe.in" | PASSED |
| `/work/sharepoint-knowledge-hub` | 200 OK | "Enterprise Knowledge Hub" | PASSED |
| `/work/pledge-portal-qa` | 200 OK | "PLEDGE Portal — QA & Verification Engineering" | PASSED |
| `/experience` | 200 OK | "Experience" / Professional Ledger | PASSED |
| `/about` | 200 OK | "Manifesto" / Systems over Symptoms | PASSED |
| `/playground` | 200 OK | "Engineering Playground" / GeofencingLab | PASSED |
| `/contact` | 200 OK | "Initiate Contact" / Direct Email | PASSED |
| `/resume` | 200 OK | "Resume" / Curriculum Vitae | PASSED |
| `/robots.txt` | 200 OK | Dynamic Robots Rule Set | PASSED |
| `/sitemap.xml` | 200 OK | XML Sitemap (19 Static URLs) | PASSED |

---

## 2. Redirect Integrity Verification
Each legacy / alternative URL was tested against permanent HTTP 308 redirects defined in `next.config.mjs`:

| Source Route | Expected Target | Actual Status | Destination | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/manifesto` | `/about` | 308 Permanent | `/about` | PASSED |
| `/labs` | `/playground` | 308 Permanent | `/playground` | PASSED |
| `/projects` | `/work` | 308 Permanent | `/work` | PASSED |
| `/cv` | `/resume` | 308 Permanent | `/resume` | PASSED |

---

## 3. Contact Form & API Interaction Verification
- **Empty / Incomplete Payload Test:**
  - POST `/api/contact` with `{ name: "Test QA", email: "invalid-email", message: "short" }`
  - Result: Returned `400 Bad Request` with `{ success: false, error: "A valid email address is required." }`.
- **Honest Gateway Failure Test:**
  - In environments without `RESEND_API_KEY`, the server returns `503 Service Unavailable` explaining that the direct email gateway is awaiting API configuration and provides `shivamsinghabc439@gmail.com` directly. No fake success state is rendered to the user.
- **Copy-to-Clipboard Utility:**
  - Verified working via `navigator.clipboard.writeText` with programmatic fallback to `document.execCommand('copy')` for restricted iframes and non-secure test contexts.
  - State updates to `COPIED` with visual green check badge and reverts after 2.5 seconds.

---

## 4. Navigation & Unmount Safety
- Verified client-side route transitions when leaving `/contact` to `/work`, `/experience`, `/about`, and `/`.
- Confirmed zero unmount errors or thread blocking.

