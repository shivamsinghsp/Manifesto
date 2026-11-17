# ASSET AUDIT

This document evaluates all static assets (images, icons, documents) referenced in the codebase to determine if they actually exist.

## 1. Missing Image Assets
The following images are referenced in `src/data/projects.ts` but do not physically exist in the `public/images/projects/` directories. Currently, the `next/image` implementation falls back to text spans when `src` is missing, but since the strings are defined, Next.js will attempt to load them and return 404s in production.

**CLASSIFICATION:** E — BROKEN IMPLEMENTATION / D — MISSING INFORMATION

| Asset Reference | Location in Data | Physical Status | Action Required |
|-----------------|------------------|-----------------|-----------------|
| `/images/projects/aao-seekhe-hero.jpg` | `projects.ts:63` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |
| `/images/diagrams/aao-content-model.svg` | `projects.ts:76` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |
| `/images/projects/aao-seekhe-dashboard.jpg`| `projects.ts:91` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |
| `/images/projects/sharepoint-hero.jpg` | `projects.ts:115` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |
| `/images/projects/sme-hero.jpg` | `projects.ts:132` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |
| `/images/projects/[REMOVED: [REMOVED: campus-connect]]-hero.jpg`| `projects.ts:149` | ❌ MISSING | [USER INPUT REQUIRED] Provide asset. |

## 2. Missing Documents
| Asset Reference | Location in Code | Physical Status | Action Required |
|-----------------|------------------|-----------------|-----------------|
| `/resume.pdf` | `Footer.tsx:16` | ❌ MISSING | [USER INPUT REQUIRED] Provide resume PDF. |

## 3. SEO Assets
| Asset Reference | Expected Location | Physical Status | Action Required |
|-----------------|-------------------|-----------------|-----------------|
| `favicon.ico` | `public/favicon.ico` | ❌ MISSING (Assuming) | Provide favicon. |
| `og-image.jpg` | `public/og-image.jpg` | ❌ MISSING | Provide OpenGraph image for SEO. |


