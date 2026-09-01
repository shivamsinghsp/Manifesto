DOCUMENT 08: ANTIGRAVITY MASTER PROMPT
COMPREHENSIVE BUILD INSTRUCTIONS FOR ANTIGRAVITY

Version: 1.0
Date: [CURRENT DATE]
Project: Shivam Singh Personal Portfolio
Owner: Shivam Singh
Status: READY TO BEGIN DEVELOPMENT

SECTION 01: PROJECT OVERVIEW & SUCCESS CRITERIA
What You're Building

A premium, art-directed personal portfolio for Shivam Singh, a full-stack engineer specializing in CMS architecture and product development.

The Portfolio Must Communicate (in 30 seconds):

"This person doesn't just code features. They understand products as systems."

Visual Direction Name

TECHNICAL EDITORIAL

A sophisticated, restrained design that reflects systems thinking. Clean, professional, modern but timeless. Not trendy. Not generic.

Composition:

60% Layered Product Studio aesthetic (visible architecture, technical credibility)
30% Editorial Minimalism (typography, whitespace, intentional composition)
10% Restrained Interactions (purposeful motion, meaningful animations)
Success Criteria (Go/No-Go)

The portfolio is successful when:

✓ Design tokens fully implemented (colors, typography, spacing)
✓ Homepage renders correctly on desktop/tablet/mobile
✓ Aao Seekhe case study complete with diagrams
✓ All 13 pages (listed below) exist and render without errors
✓ Responsive design tested on all breakpoints (320px, 768px, 1024px, 1440px)
✓ WCAG AA accessibility compliance verified
✓ Core Web Vitals targets met (LCP < 2.5s, CLS < 0.1)
✓ All images present (placeholder labels clear for missing assets)
✓ No console errors
✓ Navigation functional on all platforms
✓ Forms functional (contact, if used)
✓ Keyboard navigation 100% working
✓ Performance audit passed (Lighthouse > 90)
✓ SEO basics implemented (meta tags, structured data)
✓ Ready for production deployment
SECTION 02: REQUIRED DOCUMENTS & REFERENCE MATERIALS
Documents You Have Access To

You have been provided with 7 comprehensive specification documents:

Document 01: Master Specification

Complete design system (colors, typography, spacing, grid)
Information architecture
Component architecture
All design tokens as CSS variables
Reference this for: Any design token question, layout rules, component specs

Document 02: Decision Log

All approved design decisions
Why certain choices were made
Rejected alternatives and why
Reference this for: Understanding design rationale, when unsure about direction

Document 03: Content Source of Truth

All homepage copy
All page content requirements
Project descriptions
Internship details
Reference this for: What text goes where, content accuracy

Document 04: Project Database

Structured data for all projects
Project tier system
What makes something Tier 1 vs Tier 3
Reference this for: Project card data, case study content structure

Document 05: Experience Database

Career timeline structure
Experience entries (education, internships, current work)
How to display timeline
Reference this for: Experience page content, timeline visualization

Document 06: Asset Manifest

Every image/diagram needed
Asset naming convention
Dimensions, aspect ratios, formats
Which assets exist vs [PLACEHOLDER]
Reference this for: Image requirements, diagram specifications

Document 07: Antigravity Implementation Handoff

Complete technical specification
Every page layout in detail
Component specifications
Accessibility requirements
Development phases
QA checklist
Reference this for: Technical implementation details, component structure
How to Use These Documents
For design decisions → Document 02 (Decision Log)
For design tokens → Document 01 (Master Specification)
For content → Document 03 (Content Source of Truth)
For project data → Document 04 (Project Database)
For experience data → Document 05 (Experience Database)
For images → Document 06 (Asset Manifest)
For technical specs → Document 07 (Implementation Handoff)

When unsure:
  1. Check the relevant document
  2. Search for the specific topic
  3. If still unclear, refer to Document 07 (most detailed)
SECTION 03: BEFORE YOU START
Setup Verification Checklist

Before beginning any implementation, verify:

□ You have all 7 specification documents
□ You understand the TECHNICAL EDITORIAL direction
□ You can access the design tokens (Document 01)
□ You know what pages need to be built (13 total)
□ You know the project database structure (Document 04)
□ You understand the content requirements (Document 03)
□ You have the asset manifest (Document 06)
□ You understand the development phases (Document 07, Section 11)
□ You can follow the QA checklist (Document 07, Section 12)
□ You're ready to ask questions in this conversation if anything is unclear
Critical Rules (Non-Negotiable)
1. NO invented content
   - All claims must be verifiable
   - Use [PLACEHOLDER] for unknown information
   - Never silently assume facts
   
2. NO generic implementations
   - Follow the TECHNICAL EDITORIAL direction
   - Don't default to generic portfolio templates
   - Match the specified design system exactly
   
3. NO cutting corners on accessibility
   - WCAG AA is the minimum
   - Keyboard navigation must work 100%
   - All interactive elements must have focus states
   
4. NO skipping responsiveness
   - Test on all 4 breakpoints: 320px, 768px, 1024px, 1440px
   - Intentionally recompose layouts per breakpoint (not just stack)
   - Touch targets minimum 44px
   
5. NO animations "just because"
   - Every animation must communicate something
   - Respect prefers-reduced-motion
   - Performance must stay good
   
6. NO ignoring performance
   - LCP < 2.5s is required
   - CLS < 0.1 is required
   - No heavy libraries for simple things
