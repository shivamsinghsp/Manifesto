DOCUMENT 07: ANTIGRAVITY IMPLEMENTATION HANDOFF
COMPLETE TECHNICAL IMPLEMENTATION SPECIFICATION

Version: 1.0
Date: [CURRENT DATE]
Status: READY FOR ANTIGRAVITY DEVELOPMENT
Owner: Shivam Singh
Development Platform: Google Antigravity

SECTION 01: PROJECT CONTEXT & OBJECTIVES
Project Definition

Portfolio Name: Shivam Singh — Personal Portfolio

Portfolio Owner: Shivam Singh
Email: [PLACEHOLDER — VERIFY]
Location: India (Durgapur, West Bengal)

Primary Goal:
Position Shivam as a systems-thinking full-stack engineer who builds thoughtful, scalable products—not "another React developer."

Secondary Goal:
Demonstrate growth trajectory: Academic → Internship Learning → Real Product Ownership → Current Sophistication

Success Criteria:
Visitors understand within 30 seconds that this person can own complex projects end-to-end (UI → API → Data → CMS → Deployment).

Target Audience

Primary:

EdTech founders/CTOs hiring full-stack engineers
SaaS companies needing CMS/content system expertise
Early-stage startups valuing full-stack capability

Secondary:

Recruiters sourcing mid-to-senior engineers
Freelance clients seeking specialized work
Technical peers evaluating work quality
Desired First Impression

"This person doesn't just code features. They understand products as systems."

Should communicate:

✓ Technical depth (not surface-level)
✓ Systems thinking (architecture decisions visible)
✓ Professional maturity (polish, clarity, care)
✓ Continuous growth (learning journey clear)
✓ Personality (approachable, thoughtful, human)
SECTION 02: DESIGN DIRECTION & VISUAL IDENTITY
Design System Name

TECHNICAL EDITORIAL

A premium, art-directed portfolio where design reflects systems thinking. Clean, sophisticated, restrained. Not trendy. Not generic.

Inspiration & Rationale

Composition Ratio:

60% Direction A (Layered Product Studio) — Technical sophistication, visible architecture
30% Direction B (Editorial Minimalism) — Typography, whitespace, intentional composition
10% Direction C (Interactive Command Center) — Restrained interactions, purposeful motion

Core Philosophy:

Form follows function
Design communicates hierarchy and relationships
Whitespace is a compositional tool
Technology choices visible (not hidden)
Real project work is hero, design is supporting player
Visual Personality Attributes
Professional + memorable
Technical + human
Sophisticated + approachable
Modern + timeless
SECTION 03: DESIGN TOKENS (IMPLEMENTATION-READY)
Color System — Dark Theme (Production)

CSS Custom Properties:

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
  
  /* Accent (Cyan) */
  --color-accent: #00B8D4;
  --color-accent-hover: #00A0C0;
  --color-accent-muted: rgba(0, 184, 212, 0.12);
  
  /* CTA Button */
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

Color Usage Rules:

Element	Color	Usage
Headlines	--color-text	Primary text hierarchy
Body text	--color-text	Default reading
Secondary text	--color-text-secondary	Supporting, metadata
Tertiary text	--color-text-tertiary	Captions, hints
Links	--color-accent	Interactive, clickable
Link hover	--color-accent-hover	Hover state
Primary buttons	--color-cta-bg background	Major CTAs
Borders	--color-border	Structural dividers
Diagram nodes	--color-accent	Highlights
Diagram fills	--color-accent-muted	Background tints
Typography System

Font Families:

css
--font-display: 'IBM Plex Serif', Georgia, serif;
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
--font-mono: 'IBM Plex Mono', 'Monaco', 'Courier New', monospace;

Font Loading:

