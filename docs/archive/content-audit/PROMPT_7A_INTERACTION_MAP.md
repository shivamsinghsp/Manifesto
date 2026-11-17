# INTERACTION & MOTION MAP (PROMPT 7A)

## 1. Existing Motion Audit

| Animation | Location | Evaluation | Action |
|---|---|---|---|
| `Reveal.tsx` (scroll fade/up) | Global | Subtle, creates editorial pacing. Currently locks after one trigger (good). | **RETAIN** |
| `HeroSystem` data packets | Homepage | SVGs moving along paths. Communicates "system" effectively without distraction. | **RETAIN** |
| `HeroSystem` floating nodes | Homepage | CSS transform float. Slightly generic. | **REFINE**: Make movement more rigid/stepped rather than smooth sine-wave floating. |
| Project Card Hover | `/work` | Grayscale to color + slight scale up. Standard but effective. | **REFINE**: Add a technical overlay border reveal. |
| Button Hover | Global | Standard color inversion/background fill. | **REFINE**: Make it sharper, perhaps a rapid wipe effect. |

---

## 2. High-Value Interaction Opportunities (Max 8)

The goal is purposeful interaction that reinforces the "Engineered Artifact" identity.

### I-01: Technical Asset Loading (The "Schema" Reveal)
- **Location**: Project imagery (`[ ASSET RESERVED ]` plates and eventual real images)
- **Trigger**: Image enters viewport / lazy load resolves
- **Behavior**: Instead of a soft fade-in, the image "scans" in top-to-bottom with a 1px accent line, or a monospace grid decodes into the image.
- **Purpose**: Reinforces the technical/systematic handling of assets.
- **Priority**: P1 (SHOULD IMPROVE)

### I-02: Precision Button Hover
- **Location**: All primary and secondary CTAs
- **Trigger**: Hover
- **Behavior**: A 1px border expands from the center, or a monospace crosshair `[+]` appears in the corner of the button.
- **Purpose**: Replaces the generic background-fill hover with an architectural interaction.
- **Priority**: P0 (MUST FIX)

### I-03: Timeline Activation Draw
- **Location**: `/experience` (Timeline component)
- **Trigger**: Scroll intersection
- **Behavior**: The vertical connecting line physically "draws" downwards to connect to the next node as it enters the viewport.
- **Purpose**: Creates a sense of progression and chronology.
- **Priority**: P1 (SHOULD IMPROVE)

### I-04: Monospace Label Scramble
- **Location**: Section markers (e.g., `// 01. FEATURED`, `// SECTION_A`)
- **Trigger**: Scroll intersection
- **Behavior**: The text rapidly cycles through random characters for 150ms before resolving to the actual label (e.g., `01x#F8` → `01. FEATURED`).
- **Purpose**: Adds a highly technical, terminal-like micro-interaction to structural elements.
- **Priority**: P2 (OPTIONAL)

### I-05: Grid Crosshair Tracking
- **Location**: `.grid-container` boundaries (Desktop only)
- **Trigger**: Mouse move within section
- **Behavior**: Subtle `+` marks at the corners of the active grid cell slightly increase in opacity when hovered.
- **Purpose**: Makes the underlying invisible grid feel tangible and engineered.
- **Priority**: P2 (OPTIONAL)

### I-06: Architecture Diagram Hover State
- **Location**: Case Study Architecture Diagrams
- **Trigger**: Hover over diagram container
- **Behavior**: The diagram inverts (light on dark → dark on light) or a blueprint grid aggressively fades in behind it.
- **Purpose**: Encourages closer inspection of technical visuals.
- **Priority**: P1 (SHOULD IMPROVE)

### I-07: Navigation Active State Underline
- **Location**: Main Header (`Header.tsx`)
- **Trigger**: Active route
- **Behavior**: Instead of a text color change, a strict 1px accent line grows from left to right under the active link, accompanied by a small bracket `[WORK]`.
- **Purpose**: Enhances the precision of the navigation interface.
- **Priority**: P0 (MUST FIX)

### I-08: Form Input Focus Bracketing
- **Location**: `/contact` (Input fields)
- **Trigger**: Input focus
- **Behavior**: The standard focus ring is replaced by architectural corner brackets `⌜ ⌝` appearing around the active input.
- **Purpose**: Brings the editorial/drafting aesthetic into interactive forms.
- **Priority**: P1 (SHOULD IMPROVE)

---

## 3. Reduced Motion Handing
All proposed animations (I-01 through I-08) must immediately resolve to their final visible states if `prefers-reduced-motion: reduce` is detected, relying solely on CSS opacity and border changes without transition durations.