SECTION 04: PROJECT STRUCTURE
What You're Building (13 Pages)
1.  / (Homepage)
2.  /work (Projects index)
3.  /work/aao-seekhe (Case study #1 — Flagship)
4.  /work/sharepoint-knowledge-hub (Case study #2)
5.  /work/sme-expert-platform (Case study #3)
6.  /work/campus-connect (Case study #4)
7.  /work/[additional-projects] (Tier 3 supporting projects)
8.  /experience (Career timeline)
9.  /about (Personal story + philosophy)
10. /contact (Contact page or email link)
11. /resume (CV/Resume page + download)
12. 404 (Error page)
13. Optional: /playground (Experiments)

Minimum viable product: Pages 1-11 + 404
Stretch goal: Add /playground if time/energy available
Technology Stack (Pre-Decided)
Framework:     Next.js 14
Language:      TypeScript
Styling:       Tailwind CSS
Animation:     CSS animations (not heavy JS libraries)
Hosting:       Vercel (recommended)
Fonts:         System fonts + IBM Plex Serif + IBM Plex Mono

No:
  - Heavy animation libraries (Framer Motion only if absolutely needed)
  - CSS-in-JS (use Tailwind + CSS Modules)
  - Multiple animation libraries
  - Unnecessary dependencies

Why:
  - Minimal, fast, performant
  - Matches TECHNICAL EDITORIAL aesthetic
  - Aligns with Shivam's engineering background
SECTION 05: DESIGN SYSTEM IMPLEMENTATION
Phase 1: Design Tokens (Do This First)

These are the foundation. Everything else builds on these.

Colors (Implement as CSS Custom Properties)
css
:root {
  /* Backgrounds */
  --color-bg: #0F1419;
  --color-surface: #16191F;
  --color-surface-alt: #1C1F27;
  
  /* Text */
  --color-text: #E8EAED;
  --color-text-secondary: #A8ACBA;
  --color-text-tertiary: #6C7280;
  
  /* Accent (Cyan — single, restrained) */
  --color-accent: #00B8D4;
  --color-accent-hover: #00A0C0;
  --color-accent-muted: rgba(0, 184, 212, 0.12);
  
  /* CTA Button (Warm off-white for visual hierarchy) */
  --color-cta-bg: #E8EAED;
  --color-cta-text: #0F1419;
  --color-cta-hover: #D0D4DB;
  
  /* Semantic */
  --color-success: #00A873;
  --color-warning: #F59E0B;
  --color-error: #DC2626;
  
  /* Structural */
  --color-border: #2A2E37;
  --color-border-muted: #1F2329;
}

Important:

Use these CSS variables everywhere (not hardcoded colors)
One accent color (cyan) used strategically
Warm off-white buttons = visual hierarchy signal
NO gradients
NO multiple competing accent colors
Typography (Implement as CSS Custom Properties)
css
:root {
  /* Font families */
  --font-display: 'IBM Plex Serif', Georgia, serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  --font-mono: 'IBM Plex Mono', 'Monaco', 'Courier New', monospace;
  
  /* Display — Hero text */
  --type-display:
    font-size: clamp(2.25rem, 6vw + 1rem, 96px);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1px;
    font-family: var(--font-display);
  
  /* Display Secondary — Large headlines */
  --type-display-secondary:
    font-size: clamp(2rem, 5vw + 0.5rem, 72px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.5px;
    font-family: var(--font-body);
  
  /* Headline */
  --type-headline:
    font-size: clamp(1.75rem, 3.5vw, 42px);
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0px;
    font-family: var(--font-body);
  
  /* Subheading */
  --type-subheading:
    font-size: clamp(1.25rem, 2.5vw, 36px);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0px;
    font-family: var(--font-body);
  
  /* Body Large */
  --type-body-large:
    font-size: clamp(1rem, 1.2vw, 18px);
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0px;
    font-family: var(--font-body);
  
  /* Body (Default) */
  --type-body:
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0px;
    font-family: var(--font-body);
  
  /* Body Small */
  --type-body-small:
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0px;
    font-family: var(--font-body);
  
  /* Label (UI) */
  --type-label:
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.5px;
    font-family: var(--font-body);
  
  /* Caption */
  --type-caption:
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: var(--color-text-tertiary);
    font-family: var(--font-body);
  
  /* Monospace */
  --type-mono:
    font-size: 13px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0px;
    font-family: var(--font-mono);
}

Important:

Use clamp() for fluid typography (responsive without media queries)
Only 3 font weights: 400, 600, 700 (no exceptions)
Serif display font only at display level
System fonts for body (fastest, most accessible)
Mono for code/technical content only
Spacing Scale (Implement as CSS Custom Properties)
css
:root {
  --space-0:    0px;
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-7:    28px;
  --space-8:    32px;
  --space-10:   40px;
  --space-12:   48px;
  --space-14:   56px;
  --space-16:   64px;
  --space-20:   80px;
  --space-24:   96px;
  --space-28:   112px;
  --space-32:   128px;
}

Usage:

Use variables everywhere (not hardcoded px)
Spacing rhythm: Major sections get --space-24 (96px) or --space-32 (128px)
Between content: --space-4 to --space-8
Whitespace is compositional (more empty space than filled)
Border & Radius
css
:root {
  --radius-button:  3px;      /* Subtle rounding on buttons */
  --radius-input:   4px;      /* Subtle rounding on inputs */
  --radius-card:    6px;      /* Friendly rounding on cards */
  --radius-image:   0px;      /* Sharp corners for impact */
  
  --border-width:   1px;
  --border-color:   var(--color-border);
  --border-muted:   var(--color-border-muted);
}

Usage:

Major project images: 0px (sharp corners for editorial impact)
Buttons/inputs: 3-4px
Cards: 4-6px
NO excessive rounding (not a playful interface)
Motion & Animation
css
:root {
  --ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9);
  --ease-smooth:   ease-in-out;
  
  --duration-fast:      150ms;
  --duration-standard:  300ms;
  --duration-slow:      400ms;
  --duration-reveal:    600ms;
}

Usage:

All animations use these tokens
Respect prefers-reduced-motion
Use GPU-accelerated properties only (transform, opacity)
Never animate layout (causes jank)
Phase 1 Deliverables
✓ globals.css with all design tokens as CSS custom properties
✓ Tailwind config updated with design tokens
✓ No hardcoded colors/spacing in components
✓ Typography scale tested on all breakpoints
✓ All tokens documented in code comments
✓ Color contrast verified (WCAG AA)
SECTION 06: COMPONENT LIBRARY (Phase 2)
Build These Core Components
1. Button Component
tsx
// Components should accept className for flexibility
// Use design tokens (colors, spacing, radius)

States needed:
  - Default/rest
  - Hover
  - Focus (outline)
  - Active/pressed
  - Disabled

Variants:
  - Primary (warm off-white background)
  - Secondary (border, transparent)
  - Ghost (text only)

Sizing:
  - sm (36px height)
  - md (44px height) — default
  - lg (48px height)

Requirement:
  - Touch target minimum 44px
  - Keyboard focus visible
  - No transform on hover (use color change only)
2. Link/Anchor Component
tsx
States:
  - Default (cyan text)
  - Hover (darker cyan, underline)
  - Focus (outline)

Variants:
  - Text link
  - CTA link with arrow (arrow moves right on hover)

Animation:
  - Color change: 200ms ease
  - Arrow movement: 300ms ease (gap increases)
3. Navigation Component
tsx
Desktop:
  - 72px height, sticky
  - Logo left, nav links center
  - Semantic <nav> element
  - Numbered items: 01. WORK, 02. EXPERIENCE, etc.

Mobile:
  - Hamburger button (44px × 44px, top-right fixed)
  - Overlay menu (full-screen, translucent)
  - Focus trapping (focus cycles within menu)
  - Escape key closes menu
  - Body scroll lock when menu open
  - Focus restoration on close

Styling:
  - Border-bottom: 1px var(--color-border)
  - Logo: Display font, 20px, bold
  - Links: 14px, 600 weight, cyan on hover
  - Transition: color 200ms ease

Accessibility:
  - Semantic nav/header
  - Proper ARIA attributes on menu
  - Skip link present (first focusable element)
4. Project Card Component
tsx
Props:
  - image (src, alt)
  - title
  - description
  - category/badge
  - href (link to case study)

Layout:
  - Image on top (240px height, 4:3 aspect, cover)
  - Content area below (padding: var(--space-8))

Styling:
  - Border: 1px var(--color-border)
  - Border-top: 2px var(--color-accent) (optional accent)
  - Hover: Border → accent, background → surface-alt, image zoom 1.02x
  - Transition: all 300ms ease
  - Border-radius: var(--radius-card)

Content:
  - Badge (14px, 600 weight, accent color, muted background)
  - Title (24px, 600 weight)
  - Description (14px, secondary color)
  - CTA link (cyan, arrow)

Responsive:
  - Desktop: 3 columns (or 2 for featured)
  - Tablet: 2 columns
  - Mobile: 1 column

Accessibility:
  - <article> semantic element
  - Heading hierarchy
  - Link with descriptive text
5. Timeline Component
tsx
Props:
  - items (array of timeline entries)

Item structure:
  - date (string)
  - title (string)
  - description (string)

Visual:
  - Vertical left border (2px var(--color-border))
  - Dots (12px circle, var(--color-accent))
  - Left padding offset for border

Styling:
  - Date: 14px, 600 weight, cyan
  - Title: 18px, 400 weight
  - Description: 14px, secondary color
  - Gap between items: var(--space-8)

Responsive:
  - Desktop: Left-aligned with border on left
  - Mobile: Same layout, but text takes full width

Accessibility:
  - Semantic list structure
  - Heading hierarchy
6. Footer Component
tsx
Layout (4 columns on desktop):
  - Column 1: Navigation links
  - Column 2: Social links
  - Column 3: Resources
  - Column 4: Build info

Mobile/Tablet:
  - 2 columns (tablet)
  - 1 column (mobile)
  - Stack vertically

Styling:
  - Background: var(--color-surface)
  - Border-top: 1px var(--color-border)
  - Padding: var(--space-16)
  - Section headers: 14px, 600 weight
  - Links: 14px, secondary color, cyan on hover
  - Copyright: 12px, tertiary color

Content:
  - Navigation: Work, Experience, About, Contact
  - Social: GitHub, LinkedIn, Email, Twitter
  - Resources: Blog, Resume, Sitemap
  - Build: "Built with Next.js, TypeScript, Tailwind CSS"

Responsive:
  - Desktop: 4-column grid
  - Tablet: 2-column grid
  - Mobile: 1 column, stacked
Phase 2 Deliverables
✓ All core components built
✓ All components use design tokens
✓ Hover/focus states working
✓ Responsive behavior verified
✓ Accessibility verified (focus visible, semantic HTML)
✓ No console errors
SECTION 07: LAYOUT & STRUCTURE (Phase 3)
Page Layout Wrapper

Every page should have:

<header>           (Navigation)
  <nav>Navigation component</nav>
</header>

<main>             (Primary content)
  Content here
</main>

<footer>           (Footer)
  Footer component
</footer>
Grid System Implementation
css
.container {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), minmax(0, 1fr));
  gap: var(--grid-gap);
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--grid-gap);
}

/* Breakpoints */
@media (min-width: 1024px) {
  :root {
    --grid-cols: 12;
    --grid-gap: clamp(1.5rem, 3vw, 2rem);
    --container-max: 1280px;
  }
}

@media (768px to 1023px) {
  :root {
    --grid-cols: 8;
    --grid-gap: 1.5rem;
    --container-max: 960px;
  }
}

@media (max-width: 767px) {
  :root {
    --grid-cols: 4;
    --grid-gap: 1rem;
    --container-max: 100%;
  }
}
Responsive Patterns

Full width:

css
grid-column: 1 / -1;

Standard content (centered):

css
@media (min-width: 1024px) {
  grid-column: 2 / span 10;  /* 10 of 12, centered */
}
@media (768px to 1023px) {
  grid-column: 1 / span 8;
}
@media (max-width: 767px) {
  grid-column: 1 / -1;
}

Two-column split:

css
@media (min-width: 1024px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-12);
}
@media (max-width: 1023px) {
  display: grid;
  grid-template-columns: 1fr;  /* Stack */
  gap: var(--space-12);
}
Phase 3 Deliverables
✓ Layout wrapper component created
✓ Grid system fully functional
✓ Responsive grid tested on all breakpoints
✓ Container max-widths correct
✓ Gutters/padding correct
✓ No layout shift on breakpoint changes
SECTION 08: HOMEPAGE IMPLEMENTATION (Phase 4)
Homepage Structure (Top to Bottom)

