# PROMPT 8A — CASE STUDY STORYTELLING & EVIDENCE AUDIT

---

## EXECUTIVE SUMMARY

The portfolio currently contains four case study routes. **Only one** (`aao-seekhe`) has any structured `caseStudy` content sections. The other three (`sharepoint-knowledge-hub`, `[REMOVED: [REMOVED: sme-expert-platform]]`, `[REMOVED: [REMOVED: campus-connect]]`) render only a header, an empty hero image placeholder, and a two-paragraph `longDescription` overview. None of the four have metrics, timelines, or real imagery.

**The case studies are structurally incomplete. An engineering manager reading any of them today would not be able to determine what Shivam personally built, why decisions were made, what challenges existed, or what outcomes were achieved.**

---

## PROJECT 1: AAO SEEKHE (`/work/aao-seekhe`)

### Current Content Inventory

| Field | Status |
|---|---|
| Title | ✅ Present |
| Category | ✅ "Tier 1: Product" |
| Role | ✅ "Full-Stack Developer" |
| Timeline | ❌ Missing (field not set) |
| Short Description | ✅ Present — 1 sentence |
| Long Description | ✅ Present — 2 paragraphs |
| Metrics | ❌ Missing (removed after claim verification flagged fabricated metrics) |
| Tags | ✅ 6 technologies listed |
| Hero Image | ❌ Empty string — renders placeholder |
| Links | ❌ Missing |
| Case Study Sections | ✅ 7 sections present |

### 1. CONTEXT

**Current text:** "Aao Seekhe is an educational platform requiring a specialized content management system that was more than just a blog. It needed to handle structured curriculum data, track user progress, and deliver content rapidly."

**Assessment:** WEAK. The sentence tells us what the platform *needed* but not what it *is*. Who uses it? Is it B2C? B2B? How many users? What kind of learning content? Is it live? The reader must infer everything.

**Credibility:** UNSUPPORTED — no evidence of platform existence, scale, or user base.

### 2. PROBLEM

**Current text:** "Off-the-shelf CMS solutions forced the learning platform to adapt their unique curriculum structure to rigid, predefined data models. This resulted in a cumbersome authoring experience."

**Assessment:** GENERIC. This could describe any custom CMS ever built. What specifically was rigid? What data models failed? What was the authoring pain point? How bad was the problem — was content taking hours to publish? Were educators refusing to use the existing system?

**Credibility:** INFERRED — plausible but lacks any specificity.

### 3. MY ROLE

**Current text:** "I contributed to the development of this custom headless CMS as a Full-Stack Developer."

**Assessment:** CRITICALLY WEAK. "Contributed to" is maximally vague. What did Shivam personally build? Did he design the data model? Build the API? Create the authoring UI? Write the deployment pipeline? This is the single most important sentence in a case study and it communicates almost nothing.

**Cross-reference with experience.ts:** The experience entry says: *"Developed and deployed a full-stack HRMS and job portal using Next.js, React, TypeScript, and MongoDB. Engineered GPS-based geofencing attendance validation and developed REST APIs. Contributed to the development of AaoSeekhe.in, focusing on responsive interfaces and reusable frontend components."*

This is much more specific but it contradicts the case study framing. The experience entry says the primary work was an **HRMS and job portal**, with Aao Seekhe being secondary ("contributed to"). The case study presents Aao Seekhe as though it were the primary work.

**Credibility:** INFERRED — the role is real but the scope of contribution is unclear and potentially overclaimed by the case study's prominence.

> **⚠ FLAG: The portfolio positions Aao Seekhe as the #1 featured project, but the experience data suggests it was secondary to HRMS/job portal work at Rapsora Technologies. This mismatch would be noticed by a careful recruiter.**

### 4. CONSTRAINTS

**Current text:** None documented.

**Assessment:** MISSING. What were the real constraints? Budget? Timeline? Team size? Legacy system integration? Content migration? Performance requirements?

### 5. DECISIONS

**Current text in APPROACH:** "We focused on a tailored authoring experience for educators and a high-performance API for the frontend, ensuring the data models accurately represented the educational domain."

