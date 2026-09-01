DOCUMENT 02: DECISION LOG
DESIGN & ARCHITECTURE DECISION LOG

Version: 1.0
Last Updated: [CURRENT DATE]

APPROVED DECISIONS
Decision 01: Dark Theme As Primary

Date Approved: [TODAY]

Rationale:

Aligns with developer/technical aesthetic
Reduces eye strain during extended viewing
Provides stronger contrast for reading
Modern, professional appearance
Supports focus on content

Alternatives Considered:

Light theme (premium, editorial)
Light + Dark toggle

Why Rejected:

Light theme beautiful but increases maintenance burden
Toggle adds complexity without clear user benefit
Dark-first simpler, cleaner implementation

Status: APPROVED
Implementation: Production theme only (light theme optional for future)

Decision 02: Technical Editorial Visual Direction

Date Approved: [TODAY]

Rationale:

Best balance between technical credibility and distinctive branding
Communicates systems thinking through design itself
Timeless (won't feel dated in 2-3 years)
Professional without being corporate
Supports project-first hierarchy

Alternatives Considered:

Highly animated/experimental direction
Minimal/brutalist direction
Corporate SaaS aesthetic

Why Rejected:

Animated: High maintenance, greater trend risk
Minimal: Doesn't communicate technical depth
Corporate: Generic, no differentiation

Status: APPROVED
Implementation: All design tokens and components follow this direction

Decision 03: Single Cyan Accent Color

Date Approved: [TODAY]

Rationale:

Clear visual focus without competition
Professional and technical (standard in UI/dev tools)
High contrast with dark background
Strategically used (links, highlights, diagrams)
Warm off-white buttons for major CTAs (visual hierarchy)

Alternatives Considered:

Multiple accent colors
Neon multiple colors
No accent (purely neutral)

Why Rejected:

Multiple accents create visual noise
Neon feels trendy/unprofessional
No accent loses interactivity visual communication

Status: APPROVED
Implementation: Color token 
#00B8D4 throughout

Decision 04: Asymmetric Editorial Layouts

Date Approved: [TODAY]

Rationale:

Breaks generic portfolio patterns
Creates visual interest through intentional composition
Demonstrates design thinking (not copy-pasting grids)
Whitespace becomes part of hierarchy
Responsive recomposition shows thoughtfulness

Alternatives Considered:

Standard 50/50 splits everywhere
3-column card grid (generic)
Centered, symmetric layouts

Why Rejected:

50/50: Safe but boring, no visual hierarchy
3-col grid: Generic, portfolio cliché
Centered: Lacks personality

Status: APPROVED
Implementation: Hero, featured project, secondary layouts all asymmetric with intentional recomposition per breakpoint

Decision 05: Aao Seekhe As Flagship/Tier 1 Project

Date Approved: [TODAY]

Rationale:

Demonstrates full-stack capabilities end-to-end
Real product, live in production, serving real users
Shows systems thinking (CMS architecture, data modeling, workflows)
Largest case study with complete technical depth
Most impressive for EdTech CTOs/SaaS founders (target audience)

Alternatives Considered:

SharePoint Knowledge Hub as flagship
B.Tech project as flagship
Equal weight to all projects

Why Rejected:

SharePoint: Important but less technically complex
B.Tech: Academic, less impressive than real product work
Equal weight: Doesn't communicate clear priorities

Status: APPROVED
Implementation: Aao Seekhe gets featured position, 2-column grid placement, detailed case study

Decision 06: No Invented Factual Information

Date Approved: [TODAY]

Rationale:

Credibility is paramount
Fake metrics/experience destroy trust immediately
Better to use placeholder than invent
Technical audience will verify claims
Portfolio should represent only verifiable facts

Alternatives Considered:

Estimate metrics where unavailable
Add "impressive-sounding" accomplishments
Claim partial ownership of team achievements

Why Rejected:

Estimates are lies (even if reasonable-sounding)
Impressive-sounding = credibility risk
Partial ownership claims are dishonest

Status: APPROVED
Implementation: Clear [PLACEHOLDER] markers for missing information; no invented content ever

Decision 07: Semantic HTML & Accessibility-First

Date Approved: [TODAY]

Rationale:

Correct implementation first, enhancement second
Technical audience respects accessibility
WCAG AA compliance demonstrates care
Keyboard navigation is non-negotiable
Screen reader support needed

Alternatives Considered:

Accessibility as afterthought
Minimal accessibility compliance
Optional focus states/keyboard nav

Why Rejected:

Afterthought: Harder to implement, bugs common
Minimal: Fails some users, looks careless
Optional: Developers notice missing keyboard nav

Status: APPROVED
Implementation: Semantic HTML first, focus states required, aria where needed, keyboard navigation full

Decision 08: Restrained Motion (Not Animation Showcase)

Date Approved: [TODAY]

Rationale:

Motion should communicate, not distract
Over-animated portfolios distract from work
Technical audience skeptical of "fluff"
Performance more important than motion
Purpose-driven animations more impressive than excessive ones

Alternatives Considered:

Heavy animations on every hover/scroll
Parallax, cursor-following effects
Animated backgrounds, floating objects

Why Rejected:

Heavy animations: Distract from content
Parallax/cursor-following: Gimmicky, performance drag
Animated backgrounds: Dated aesthetic

Status: APPROVED
Implementation: Minimal animations (fade-in, color transitions, subtle hover); no parallax, no cursor effects

Decision 09: Real Project Images (Not Stock Photos)

Date Approved: [TODAY]

Rationale:

Credibility depends on showing actual work
Generic stock photos scream "low effort"
Real screenshots tell the story
When unavailable → transparent placeholder with label

Alternatives Considered:

Generic stock photography
Generated mockups of made-up interfaces
Vague abstract graphics

Why Rejected:

Stock photos: Cliché, destroy credibility
Generated fake UIs: Dishonest
Abstract graphics: Vague, unhelpful

Status: APPROVED
Implementation: Real screenshots required; when unavailable, labeled [PLACEHOLDER]; never use generic stock

Decision 10: Numbered Navigation (01. WORK, 02. EXPERIENCE)

Date Approved: [TODAY]

Rationale:

Reinforces structure and systems thinking
More distinctive than generic "Work / About / Contact"
Suggests intentional hierarchy and organization
Creates visual rhythm

Alternatives Considered:

Standard navigation (no numbers)
Icon-based navigation
Descriptive labels only

Why Rejected:

Standard: Generic, forgettable
Icon-based: Less clear for navigation
Descriptive only: Misses opportunity for visual design

Status: APPROVED
Implementation: Navigation items numbered and labeled

PENDING DECISIONS
Pending 01: Final Hero Visual (System Diagram)

Question: Will the hero system stack diagram be:

A. Custom illustrated SVG
B. Interactive (hover reveals details)
C. Static with explanatory text below

Status: PENDING (awaits design review)
Impact: UI complexity, interaction design
Will Decide: When prototype is reviewed

Pending 02: Project Screenshot Delivery

Question: Will Shivam provide:

A. Actual Aao Seekhe screenshots
B. Only descriptions (we generate mocks)
C. Mix of real + generated

Status: PENDING (awaits Shivam confirmation)
Impact: Image authenticity, credibility
Will Decide: Before Antigravity starts Phase 4 (Aao Seekhe case study)

Pending 03: Internship Company Information

Question: Can we publicly share:

Exact company names?
Specific project details?
Technologies worked with?

Status: PENDING (awaits Shivam verification)
Impact: Internship section detail level
Will Decide: During content source of truth finalization

Pending 04: Contact Form Implementation

Question: Will contact form:

A. Submit to email service (Formspree, etc.)
B. Be direct email link only
C. Have serverless backend

Status: PENDING (awaits technical decision)
Impact: Backend requirements, form complexity
Will Decide: During technical architecture phase

REJECTED DECISIONS
Rejected 01: Excessive Glassmorphism

Why Rejected:

Glassmorphism is a trend (will date the portfolio)
No functional benefit in this design
Makes text harder to read
Overly complex for minimal gain

Status: REJECTED
Implementation: Only subtle glass effect on navigation if needed; prefer solid backgrounds

Rejected 02: Animated Gradients/Backgrounds

Why Rejected:

Distracts from content
Performance cost not justified
Doesn't communicate anything meaningful
Reduces focus on project work

Status: REJECTED
Implementation: No animated backgrounds; solid or subtle static patterns only

Rejected 03: Generic 3-Column Card Grid Layout

Why Rejected:

Cliché portfolio pattern
Doesn't differentiate Shivam
No visual hierarchy
Every portfolio looks like this

Status: REJECTED
Implementation: Editorial art-directed layouts instead; featured project gets asymmetric treatment

Rejected 04: Invented Metrics/Achievements

Why Rejected:

Destroys credibility immediately
Technical audience will notice/verify
Better to use verified numbers only
Unknown metrics → use placeholder

Status: REJECTED
Implementation: Zero invented metrics; only verified outcomes

Rejected 05: Presenting B.Tech as Equal to Real Product Work

Why Rejected:

Creates false hierarchy
Misleads about experience level
Should be supporting tier, not featured tier
Academic work ≠ Production work

Status: REJECTED
Implementation: B.Tech project in Tier 3; visual hierarchy clearly communicates difference from Tier 1

Rejected 06: Hiding Internship Status (Presenting as Full-Time)

Why Rejected:

Dishonest representation
Recruiter will discover truth
Shows lack of confidence in actual experience
Internships are valuable learning experiences

Status: REJECTED
Implementation: Internships clearly labeled as internships; presented with respect and as learning milestones

Rejected 07: Cursor-Following Effects / Interactive Gimmicks

Why Rejected:

Distracting from content
Not all platforms support smoothly
Performance cost
Looks amateurish/trendy
No communicative purpose

Status: REJECTED
Implementation: NO cursor following, NO floating objects, NO unnecessary interactive "toys"

Rejected 08: Light Theme As Default (Dark/Light Toggle)

Why Rejected:

Adds implementation complexity
Theme toggle distracts from content
Users typically don't switch themes
Dark theme sufficient and more professional

Status: REJECTED
Implementation: Dark theme only (light theme may be added in future if user request)