# ASSET BLOCKERS

All four projects reference hero images with empty `src: ""` strings, which correctly trigger the `[ ASSET RESERVED ]` / `[ SCHEMA ]` fallback plates. No image files exist in the asset directories.

---

## Project: Aao Seekhe

**Required asset**: Hero screenshot or product visualization
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/images/projects/aao-seekhe/hero.png`
**What Shivam needs to provide**: A screenshot, mockup, or UI capture of the Aao Seekhe platform
**Where it will appear**: Featured project card on homepage, work page, and case study hero

**Required asset**: Architecture diagram
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/diagrams/projects/aao-seekhe/architecture.png`
**What Shivam needs to provide**: A system architecture diagram (can be a simple box diagram)
**Where it will appear**: Case study "ARCHITECTURE" section

**Required asset**: Interface screenshot
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/images/projects/aao-seekhe/interface.png`
**What Shivam needs to provide**: A screenshot of the CMS interface or authoring view
**Where it will appear**: Case study "OUTCOME" section

---

## Project: Knowledge Hub

**Required asset**: Hero screenshot or visualization
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/images/projects/sharepoint-knowledge-hub/hero.png`
**What Shivam needs to provide**: A screenshot of the SharePoint knowledge base interface
**Where it will appear**: Work page project card and case study hero

---

## Project: Subject Matter Expert Platform

**Required asset**: Hero screenshot or visualization
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/images/projects/[REMOVED: [REMOVED: sme-expert-platform]]/hero.png`
**What Shivam needs to provide**: A screenshot or mockup of the SME booking interface
**Where it will appear**: Work page project card and case study hero

---

## Project: [REMOVED: campus-connect]

**Required asset**: Hero screenshot or visualization
**Current state**: `src: ""` → fallback plate renders
**Expected location**: `public/images/projects/[REMOVED: [REMOVED: campus-connect]]/hero.png`
**What Shivam needs to provide**: A screenshot of the student dashboard or event view
**Where it will appear**: Work page project card and case study hero

---

## How to Add Assets

1. Place the image file at the expected location listed above
2. Update the `src` field in `src/data/projects.ts` to match the path (e.g., `src: "/images/projects/aao-seekhe/hero.png"`)
3. Next/Image will automatically optimize the asset
4. Recommended format: PNG or WebP, minimum 1200px wide for hero images
5. Architecture diagrams can be any size but should be legible at `aspect-[4/3]` on mobile

## Note on `next.config.mjs`

The current `next.config.mjs` has no `images.domains` or `images.remotePatterns` configured. All images must be served locally from the `public/` directory. If external image hosting is used later, the config will need updating.