**Assessment:** GENERIC. Why a headless CMS instead of Strapi/Sanity/Contentful? Why MongoDB instead of PostgreSQL? Why REST instead of GraphQL? Why Next.js? None of the actual engineering decisions are explained.

**Credibility:** INFERRED.

### 6. ARCHITECTURE

**Current content:** Empty diagram placeholder — `[ ARCHITECTURE DIAGRAM RESERVED ]`

**Assessment:** MISSING. The architecture section exists structurally but has no actual content. No description of the system components, data flow, or service boundaries.

### 7. IMPLEMENTATION

**Current text:** "The system was built using Next.js and React for the responsive authoring interfaces, and MongoDB for the database layer. Custom REST APIs were developed to interface between the curriculum data and the learning application."

**Assessment:** WEAK. This is a technology list disguised as implementation detail. It tells us *what tools were used* but nothing about *how they were used*. What was the API design? How was the curriculum data modeled? How was user progress tracked? What was the caching strategy? How was content delivered "rapidly"?

**Credibility:** VERIFIED that these technologies were used (consistent with experience data). Implementation claims are UNSUPPORTED beyond the stack list.

### 8. CHALLENGES

**Current text:** None documented.

**Assessment:** MISSING. Every real project has engineering challenges. What went wrong? What was harder than expected? What required iteration?

### 9. RESULTS

**Current text in OUTCOME section:** Only an empty image placeholder with caption "A streamlined approach to content modeling and authoring."

**Assessment:** MISSING. No metrics. No qualitative outcomes. No before/after. The outcome section is literally an empty image.

**Credibility:** N/A — nothing to verify.

### 10. LEARNINGS

**Current text:** None documented.

**Assessment:** MISSING.

### 11. VISUAL EVIDENCE

| Evidence Type | Status | Priority |
|---|---|---|
| Hero image (product screenshot or UI) | ❌ Missing | P0 |
| Architecture diagram | ❌ Missing | P0 |
| CMS authoring interface screenshot | ❌ Missing | P0 |
| API design / data model diagram | ❌ Missing | P1 |
| Content delivery flow diagram | ❌ Missing | P1 |
| Before/after comparison | ❌ Missing | P2 |

### 12. STORY STRUCTURE

**Current structure:** Context → Problem → Role → Approach → Architecture (empty) → Implementation → Outcome (empty)

**Assessment:** The structure exists but every section is 1–2 sentences of generic text. The narrative arc is: "There was a problem → I was involved → We used technologies → The end." There is no tension, no specificity, no resolution.

**Recommended structure:**
Context → Problem (specific) → My Role (specific ownership) → Constraints → Key Decisions (with trade-offs) → Architecture → Implementation Details → Challenges → Results → Learnings

### 13. RECRUITER / ENGINEERING MANAGER TEST

**Score: 1 / 5 — WEAK**

An engineering manager could determine that Shivam worked on a CMS project. They could not determine what he personally built, what decisions he made, what was technically difficult, or what the outcome was. The case study communicates a *topic* but not *competence*.

### 14. CREDIBILITY CLASSIFICATION

| Claim | Classification |
|---|---|
| "Educational platform requiring specialized CMS" | INFERRED |
| "Handle structured curriculum data, track user progress" | INFERRED |
| "Off-the-shelf CMS solutions forced rigid data models" | INFERRED |
| "I contributed to the development" | VERIFIED (matches experience entry) |
| "Tailored authoring experience" | UNSUPPORTED |
| "High-performance API" | UNSUPPORTED |
| "Next.js, React, MongoDB" stack | VERIFIED |
| "Custom REST APIs" | INFERRED |
| Architecture diagram content | MISSING |
| Outcome/results | MISSING |

---

## PROJECT 2: KNOWLEDGE HUB (`/work/sharepoint-knowledge-hub`)

### Current Content Inventory

| Field | Status |
|---|---|
| Title | ✅ Present |
| Category | ✅ "Tier 2: System" |
| Role | ✅ "Frontend Engineer" |
| Timeline | ❌ Missing |
| Short Description | ✅ 1 sentence |
| Long Description | ✅ 2 paragraphs |
| Metrics | ❌ Missing |
| Tags | ✅ 4 technologies |
| Hero Image | ❌ Empty |
| Links | ❌ Missing |
| Case Study Sections | ❌ **NONE — no caseStudy array exists** |