Refer to Document 07, Section 05, Page 01 for complete homepage layout.

Section 1: Hero (70vh)
tsx
Layout:
  Desktop: Asymmetric (text 40%, visual 60%)
  Tablet: Stack (text above visual)
  Mobile: Single column, scaled

Text content (left/top):
  - Headline: "Building digital products from interface to architecture"
    Font: var(--type-display)
  - Subheading: "Full-stack engineer focused on content systems..."
    Font: var(--type-body-large), secondary color
  - Spacing: var(--space-8) between
  - Buttons:
    * Primary: "View My Work" (CTA button)
    * Secondary: "Get in Touch" (ghost button)
    * Gap: var(--space-4)

Visual (right/below):
  - System architecture diagram (IMG-HERO-SYSTEM-DIAGRAM.svg)
  - Height: 400-500px (desktop), 300px (mobile)
  - Interactive on hover (reveals details)
  - OR static with explanatory text

Background:
  - Color: var(--color-bg)
  - Optional subtle grid pattern (opacity 3-5%)

Spacing:
  - Padding: var(--space-24) top/bottom
  - Gap between text and visual: var(--space-12)

Animations (on load):
  - Headline: Fade in + slide up (300ms)
  - Subheading: Fade in (300ms, 100ms delay)
  - Buttons: Fade in (300ms, 200ms delay)
  - Visual: Fade in (400ms, 300ms delay)
  - Total: ~1 second full load
