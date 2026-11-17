# Portfolio Data Requirements

This document outlines the strict data structure requirements necessary to satisfy the master specifications provided in `Document3`, `Document4`, and `Document5`.

## 1. Project Database (`projects.ts`)
Must conform to the structure defined in `Document4 - PROJECT DATABASE.md`.
- **Tiers:** Projects must be categorized as "Tier 1: Product" (e.g., Aao Seekhe, Shynr), "Tier 2: System" (e.g., SharePoint Knowledge Hub), or "Tier 3: Component".
- **Metadata:** Needs `slug`, `title`, `role`, `timeline`, `shortDescription`, `longDescription` (array of strings), `metrics`, `tags`.
- **Assets:** Requires `heroImage` and optional `caseStudy` sections containing specific `type`s (`text`, `image`, `diagram`, `product-feature`).
- **Explorer Tabs:** Used for interactive breakdown in the case study page.

## 2. Experience Database (`experience.ts`)
Must conform to `Document5 - EXPERIENCE DATABASE.md`.
- **Type Distinction:** Differentiate between "Work" and "Education".
- **Fields:** `id`, `type`, `title`, `organization`, `dateRange`, `description`, `skills`.
- **Timeline Rendering:** The UI must render these chronologically with a vertical line and accent color dots.

## 3. Knowledge Database (`portfolio-knowledge.ts`)
Must support the Project Intelligence Engine.
- **Fields:** `id`, `keywords` (array), `projectSlug` (optional relation), `answer`, `sourceSection`.
- **Completeness:** Must cover all primary technologies, projects, and professional background questions to populate the WorkAssistant accurately.

## 4. Content Integrity
- **No invented content:** All claims must be verifiable.
- **Placeholders:** Use `[PLACEHOLDER]` for unknown information rather than assuming facts.
