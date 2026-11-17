# RESPONSIVE RECONSTRUCTION REPORT (PROMPT 6B)

## Grid Architecture

### Before
```
.grid-container {
  grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
  // --grid-cols: 12 (desktop), 8 (tablet), 4 (mobile)
}

// Children used:
col-span-1 lg:col-span-8    → Mobile: 1/4 = 25% width ❌
col-span-1 lg:col-span-12   → Mobile: 1/4 = 25% width ❌
col-span-1 md:col-span-4    → Mobile: 1/4 = 25% width ❌
```

### After
```
// Children now use:
col-span-full lg:col-span-8    → Mobile: 1/-1 = 100% width ✅
col-span-full                   → Mobile: 1/-1 = 100% width ✅
col-span-full md:col-span-4    → Mobile: 100%, Tablet: 4/12 ✅
```

### Design Principle
- **Mobile**: Single-column reading flow via `col-span-full`
- **Tablet** (`md:`): Multi-column where space permits
- **Desktop** (`lg:`): Full editorial grid architecture

## Mobile-Specific Fixes

### Homepage Hero
- Hero text: `col-span-full md:col-span-7` — occupies full width on mobile
- HeroSystem: `col-span-full md:col-span-5` — stacks below text on mobile
- HeroSystem container: `h-[300px] md:h-[500px]` — reduced height on mobile
- HeroSystem component: `min-h-[250px] md:min-h-[400px]` — fits within container

### Experience Timeline
- Category sidebar: `col-span-full md:col-span-4` — appears as inline header on mobile
- Timeline content: `col-span-full md:col-span-8` — full reading width on mobile
- Sticky behavior: disabled on mobile via `md:sticky` (prevents layout confusion)
- ArrowDown icon: hidden on mobile via `hidden md:block`

### About / Manifesto
- Section labels: `col-span-full md:col-span-4` — inline on mobile
- Body text: `col-span-full md:col-span-8` — full reading width
- Section dividers: border-bottom on mobile, border-top on desktop

### Contact
- Info column: `col-span-full lg:col-span-5` — stacks above form
- Form column: `col-span-full lg:col-span-6` — full width on mobile
- Form padding: `p-6 sm:p-8 md:p-12` — responsive
- Email link: `text-[1rem] sm:text-[1.25rem]` with `break-all` at narrow widths

### Case Study
- Header metadata: `col-span-full` — wraps naturally
- Section labels: `col-span-full md:col-span-4` — stack on mobile
- Content areas: `col-span-full md:col-span-8` — full reading width
- Two-column sections: stack on mobile via `col-span-full md:col-span-6`
- Diagram padding: `p-6 md:p-12` — reduced on mobile

## Tablet Strategy
At `768px`, the `md:` breakpoint activates multi-column layouts. The `grid-cols-1 md:grid-cols-12` pattern on `grid-container` elements means:
- Below 768px: forced single column (Tailwind `grid-cols-1` overrides CSS variable grid)
- 768px–1023px: 12-column Tailwind grid (CSS variable `--grid-cols` is 8, but overridden)
- 1024px+: 12-column Tailwind grid aligned with CSS variable grid

## Desktop Preservation
All `md:` and `lg:` prefixed spans preserve the original editorial grid architecture. No desktop layout was altered.
