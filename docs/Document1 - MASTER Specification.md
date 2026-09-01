DOCUMENT 01: MASTER SPECIFICATION
SHIVAM SINGH — PORTFOLIO MASTER SPECIFICATION

Version: 1.0
Last Updated: [CURRENT DATE]
Status: APPROVED FOR DEVELOPMENT
Owner: Shivam Singh
Development Target: Antigravity

SECTION 01: PROJECT CONTEXT
Who Is Shivam Singh?

Name: Shivam Singh

Professional Identity: Full-Stack Developer / Web Product Engineer

Experience Level: Post-internship, real product development, pursuing MBA

Core Capabilities:

Full-stack web development (React/Next.js → Node.js → MongoDB)
CMS architecture & content systems design
Responsive UI/UX implementation
Technical documentation & communication

Current Status:

Active development on real products (Aao Seekhe CMS)
Pursuing MBA through Manipal University Jaipur
Open to new opportunities in full-stack and product engineering
Portfolio Objective

Primary Goal: Position Shivam as a systems-thinking full-stack engineer who builds thoughtful, scalable products—not just "another React developer."

Secondary Goal: Demonstrate growth from academic foundation → internship learning → real product ownership → current sophistication.

Success Metric: Visitors understand within 30 seconds that this person can own complex projects end-to-end (UI → API → Data → CMS → Deployment).

Target Audience

Primary Audience:

EdTech founders/CTOs hiring full-stack engineers
SaaS companies needing CMS/content system expertise
Early-stage startups valuing full-stack capability

Secondary Audience:

Recruiters sourcing senior engineers
Potential freelance clients
Technical peers evaluating work quality
Desired First Impression

"This person doesn't just code features. They understand products as systems."

The portfolio should communicate:

Technical depth (not surface-level)
Systems thinking (visible in architecture choices)
Professional maturity (polish, clarity, attention to detail)
Continuous growth (journey from learning → ownership)
Personality (approachable, thoughtful, human)
SECTION 02: VISUAL DIRECTION
Name: TECHNICAL EDITORIAL

Concept: Premium, art-directed portfolio where design reflects systems thinking. Clean, sophisticated, restrained. Not trendy, not generic.

Inspiration Lineage:

60% Direction A (Layered Product Studio) — Technical sophistication, visible architecture
30% Direction B (Editorial Minimalism) — Typography, whitespace, intentional composition
10% Direction C (Interactive Command Center) — Restrained interactions, purposeful motion

Core Philosophy:

Form follows function
Design communicates hierarchy and relationships
Whitespace is a compositional tool
Technology choices visible (not hidden)
Real project work is hero, not design flourishes

Visual Personality:

Professional + memorable
Technical + human
Sophisticated + approachable
Modern + timeless
Design System Foundation

Color Approach: Dark-first, single accent color

Typography Approach: Serif for display (editorial), sans-serif for body (modern), mono for technical

Spacing Approach: Generous, hierarchy-based (not uniform), rhythm reflects content importance

Layout Approach: CSS Grid, asymmetric compositions, intentional whitespace

Animation Approach: Purposeful only, communicates hierarchy/interaction/state

Imagery Approach: Real work, no stock photos, when unavailable → generated technical visuals with labels

SECTION 03: DESIGN TOKENS
Colors

Foundation Colors — Dark Theme (Production)

Background:       #0F1419    (Near-black, primary)
Surface:          #16191F    (Container/card background)
Surface Alt:      #1C1F27    (Forms, code blocks)

Text Primary:     #E8EAED    (Off-white, headlines & body)
Text Secondary:   #A8ACBA    (Muted, supporting text)
Text Tertiary:    #6C7280    (Hints, captions)

Accent Primary:   #00B8D4    (Cyan — links, highlights, diagrams)
Accent Hover:     #00A0C0    (Darker cyan for hover)
Accent Muted:     rgba(0, 184, 212, 0.12)  (Background tint)

CTA Button Bg:    #E8EAED    (Warm off-white)
CTA Button Text:  #0F1419    (Dark)
CTA Hover:        #D0D4DB    (Slightly darker)

Border Primary:   #2A2E37    (Dividers, structure)
Border Muted:     #1F2329    (Subtle borders)

Success:          #00A873
Warning:          #F59E0B
Error:            #DC2626

Color Usage Rules:

Text Hierarchy:
  Headlines → var(--color-text-primary)
  Body → var(--color-text-primary)
  Secondary/supporting → var(--color-text-secondary)
  Captions/tertiary → var(--color-text-tertiary)

Interactive:
  Primary CTA buttons → Warm off-white background
  Links → Cyan text
  Active states → Cyan
  Hover → Cyan hover (darker)

Structural:
  Dividers → Cyan border
  Card borders → Muted gray
  Emphasis borders → Cyan

