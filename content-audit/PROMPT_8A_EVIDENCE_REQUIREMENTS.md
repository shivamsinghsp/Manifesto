# PROMPT 8A — EVIDENCE REQUIREMENTS

This document identifies every piece of visual and documentary evidence needed to bring each case study to a publishable standard. Nothing listed here should be fabricated.

---

## GLOBAL REQUIREMENTS (All Projects)

| # | Evidence Type | Purpose | Priority |
|---|---|---|---|
| G1 | Project timelines (start/end dates or durations) | Populates the TIMELINE header field | P0 |
| G2 | Real hero images or product screenshots | Replaces `[ HERO IMAGE ]` placeholders | P0 |
| G3 | Verified metrics OR honest removal of metrics section | Prevents empty/fabricated data sections | P0 |

---

## AAO SEEKHE

| # | Evidence Type | Description | Priority |
|---|---|---|---|
| A1 | **Product screenshot** — CMS authoring interface | Shows the content editor that educators use. Even a dev-environment screenshot is valuable. | P0 |
| A2 | **Product screenshot** — Public-facing learning content page | Shows what learners see when consuming content. | P1 |
| A3 | **Architecture diagram** — System components | Shows the relationship between: Next.js frontend → REST API layer → MongoDB → Content delivery. Hand-drawn is acceptable. | P0 |
| A4 | **Data model diagram** — Curriculum content structure | Shows how learning content (courses, modules, lessons, progress) is modeled in MongoDB. | P1 |
| A5 | **API design documentation or sample endpoints** | Shows the REST API structure (e.g., `/api/courses`, `/api/progress`). Can be a table or code snippet. | P1 |
| A6 | **Before/after comparison** — authoring experience | If an earlier version existed, showing the improvement. If not, describe the manual process it replaced. | P2 |
| A7 | **Code artifact** — a representative code sample | A non-trivial component or API route that demonstrates engineering quality. | P2 |
| A8 | **Team context** | How many people worked on this? What was Shivam's specific scope? | P0 |
| A9 | **Deployment context** | Is this project live? Where is it hosted? Can it be linked? | P1 |

---

## KNOWLEDGE HUB

| # | Evidence Type | Description | Priority |
|---|---|---|---|
| K1 | **Product screenshot** — Search interface | Shows the modernized search experience built on top of SharePoint. | P0 |
| K2 | **Product screenshot** — Knowledge article page | Shows the responsive content layout. | P1 |
| K3 | **Architecture diagram** — React ↔ SharePoint API integration | Shows how the modern frontend communicates with the legacy SharePoint backend. | P0 |
| K4 | **Search implementation detail** — What technology powered the "advanced search"? | Was it SharePoint Search API, Elasticsearch, custom indexing, or something else? | P0 |
| K5 | **Accessibility evidence** — WCAG compliance level, audit results, or specific accommodations made | The tags mention "Accessibility" — this needs substantiation. | P1 |
| K6 | **Client relationship clarification** — Androcoders → BAT | Was this Androcoders client work? How should the relationship be described? | P0 |
| K7 | **Quantitative or qualitative outcomes** — adoption, usage, feedback | Any evidence that the new interface was actually used and improved the experience. | P1 |

---

## [REMOVED: sme-expert-platform]

| # | Evidence Type | Description | Priority |
|---|---|---|---|
| S1 | **Product screenshot** — Expert discovery/search interface | Shows how users find SMEs. | P0 |
| S2 | **Product screenshot** — Availability/booking interface | Shows the scheduling system. | P1 |
| S3 | **Architecture diagram** — System overview | Shows frontend, API, database, and any external integrations (calendar, email, etc.). | P0 |
| S4 | **Data model** — How experts, availability, and bookings are stored | Shows the MongoDB schema design. | P1 |
| S5 | **Company relationship clarification** — What is Shynr? How does it relate to Shivam's work? | Critical for credibility. | P0 |
| S6 | **Team context** — Was Shivam the sole developer? | The current text implies sole ownership ("designed and implemented the system"). This needs honest clarification. | P0 |
| S7 | **Deployment status** — Is this live? Internal tool? Prototype? | Determines how the project should be framed. | P1 |

---

## [REMOVED: campus-connect]

| # | Evidence Type | Description | Priority |
|---|---|---|---|
| C1 | **Product screenshot** — Dashboard interface | Shows the unified dashboard mentioned in the description. | P0 |
| C2 | **Product screenshot** — Resource sharing or study group feature | Shows a specific feature in action. | P1 |
| C3 | **Architecture diagram** — Simple system overview | Shows React frontend → Node.js backend → MongoDB. | P1 |
| C4 | **GitHub repository link** — If public | Academic projects are commonly open-source. A link adds immediate credibility. | P0 |
| C5 | **Feature specificity** — What exactly did Shivam build vs. what was team work? | University projects are often group work. Honest attribution matters. | P1 |

---

## EVIDENCE FORMAT GUIDANCE

| Format | When to use |
|---|---|
| **Real screenshot** | Always preferred. Even a development-environment screenshot is better than a placeholder. |
| **Hand-drawn diagram** | Acceptable for architecture diagrams if digitized cleanly. Shows genuine engineering thinking. |
| **Mermaid/draw.io diagram** | Good for system architecture, data flow, and component relationships. |
| **Code snippet** | Useful for showing API design, data modeling, or a particularly well-engineered component. |
| **Table** | Good for API endpoint documentation, data model schemas, and feature comparison. |
| **Written narrative** | Required for context, decisions, challenges, and learnings. Cannot be replaced by images alone. |

---

## EVIDENCE THAT SHOULD NOT BE CREATED

| Type | Reason |
|---|---|
| Fabricated metrics | Previously flagged in CLAIM_VERIFICATION.md |
| AI-generated "concept" screenshots | Would misrepresent the actual product |
| Mockups presented as real product | Deceptive |
| Architecture diagrams of systems Shivam did not build | Overclaiming |
| Testimonials without permission | Legal/ethical concern |

