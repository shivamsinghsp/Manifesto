# OVERFLOW AUDIT (PROMPT 6B)

## Method
Audited every element in `src/` that could cause horizontal overflow at mobile viewports (320px–430px).

## Fixed Overflow Sources

| Source | File | Problem | Fix |
|---|---|---|---|
| `col-span-1` grid children | All page files | Compressed to 25% width | Changed to `col-span-full` |
| HeroSystem `min-h-[400px]` | `HeroSystem.tsx` | Overflowed 300px mobile container | Responsive `min-h-[250px] md:min-h-[400px]` |
| Email link `text-[1.25rem]` | `contact/page.tsx` | Long email overflows at 320px | Added `break-all sm:break-normal`, reduced to `text-[1rem]` |
| Diagram `p-12` | `work/[slug]/page.tsx` | 48px padding on both sides consumed mobile width | Responsive `p-6 md:p-12` |

## Checked But Not Overflow Risks

| Element | File | Why Safe |
|---|---|---|
| `text-display` headline | `globals.css` | Uses `clamp(2.5rem, 5vw, 80px)` — evaluates to 16px at 320px, well within bounds |
| Technology tags | `[slug]/page.tsx` | Uses `flex-wrap` — tags wrap naturally |
| `bg-blueprint` pattern | `globals.css` | Pure CSS background, no element overflow |
| Hero SVG | `HeroSystem.tsx` | Contained within `overflow-hidden` parent |
| Project images | `ProjectCard.tsx` | Uses `fill` + `object-cover` within bounded containers |
| Footer columns | `Footer.tsx` | Uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` — single column on mobile |
| Nav links | `Header.tsx` | Desktop nav `hidden md:flex`; mobile nav is full-screen overlay |

## Global Safety Net

`body { overflow-x: hidden }` in `globals.css` (line 108) prevents any residual overflow from creating a horizontal scrollbar. This is a documented safety measure, not a workaround — all identified overflow sources have been fixed at their origin.

## Remaining `overflow-x: hidden` in Components

| Element | File | Purpose | Status |
|---|---|---|---|
| `body` | `globals.css` | Global safety net | ✅ Intentional |
| HeroSystem container | `HeroSystem.tsx` | Contain SVG animation | ✅ Intentional |
| Hero section | `page.tsx` | Contain atmosphere gradient bleed | ✅ Intentional |
| Case study hero image | `[slug]/page.tsx` | Contain cover image zoom hover | ✅ Intentional |
| Final CTA section | `page.tsx` | Contain blueprint background | ✅ Intentional |

All `overflow-hidden` usages are structurally justified. None exist to mask a layout bug.