Diagrams:
  Nodes/strokes → Cyan primary
  Labels → Text primary
  Fills → Muted cyan background

NO gradients
NO multiple competing accent colors
Cyan used strategically (not everywhere)
Warm off-white used for major CTAs (not cyan)
Typography

Font Families

Display:      IBM Plex Serif (Editorial, distinguished)
Body:         -apple-system (System fonts for optimal rendering)
Technical:    IBM Plex Mono (Code, diagrams, technical content)

Typographic Scale (Fluid Using clamp())

css
/* Display — Hero/Major Headings */
--type-display:
  font-size: clamp(2.25rem, 6vw + 1rem, 96px)
  font-weight: 700
  line-height: 1.1
  letter-spacing: -1px
  font-family: IBM Plex Serif

/* Display Secondary — Large Headlines */
--type-display-secondary:
  font-size: clamp(2rem, 5vw + 0.5rem, 72px)
  font-weight: 700
  line-height: 1.15
  letter-spacing: -0.5px
  font-family: system

/* Headline */
--type-headline:
  font-size: clamp(1.75rem, 3.5vw, 42px)
  font-weight: 700
  line-height: 1.25
  letter-spacing: 0px
  font-family: system

/* Subheading */
--type-subheading:
  font-size: clamp(1.25rem, 2.5vw, 36px)
  font-weight: 600
  line-height: 1.3
  letter-spacing: 0px
  font-family: system

/* Body Large — Long-form reading */
--type-body-large:
  font-size: clamp(1rem, 1.2vw, 18px)
  font-weight: 400
  line-height: 1.7
  letter-spacing: 0px
  font-family: system

/* Body — Default */
--type-body:
  font-size: 16px
  font-weight: 400
  line-height: 1.6
  letter-spacing: 0px
  font-family: system

/* Body Small */
--type-body-small:
  font-size: 14px
  font-weight: 400
  line-height: 1.5
  letter-spacing: 0px
  font-family: system

/* Label/UI */
--type-label:
  font-size: 14px
  font-weight: 600
  line-height: 1.4
  letter-spacing: 0.5px
  font-family: system

/* Caption/Metadata */
--type-caption:
  font-size: 12px
  font-weight: 500
  line-height: 1.4
  letter-spacing: 0.5px
  color: var(--color-text-tertiary)
  font-family: system

/* Monospace */
--type-mono:
  font-size: 13px
  font-weight: 400
  line-height: 1.6
  letter-spacing: 0px
  font-family: IBM Plex Mono

/* Monospace Label */
--type-mono-label:
  font-size: 12px
  font-weight: 500
  line-height: 1.4
  letter-spacing: 0px
  font-family: IBM Plex Mono

Font Weight System (Restrained)

400 — Regular (body text, default)
600 — Semi-bold (labels, UI, emphasis)
700 — Bold (headlines, display)

NO 300, 500, 800+ weights
Emphasis via SIZE and WEIGHT, not italic
Italic rare (quotes, captions only)
Spacing Scale
css
--space-0:    0px
--space-1:    4px
--space-2:    8px
--space-3:    12px
--space-4:    16px
--space-5:    20px
--space-6:    24px
--space-7:    28px
--space-8:    32px
--space-10:   40px
--space-12:   48px
--space-14:   56px
--space-16:   64px
--space-20:   80px
--space-24:   96px
--space-28:   112px
--space-32:   128px

Spacing Rhythm (Hierarchy-Based)

Between major sections:
  Desktop:  --space-32 (128px)
  Tablet:   --space-24 (96px)
  Mobile:   --space-16 (64px)

Between subsections:
  Desktop:  --space-24 (96px)
  Tablet:   --space-16 (64px)
  Mobile:   --space-12 (48px)

Between content + imagery:  --space-8 to --space-12
Between elements:           --space-4 to --space-6
Horizontal gutters:
  Desktop:  --space-8
  Tablet:   --space-6
  Mobile:   --space-4

Principle: Whitespace is compositional.
More empty space than filled space.
Rhythm reflects hierarchy, not uniformity.
Grid System

CSS Grid Foundation

css
--grid-columns: 12;

@media (min-width: 1024px) {
  --grid-columns: 12;
  --grid-gap: clamp(1.5rem, 3vw, 2rem);
}

@media (768px to 1023px) {
  --grid-columns: 8;
  --grid-gap: 1.5rem;
}

@media (max-width: 767px) {
  --grid-columns: 4;
  --grid-gap: 1rem;
}

.container {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  gap: var(--grid-gap);
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--grid-gap);
}

Max-Width Guidelines

Full width:      1280px (with gutters)
Content width:   900px (optimal for mixed content)
Narrow width:    600px (optimal reading line)
Border & Radius
css
--radius-button:  3px
--radius-input:   4px
--radius-card:    6px
--radius-image:   0px   (sharp corners for impact)
--radius-subtle:  4px