Section 2: Featured Work
tsx
Header: "Selected Work"
  Font: var(--type-headline)
  Margin-bottom: var(--space-12)

Featured project (Aao Seekhe):
  Desktop: Asymmetric (text 40%, image 55%)
  Tablet: Stack (text above image)
  Mobile: Single column

Text content:
  - Badge: "EDTECH / CMS / FULL-STACK"
  - Title: "AAO SEEKHE"
    Font: var(--type-display-secondary)
  - Tagline: "Content infrastructure for an EdTech platform"
    Font: var(--type-body-large), secondary
  - Description: 1-2 sentences
    Font: var(--type-body)
  - CTA: "Explore Case Study →"
    Font: var(--type-label), cyan, arrow animates on hover

Image:
  - Source: IMG-AAO-HERO (actual screenshot)
  - Height: 400-500px (desktop)
  - Border-radius: 0px (sharp)
  - Border: 1px var(--color-border)
  - Alt: "Aao Seekhe CMS dashboard interface"
  - Lazy load: Yes
  - On hover: Image zoom 1.02x, 300ms

Spacing:
  - Section: var(--space-24) vertical
  - Gap: var(--space-12) between text/image

Animations:
  - Scroll reveal: Fade in + slide on scroll
  - Hover: Image zoom, border color change
Section 3: Additional Projects Grid
tsx
Header: "Additional Work"
  Font: var(--type-headline)

Cards (3-4 items):
  Layout (compact-block):
    - Image: 180px, 4:3 aspect (optional)
    - Title: Smaller subheading
    - Metadata: Caption, secondary
    - Description: One line, body-small
    - Link: "View →"

  Styling:
    - Border: 1px var(--color-border)
    - Padding: var(--space-8)
    - Border-radius: var(--radius-card)
    - Hover: Border accent, background shift, image zoom

  Grid:
    - Desktop: 3 columns (4 cols each from 12-col grid)
    - Tablet: 2 columns
    - Mobile: 1 column
    - Gap: var(--space-6)

Spacing:
  - Section: var(--space-24)
Section 4: Experience Snapshot
tsx
Header: "Career Progression"
  Font: var(--type-headline)

Timeline (vertical, simplified):
  Visual:
    - Left border: 2px var(--color-border)
    - Dots: 12px circle, var(--color-accent)

  Items (4-5):
    - Date/period: var(--type-label), cyan
    - Title: var(--type-body-large)
    - Description: var(--type-body-small), secondary
    - Gap between: var(--space-8)

  Items:
    1. 2021–2025: B.Tech
    2. Jun–Sep 2024: Internship 01 [PLACEHOLDER]
    3. Oct 2024–Feb 2025: Internship 02 [PLACEHOLDER]
    4. 2025+: Aao Seekhe CMS
    5. 2026+: MBA (Manipal)

CTA: "View Full Timeline →"
  Font: var(--type-label), cyan
  Destination: /experience

Spacing:
  - Section: var(--space-24)
  - Max-width: 900px
Section 5: Playground Preview
tsx
Header: "Latest Experiments"
  Font: var(--type-headline)

Cards (3-4 experiments):
  Layout:
    - Preview image: 240px height
    - Title: Smaller subheading
    - Description: body-small
    - Tags: Badges
    - CTA: "View →"

  Grid:
    - Desktop: 3 columns
    - Tablet: 2 columns
    - Mobile: 1 column
    - Gap: var(--space-6)

CTA: "See All Experiments →"
  Font: var(--type-label), cyan
  Destination: /playground

Spacing:
  - Section: var(--space-24)
Section 6: Bottom CTA
tsx
Background: var(--color-surface)
Border-top: 1px var(--color-border)
Padding: var(--space-24)

Content (centered, max-width: 800px):
  - Headline: "Let's build something meaningful"
    Font: var(--type-display-secondary)
  - Subheading: "Have an interesting problem or want to explore ideas?"
    Font: var(--type-body-large), secondary
  - Buttons:
    * Primary: "Get in Touch"
    * Secondary: "View All Work"
  - Optional email: Secondary text below

  Desktop: Buttons in row
  Mobile: Buttons stacked

Spacing:
  - Between elements: var(--space-8)
Phase 4 Deliverables
✓ Homepage fully implemented
✓ All sections render correctly
✓ Responsive on all breakpoints
✓ Animations working smoothly
✓ Images displaying (or [PLACEHOLDER] labels clear)
✓ No console errors
✓ Navigation functional
✓ Touch targets 44px minimum
✓ Lighthouse score calculated
SECTION 09: PROJECT PAGES & CASE STUDIES (Phase 5)
Work Page (/work)
tsx
Header: "Selected Work"
  Font: var(--type-display-secondary)

Project grid (all projects listed):
  Tier 1 (Aao Seekhe):
    - Featured position (2 columns wide at top)
  Tier 2 (SharePoint, SME Expert):
    - Below featured (2 columns)
  Tier 3 (B.Tech, others):
    - Bottom (3 columns)

Grid:
  - Desktop: Variable (2-3 columns)
  - Tablet: 2 columns
  - Mobile: 1 column
  - Gap: var(--space-6)

Each card: Use Project Card component (built in Phase 2)
Case Study Page Template (/work/[slug])

Refer to Document 07, Section 05, Page 03-10 for complete case study template.

Each case study includes:

1. Project Hero
   - Full-width image (60vh, 16:9 aspect)
   - Gradient overlay (dark, bottom-to-top)
   - Title + metadata overlaid
   - Breadcrumb navigation

2. Overview Section (900px max-width)
   - Headline: "The Project"
   - Summary paragraph
   - Key facts grid (role, duration, team, status)

3. Problem Section
   - Headline: "The Challenge"
   - Problem description (2-3 paragraphs)
   - Why it mattered

4. Full-width Image Breakout
   - 1280px width, 4:3 aspect, sharp radius

