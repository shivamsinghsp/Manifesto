DOCUMENT 06: ASSET MANIFEST
COMPLETE IMAGE & VISUAL ASSET REQUIREMENTS

Version: 1.0
Status: Being finalized
Purpose: Tell Antigravity exactly what images/diagrams are needed

ASSET NAMING CONVENTION
[TYPE]-[SECTION]-[NAME].ext

Examples:
  IMG-HERO-SYSTEM-DIAGRAM.svg
  IMG-AAO-DASHBOARD.jpg
  IMG-SHAREPOINT-OVERVIEW.jpg
  IMG-BTECH-HERO.jpg
  DIAG-CONTENT-MODEL.svg
  DIAG-WORKFLOW-PUBLISH.svg
HOMEPAGE ASSETS
Asset 01: Hero System Visualization
ID:              IMG-HERO-SYSTEM-DIAGRAM
Type:            SVG (preferred) or illustration
Aspect ratio:    16:10
Dimensions:      Desktop: 600px width @ 1024px+ viewport
                 Tablet: 500px width
                 Mobile: 100% width
Location:        Hero section (right side on desktop)
Purpose:         Show layered product stack (UI → API → Backend → DB)
Content:         Six layers with labels and connecting arrows
Status:          [NEEDS CREATION]
Priority:        CRITICAL (hero element)
Asset 02: Featured Project Hero Image (Aao Seekhe)
ID:              IMG-AAO-HERO
Type:            Product screenshot or mockup
Aspect ratio:    4:3 or 16:9
Dimensions:      1280px width (full-width breakout)
Location:        Featured Work section
Purpose:         Show Aao Seekhe dashboard/key interface
Content:         [PLACEHOLDER — ACTUAL SCREENSHOT REQUIRED]
Status:          PLACEHOLDER (waiting for Shivam)
Priority:        CRITICAL
AAO SEEKHE CASE STUDY ASSETS
Asset 03: Project Hero Screenshot
ID:              IMG-AAO-CASE-HERO
Type:            Product screenshot
Aspect ratio:    16:9
Dimensions:      1280px width (hero section)
Location:        Case study page hero
Purpose:         Large hero image at top of case study
Status:          [PLACEHOLDER]
Priority:        CRITICAL
Asset 04: Content Model Diagram
ID:              DIAG-AAO-CONTENT-MODEL
Type:            SVG diagram
Aspect ratio:    16:10
Dimensions:      900px width
Location:        Architecture / Content Model section
Purpose:         Show Page → Section → Item hierarchy
Content:         
  - Three connected boxes
  - Relationships indicated
  - Labels describing each level
  - Accent color nodes, black strokes
Status:          [NEEDS CREATION]
Priority:        HIGH
Accessibility:   <title> + <desc> in SVG + aria-describedby
Asset 05: Publishing Workflow Diagram
ID:              DIAG-AAO-WORKFLOW
Type:            SVG diagram
Aspect ratio:    16:10
Dimensions:      900px width
Location:        Publishing Workflow section
Purpose:         Show state machine: Draft → Edit → Preview → Review → Publish → Archive
Content:
  - Six connected boxes
  - Arrows showing flow
  - Color coding for state types
  - Labels
Status:          [NEEDS CREATION]
Priority:        HIGH
Asset 06: System Architecture Diagram
ID:              DIAG-AAO-ARCHITECTURE
Type:            SVG diagram
Aspect ratio:    16:10
Dimensions:      900px width
Location:        Technical Architecture section
Purpose:         Show layered system: React → API → Node.js → MongoDB → Vercel
Content:
  - Layered boxes
  - Technology labels
  - Data flow arrows
  - Accent color highlights
