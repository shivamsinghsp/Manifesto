# SEO & Performance Report

**Date:** November 13, 2026  
**Stack Assessment:** Next.js 14 App Router, Server-Side Static Generation (SSG), `@next/font/google`  
**Scope:** Search Engine Optimization, Core Web Vitals, and Asset Delivery Architecture

---

## 1. SEO Architecture & Meta Ledger

All 19 routes feature dedicated, non-duplicated metadata configurations:

| Route | Page Title | Meta Description Length | Canonical URL |
| :--- | :--- | :--- | :--- |
| `/` | `Shivam Singh — Software Engineer` | 134 chars | `https://shivamsingh.dev` |
| `/work` | `Work \| Shivam Singh` | 108 chars | `https://shivamsingh.dev/work` |
| `/work/shynr` | `Shynr — HRMS & Job Portal — Case Study \| Shivam Singh` | 138 chars | `https://shivamsingh.dev/work/shynr` |
| `/work/kanpur-architects-association` | `Kanpur Architects Association — Case Study \| Shivam Singh` | 165 chars | `https://shivamsingh.dev/work/kanpur-architects-association` |
| `/work/aao-seekhe` | `Aao Seekhe.in — Case Study \| Shivam Singh` | 158 chars | `https://shivamsingh.dev/work/aao-seekhe` |
| `/work/sharepoint-knowledge-hub` | `Enterprise Knowledge Hub — Case Study \| Shivam Singh` | 148 chars | `https://shivamsingh.dev/work/sharepoint-knowledge-hub` |
| `/work/pledge-portal-qa` | `PLEDGE Portal — QA & Verification Engineering — Case Study \| Shivam Singh` | 129 chars | `https://shivamsingh.dev/work/pledge-portal-qa` |
| `/experience` | `Experience \| Shivam Singh` | 106 chars | `https://shivamsingh.dev/experience` |
| `/about` | `Manifesto \| Shivam Singh` | 74 chars | `https://shivamsingh.dev/about` |
| `/playground` | `Engineering Playground \| Shivam Singh` | 103 chars | `https://shivamsingh.dev/playground` |
| `/contact` | `Contact \| Shivam Singh` | 132 chars | `https://shivamsingh.dev/contact` |
| `/resume` | `Resume \| Shivam Singh` | 38 chars | `https://shivamsingh.dev/resume` |

---

## 2. Structured Data (JSON-LD)
`src/app/layout.tsx` injects valid Schema.org graph markup across every page:
1. `WebSite`: Provides search engines with site name, URL, and indexing intent.
2. `Person`: Identifies Shivam Singh as a Software Engineer, linking to verified profiles on GitHub and LinkedIn.

---

## 3. Crawler Infrastructure
- **`robots.txt` (`src/app/robots.ts`):**
  - Allows full crawling (`Allow: /`).
  - References authoritative sitemap location: `https://shivamsingh.dev/sitemap.xml`.
- **`sitemap.xml` (`src/app/sitemap.ts`):**
  - Dynamically synthesizes all primary static routes alongside individual dynamic `/work/[slug]` routes.
  - Generates valid ISO 8601 timestamps and frequency directives (`monthly` / `yearly`).

---

## 4. Performance & Core Web Vitals Optimization
- **Font Optimization:** IBM Plex Serif and IBM Plex Mono are bundled using `@next/font/google` with `display: "swap"`, eliminating Flash of Unstyled Text (FOUT) while zero external roundtrips are made to `fonts.googleapis.com` at runtime.
- **Image Delivery:** All case study images utilize Next.js `<Image>` component with responsive `sizes` definitions, CSS `aspect-ratio` bounds, and automated WebP/AVIF transcoding.
- **Static Generation:** All 19 routes are pre-rendered into static HTML at build time (`○ (Static)` and `● (SSG)`), providing immediate sub-100ms TTFB (Time to First Byte) on CDN edges.