5. Solution Section
   - Headline: "Our Approach"
   - Solution description
   - Visual: diagram or screenshot

6. Technical Architecture
   - Layered system diagram
   - Layer descriptions

7. Implementation Details
   - Frontend stack + description
   - Backend & database + description
   - Deployment & infrastructure

8. Challenges & Solutions
   - 3 cards: Challenge → Solution → Impact
   - Grid layout

9. Results & Outcomes
   - Metrics (ONLY verified, not invented)
   - Qualitative outcomes
   - Success indicators

10. Learnings
    - Key learnings list
    - How it shapes current approach

11. Related Projects
    - 3 related project cards (bottom)

12. Bottom CTA
    - "Want to build something similar?"
    - Primary + secondary buttons
Phase 5 Deliverables
✓ Work page (projects index) complete
✓ Case study template created
✓ Aao Seekhe case study complete
  - All sections present
  - Diagrams rendering (or [PLACEHOLDER] labels clear)
  - Screenshots present (or [PLACEHOLDER])
✓ Responsive on all breakpoints
✓ Navigation to/from case studies working
✓ All images lazy-loading
✓ Alt text on all images
✓ No console errors
SECTION 10: REMAINING PAGES (Phase 6-7)
Experience Page (/experience)

Refer to Document 07, Section 05, Page 11

1. Hero: "Career Progression"
2. Main Timeline (vertical, left-aligned)
   - B.Tech 2021–2025
   - Internship 01: Jun–Sep 2024 [PLACEHOLDER]
   - Internship 02: Oct 2024–Feb 2025 [PLACEHOLDER]
   - Real Product: 2025+
   - MBA: 2026+ (current)
3. Growth Narrative Section
   - 5 stages: Learn → Build → Solve → Own → Ship
   - Desktop: 5 columns
   - Tablet/Mobile: Reflow
4. Footer

Timeline component renders chronologically.
Responsive recomposition on all breakpoints.
About Page (/about)

Refer to Document 07, Section 05, Page 12

1. Hero: "About Me"
2. "Who I Am" section
   - Narrative [PLACEHOLDER]
3. "My Journey" section
   - Growth story [PLACEHOLDER]
4. "How I Think" section
   - Philosophy bullet points [PLACEHOLDER]
5. "How I Work" section
   - 7-step workflow visualization
   - Steps: Understand, Structure, Design, Build, Integrate, Refine, Ship
   - Desktop: 7 columns (or 3-3-1)
   - Tablet: 3 columns
   - Mobile: 1 column
6. "What I'm Exploring" section
   - Exploration interests [PLACEHOLDER]
7. "Connect" section
   - Social links grid
8. Footer
Contact Page (/contact)

Refer to Document 07, Section 05, Page 13

1. Hero: "Let's build something meaningful"
2. Primary CTA: Email address [PLACEHOLDER]
   - Clickable mailto: link
   - Font: var(--type-headline), cyan
3. Contact Form (optional)
   - Fields: Name, Email, Subject, Message
   - Button: "Send"
   - Success message: "Thanks! I'll respond within 24-48 hours."
   - Error handling: Show validation errors
4. Secondary Contact: Social links
   - GitHub, LinkedIn, Email, Twitter (if applicable)
5. Availability note: "I typically respond within 24-48 hours."
   - Font: var(--type-caption)
6. Footer

Max-width: 700px, centered
Resume Page (/resume)
1. Hero: "Resume"
2. Online resume display
   - Professional layout
   - Sections: Summary, Experience, Projects, Skills, Education, Links
3. Download button: "Download as PDF"
4. Footer

OR simply redirect to /resume.pdf for PDF download.
404 Page
1. Headline: "404 — Page Not Found"
2. Message: "The page you're looking for doesn't exist."
3. CTAs:
   - "Back to Home"
   - "View My Work"
4. Consistent styling with rest of site
Phase 6-7 Deliverables
✓ All remaining pages created (/experience, /about, /contact, /resume, 404)
✓ Content accurate (watch for [PLACEHOLDER] tags)
✓ Responsive on all breakpoints
✓ Navigation functional to/from all pages
✓ Forms functional (if used)
✓ Download links working
✓ No console errors
SECTION 11: ANIMATIONS & INTERACTIONS (Phase 8)
What to Animate (And Why)

Page Load:

Hero section (on page load):
  - Headline: Fade in + slide up (300ms ease-out)
  - Subheading: Fade in (300ms, 100ms delay)
  - Buttons: Fade in (300ms, 200ms delay)
  - Visual: Fade in (400ms, 300ms delay)
  Total time: ~1 second
  Creates: Sense of content loading progressively

Scroll Reveals:

Cards, sections entering viewport:
  - Fade in + slide from below (400ms ease-out)
  - Staggered timing between items (50-100ms)
  Creates: Smooth flow as user scrolls
  
Respects: prefers-reduced-motion (disable all animations)

Hover States:

Links (text):
  - Color: var(--color-text) → var(--color-accent)
  - Duration: 200ms ease
  Creates: Interactivity signal

Buttons:
  - Background color change
  - Duration: 200ms ease
  Creates: Feedback

Project cards:
  - Border: var(--color-border) → var(--color-accent)
  - Background: shift
  - Image: zoom 1.02x
  - Duration: 300ms ease
  Creates: Interactive feedback

CTA arrow:
  - Move right 4-6px
  - Duration: 300ms ease
  Creates: Motion feedback (arrow "moves" on hover)

Focus States:

All interactive elements:
  - Outline: 2px solid var(--color-accent)
  - Outline-offset: 2px
  Creates: Keyboard navigation visibility
What NOT to Animate
✗ NO parallax
✗ NO cursor-following effects
✗ NO floating/drifting background objects
✗ NO animation on every element
✗ NO animation chain > 1 second
✗ NO layout animations (causes jank)
✗ NO heavy easing (use standard cubic-bezier)
✗ NO gradient animations
Reduced Motion Support
css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

Rule: All animations disabled for users with prefers-reduced-motion.
Functionality must work identically without animation.

