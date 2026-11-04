# Upgrade Plan

## Phase 1: Audit & Discovery (COMPLETED)
- Analyzed the codebase against Master Specifications.
- Created `PORTFOLIO_AUDIT.md`, `PROJECT_INTELLIGENCE_AUDIT.md`, `PORTFOLIO_DATA_REQUIREMENTS.md`, and `PORTFOLIO_DATA_CONFLICTS.md`.
- Upgraded the `searchPortfolio` algorithm in `search.ts` with word-boundaries and stop-words.
- Improved the `WorkAssistant.tsx` fallback UI.

## Phase 2: Design System Enforcement
1. **Verify `globals.css` and `tailwind.config.ts`:** Ensure all CSS variables exactly match `Document1 - MASTER Specification.md`. Specifically:
   - Colors (`--color-bg`, `--color-accent`, etc.)
   - Typography (`--type-display` via `clamp()`)
   - Spacing (`--space-0` through `--space-32`)
2. **Standardize Padding & Margins:** Do a full sweep of all page layouts (`app/page.tsx`, `app/work/page.tsx`, etc.) to use the CSS variable spacing system instead of arbitrary Tailwind spacing classes.

## Phase 3: Component Polish
1. **Core Components:** Audit Buttons, Links, Navigation, and Footer to ensure they meet the specific accessibility and hover state requirements (e.g., 44px touch targets, cyan hover text, border changes).
2. **Project Cards:** Ensure cards on the `/work` page zoom 1.02x on hover with a 300ms ease transition.

## Phase 4: Data & Assets Resolution
1. **Asset Verification:** Check `/public` directory to ensure all images referenced in `projects.ts` exist. If missing, generate or implement a clear placeholder system.
2. **Data Completeness:** Add the "Campus Connect" (Tier 3) project if required, or update the spec to reflect the 4 current projects.
3. **Experience Update:** Add the MBA education entry to `experience.ts` to align with the Master Specification's narrative.

## Phase 5: Accessibility & Performance Finalization
1. **Accessibility Sweep:** Verify ARIA labels, semantic HTML tags (`<nav>`, `<main>`, `<article>`), and keyboard focus trapping (especially for mobile menus).
2. **Performance Review:** Ensure `next/image` is used properly with `lazy` loading below the fold and `eager` loading for hero images.

## Next Steps
Proceed to **Phase 2: Design System Enforcement** and begin updating the Tailwind configuration and global CSS to perfectly match the Master Spec tokens.