css
/* Display font — load on demand */
@font-face {
  font-family: 'IBM Plex Serif';
  src: url('/fonts/ibm-plex-serif-700.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* Mono font — preload */
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* System fonts — no loading needed */

Typographic Scale (Fluid with clamp()):

css
/* Display — Hero/Major Headlines */
--type-display:
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 6vw + 1rem, 96px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;

/* Display Secondary — Large Headlines */
--type-display-secondary:
  font-family: var(--font-body);
  font-size: clamp(2rem, 5vw + 0.5rem, 72px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.5px;

/* Headline */
--type-headline:
  font-family: var(--font-body);
  font-size: clamp(1.75rem, 3.5vw, 42px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0px;

/* Subheading */
--type-subheading:
  font-family: var(--font-body);
  font-size: clamp(1.25rem, 2.5vw, 36px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0px;

/* Body Large */
--type-body-large:
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.2vw, 18px);
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0px;

/* Body (Default) */
--type-body:
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0px;

/* Body Small */
--type-body-small:
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0px;

/* Label (UI) */
--type-label:
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.5px;

/* Caption */
--type-caption:
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.5px;
  color: var(--color-text-tertiary);

/* Monospace */
--type-mono:
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0px;

/* Monospace Label */
--type-mono-label:
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0px;

Font Weight Usage:

400 (Regular)   — Body text, default
600 (Semibold)  — Labels, UI elements, emphasis
700 (Bold)      — Headlines, display text

NO: 300, 500, 800+ weights
Emphasis via SIZE and WEIGHT, not italic
Italic rare (quotes, captions only)
Spacing Scale

CSS Custom Properties:

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

Spacing Rhythm (Hierarchy-Based):

Between major sections:
  Desktop:   var(--space-32)  [128px]
  Tablet:    var(--space-24)  [96px]
  Mobile:    var(--space-16)  [64px]

Between subsections:
  Desktop:   var(--space-24)  [96px]
  Tablet:    var(--space-16)  [64px]
  Mobile:    var(--space-12)  [48px]

Between content + image:  var(--space-8) to var(--space-12)
Between elements:         var(--space-4) to var(--space-6)
Horizontal gutters:
  Desktop:   var(--space-8)   [32px]
  Tablet:    var(--space-6)   [24px]
  Mobile:    var(--space-4)   [16px]

Principle: Whitespace is compositional.
More empty space than filled space.
Rhythm reflects hierarchy, not uniformity.
Grid System

CSS Grid Setup:

css
/* Main container */
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

Content Width Guidelines:

css
--width-full:    1280px;  /* Full with gutters */
--width-content: 900px;   /* Optimal mixed content */
--width-narrow:  600px;   /* Optimal reading line */

Layout Patterns:

css
/* Full width */
grid-column: 1 / -1;

/* Standard content (centered) */
@media (min-width: 1024px) {
  grid-column: 2 / span 10;  /* 10 of 12 columns, centered */
}

@media (768px to 1023px) {
  grid-column: 1 / span 8;   /* Full 8-column grid */
}

@media (max-width: 767px) {
  grid-column: 1 / -1;       /* Full 4-column grid */
}

/* Two-column split (50/50) */
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
Border & Radius
css
:root {
  --radius-button: 3px;
  --radius-input:  4px;
  --radius-card:   6px;
  --radius-image:  0px;        /* Sharp for impact */
  --radius-subtle: 4px;
  
  --border-width:  1px;
  --border-color:  var(--color-border);
  --border-muted:  var(--color-border-muted);
}

Usage Rules:

Buttons:         var(--radius-button)  [3px]
Inputs:          var(--radius-input)   [4px]
Cards/secondary: var(--radius-card)    [6px]
Large images:    var(--radius-image)   [0px — sharp]
Subtle elements: var(--radius-subtle)  [4px]

Rule: Do NOT round every object.
Major project visuals: 0px radius (sharp corners for impact)
Buttons/inputs: 3-4px (subtle rounding)
Cards: 4-6px (friendly but not excessive)
Some designs call for zero radius — use intentionally.
Motion Tokens
css
:root {
  /* Easing */
  --ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9);
  --ease-smooth:   ease-in-out;
  
  /* Durations */
  --duration-fast:      150ms;
  --duration-standard:  300ms;
  --duration-slow:      400ms;
  --duration-reveal:    600ms;
}

Motion Principles:

✓ Motion must communicate (hierarchy, state, interaction)
✓ Respect prefers-reduced-motion
✓ Use GPU-accelerated properties (transform, opacity)
✓ Purposeful (not decorative)

✗ NO parallax
✗ NO cursor-following effects
✗ NO floating/drifting objects
✗ NO animation on every element
✗ NO excessive motion
Shadows
css
:root {
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg:  0 12px 16px rgba(0, 0, 0, 0.15);
  --shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.2);
}

Usage:

Minimal shadows, high intent.
Cards default: NO shadow (use border instead)
Hover state: --shadow-md
Interactive elements: --shadow-sm at most
NO drop shadows on every element
Shadows communicate elevation, not just decoration
SECTION 04: INFORMATION ARCHITECTURE
Site Structure (Approved)
/ (Home)
├── /work (Projects)
│   ├── /work/aao-seekhe (Tier 1 — Flagship)
│   ├── /work/sharepoint-knowledge-hub (Tier 2)
│   ├── /work/sme-expert-platform (Tier 2)
│   ├── /work/campus-connect (Tier 3 — B.Tech)
│   └── /work/[additional-projects] (Tier 3)
│
├── /experience (Career Timeline)
│
├── /about (Personal Story + Philosophy)
│
├── /contact (Get in Touch)
│
├── /resume (CV Download)
│
├── 404 (Error Page)
│
└── Optional:
    └── /playground (Experiments)
Navigation Model

Primary Navigation (Header):

SHIVAM | 01. WORK | 02. EXPERIENCE | 03. ABOUT | 04. CONTACT

Footer Navigation:

[Quick links] [Social links] [Copyright]

Mobile Navigation:

Hamburger menu (fixed overlay)
Same items, stacked vertically
Focus trap, escape-to-close, scroll lock
SECTION 05: PAGE SPECIFICATIONS (COMPLETE)
PAGE 01: HOMEPAGE (/)
Purpose & Objectives
Purpose:
  - Communicate Shivam's full-stack identity within 30 seconds
  - Establish visual brand
  - Direct to project work and contact
  
Objectives:
  - User understands capabilities (UI → API → Backend → Data)
  - Projects feel impressive and well-executed
  - Contact path is obvious
  - Growth journey is apparent
Structure (Top to Bottom)

1. Navigation Bar (72px sticky)

Left:      Logo "SHIVAM"
Center:    Navigation (01. WORK, 02. EXPERIENCE, 03. ABOUT, 04. CONTACT)
Right:     (Empty or optional secondary element)

Desktop:   Horizontal, full navigation visible
Mobile:    Hamburger menu (overlay)

Implementation:
  - Sticky positioning
  - Border-bottom: 1px var(--color-border)
  - Height: 72px
  - Padding: var(--space-6) var(--space-8)
  - Font: var(--type-label) for navigation items

2. Hero Section (Asymmetric)

Height:        70vh (desktop), 60vh (tablet), 50vh (mobile)
Layout:        Asymmetric side-by-side (desktop), stack (tablet), single-column (mobile)

Desktop Composition:
  Left (40%):
    - Headline (var(--type-display))
      "Building digital products from interface to architecture"
    - Subheading (var(--type-body-large), secondary color)
      "Full-stack engineer focused on content systems and product design"
    - Spacing: var(--space-8)
    - Buttons:
      * Primary: "View My Work" (CTA button style, warm off-white)
      * Secondary: "Get in Touch" (ghost button)
    - Gap between buttons: var(--space-4)
  
  Right (55%):
    - System architecture diagram (IMG-HERO-SYSTEM-DIAGRAM.svg)
    - Height: 400-500px
    - Interactive hover (reveals details on hover)
    - OR static with explanatory text below

Tablet Composition:
  Full-width, text above visual
  Text: center-aligned
  Visual: full-width below text, 400px height
  Spacing: var(--space-12) between text and visual

Mobile Composition:
  Single column, stacked
  Text: left-aligned
  Font sizes: Scaled via clamp()
  Visual: 300px height, full-width
  Buttons: Stacked vertically

Spacing:
  Top/bottom padding: var(--space-24)
  Between headline and subheading: var(--space-4)
  Between subheading and buttons: var(--space-8)
  Between buttons: var(--space-4)

Background:
  Color: var(--color-bg)
  Optional: Subtle 32px grid pattern (opacity 3-5%)

3. Featured Work Section

Section header: "Selected Work"
  Font: var(--type-headline)
  Color: var(--color-text)
  Margin-bottom: var(--space-12)

Featured project card (Aao Seekhe):
  Layout: Asymmetric or 50/50 split
  
  Text content (left/top):
    Badge: "EDTECH / CMS / FULL-STACK"
      Font: var(--type-label)
      Background: var(--color-accent-muted)
      Color: var(--color-accent)
      Padding: var(--space-2) var(--space-4)
      Border-radius: var(--radius-subtle)
    
    Title: "AAO SEEKHE"
      Font: var(--type-display-secondary)
      Margin-top: var(--space-4)
    
    Tagline: "Content infrastructure for an EdTech platform"
      Font: var(--type-body-large)
      Color: var(--color-text-secondary)
      Margin-top: var(--space-4)
    
    Description: 1-2 sentences explaining the work
      Font: var(--type-body)
      Color: var(--color-text-secondary)
      Margin-top: var(--space-4)
    
    CTA: "Explore Case Study →"
      Font: var(--type-label)
      Color: var(--color-accent)
      Animation on hover: Arrow moves right 4-6px
      Destination: /work/aao-seekhe
  
  Image (right/below):
    Source: IMG-AAO-HERO (actual screenshot or mockup)
    Aspect ratio: 4:3 or 16:9 (decide)
    Height: 400-500px (desktop)
    Border-radius: 0px (sharp corners for impact)
    Border: 1px var(--color-border)
    Lazy-load: Yes (if below fold)
    Alt text: "Aao Seekhe CMS dashboard interface"
    On hover: Subtle image zoom (1.01-1.02x), 300ms duration

Spacing:
  Total section padding: var(--space-24) vertical
  Gap between text and image: var(--space-12)
  Container max-width: 1280px

Responsive:
  Desktop (1024px+):
    Two-column: 40% text, 55% image, gap var(--space-12)
  Tablet (768-1023px):
    Stack: Text above image, 100% width each
  Mobile (320-767px):
    Stack: Text above image, 100% width, text smaller via clamp()

4. Secondary Projects Grid

Section header: "Additional Work"
  Font: var(--type-headline)
  Margin-bottom: var(--space-12)

Project cards (3-4 cards, compact-block template):
  Card structure:
    [Optional small image: 180px height, 4:3 aspect]
    [Spacing: var(--space-6)]
    Title (var(--type-subheading), smaller via clamp)
    [Spacing: var(--space-2)]
    Metadata (var(--type-caption), secondary color)
    [Spacing: var(--space-2)]
    Description (var(--type-body-small), one line)
    [Spacing: var(--space-4)]
    CTA link: "View →" (cyan, animate arrow on hover)
  
  Card styling:
    Border: 1px var(--color-border)
    Border-radius: var(--radius-card)
    Padding: var(--space-8)
    Hover state:
      Border color: var(--color-accent)
      Background: var(--color-accent-muted)
      Image zoom: 1.01x, 300ms
      Transition: all 300ms ease
  
  Grid:
    Desktop (1024px+):  3 columns (4 columns each from 12-col grid)
    Tablet (768-1023px):  2 columns (6 columns each)
    Mobile (320-767px):  1 column (full width)
    Gap: var(--space-6)

Examples:
  - SharePoint Knowledge Hub
  - SME Expert Platform
  - Campus Connect (B.Tech)

Spacing:
  Section padding: var(--space-24)
  Container: 1280px max-width

5. Experience Snapshot Section

Section header: "Career Progression"
  Font: var(--type-headline)
  Margin-bottom: var(--space-8)

Subtitle: [Optional motivational text]
  Font: var(--type-body-large)
  Color: var(--color-text-secondary)
  Margin-bottom: var(--space-12)

Timeline (vertical, simplified):
  Visual: Vertical line with dots
  Left border: 2px var(--color-border)
  Dots: 12px circle, var(--color-accent)
  Position: Left-aligned

Timeline items (4-5 key points):
  Format:
    Date/Period:
      Font: var(--type-label)
      Color: var(--color-accent)
    Title:
      Font: var(--type-body-large)
      Color: var(--color-text)
    Description:
      Font: var(--type-body-small)
      Color: var(--color-text-secondary)
  
  Spacing between items: var(--space-8)
  Left padding (to account for border): var(--space-4)

Items:
  1. 2021–2025: B.Tech
  2. Jun–Sep 2024: Internship 01 (TechNova) [PLACEHOLDER]
  3. Oct 2024–Feb 2025: Internship 02 (Apex) [PLACEHOLDER]
  4. 2025+: Aao Seekhe CMS
  5. 2026+: MBA (Manipal)

CTA: "View Full Timeline →"
  Font: var(--type-label)
  Color: var(--color-accent)
  Destination: /experience

Spacing:
  Section padding: var(--space-24)
  Container max-width: 900px

6. Playground Preview Section

Section header: "Latest Experiments"
  Font: var(--type-headline)
  Margin-bottom: var(--space-12)

Experiment cards (3-4 items):
  Layout: Same as secondary projects
  
  Image (preview): 240px height, 4:3 aspect
  Title: var(--type-subheading), smaller
  Description: var(--type-body-small)
  Tags: Small badges (var(--type-caption))
  
  Hover state:
    Border color: var(--color-accent)
    Image zoom: 1.02x
    Background shift

Grid:
  Desktop: 3 columns
  Tablet: 2 columns
  Mobile: 1 column
  Gap: var(--space-6)

CTA: "See All Experiments →"
  Font: var(--type-label)
  Color: var(--color-accent)
  Destination: /playground

Spacing:
  Section padding: var(--space-24)

7. Bottom CTA Section

Background: var(--color-surface)
Padding: var(--space-24)
Border-top: 1px var(--color-border)

Content (centered, max-width: 800px):
  Headline: "Let's build something meaningful"
    Font: var(--type-display-secondary)
    Color: var(--color-text)
    Text-align: center
    Margin-bottom: var(--space-4)
  
  Subheading: "Have an interesting problem or want to explore ideas?"
    Font: var(--type-body-large)
    Color: var(--color-text-secondary)
    Text-align: center
    Margin-bottom: var(--space-8)
  
  Buttons:
    Desktop: Flex row, justify-content: center, gap: var(--space-4)
    Mobile: Flex column (stacked), full-width buttons
    
    * Primary: "Get in Touch" (CTA button)
    * Secondary: "View All Work" (ghost button)
  
  Optional: Email address below buttons
    Font: var(--type-body-small)
    Color: var(--color-text-secondary)
    Clickable mailto: link

Spacing:
  Section padding: var(--space-24)
  Between elements: var(--space-6)

8. Footer

Background: var(--color-surface)
Border-top: 1px var(--color-border)
Padding: var(--space-16)

Layout (4-column grid, desktop):
  Column 1: Navigation links
  Column 2: Social links
  Column 3: Resources
  Column 4: Build info

Desktop (1280px+):
  Grid: 4 columns
  Gap: var(--space-12)

Tablet (768-1023px):
  Grid: 2 columns
  Gap: var(--space-12)

Mobile (320-767px):
  Grid: 1 column
  Gap: var(--space-8)

Content:
  Section headers:
    Font: var(--type-label)
    Color: var(--color-text)
    Margin-bottom: var(--space-4)
  
  Links:
    Font: var(--type-body-small)
    Color: var(--color-text-secondary)
    Hover: var(--color-accent)
    Transition: color 200ms ease
    Line-height: 1.8
  
  Copyright:
    Font: var(--type-caption)
    Color: var(--color-text-tertiary)
    Margin-top: var(--space-12)
    Padding-top: var(--space-12)
    Border-top: 1px var(--color-border-muted)

Items:
  Navigation: Work, Experience, About, Contact
  Social: GitHub, LinkedIn, Email, [X if applicable]
  Resources: Blog, Resume (PDF), Sitemap
  Build: "Built with Next.js, TypeScript, Tailwind CSS"
Animations
Page load (hero section):
  Headline: Fade in + slide up (300ms, ease-out)
  Subheading: Fade in (300ms, 100ms delay)
  Buttons: Fade in (300ms, 200ms delay)
  Visual: Fade in (400ms, 300ms delay)
  Total time: ~1 second for full load
  Stagger: 100ms between elements

Scroll reveals:
  Project cards: Fade + slide in (400ms ease-out)
  Timeline items: Fade in (300ms ease-out)
  Section headings: Fade in (300ms, staggered)

Hover states:
  Links: Color change (200ms ease)
  Buttons: Color change (200ms ease)
  Project cards: Border color + background + image zoom (300ms ease)
  CTA arrow: Move right 4-6px (300ms ease)

Reduced motion:
  @media (prefers-reduced-motion: reduce) {
    All animations disabled
    Functionality preserved
    No hidden content
  }
Responsive Behavior
Desktop (1024px+):
  - Asymmetric hero (40/60 split)
  - Full navigation visible
  - Multi-column project grids
  - Full-width images
  - All hover effects enabled

Tablet (768-1023px):
  - Hero: Stack (text above visual)
  - Navigation: Hamburger menu (hidden) + mobile overlay
  - Project grids: 2 columns
  - Images: Full-width, proportional height
  - Touch-friendly spacing: 44px minimum targets

Mobile (320-767px):
  - Hero: Single column, compressed
  - All sections: Full-width stack
  - Typography: Fluid scaling via clamp()
  - Buttons: Full-width where appropriate
  - Images: Responsive srcset
  - Touch targets: 44px minimum
  - Font sizes reduced via clamp()
Accessibility
Semantic HTML:
  <header> with <nav>
  <main> for primary content
  <section> for major sections
  <article> for project cards
  <footer>
  
Heading hierarchy:
  <h1> Page title (homepage doesn't need explicit h1)
  <h2> Section headers ("Selected Work", "Career Progression")
  <h3> Card titles
  
Links & buttons:
  <a> for navigation and links
  <button> for interactive elements
  Descriptive link text ("Explore Case Study →", not "Click here")
  
Color contrast:
  Text on background: 4.5:1 ratio (WCAG AA)
  All text tested for sufficient contrast
  
Focus states:
  2px solid var(--color-accent)
  2px outline-offset
  Visible on all interactive elements
  
Keyboard navigation:
  Tab order: Logical (left-to-right, top-to-bottom)
  Skip link: Skip to main content (first element)
  All interactive elements keyboard-accessible
  
Images:
  Alt text on all images (descriptive, not "image")
  Decorative images: alt=""
  
Animation:
  Respects prefers-reduced-motion
  No hidden content based on animation
SEO
<title>: "Shivam Singh — Full-Stack Engineer & Product Developer"
<meta name="description">: "Full-stack engineer focused on CMS and content systems. Building modern web products at scale."

Open Graph:
  og:title, og:description, og:image, og:url
  twitter:card, twitter:title, twitter:description, twitter:image

Canonical: <link rel="canonical" href="https://[domain]/">

Structured data (JSON-LD):
  @context: "https://schema.org"
  @type: "Person"
  name: "Shivam Singh"
  url: "https://[domain]/"
  description: "Full-stack engineer..."
  sameAs: [GitHub, LinkedIn, etc]

Semantic content:
  Proper heading hierarchy
  Descriptive page sections
  No keyword stuffing

Sitemap: /sitemap.xml (includes all pages)
robots.txt: Allow all (or config as needed)
Performance
Target Core Web Vitals:
  LCP: < 2.5 seconds
  FID: < 100ms
  CLS: < 0.1

Images:
  WebP primary, JPEG fallback
  Responsive srcset
  Lazy loading for below-fold
  Max 150-300KB per image
  70-80% quality compression

Fonts:
  System fonts for body (no download)
  Display font on-demand (IBM Plex Serif)
  font-display: swap (no invisible text)

JavaScript:
  Minification
  Code splitting (if using dynamic imports)
  No unnecessary libraries

CSS:
  Critical CSS inlined
  Remaining CSS deferred
  Minification
  Tree-shaking unused styles
PAGE 02: WORK PAGE (/work)
Purpose

Display all projects with ability to navigate to individual case studies.

Structure

1. Hero / Header

Section header: "Selected Work"
  Font: var(--type-display-secondary)
  Padding: var(--space-24)
  
Optional filter/view options:
  Filter by tier (Tier 1, 2, 3)
  Filter by category (CMS, Full-Stack, Academic, etc)

2. Project Grid

Visual hierarchy:
  Tier 1 (Aao Seekhe): 2-column wide at top
  Tier 2 (SharePoint, etc): 2 columns below
  Tier 3 (Supporting): 3 columns at bottom

Desktop (1024px+):
  Tier 1: 2 columns (columns 2-11 of 12-col grid)
  Tier 2: 2 columns
  Tier 3: 3 columns
  Gap: var(--space-6)

Tablet (768-1023px):
  All tiers: 2 columns

Mobile (320-767px):
  All tiers: 1 column (full-width)

Each card (compact-block template):
  [Image: 180px, 4:3 aspect ratio]
  [Spacing: var(--space-6)]
  Title (var(--type-subheading), smaller)
  Metadata: Category / Role
  Description: One line
  [CTA: "View Case Study →"]
  
  Styling:
    Border: 1px var(--color-border)
    Padding: var(--space-8)
    Border-radius: var(--radius-card)
    Hover: Border accent, background muted, image zoom
    Transition: all 300ms ease

3. Footer

Standard footer (see homepage footer)

Responsive
Desktop: Variable column grid (2-3 columns)
Tablet: 2 columns, full-width cards
Mobile: 1 column, full-width cards
PAGE 03-10: INDIVIDUAL CASE STUDY PAGES (/work/[slug])
General Case Study Template

Structure (consistent across all case studies):

[PROJECT HERO]
  Full-width image, 60vh height, 16:9 aspect
  Gradient overlay (dark, bottom-to-top)
  Title + metadata overlaid at bottom
  Breadcrumb navigation (top-left)

[OVERVIEW SECTION - Max-width: 900px]
  "The Project" headline
  One-paragraph summary
  Key facts grid (role, duration, team, status)
  
[PROBLEM SECTION]
  "The Challenge" headline
  Problem statement (2-3 paragraphs)
  Context and why it mattered
  
[FULL-WIDTH IMAGE BREAKOUT]
  1280px width, 4:3 aspect ratio
  6px border-radius + 1px border
  
[SOLUTION SECTION]
  "Our Approach" headline
  Solution description
  Key decisions
  Visual: Diagram or screenshot
  
[ARCHITECTURE SECTION]
  "Technical Architecture" headline
  System diagram (layered visualization)
  Description of each layer
  
[IMPLEMENTATION SECTION]
  "Frontend Stack" subsection
  "Backend & Database" subsection
  "Deployment & Infrastructure" subsection
  Code snippets (if relevant)
  
[CHALLENGES & SOLUTIONS]
  3-4 cards showing challenges, solutions, impact
  
[RESULTS & OUTCOMES]
  "Impact & Outcomes" headline
  Metrics (ONLY verified, not invented)
  Qualitative outcomes
  Success indicators
  
[LEARNINGS]
  "Key Learnings" headline
  What was learned
  How it shapes current approach
  
[RELATED PROJECTS]
  3 related project cards at bottom
  
[BOTTOM CTA]
  "Want to build something similar?"
  Primary + secondary buttons
Case Study Content Areas

Each case study includes different emphasis based on project type.

PAGE 11: EXPERIENCE PAGE (/experience)
Purpose

Show career progression clearly. Make growth narrative visual.

Structure

1. Hero / Header

Section header: "Career Progression"
  Font: var(--type-display-secondary)
  Padding: var(--space-24)

Subtitle (optional): "From learning to ownership"
  Font: var(--type-body-large)
  Color: var(--color-text-secondary)

2. Main Timeline

Visual: Vertical timeline with left border

Items (chronological):
  1. 2021–2025: B.Tech (Computer Science)
     Institution: [PLACEHOLDER]
     Description: [PLACEHOLDER]
  
  2. Jun–Sep 2024: Frontend Internship
     Company: [PLACEHOLDER]
     Description: [PLACEHOLDER]
  
  3. Oct 2024–Feb 2025: Full-Stack Internship
     Company: [PLACEHOLDER]
     Description: [PLACEHOLDER]
  
  4. 2025+: Real Product: Aao Seekhe CMS
     Status: Live in production
     Description: [PLACEHOLDER]
  
  5. 2026+: MBA (Manipal University Jaipur)
     Status: In progress
     Description: [PLACEHOLDER]

Timeline styling:
  Left border: 2px var(--color-border)
  Dots: 12px circle, var(--color-accent), positioned on border
  Left padding: var(--space-4) (to offset border)
  Gap between items: var(--space-12)
  
  Item structure:
    Date/Period: var(--type-label), var(--color-accent)
    Title: var(--type-body-large), var(--color-text)
    Description: var(--type-body-small), var(--color-text-secondary)

3. Growth Narrative

Section header: "Growth Narrative"
  Font: var(--type-headline)

Subheader: "Learn → Build → Solve → Own → Ship"
  Font: var(--type-subheading)

5-column layout (desktop):
  Each column: Stage + description
  
  LEARN:        Foundation through education
  BUILD:        Hands-on internship experience
  SOLVE:        Tackling real technical problems
  OWN:          Taking ownership of products
  SHIP:         Delivering to production

Desktop: 5 columns, equal width
Tablet: 2-3 columns, reflow
Mobile: 1 column, stacked vertically

Styling:
  Column header: var(--type-subheading)
  Description: var(--type-body-small)
  Padding: var(--space-6)
  Border-top: 2px var(--color-accent)

4. Footer

Standard footer

Responsive
Desktop: 5-column growth narrative, side-by-side timeline
Tablet: 2-3 columns, text flows naturally
Mobile: Single column, all stacked
PAGE 12: ABOUT PAGE (/about)
Structure
Hero / Header:
  "About Me" headline
  Font: var(--type-display-secondary)
  Padding: var(--space-24)

Section 1: "Who I Am"
  Font: var(--type-headline)
  Content: [PLACEHOLDER — NARRATIVE]
  Max-width: 900px

Section 2: "My Journey"
  Font: var(--type-headline)
  Content: [PLACEHOLDER — GROWTH STORY]

Section 3: "How I Think"
  Font: var(--type-headline)
  Bullet list or prose
  Content: [PLACEHOLDER — PHILOSOPHY]

Section 4: "How I Work"
  Font: var(--type-headline)
  
  Visual: 7-step workflow
  
  01 — UNDERSTAND
  02 — STRUCTURE
  03 — DESIGN
  04 — BUILD
  05 — INTEGRATE
  06 — REFINE
  07 — SHIP
  
  Desktop: 7 columns (or 3-3-1 rows)
  Tablet: 3 columns
  Mobile: 1 column
  
  Each step:
    Number: var(--type-label), var(--color-accent)
    Title: var(--type-body-large)
    Description: var(--type-body-small)

Section 5: "What I'm Exploring"
  Font: var(--type-headline)
  Bullet list
  Content: [PLACEHOLDER]

Section 6: "Connect"
  Font: var(--type-headline)
  Links grid:
    GitHub
    LinkedIn
    Email
    Twitter (if applicable)
Responsive
Desktop: Max-width 900px, centered
Tablet: 90% width with gutters
Mobile: Full-width with gutters, single column
PAGE 13: CONTACT PAGE (/contact)
Structure
Hero:
  Headline: "Let's build something meaningful"
    Font: var(--type-display-secondary)
    Text-align: center
  
  Subheading: "Have an interesting problem or want to explore ideas together?"
    Font: var(--type-body-large)
    Color: var(--color-text-secondary)
    Text-align: center

Primary CTA:
  Email address: [PLACEHOLDER]
    Font: var(--type-headline)
    Color: var(--color-accent)
    Clickable mailto: link
    Hover: Color var(--color-accent-hover)

Contact Form (optional):
  Fields:
    Name (text input, 44px height)
    Email (email input)
    Subject (text input, optional)
    Message (textarea, 4-5 rows)
  
  Submit button: "Send" (CTA button style)
  
  Success message:
    "Thanks for reaching out. I'll get back to you within 24-48 hours."
  
  Error handling:
    [PLACEHOLDER — SPECIFY ERROR UX]

Secondary Contact:
  Subheading: "Or connect on social:"
    Font: var(--type-body-small)
  
  Icons/links: GitHub, LinkedIn, Email, Twitter

Availability:
  "I typically respond within 24-48 hours."
    Font: var(--type-caption)
    Color: var(--color-text-tertiary)

Max-width: 700px (centered)
Padding: var(--space-24)
Responsive
Desktop: Centered content, 700px max-width
Mobile: Full-width (with gutters), buttons stack
PAGE 14: 404 ERROR PAGE
Header:
  Headline: "Lost in the system" (or creative alternative)
    Font: var(--type-display)
  
  Subheading: "The page you're looking for doesn't exist."
    Font: var(--type-body-large)
    Color: var(--color-text-secondary)

Visual:
  Optional: Simple illustration or diagram showing "broken route"
  
CTAs:
  Primary: "Back to Home" button
  Secondary: "View My Work" button

Accessibility:
  <h1>404</h1>
  Proper semantic structure
  Links work correctly

Styling:
  Consistent with rest of site
  Professional, not playful
SECTION 06: COMPONENT SPECIFICATIONS
Navigation Component
Desktop Navigation:
  Height: 72px
  Background: var(--color-bg)
  Border-bottom: 1px var(--color-border)
  Display: flex, justify-content: space-between, align-items: center
  Padding: 0 var(--space-8)
  Position: sticky, top 0, z-index: 1000
  
  Logo:
    Font: var(--font-display), 700, 20px
    Color: var(--color-text)
    Text-decoration: none
    Content: "SHIVAM"
  
  Navigation items:
    Font: var(--type-label)
    Color: var(--color-text-secondary)
    Hover: var(--color-accent)
    Transition: color 200ms ease
    Gap between items: var(--space-8)
    Items: 01. WORK, 02. EXPERIENCE, 03. ABOUT, 04. CONTACT
    
  Secondary:
    (Currently empty, can add elements)

Mobile Navigation (Hamburger):
  Hamburger button:
    Position: fixed, top: var(--space-6), right: var(--space-6)
    Size: 44px × 44px
    Border: 1px var(--color-border)
    Border-radius: var(--radius-button)
    Z-index: 1001
  
  Menu overlay:
    Position: fixed, full-screen
    Background: var(--color-bg)
    Z-index: 1000
    Display: none (shown when open)
    Features:
      - Focus trapping
      - Escape-to-close
      - Body scroll locking
      - Focus restoration on close
      - aria-labels and proper ARIA attributes
    
    Menu structure:
      Logo
      Navigation items (vertical)
      Social links
      Appropriate spacing
Button Component
Primary Button (.btn-primary):
  Background: var(--color-cta-bg)
  Color: var(--color-cta-text)
  Border: none
  Padding: var(--space-3) var(--space-6)
  Height: 44px
  Border-radius: var(--radius-button)
  Font: var(--type-label)
  Cursor: pointer
  Transition: all 200ms ease
  
  Hover:
    Background: var(--color-cta-hover)
  
  Focus:
    Outline: 2px solid var(--color-accent)
    Outline-offset: 2px

Secondary Button (.btn-secondary):
  Background: transparent
  Color: var(--color-text)
  Border: 1px solid var(--color-border)
  Padding: var(--space-3) var(--space-6)
  Height: 44px
  Border-radius: var(--radius-button)
  Font: var(--type-label)
  Cursor: pointer
  Transition: all 200ms ease
  
  Hover:
    Border-color: var(--color-accent)
    Color: var(--color-accent)
    Background: var(--color-accent-muted)

Ghost Link (.btn-ghost):
  Background: transparent
  Color: var(--color-accent)
  Border: none
  Padding: 0
  Font: var(--type-label)
  Cursor: pointer
  Text-decoration: none
  
  Hover:
    Text-decoration: underline
    Color: var(--color-accent-hover)

CTA Link with Arrow:
  Display: inline-flex
  Align-items: center
  Gap: var(--space-2)
  Color: var(--color-accent)
  Font: var(--type-label)
  Text-decoration: none
  Transition: gap 300ms ease
  
  Hover:
    Gap: var(--space-3)  /* Arrow moves right */
    Color: var(--color-accent-hover)
Project Card Component
.project-card:
  Background: var(--color-surface)
  Border: 1px solid var(--color-border)
  Border-top: 2px var(--color-accent) [optional accent border]
  Border-radius: var(--radius-card)
  Padding: 0 (image flush to top)
  Overflow: hidden
  Transition: all 300ms ease
  
  Image area:
    Width: 100%
    Height: 240px
    Object-fit: cover
    Object-position: center
    Transition: transform 300ms ease
  
  Content area:
    Padding: var(--space-8)
    Background: var(--color-surface)
  
  Hover:
    Border-color: var(--color-accent)
    Background: var(--color-surface-alt)
    Image: scale(1.02)
    Box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2)
Timeline Component
.timeline:
  Border-left: 2px var(--color-border)
  Padding-left: var(--space-4)
  
  .timeline-item:
    Display: flex
    Flex-direction: column
    Gap: var(--space-2)
    Padding: var(--space-8) 0 var(--space-8) var(--space-8)
    Position: relative
    
    Dot marker:
      Width: 12px
      Height: 12px
      Border-radius: 50%
      Background: var(--color-accent)
      Position: absolute
      Left: -7px
      Top: 0
      Border: 2px var(--color-bg)
    
    Date:
      Font: var(--type-label)
      Color: var(--color-accent)
    
    Title:
      Font: var(--type-body-large)
      Color: var(--color-text)
    
    Description:
      Font: var(--type-body-small)
      Color: var(--color-text-secondary)
Image Component
img:
  Width: 100%
  Height: auto
  Aspect-ratio: set based on context
  Border-radius: Set based on context (0 or var(--radius-card))
  Border: 1px var(--color-border) [if needed]
  Display: block
  Background: var(--color-surface-alt)
  
  Lazy-load: true (for below-fold images)
  
  Responsive:
    srcset: "path-mobile.jpg 600w, path-tablet.jpg 1024w, path-desktop.jpg 1280w"
    sizes: "(max-width: 600px) 100vw, (max-width: 1024px) 90vw, 1280px"
  
  Alt: Descriptive text
SECTION 07: ACCESSIBILITY SPECIFICATIONS
Semantic HTML
html
<!-- Page structure -->
<header>Navigation, logo</header>
<nav>Main navigation</nav>
<main>Primary content</main>
<section>Major sections</section>
<article>Project cards, case studies</article>
<aside>Supplementary content (if any)</aside>
<footer>Footer links, copyright</footer>

<!-- Heading hierarchy -->
<h1>Page title (one per page)</h1>
<h2>Major section headers</h2>
<h3>Subsection headers (never skip levels)</h3>

<!-- Interactive -->
<button>For actions</button>
<a href="">For links</a>
<form>Grouped inputs</form>
<label for="input-id">Associated label</label>
<input id="input-id" />

<!-- Media -->
<img alt="Descriptive" src="" />
<figure><img /><figcaption></figcaption></figure>

<!-- Lists -->
<ul><li>Item</li></ul>
<ol><li>Item</li></ol>

<!-- Emphasis -->
<strong>Importance</strong>
<em>Emphasis</em>
Keyboard Navigation
Tab order:        Logical (left-to-right, top-to-bottom)
Skip links:       First element is "Skip to main content"
Focus visible:    2px solid var(--color-accent), 2px offset
Focus trap:       Menu is trapped (focus cycles within)
Focus restore:    Menu close → focus returns to trigger button
Escape-to-close:  Menu responds to Escape key
Color Contrast
WCAG AA minimum:
  Standard text:    4.5:1 ratio
  Large text (18px+): 3:1 ratio

Tested combinations:
  Text on background
  Text on buttons
  Links on backgrounds
  Borders (if conveying information)
  
All text tested and verified before production.
Form Accessibility
<label> always visible, associated via for/id
aria-required="true" for required fields
aria-describedby linked to error messages
aria-invalid="true" for invalid fields
Touch targets:    44px minimum height
Error messages:   Associated with field, described
Success messages: Announced via aria-live
Image Alt Text
Descriptive: "Aao Seekhe CMS dashboard interface"
Decorative: alt="" (empty)
Linked: Alt describes link purpose
Complex: <figure> + <figcaption>
SECTION 08: PERFORMANCE REQUIREMENTS
Core Web Vitals Targets
Largest Contentful Paint (LCP):    < 2.5 seconds
First Input Delay (FID):           < 100ms
Cumulative Layout Shift (CLS):     < 0.1
Image Optimization
Format:        WebP (primary), JPEG (fallback)
Responsive:    srcset for 600px, 1024px, 1280px
Lazy loading:  For all below-fold images
Max file:      150-300KB per image
Compression:   70-80% quality
Font Loading
System fonts:  No download (body text)
Display font:  Preloaded or on-demand
font-display:  swap (no invisible text)
Subset:        Only necessary characters
JavaScript
Minification:  Yes (production build)
Code splitting: If using dynamic imports
No bloat:      Avoid unnecessary libraries
CSS
Critical CSS:  Inline in <head>
Remaining:     Deferred load
Minification:  Yes (production build)
Unused CSS:    Tree-shake, purge, or unused removal
SECTION 09: SEO SPECIFICATIONS
Page Metadata
<title>        "[Page Title] — Shivam Singh"
<meta name="description">  "70-160 character description"
<link rel="canonical">    "https://[domain]/path"

og:title, og:description, og:image, og:url
twitter:card, twitter:title, twitter:description, twitter:image
Semantic Content
Proper heading hierarchy (h1-h3)
Semantic HTML elements
Descriptive page sections
No keyword stuffing
Image alt text on all images
Structured Data
JSON-LD format:
  @context: "https://schema.org"
  @type: "Person" or "WebSite"
  name, description, sameAs, url
  
No fake information (only verified facts)
Technical SEO
sitemap.xml:  List all pages
robots.txt:   Allow all (or specific config)
Canonical URLs: Self-referential on each page
Mobile-first:  Responsive design verified
SECTION 10: TECHNICAL STACK & ARCHITECTURE
Framework & Language
Framework:     Next.js 14
Language:      TypeScript
Styling:       Tailwind CSS + CSS Modules (if needed)
Animation:     CSS animations (not heavy JS libraries)
Project Structure
project-root/
├── public/              (Static assets)
│   ├── fonts/          (Font files: IBM Plex Serif, IBM Plex Mono)
│   ├── images/         (Hero, project images, screenshots)
│   └── icons/          (SVG icons, logos)
│
├── src/
│   ├── app/            (Next.js pages & layouts)
│   │   ├── page.tsx    (Home)
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── experience/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── resume/
│   │   ├── layout.tsx
│   │   └── globals.css (Design tokens)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── navigation/
│   │   │   ├── Nav.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── Timeline.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedWork.tsx
│   │   │   └── ...
│   │   ├── diagrams/
│   │   │   ├── SystemArchitecture.tsx
│   │   │   ├── ContentModel.tsx
│   │   │   └── ...
│   │   └── common/
│   │
│   ├── data/
│   │   ├── projects.ts (Project data structure)
│   │   └── experience.ts (Experience data structure)
│   │
│   ├── lib/
│   │   ├── constants.ts (Color, spacing, breakpoint tokens)
│   │   ├── types.ts (TypeScript interfaces)
│   │   └── utils.ts (Helper functions)
│   │
│   └── styles/
│       └── globals.css (Design tokens, base styles)
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── screenshots/
│   │   └── diagrams/
│   └── icons/
│
├── tailwind.config.js (Tailwind configuration with tokens)
├── tsconfig.json
├── next.config.js
└── package.json
Dependencies
Core:
  next: 14.x
  react: 18.x
  typescript: 5.x

Styling:
  tailwindcss: 3.x
  (CSS Modules for component-scoped styles if needed)

Utilities:
  (Minimal — prefer built-in Next.js features)

Animation:
  CSS animations (no heavy JS libraries)
  (Optional: framer-motion if complex animations needed)

Build/Dev:
  eslint
  prettier
  (Keep minimal)
SECTION 11: DEVELOPMENT PHASES
Phase 1: Project Setup (1 day)
Goals:
  - Initialize Next.js project
  - Configure TypeScript
  - Set up Tailwind CSS
  - Configure design tokens
  
Deliverables:
  - Next.js project scaffolded
  - tsconfig.json configured
  - tailwind.config.js with design tokens
  - globals.css with design system
  - Project folder structure created
  
Definition of Done:
  - Can run `npm run dev` successfully
  - Hot reload working
  - TypeScript compiles without errors
Phase 2: Design System & Global Styles (1-2 days)
Goals:
  - Implement all design tokens
  - Create reusable component patterns
  - Set up typography system
  - Implement accessibility baseline
  
Deliverables:
  - globals.css with all tokens
  - Base component library (Button, Link, etc)
  - Responsive typography working
  - Focus states implemented
  - Mobile navigation component
  
Definition of Done:
  - All design tokens working in components
  - Color contrast verified (WCAG AA)
  - Responsive behavior tested
  - Accessibility baseline met
Phase 3: Layout & Navigation (1-2 days)
Goals:
  - Create header/footer components
  - Implement navigation
  - Set up page layout structure
  
Deliverables:
  - Header component (responsive)
  - Mobile navigation (with focus trap)
  - Footer component
  - Page layout wrapper
  
Definition of Done:
  - Navigation functional on all breakpoints
  - Focus trap working in mobile menu
  - Sticky header working
  - Keyboard navigation working
Phase 4: Homepage (2-3 days)
Goals:
  - Implement hero section
  - Create featured work section
  - Create secondary projects grid
  - Add timeline snapshot
  - Add playground preview
  - Add bottom CTA
  
Deliverables:
  - Hero section (asymmetric, responsive)
  - Featured project component
  - Project grid component
  - Timeline component (on homepage)
  - Playground preview
  - Bottom CTA section
  - Animations implemented
  
Definition of Done:
  - Responsive on all breakpoints
  - Images loading properly
  - Animations working smoothly
  - Performance targets met
  - Accessibility verified
Phase 5: Project Cases Studies (3-5 days)
Goals:
  - Create case study page template
  - Implement Aao Seekhe case study
  - Create diagrams (SVG)
  - Set up project data structure
  
Deliverables:
  - Case study page template
  - Aao Seekhe complete case study
  - System architecture diagram
  - Content model diagram
  - Publishing workflow diagram
  - Database schema diagram
  - Project data structure
  
Definition of Done:
  - Case study pages render correctly
  - Diagrams displaying properly
  - Responsive on all breakpoints
  - Alt text on all images
  - Placeholder images show clearly
Phase 6: Experience & About (2-3 days)
Goals:
  - Experience page with timeline
  - About page with personal story
  - Growth narrative visualization
  
Deliverables:
  - Experience page
  - Timeline component (full version)
  - Growth narrative section
  - About page
  
Definition of Done:
  - Content displays correctly
  - Timeline renders on all breakpoints
  - Styling consistent
  - Copy is accurate
Phase 7: Contact & Resume (1-2 days)
Goals:
  - Contact page with form or email
  - Resume download page
  
Deliverables:
  - Contact page
  - Contact form (if needed) or email link
  - Resume page
  - PDF resume download
  
Definition of Done:
  - Contact form functional (if used)
  - Email links working
  - Resume download working
  - Form validation working
Phase 8: Motion & Interactions (1-2 days)
Goals:
  - Implement all animations
  - Add hover effects
  - Scroll reveals
  - Page transitions
  
Deliverables:
  - All animations implemented
  - Hover states on all interactive elements
  - Scroll reveals working
  - Smooth transitions
  - Reduced motion support
  
Definition of Done:
  - No jank (60 fps animations)
  - Reduced motion respected
  - Performance still good
  - Animations purposeful
Phase 9: Accessibility Audit (1-2 days)
Goals:
  - Full accessibility audit
  - WCAG AA compliance
  - Keyboard navigation full test
  - Screen reader testing
  
Deliverables:
  - Accessibility audit report
  - All issues fixed
  - Semantic HTML verified
  - Focus states tested
  
Definition of Done:
  - All WCAG AA issues resolved
  - Full keyboard navigation works
  - Screen reader compatible
  - 100% semantic HTML
Phase 10: Performance Optimization (1-2 days)
Goals:
  - Image optimization
  - Font loading optimization
  - JavaScript minimization
  - CSS optimization
  - Core Web Vitals achieved
  
Deliverables:
  - Optimized images (WebP + JPEG)
  - Fonts optimized
  - Production build configured
  - Performance budget met
  
Definition of Done:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - Lighthouse score > 90
Phase 11: SEO & Metadata (1 day)
Goals:
  - Add all metadata
  - Structured data
  - Sitemap & robots.txt
  
Deliverables:
  - Meta tags on all pages
  - JSON-LD structured data
  - Sitemap.xml
  - robots.txt
  
Definition of Done:
  - All pages have metadata
  - Structured data valid
  - Search engines can crawl
Phase 12: Testing & QA (2-3 days)
Goals:
  - Full regression testing
  - Responsive testing all breakpoints
  - Cross-browser testing
  - Performance verification
  
Deliverables:
  - Test results document
  - Bug fixes
  - Final optimizations
  
Definition of Done:
  - All pages tested
  - No console errors
  - All breakpoints verified
  - Accessibility re-verified
Phase 13: Deployment (1 day)
Goals:
  - Deploy to production
  - Set up monitoring
  - Verify live
  
Deliverables:
  - Live portfolio
  - Analytics configured
  - Monitoring active
  
Definition of Done:
  - Site accessible at production URL
  - No 404 errors
  - Performance verified live
SECTION 12: QUALITY ASSURANCE CHECKLIST
Before Handoff to Production
[ ] Responsive Design
    [ ] Desktop (1440px, 1280px, 1024px)
    [ ] Tablet (768px)
    [ ] Mobile (480px, 375px, 320px)
    [ ] All breakpoints tested
    [ ] No layout shifts

[ ] Accessibility
    [ ] WCAG AA contrast verified
    [ ] Keyboard navigation full test
    [ ] Focus states visible
    [ ] Screen reader tested
    [ ] Semantic HTML verified
    [ ] Alt text on all images
    [ ] Form labels associated
    [ ] Reduced motion respected

[ ] Performance
    [ ] LCP < 2.5s verified
    [ ] FID < 100ms verified
    [ ] CLS < 0.1 verified
    [ ] Lighthouse > 90
    [ ] Images optimized
    [ ] Fonts optimized
    [ ] No unused CSS/JS
    [ ] Lazy loading working

[ ] Functionality
    [ ] All links working
    [ ] Navigation functional
    [ ] Mobile menu works
    [ ] Contact form works (if used)
    [ ] Resume download works
    [ ] All pages load without errors
    [ ] No console errors
    [ ] Forms validate correctly

[ ] Content
    [ ] All text proofread
    [ ] No [PLACEHOLDER] tags visible
    [ ] All images present and correct
    [ ] All diagrams rendering
    [ ] All links pointing to correct pages
    [ ] Social links working
    [ ] Email links working

[ ] SEO
    [ ] Meta tags on all pages
    [ ] Open Graph tags present
    [ ] Structured data valid
    [ ] Sitemap.xml present
    [ ] robots.txt configured
    [ ] Canonical URLs set

[ ] Cross-Browser
    [ ] Chrome
    [ ] Firefox
    [ ] Safari
    [ ] Edge
    [ ] Mobile browsers

[ ] Analytics
    [ ] Google Analytics configured (if using)
    [ ] Goal tracking set up
    [ ] Events configured
    [ ] No test data in analytics
SECTION 13: DEPLOYMENT INSTRUCTIONS
Pre-Deployment
1. Environment variables configured
   - API endpoints set
   - Analytics IDs set
   - Deployment URL set
   - No secrets in code

2. Production build created
   - npm run build
   - No errors
   - All pages listed

3. Final QA passed
   - All checklist items completed
   - Performance verified
   - Accessibility verified
   - No console errors

4. Backup of current site (if updating existing)
   - Full backup taken
   - Rollback plan documented
Deployment Process (Vercel)
Option A: Git push to production branch
  1. Push to main/production branch
  2. Vercel auto-deploys
  3. Verify at production URL
  4. Run smoke tests

Option B: Manual deployment
  1. `vercel --prod` from CLI
  2. Follow deployment confirmation
  3. Verify at production URL

Option C: Dashboard deployment
  1. Log in to Vercel dashboard
  2. Select project
  3. Click "Deploy"
  4. Verify at production URL
Post-Deployment Verification
1. Site loads without errors
2. All pages accessible
3. Images loading
4. CSS/JS loading
5. Performance metrics good
6. No 404 errors
7. Analytics firing
8. Mobile view working
9. Navigation functional
10. Forms working
Rollback Plan
If issues found:
  1. Identify issue
  2. Vercel automatically keeps previous deployments
  3. Revert to previous deployment via Vercel dashboard
  4. Fix issue locally
  5. Redeploy

Keep last 3 deployments as backup.
SECTION 14: ONGOING MAINTENANCE
Regular Tasks
Weekly:
  - Monitor performance metrics
  - Check for errors in logs
  - Verify all links working
  
Monthly:
  - Performance audit
  - Accessibility check
  - SEO verification
  - Content review
  
Quarterly:
  - Security audit
  - Dependency updates
  - Full QA test
  - Analytics review
Content Updates
When adding a new project:
  1. Update /data/projects.ts with new project data
  2. Create new case study page at /work/[slug]
  3. Add required images to /public/images/projects
  4. Verify case study renders correctly
  5. Test responsive on all breakpoints
  6. Add accessibility alt text
  7. Deploy to production
Dependency Management
Regular updates:
  - Check for security updates monthly
  - Update Next.js to latest stable
  - Update other dependencies as needed
  - Test thoroughly after updates