Phase 8 Deliverables
✓ Page load animations working
✓ Scroll reveals working (staggered)
✓ Hover states on all interactive elements
✓ Focus states visible on all elements
✓ Arrow animations working (CTA links)
✓ Reduced motion respected (tested)
✓ No jank (60fps, smooth)
✓ Performance still good (no slowdown)
✓ Tested on mobile (no lag)
SECTION 12: ACCESSIBILITY AUDIT (Phase 9)
Semantic HTML Checklist
□ <header> wraps navigation
□ <nav> used for primary navigation
□ <main> wraps primary content
□ <section> for major sections
□ <article> for project cards, case studies
□ <footer> used
□ <h1>, <h2>, <h3> hierarchy (never skip levels)
□ <button> for interactive actions
□ <a> for links (not div with click handler)
□ <form>, <label>, <input> properly associated
□ <img> all have alt="" or descriptive alt text
□ <figure>, <figcaption> for images with captions
□ <ul>, <ol>, <li> for lists
□ <strong> for importance, <em> for emphasis
□ No <div> pretending to be <button>
□ No <span> pretending to be <a>
Color Contrast Verification
Test every text + background combination:
  - Headline on background: Pass 4.5:1
  - Body text on background: Pass 4.5:1
  - Links on background: Pass 4.5:1
  - Large text (18px+): Pass 3:1
  - Border on background (if meaningful): Pass 3:1

Tools: WebAIM Contrast Checker, axe DevTools

Document results. Fix any failures.
Keyboard Navigation Testing
□ Tab: Navigate through all interactive elements
□ Shift+Tab: Navigate backward
□ Enter: Activate buttons
□ Space: Activate buttons/checkboxes
□ Escape: Close mobile menu
□ Focus order: Logical left-to-right, top-to-bottom
□ Skip link: First tab lands on "Skip to main content"
□ Focus visible: Outline visible on ALL focused elements
□ No keyboard traps: Can tab out of any element
□ Focus trap in menu: Focus cycles within menu (intentional)
□ No hidden focus: Focus visible even in complex layouts

Test on:

Chrome
Firefox
Safari
Edge
Mobile browsers
Screen Reader Testing

Test with:

NVDA (Windows)
JAWS (Windows)
VoiceOver (Mac/iOS)
TalkBack (Android)

Verify:

□ Page structure announced (landmarks, headings)
□ Links have meaningful text
□ Form labels associated
□ Error messages announced
□ Images described (alt text)
□ Buttons announced as buttons
□ No screen-reader-only junk
□ Live regions work (aria-live)
□ Form validation errors associated
ARIA Audit
Use ARIA only when semantic HTML insufficient.

Correct usage:
  □ aria-label on icon buttons
  □ aria-describedby linked to error messages
  □ aria-invalid="true" on invalid fields
  □ aria-required="true" on required fields
  □ aria-expanded="true/false" on expandable elements
  □ aria-hidden="true" on decorative elements
  □ aria-live="polite" on status updates
  □ No aria-hidden on interactive elements
  □ No unnecessary role attributes
Mobile Accessibility
□ Touch targets: 44px minimum (height and width)
□ Spacing between targets: 8px minimum
□ Readable text (16px minimum)
□ No horizontal scroll required
□ Zoom allowed (viewport meta allows zoom)
□ Mobile menu: Focus trap working
□ Mobile menu: Escape closes menu
□ Touch-friendly: No hover-only content
Phase 9 Deliverables
✓ All semantic HTML verified
✓ Color contrast: All pass WCAG AA
✓ Keyboard navigation: 100% functional
✓ Focus states: Visible on ALL elements
✓ ARIA: Used correctly where needed
✓ Screen reader: Tested, working
✓ Mobile: Touch targets 44px+
✓ Accessibility audit report generated
✓ All issues fixed
SECTION 13: PERFORMANCE OPTIMIZATION (Phase 10)
Image Optimization
For every image:
  1. Convert to WebP (primary format)
  2. Keep JPEG as fallback
  3. Compress to 70-80% quality
  4. Create 3 versions:
     - Mobile: 600px wide
     - Tablet: 1024px wide
     - Desktop: 1280px wide
  5. Max file size: 150-300KB per image
  6. Add srcset + sizes attribute
  7. Enable lazy loading (below-fold)
  8. Add alt text (descriptive)

Example:
  <img
    src="image-desktop.webp"
    srcset="
      image-mobile.webp 600w,
      image-tablet.webp 1024w,
      image-desktop.webp 1280w
    "
    sizes="(max-width: 600px) 100vw,
           (max-width: 1024px) 90vw,
           1280px"
    alt="Descriptive alt text"
    loading="lazy"
    width="1280"
    height="720"
  />
Font Optimization
Display font (IBM Plex Serif 700):
  - Font-display: swap (don't wait for font)
  - Only load at display level
  - Preload if above-fold

Mono font (IBM Plex Mono 400):
  - Font-display: swap
  - Preload if used in hero

Body font (System fonts):
  - NO download needed (already on device)
  - Fastest, most accessible
JavaScript Optimization
□ No unnecessary JavaScript
□ Minimize bundle size
□ Code split if using dynamic imports
□ Defer non-critical JS
□ No heavy animation libraries for simple animations
□ Next.js automatic optimization enabled
□ Tree-shake unused code
CSS Optimization
□ Critical CSS inlined in <head>
□ Remaining CSS deferred
□ Minification enabled
□ Unused CSS removed (purged by Tailwind)
□ No inline styles (use utility classes)
□ CSS modules for component scoping (if needed)
Monitoring Core Web Vitals

Target metrics:

LCP (Largest Contentful Paint):  < 2.5 seconds
FID (First Input Delay):         < 100ms (deprecated, now INP)
CLS (Cumulative Layout Shift):   < 0.1

How to test:
  1. Lighthouse (in DevTools)
  2. PageSpeed Insights (Google)
  3. WebVitals library (JavaScript)
  4. Monitor after deployment
Phase 10 Deliverables
✓ All images optimized (WebP + JPEG)
✓ Responsive images with srcset
✓ Lazy loading enabled
✓ Fonts optimized (swap display)
✓ JavaScript minified
✓ CSS minified, unused removed
✓ LCP < 2.5s verified
✓ CLS < 0.1 verified
✓ Lighthouse score > 90
✓ No performance regressions on mobile
SECTION 14: SEO & METADATA (Phase 11)
Page Metadata

Every page needs:

html
<title>Page Title — Shivam Singh</title>
<meta name="description" content="70-160 char description">
<link rel="canonical" href="https://[domain]/path">

<!-- Open Graph (social sharing) -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://[domain]/image.jpg">
<meta property="og:url" content="https://[domain]/path">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://[domain]/image.jpg">
Structured Data (JSON-LD)
json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shivam Singh",
  "url": "https://[domain]/",
  "description": "Full-stack engineer building digital products...",
  "sameAs": [
    "https://github.com/[username]",
    "https://linkedin.com/in/[username]",
    "https://twitter.com/[username]"
  ]
}