Status:          [NEEDS CREATION]
Priority:        HIGH
Asset 07: Dashboard Feature Screenshot
ID:              IMG-AAO-DASHBOARD
Type:            Product screenshot
Aspect ratio:    4:3
Dimensions:      1024px width
Location:        Frontend Implementation section
Purpose:         Show page builder interface
Status:          [PLACEHOLDER]
Priority:        MEDIUM
Asset 08: Mobile UI Screenshot
ID:              IMG-AAO-MOBILE
Type:            Product screenshot (mobile viewport)
Aspect ratio:    9:16
Dimensions:      Max 400px width
Location:        Responsive Design section (if included)
Purpose:         Show mobile interface
Status:          [PLACEHOLDER]
Priority:        MEDIUM
Asset 09: Database Schema Diagram
ID:              DIAG-AAO-DATABASE
Type:            SVG diagram (ERD-style)
Aspect ratio:    16:10
Dimensions:      900px width
Location:        Backend & Database section
Purpose:         Show MongoDB schema relationships
Content:
  - Entity boxes
  - Relationship lines
  - Field names
  - Data types
Status:          [NEEDS CREATION]
Priority:        MEDIUM
SHAREPOINT KNOWLEDGE HUB ASSETS
Asset 10: Project Overview (If Shareable)
ID:              IMG-SHAREPOINT-HERO
Type:            [PLACEHOLDER — IF SHAREABLE]
Aspect ratio:    [PLACEHOLDER]
Dimensions:      [PLACEHOLDER]
Location:        Case study hero
Status:          [PLACEHOLDER — VERIFY CONFIDENTIALITY]
Priority:        [DEPENDS ON CONFIDENTIALITY]
Note:            IF NOT SHAREABLE, describe process instead
                 of showing screenshots
Asset 11: Information Architecture (If Shareable)
ID:              DIAG-SHAREPOINT-IA
Type:            [PLACEHOLDER]
Status:          [DEPENDS ON CONFIDENTIALITY]
Note:            Can create generic example if real IA
                 is confidential
GENERATED ASSETS (To Create)

These assets don't exist yet. Antigravity (or designer) needs to create them:

DIAG-AAO-CONTENT-MODEL.svg
DIAG-AAO-WORKFLOW.svg
DIAG-AAO-ARCHITECTURE.svg
DIAG-AAO-DATABASE.svg
IMG-HERO-SYSTEM-DIAGRAM.svg
[Any additional diagrams as case studies progress]
IMAGE OPTIMIZATION REQUIREMENTS

For all JPG/PNG:

Format:         WebP (primary) + JPEG (fallback)
Sizes:          
  Mobile:       600px width
  Tablet:       1024px width
  Desktop:      1280px width
Compression:    70-80% quality
Max file:       150-300KB per image
Lazy load:      All below-fold images
Responsive:    srcset with sizes attribute

For all SVG:

Minification:  Yes (remove comments, optimize paths)
Viewbox:       Correct aspect ratio
Responsive:    viewBox allows scaling
Text:          <title> and <desc> for accessibility
Colors:        CSS variables where possible
ALT TEXT & DESCRIPTIONS

Every image needs:

<img alt="[Descriptive text]" src="..." />

Examples:
  "Aao Seekhe CMS dashboard showing page builder interface"
  "System architecture diagram showing layers from UI to database"
  "Publishing workflow with six states: Draft, Edit, Preview, Review, Publish, Archive"

NOT:
  "Screenshot"
  "Image"
  "Diagram"
ASSET STATUS TRACKING
□ IMG-HERO-SYSTEM-DIAGRAM          [NEEDS CREATION]
□ IMG-AAO-HERO                     [PLACEHOLDER — WAITING FOR SCREENSHOT]
□ IMG-AAO-CASE-HERO                [PLACEHOLDER — WAITING FOR SCREENSHOT]
□ DIAG-AAO-CONTENT-MODEL           [NEEDS CREATION]
□ DIAG-AAO-WORKFLOW                [NEEDS CREATION]
□ DIAG-AAO-ARCHITECTURE            [NEEDS CREATION]
□ IMG-AAO-DASHBOARD                [PLACEHOLDER — WAITING FOR SCREENSHOT]
□ IMG-AAO-MOBILE                   [PLACEHOLDER — WAITING FOR SCREENSHOT]
□ DIAG-AAO-DATABASE                [NEEDS CREATION]
□ IMG-SHAREPOINT-[ASSETS]          [PENDING — VERIFY CONFIDENTIALITY]
□ [Additional as case studies progress]