--border-width:   1px
--border-color:   var(--color-border)
--border-color-muted: var(--color-border-muted)

Rule:
  Do NOT round every object
  Major images: 0px radius (sharp)
  Buttons/inputs: 3-4px
  Cards/secondary: 4-6px
  Some designs call for no radius
Motion Tokens
css
--ease-standard: cubic-bezier(0.2, 0, 0.38, 0.9);
--ease-smooth:   ease-in-out;

--duration-fast:      150ms
--duration-standard:  300ms
--duration-slow:      400ms
--duration-reveal:    600ms

Principle: Motion communicates hierarchy/state/interaction.
NO decorative animation.
All animation respects prefers-reduced-motion.
SECTION 04: INFORMATION ARCHITECTURE
Site Structure (Final Approved)
/ (Home)
├── /work (Projects)
│   ├── /work/aao-seekhe (Tier 1 — Flagship)
│   ├── /work/sharepoint-knowledge-hub (Tier 2)
│   ├── /work/sme-expert-platform (Tier 2)
│   ├── /work/campus-connect (Tier 3 — B.Tech)
│   └── /work/[other-projects]
│
├── /experience (Career Timeline)
│
├── /about (Personal Story)
│
├── /contact (Get in Touch)
│
└── /resume (CV Download)

Optional/Secondary:
├── /playground (Experiments)
└── 404 (Error page)
Navigation Model

Primary Navigation (In Header):

SHIVAM | 01. WORK | 02. EXPERIENCE | 03. ABOUT | 04. CONTACT

Footer Navigation:

Quick links to main pages + social links

Mobile Navigation:

Fixed overlay menu with focus trapping, escape-to-close
SECTION 05: COMPONENT ARCHITECTURE
Components Hierarchy

Foundation Components:

Typography (headings, body, labels, captions)
Colors (color tokens, semantic usage)
Spacing (scale, rhythm)
Borders (borders, radius, dividers)

UI Components:

Navigation (desktop, mobile, active states)
Buttons (primary, secondary, ghost)
Links (text links, CTA anchors with arrows)
Forms (inputs, labels, validation, errors)
Images (responsive, lazy-loading, alt text)

Composite Components:

Project cards (featured, secondary, tertiary)
Project hero (header section with metadata)
Timeline items (career, process)
Diagram containers (SVG wrapper, accessibility)
Section headers (with proper hierarchy)
CTA sections (call-to-action blocks)

Layout Components:

Header (navigation, 72px height)
Footer (four-column grid, responsive stack)
Section containers (max-width constraints, gutters)
Hero section (asymmetric, responsive recomposition)

Page Components:

Homepage (orchestrates multiple sections)
Case study page (hero → sections → related → CTA)
Experience page (timeline, narrative)
About page (story, philosophy, contact)
Contact page (form or direct email + social)
SECTION 06: RESPONSIVE BEHAVIOR
Breakpoints
Mobile:    320px–767px
Tablet:    768px–1023px
Desktop:   1024px+
Wide:      1440px+ (margin/max-width adjustments)
Responsive Rules

DO:

Intentionally recompose layouts for each breakpoint
Adjust typography using clamp() for fluidity
Change grid column counts (12 → 8 → 4)
Reorganize visual order when appropriate
Test actual device sizes

DON'T:

Simply stack desktop elements on mobile
Keep identical layouts across all sizes
Force fixed pixel widths that break responsiveness
Ignore touch target sizing (44px minimum)
Key Recompositions

Hero Section:

Desktop: Asymmetric (text 40% | visual 60%)
Tablet: Text above visual (full width)
Mobile: Single column, compressed

Featured Project:

Desktop: Asymmetric side-by-side
Tablet: Stack with image on top
Mobile: Full stack, scaled

Project Grid:

Desktop: 3 columns (featured: 2-col)
Tablet: 2 columns
Mobile: 1 column

Typography:

Fluid scaling for display/headline/body via clamp()
Not fixed pixel values across all viewport sizes

SECTION 07: MOTION SPECIFICATIONS
Core Principles
Motion must communicate:
  - Hierarchy
  - Interaction/state change
  - Continuity
  - Delight (minimal)

Motion must NOT:
  - Distract from content
  - Obscure meaning
  - Violate prefers-reduced-motion
  - Use layout animations (GPU-inefficient)
Specific Animations

Page Load (Hero Section)

Headline:     Fade in + subtle slide up (300ms)
Subheading:   Fade in (300ms, 100ms delay)
Buttons:      Fade in (300ms, 200ms delay)
Visual:       Fade in (400ms, 300ms delay)
Total:        ~1 second for full hero
Easing:       ease-out-cubic
Stagger:      100ms between elements