Also create structured data for:

WebSite
CreativeWork (for each project)
Person (for Shivam)
Technical SEO
□ Sitemap.xml created (lists all pages)
□ robots.txt configured
□ Mobile-friendly (responsive verified)
□ Page speed optimized
□ Semantic HTML (proper heading hierarchy)
□ Descriptive URLs (/work/aao-seekhe not /project/123)
□ Image alt text on all images
□ Internal linking structure (projects link to each other)
□ No 404 errors
Phase 11 Deliverables
✓ Meta tags on all pages
✓ Open Graph tags on all pages
✓ Twitter cards on all pages
✓ Structured data (JSON-LD) valid
✓ Sitemap.xml generated
✓ robots.txt configured
✓ All pages crawlable by search engines
✓ Schema.org markup validated
SECTION 15: TESTING & QA (Phase 12)
Comprehensive Testing Checklist

Responsive Design Testing:

□ Desktop (1440px): All pages, no layout issues
□ Desktop (1280px): All pages, no layout issues
□ Desktop (1024px): All pages, no layout issues
□ Tablet (768px): All pages, responsive reflow correct
□ Mobile (480px): All pages, responsive correct
□ Mobile (375px): All pages (iPhone SE size)
□ Mobile (320px): All pages (very narrow), no overflow
□ No horizontal scrolling on mobile
□ Touch targets: 44px minimum
□ No layout shift on breakpoint changes

Functionality Testing:

□ All links work (internal + external)
□ Navigation functional on all breakpoints
□ Mobile menu: Opens + closes
□ Mobile menu: Focus trap working
□ Mobile menu: Escape closes
□ All buttons functional
□ Contact form: Validates + submits
□ Download links: Work
□ No 404 errors on main pages
□ No console errors
□ No console warnings

Performance Testing:

□ Lighthouse score > 90 (all pages)
□ LCP < 2.5s (all pages)
□ CLS < 0.1 (all pages)
□ Images load without delay
□ Animations smooth (60fps)
□ No jank on scroll
□ Mobile performance acceptable

Accessibility Testing:

□ Color contrast WCAG AA (all text)
□ Keyboard navigation (full test)
□ Focus states visible (all elements)
□ Screen reader (NVDA, JAWS, VoiceOver tested)
□ Mobile accessibility (TalkBack tested)
□ ARIA markup correct
□ Semantic HTML verified
□ Touch targets 44px minimum
□ Reduced motion respected

Cross-Browser Testing:

□ Chrome (latest)
□ Firefox (latest)
□ Safari (latest)
□ Edge (latest)
□ Mobile Chrome (latest)
□ Mobile Safari (latest)
□ No major visual differences
□ No broken layouts
□ No missing features

Content Testing:

□ No [PLACEHOLDER] tags visible to users
□ All copy proofread
□ All images present + correct
□ All diagrams rendering
□ All links pointing to correct pages
□ Social links active
□ Email links working
□ No typos or broken text

SEO Testing:

□ Meta tags on all pages (title + description)
□ Structured data valid (Schema.org)
□ Sitemap.xml accessible
□ robots.txt correct
□ Canonical URLs set
□ No duplicate content
□ Internal linking structure good
□ Alt text on all images
Phase 12 Deliverables
✓ All testing completed
✓ Comprehensive testing report generated
✓ All bugs fixed
✓ No console errors
✓ No accessibility violations
✓ Performance verified on all breakpoints
✓ Cross-browser verified
✓ Content accuracy verified
✓ Ready for production deployment
SECTION 16: DEPLOYMENT (Phase 13)
Pre-Deployment Checklist
□ All code committed + pushed
□ Environment variables configured
□ Production build created (npm run build)
□ No build errors
□ All pages render in production build
□ Analytics ID set (if using)
□ Email service configured (contact form)
□ Domain DNS configured (if new domain)
□ SSL certificate ready (automatic with Vercel)
□ Backup of current site (if updating existing)
Deployment to Vercel (Recommended)

Option 1: GitHub Push (Automatic)

1. Connect repository to Vercel
2. Push code to main/production branch
3. Vercel automatically deploys
4. Verify at https://[domain]

Option 2: CLI Deployment

1. Install Vercel CLI: npm i -g vercel
2. From project root: vercel --prod
3. Follow prompts
4. Verify at https://[domain]

Option 3: Dashboard

1. Log in to Vercel dashboard
2. Select project
3. Go to "Deployments" tab
4. Click "Deploy"
5. Verify at https://[domain]
Post-Deployment Verification
□ Site loads at production URL
□ All pages accessible
□ Images loading correctly
□ CSS/JS loading
□ Performance acceptable
□ No 404 errors
□ Navigation functional
□ Forms working
□ Analytics firing
□ Mobile view working
□ No console errors
Rollback Plan (If Issues Found)
1. Identify issue
2. Vercel keeps previous deployments
3. Go to Vercel dashboard → Deployments
4. Find last stable deployment
5. Click "Redeploy"
6. Fix issue locally
7. Commit + push fix
8. Vercel redeploys automatically

Keep last 3 deployments as backup.

Phase 13 Deliverables
✓ Site deployed to production
✓ Live at https://[domain]
✓ No errors in production
✓ Performance verified on live
✓ All features working
✓ Mobile working
✓ Analytics configured
✓ Monitoring set up
✓ Rollback plan documented
SECTION 17: WHAT TO DO WHEN STUCK
Common Issues & Solutions

Images showing as [PLACEHOLDER]

This is intentional. Contact Shivam to:
  1. Provide actual screenshots
  2. Clarify which diagrams need creation
  3. Provide missing asset descriptions

In the meantime:
  - Create placeholder divs with clear labels
  - Add descriptive alt text explaining what should go there
  - Make sure layout doesn't break without image

Content shows as [PLACEHOLDER]

This is intentional. Missing information from Shivam:
  - Internship company names
  - Internship dates
  - Personal story narrative
  - Philosophy/approach descriptions
  
What to do:
  - Add clear [PLACEHOLDER — VERIFY WITH SHIVAM] comments in code
  - Create placeholder text (in italics or different styling)
  - Ensure page structure works with placeholder
  - Message Shivam with specific information needed