### Full Audit

**Context:** "Modernizing an internal knowledge base to improve discoverability and reduce onboarding time for new employees at British American Tobacco (BAT)."

**Assessment:** MODERATE. We know what the project is, who it's for, and the general goal. However, "improve discoverability" and "reduce onboarding time" are vague claims with no evidence.

> **⚠ FLAG: The project references "British American Tobacco (BAT)" by name. This is a real Fortune 500 company. The experience data says Shivam's second internship was at "Androcoders" — this project was presumably done as part of client work at Androcoders. The relationship (Shivam → Androcoders → BAT client work) is not explained anywhere. This could appear as overclaiming a direct BAT association.**

**Problem:** Not defined.

**Role:** "Built a modern frontend layer on top of legacy SharePoint infrastructure, introducing advanced search capabilities and a responsive, accessible interface."

**Assessment:** This is actually the most specific role description across all four projects. But "advanced search capabilities" is vague. What search technology? How was it "advanced"?

**Constraints:** Not defined.

**Decisions:** Not defined.

**Architecture:** Not defined.

**Implementation:** Not defined beyond the overview sentences.

**Challenges:** Not defined.

**Results:** Not defined.

**Learnings:** Not defined.

**STORY STRUCTURE:** Does not exist. The page renders a header + 2 paragraphs + empty hero image. There is no case study.

### Recruiter / Engineering Manager Test

**Score: 1 / 5 — WEAK**

The reader knows Shivam worked on a SharePoint-based knowledge base. They cannot determine what he built, how, or to what effect.

### Credibility Classification

| Claim | Classification |
|---|---|
| "Internal knowledge base" | INFERRED |
| "British American Tobacco (BAT)" | **NEEDS VERIFICATION** — was this direct BAT employment or Androcoders client work? |
| "Legacy SharePoint infrastructure" | INFERRED |
| "Advanced search capabilities" | UNSUPPORTED |
| "Responsive, accessible interface" | UNSUPPORTED |
| "Reduce onboarding time" | UNSUPPORTED |

---

## PROJECT 3: SUBJECT MATTER EXPERT PLATFORM (`/work/[REMOVED: [REMOVED: sme-expert-platform]]`)

### Current Content Inventory

| Field | Status |
|---|---|
| Title | ✅ Present |
| Category | ✅ "Tier 2: System" |
| Role | ✅ "Full-Stack Engineer" |
| Timeline | ❌ Missing |
| Short Description | ✅ 1 sentence |
| Long Description | ✅ 2 paragraphs |
| Metrics | ❌ Missing |
| Tags | ✅ 4 technologies |
| Hero Image | ❌ Empty |
| Links | ❌ Missing |
| Case Study Sections | ❌ **NONE** |

### Full Audit

**Context:** "A specialized internal tool to facilitate discovery and booking of Subject Matter Experts across internal teams at Shynr."

**Assessment:** MINIMAL. What is Shynr? What does the company do? How large is it? Why did they need this tool?

> **⚠ FLAG: "Shynr" is referenced but does not appear in the experience data. The experience data lists Rapsora Technologies and Androcoders. Was this a side project? Freelance? Part of Rapsora? The relationship is unexplained.**

**Problem:** "Facilitate discovery and booking of Subject Matter Experts." This is a feature description, not a problem statement.

**Role:** "Designed and implemented the system to handle complex availability scheduling and domain-specific search."

**Assessment:** "Designed and implemented the system" implies sole ownership. Was Shivam the sole developer? The lack of team context makes this ambiguous.

**Constraints, Decisions, Architecture, Implementation, Challenges, Results, Learnings:** ALL MISSING.

**STORY STRUCTURE:** Does not exist. Header + 2 paragraphs + empty hero.

### Recruiter / Engineering Manager Test

**Score: 0.5 / 5 — VERY WEAK**

Almost no signal. A reader would know the project existed but nothing else.

### Credibility Classification

| Claim | Classification |
|---|---|
| "Internal tool at Shynr" | UNSUPPORTED — company relationship unclear |
| "Complex availability scheduling" | UNSUPPORTED |
| "Domain-specific search" | UNSUPPORTED |
| "Designed and implemented the system" | INFERRED — implies sole ownership without evidence |
| Technologies used | INFERRED |