Scroll Reveals

Elements fade + slide in as they enter viewport
Duration:     400ms
Easing:       ease-out
NO parallax (distracting)

Hover States

Button:       Color change (200ms ease)
Link:         Color change + underline (200ms ease)
Project card: Border color change, subtle image zoom (1.01-1.02x), 300ms
CTA arrow:    Arrow moves right 4-6px (300ms)

Reduced Motion

@media (prefers-reduced-motion: reduce) {
  All animations: disabled
  Functionality: preserved
  No hidden content based on motion
}
SECTION 08: ACCESSIBILITY
Semantic HTML
html
<header>     Navigation & identity
<nav>        Main navigation
<main>       Primary content
<section>    Major content sections
<article>    Project case study, blog post
<aside>      Sidebar, supplementary
<footer>     Footer content

<h1>         Page title (one per page)
<h2>         Major sections
<h3>         Subsections
(Never skip levels)

<button>     Actions (not div with click)
<a href="">  Links (not span)
<form>       Grouped inputs
<label>      Associated with inputs
<input>      Form fields

<img alt="...">    Descriptive alt text
<figure>           Images with captions
<figcaption>       Image caption

<ul> <li>    Unordered list
<ol> <li>    Ordered list

<strong>     Importance
<em>         Emphasis
Keyboard Navigation
Tab order:       Logical (left-to-right, top-to-bottom)
Skip links:      First element, skip to <main>
Focus visible:   2px solid var(--color-accent), 2px offset
Focus trap:      Menu open → focus trapped in menu
Focus restore:   Menu close → focus back to trigger

All interactive elements keyboard-accessible
No keyboard traps (except intentional menu)
Color Contrast
WCAG AA minimum:
  Standard text:  4.5:1 ratio
  Large text:     3:1 ratio (18px+)

Tested combinations:
  Text on background
  Text on buttons
  Links on background
  Borders (if meaningful)

NO reliance on color alone
Form Accessibility
Labels:        Always visible, <label> associated
Required:      aria-required="true"
Error:         aria-describedby linked, aria-invalid="true"
Touch targets: 44px minimum height
Image Alt Text
Descriptive:   "Aao Seekhe CMS dashboard interface"
Decorative:    alt="" (empty)
Linked:        Alt describes link purpose
Complex:       <figure> + <figcaption> + aria-describedby
Screen Reader Support
Landmarks:      <nav>, <main>, <footer>
Heading flow:   Proper hierarchy, no skipped levels
Link text:      Meaningful (not "Click here")
Live regions:   aria-live="polite" for form feedback
SECTION 09: PERFORMANCE
Targets
Largest Contentful Paint (LCP):    < 2.5 seconds
First Input Delay (FID):           < 100ms
Cumulative Layout Shift (CLS):     < 0.1
Optimization Rules

Images

Format:        WebP primary, JPEG fallback
Responsive:    srcset for different viewports
Lazy loading:  For below-fold images
Max size:      150-300KB per image
Quality:       70-80% compression

Fonts

System fonts:  No download for body text
Display font:  Load on-demand (IBM Plex Serif)
Mono font:     Preload (IBM Plex Mono)
font-display:  swap (no invisible text)

JavaScript

Minimize:      Code splitting, tree-shaking
Defer:         Non-critical JS deferred
No bloat:      Avoid unnecessary libraries

CSS

Critical CSS:  Inline in <head>
Remaining:     Deferred
Minify:        Production minification
No unused:     Purge unused CSS
SECTION 10: SEO
Metadata
<title>        Descriptive, includes "Shivam Singh"
<meta description>  70 chars, compelling
<meta og:*>    Open Graph for social sharing
<meta twitter:*>   Twitter card data

Canonical URL:  Self-referential on each page
robots.txt:    Allow all (except /admin if exists)
sitemap.xml:   List all pages
Semantic Content
Heading hierarchy:   Proper <h1> through <h3>
Semantic HTML:       Correct elements for content
Descriptive URLs:    /work/aao-seekhe (not /project/123)
Image alt text:      All images described
Structured Data
Schema.org types:
  Person          (for Shivam)
  WebSite         (for portfolio)
  CreativeWork    (for projects)
  SoftwareApplication  (if any apps featured)
  Project         (for individual projects)

JSON-LD format, no fake information
SECTION 11: DEPLOYMENT & HOSTING
Technology Stack
Framework:     Next.js 14
Language:      TypeScript
Styling:       Tailwind CSS
Animation:     CSS (CSS transitions/animations)
Hosting:       Vercel (recommended)
DNS:           [VERIFY — where to point domain]
Email:         [VERIFY — contact form handler]
Environment Requirements
Node.js:       18+ LTS
Package mgr:   npm or yarn
Build:         Next.js build output
Deploy:        Vercel or static hosting