Unsure About Design Decision

1. Check Document 02 (Decision Log) for rationale
2. Check Document 07, Section 03 (Design Tokens) for specs
3. If still unclear, it's probably not critical
4. Build what makes sense based on specifications
5. Ask Shivam for clarification if needed

Performance Issues

1. Run Lighthouse audit
2. Identify bottleneck (images? JavaScript? CSS?)
3. Check optimization section (Document 07, Phase 10)
4. Optimize identified issue
5. Re-run Lighthouse
6. Repeat until targets met

Accessibility Violations

1. Use axe DevTools browser extension to scan
2. Identify violation type (contrast? keyboard? ARIA?)
3. Refer to Document 07, Phase 9 (Accessibility Audit)
4. Fix violation
5. Re-scan to verify fix

Responsiveness Issues

1. Open DevTools
2. Test at specific breakpoint (320px, 768px, 1024px, 1440px)
3. Check if layout matches specification
4. Adjust CSS grid or media queries
5. Test at adjacent breakpoints
6. Verify no overflow/layout shift
When to Message Shivam

Message Shivam for:

Missing content (story, philosophy, descriptions)
Missing screenshots or project details
Confidentiality questions (what can be shown publicly?)
Verification of facts (dates, company names, metrics)
Clarification on internship details
Decisions about placeholder information

Don't assume or invent — ask instead.

SECTION 18: FINAL QUALITY ASSURANCE CHECKLIST

Before saying "done," verify every single item:

Design System
□ All colors match tokens
□ Typography responsive (clamp() working)
□ Spacing consistent throughout
□ Border radius applied correctly
□ Shadows minimal + intentional
□ No hardcoded px values (all use variables)
□ No gradients
□ One accent color (cyan) used consistently
Layout & Responsiveness
□ Desktop (1440px): Perfect
□ Desktop (1280px): Perfect
□ Desktop (1024px): Perfect
□ Tablet (768px): Recomposed correctly
□ Mobile (480px): Recomposed correctly
□ Mobile (375px): Recomposed correctly
□ Mobile (320px): Recomposed correctly, no overflow
□ No layout shift on breakpoint changes
□ All sections have correct spacing
□ Containers max-widths correct
Components
□ Navigation: Desktop + mobile working
□ Buttons: All states (default, hover, focus, active)
□ Links: Color, hover, focus states correct
□ Cards: Hover effect working
□ Timeline: Rendering correctly
□ Forms: Validation + submission working
□ Images: Lazy loading, alt text, srcset
Pages
□ Homepage: All sections present + correct
□ Work page: Projects listed + links working
□ Case studies: All sections present + diagrams
□ Experience: Timeline rendering + responsive
□ About: All sections + content
□ Contact: Email link + form (if used)
□ Resume: Download working
□ 404: Proper error page
Accessibility
□ Semantic HTML verified
□ Color contrast WCAG AA (all combinations)
□ Keyboard navigation 100%
□ Focus states visible (all elements)
□ ARIA used correctly (not overused)
□ Alt text on all images
□ Form labels associated
□ Screen reader compatible
□ Mobile accessible (44px touch targets)
□ Reduced motion respected
Performance
□ Lighthouse > 90 (all pages)
□ LCP < 2.5s (all pages)
□ CLS < 0.1 (all pages)
□ Images optimized (WebP + JPEG)
□ Fonts optimized
□ JavaScript minified
□ CSS minified, unused removed
□ No console errors
□ No console warnings
□ Mobile performance acceptable
Content
□ No [PLACEHOLDER] tags visible to public
□ All copy proofread
□ All images present + correct
□ All diagrams rendering
□ All links working
□ No typos
□ No broken text
□ Proper capitalization
□ Consistent tone
SEO
□ Meta tags (title + description) on all pages
□ Open Graph tags present
□ Twitter cards present
□ Structured data (JSON-LD) valid
□ Sitemap.xml present + valid
□ robots.txt correct
□ No duplicate content
□ Internal linking good
□ Semantic URLs
Cross-Browser
□ Chrome: No issues
□ Firefox: No issues
□ Safari: No issues
□ Edge: No issues
□ Mobile Chrome: No issues
□ Mobile Safari: No issues
□ All major features working
□ No visual regressions
Final Sign-Off
□ All phases completed
□ All deliverables met
□ Testing report generated
□ No known bugs
□ Ready for production
□ Deployment plan documented
□ Rollback plan documented
SECTION 19: HOW TO HAND OFF TO PRODUCTION
Deployment Steps
Create Production Build
bash
   npm run build
   # Verify no errors
Test Production Build Locally
bash
   npm run start
   # Verify all pages render
   # Verify performance
Deploy to Vercel
bash
   vercel --prod
   # OR push to main branch (auto-deploys)
   # OR use Vercel dashboard
Verify at Production URL
Load https://[domain]
Test all pages
Verify images
Check performance
Verify no 404s
Post-Deployment
Monitor error logs
Check analytics
Monitor Core Web Vitals
Be ready to rollback if issues
After Launch
Monitor performance metrics
Fix any reported issues quickly
Collect user feedback
Plan future updates
FINAL NOTES
You Have Everything You Need
✓ Design system complete
✓ Information architecture complete
✓ Component specifications complete
✓ Page layouts detailed
✓ Accessibility requirements clear
✓ Performance targets defined
✓ Quality assurance checklist ready
✓ Deployment instructions provided
✓ 7 supporting documents for reference
Key Principles to Remember
1. Technical Editorial aesthetic
   → Professional, sophisticated, restrained
   → Systems thinking visible in design
   → Not trendy, not generic

2. One accent color (cyan)
   → Used strategically
   → Not everywhere
   → Creates visual hierarchy

3. Whitespace is compositional
   → More empty space than filled
   → Breathing room is design feature
   → Rhythm reflects hierarchy

4. Real work is hero, design is supporting
   → Projects should look impressive
   → Design should enhance, not overshadow
   → Substance > style

5. Accessibility from the start
   → WCAG AA is minimum
   → Keyboard navigation 100%
   → Not an afterthought

6. Performance matters
   → LCP < 2.5s required
   → Images optimized
   → No unnecessary JavaScript
   → Fast on mobile too

7. No invented content
   → Use [PLACEHOLDER] for unknowns
   → Never silently assume facts
   → Ask Shivam when unsure