---

## PROJECT 4: [REMOVED: campus-connect] (`/work/[REMOVED: [REMOVED: campus-connect]]`)

### Current Content Inventory

| Field | Status |
|---|---|
| Title | ✅ Present |
| Category | ✅ "Tier 3: Component" |
| Role | ✅ "Full-Stack Developer" |
| Timeline | ❌ Missing |
| Short Description | ✅ 1 sentence |
| Long Description | ✅ 2 paragraphs |
| Metrics | ❌ Missing |
| Tags | ✅ 4 technologies |
| Hero Image | ❌ Empty |
| Links | ❌ Missing |
| Case Study Sections | ❌ **NONE** |

### Full Audit

**Context:** "A platform built during my studies to solve the problem of fragmented communication across different university departments."

**Assessment:** ADEQUATE for an academic project. The framing is honest — "built during my studies."

**Problem:** "Fragmented communication across different university departments." Reasonable but generic.

**Role:** Not detailed beyond "Full-Stack Developer."

**Features:** "Share resources, form study groups, and track campus events in a single unified dashboard."

**Assessment:** Feature list without depth. How was the dashboard built? What was the data model? How did group formation work?

**Constraints, Decisions, Architecture, Implementation, Challenges, Results, Learnings:** ALL MISSING.

**STORY STRUCTURE:** Does not exist.

### Recruiter / Engineering Manager Test

**Score: 1 / 5 — WEAK**

Recognizable as a university project. No technical depth visible.

### Credibility Classification

| Claim | Classification |
|---|---|
| "Built during studies" | VERIFIED — honest framing |
| "Fragmented communication" problem | INFERRED |
| "Share resources, form study groups, track events" | INFERRED |
| Technologies used | INFERRED |
| "Unified dashboard" | UNSUPPORTED |

---

## CROSS-PROJECT SYSTEMIC ISSUES

### Issue 1: Missing HRMS/Job Portal Project

The experience data for Rapsora Technologies says: *"Developed and deployed a full-stack HRMS and job portal... Engineered GPS-based geofencing attendance validation..."*

This sounds like the most technically interesting project (geofencing, full HRMS, job portal) — yet it has **no case study at all**. The portfolio features Aao Seekhe instead, which the experience entry describes as secondary work ("contributed to").

**Recommendation:** Either create an HRMS case study (if Shivam has sufficient ownership to claim) or restructure Aao Seekhe to honestly reflect its scope relative to the HRMS work.

### Issue 2: No Project Has a Timeline

Every project's `timeline` field is undefined. This makes the TIMELINE section in the case study header render empty, which looks broken.

### Issue 3: No Project Has Metrics

All `metrics` arrays were removed (correctly) after earlier claim verification flagged fabricated numbers. But this leaves the case studies with no quantitative evidence at all.

### Issue 4: No Project Has Images

Every `heroImage.src` is an empty string. Every case study image and diagram is a placeholder.

### Issue 5: Role Ambiguity Pattern

Across all four projects, the role descriptions use maximally safe but uninformative language: "contributed to," "designed and implemented," "built." None of them specify what Shivam personally owned vs. what was team work.

### Issue 6: Technology Lists Without Decisions

Every project lists technologies but none explain *why* those technologies were chosen. The tags function as a keyword list rather than evidence of engineering judgment.

---

## AGGREGATE SCORES

| Project | Context | Problem | Role Clarity | Decisions | Architecture | Implementation | Challenges | Results | Story | EM Score |
|---|---|---|---|---|---|---|---|---|---|---|
| Aao Seekhe | 2/5 | 2/5 | 1/5 | 1/5 | 0/5 | 1/5 | 0/5 | 0/5 | 2/5 | **1/5** |
| Knowledge Hub | 3/5 | 1/5 | 2/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 1/5 | **1/5** |
| SME Platform | 1/5 | 1/5 | 2/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | **0.5/5** |
| [REMOVED: campus-connect] | 3/5 | 2/5 | 1/5 | 0/5 | 0/5 | 0/5 | 0/5 | 0/5 | 1/5 | **1/5** |


