# PLACEHOLDER INVENTORY

This document explicitly lists every instance of placeholder content found within the codebase that must be replaced before production launch.

## 1. Project Data (`src/data/projects.ts`)
| File/Location | Current String | Classification | Required Action |
|---------------|----------------|----------------|-----------------|
| `projects.ts:50` | `[PLACEHOLDER: Exact Start Date] - Present` | C - PLACEHOLDER | Provide exact start date for Aao Seekhe. |
| `projects.ts:57` | `{ label: "Active Users", value: "[PLACEHOLDER]" }` | C - PLACEHOLDER | Provide real metric or remove. |
| `projects.ts:58` | `{ label: "Content Items Managed", value: "[PLACEHOLDER]" }` | C - PLACEHOLDER | Provide real metric or remove. |
| `projects.ts:100` | `[PLACEHOLDER: Company] Knowledge Hub` | C - PLACEHOLDER | Provide actual company name. |
| `projects.ts:103` | `[PLACEHOLDER: Exact Dates]` | C - PLACEHOLDER | Provide exact dates. |
| `projects.ts:121` | `[PLACEHOLDER: Company] Expert Platform` | C - PLACEHOLDER | Provide actual company name. |
| `projects.ts:124` | `[PLACEHOLDER: Exact Dates]` | C - PLACEHOLDER | Provide exact dates. |
| `projects.ts:141` | `[PLACEHOLDER: Dates]` | C - PLACEHOLDER | Provide exact dates. |

## 2. Experience Data (`src/data/experience.ts`)
| File/Location | Current String | Classification | Required Action |
|---------------|----------------|----------------|-----------------|
| `experience.ts:17` | `[PLACEHOLDER: Exact Start Date] - Present` | C - PLACEHOLDER | Provide exact start date. |
| `experience.ts:25` | `[PLACEHOLDER: Company Name]` | C - PLACEHOLDER | Provide internship company name. |
| `experience.ts:26` | `[PLACEHOLDER: Exact Dates]` | C - PLACEHOLDER | Provide exact dates. |
| `experience.ts:34` | `[PLACEHOLDER: Company Name]` | C - PLACEHOLDER | Provide internship company name. |
| `experience.ts:35` | `[PLACEHOLDER: Exact Dates]` | C - PLACEHOLDER | Provide exact dates. |
| `experience.ts:43` | `[PLACEHOLDER: University Name]` | C - PLACEHOLDER | Provide MBA university name. |
| `experience.ts:44` | `[PLACEHOLDER: Start Date] - Present` | C - PLACEHOLDER | Provide MBA start date. |
| `experience.ts:52` | `[PLACEHOLDER: University Name]` | C - PLACEHOLDER | Provide B.Tech university name. |
| `experience.ts:53` | `[PLACEHOLDER: Exact Dates]` | C - PLACEHOLDER | Provide B.Tech dates. |

## 3. UI and Pages
| File/Location | Current String | Classification | Required Action |
|---------------|----------------|----------------|-----------------|
| `src/app/about/page.tsx:48` | `[PLACEHOLDER: Write about your journey...]` | C - PLACEHOLDER | Provide custom editorial copy. |
| `src/app/about/page.tsx:53` | `[PLACEHOLDER: Discuss your passion...]` | C - PLACEHOLDER | Provide custom editorial copy. |
| `src/app/contact/page.tsx:32` | `hello@example.com {/* [PLACEHOLDER] */}` | C - PLACEHOLDER | Replace with real email. |
| `src/app/contact/page.tsx:102` | `[PLACEHOLDER: Form backend integration...]` | C - PLACEHOLDER | Determine form action (e.g. Formspree/Netlify). |
| `src/components/layout/Footer.tsx:13`| `mailto:hello@example.com` | C - PLACEHOLDER | Replace with real email. |
