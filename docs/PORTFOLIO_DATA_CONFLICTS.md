# Portfolio Data Conflicts

An analysis of the existing data in `src/data/` against the specifications in `docs/`.

## 1. `projects.ts` Conflicts
- **Status:** Largely compliant. 
- **Observations:** The current `projects.ts` contains 4 projects: Shynr (Tier 1), Kanpur Architects Association (Tier 1), Aao Seekhe (Tier 1), and Enterprise Knowledge Hub (Tier 2).
- **Missing Elements:** The spec requires Tier 3 projects (e.g., "Campus Connect" was mentioned in `Document1` but is missing in `projects.ts`).
- **Asset Paths:** Need to verify if the image paths (e.g., `/images/projects/shynr/01-homepage.png`) actually exist in the `/public` directory.

## 2. `experience.ts` Conflicts
- **Status:** Compliant.
- **Observations:** Contains 3 entries (Rapsora Technologies, Androcoders, CSJM University). The structure matches the expected interface.
- **Data Gap:** Ensure the MBA pursuing through Manipal University Jaipur (mentioned in Document 1) is accurately represented if intended to be public, though it might be omitted intentionally in the current dataset.

## 3. `portfolio-knowledge.ts` Conflicts
- **Status:** Highly compliant after recent updates.
- **Observations:** Covers all current projects and tech stack constraints (TypeScript/Next.js). Explicitly states no Python usage. No structural conflicts found.

## Action Items
1. Verify the existence of all image and diagram assets referenced in `projects.ts`. If missing, generate placeholders or update the paths.
2. Determine if Tier 3 projects need to be added to complete the portfolio or if the current 4 projects are sufficient for production.
