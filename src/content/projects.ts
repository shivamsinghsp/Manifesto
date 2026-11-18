import { periodLabel, projectContext, RAPSORA, RAPSORA_SHORT } from "@/content/career"

/** Recruiter-facing project classification. */
export type ProjectCategory =
  "Flagship Product" | "Client Platform" | "Product Build" | "Enterprise Project" | "QA Engagement"

/** An outcome stated in the project record, the resume or the owner's instructions. Never inferred. */
export interface ProjectOutcome {
  value: string
  label: string
}

export interface ProjectLink {
  label: string
  url: string
  /** Private repositories are shown as a non-link "available on request" chip. */
  private?: boolean
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface ProjectDiagram {
  src: string
  alt: string
  caption: string
  /** Intrinsic viewBox size, used to reserve layout space (prevents CLS). */
  width: number
  height: number
}

export interface CaseStudySection {
  type: "text" | "image" | "diagram" | "two-column" | "product-feature"
  category?: string
  title?: string
  /** Short label for the sticky section nav. Defaults to a title-cased `title`. */
  navLabel?: string
  content?: string | string[]
  image?: ProjectImage
  /** Extra screenshots shown as a gallery under the main image. */
  gallery?: ProjectImage[]
  diagram?: ProjectDiagram
  leftCol?: string
  rightCol?: string
  implementation?: string[]
}

/** Project record as authored below. Role, engagement and timeline come from career.ts. */
export interface ProjectData {
  slug: string
  title: string
  category: ProjectCategory
  shortDescription: string
  longDescription: string[]
  outcomes: ProjectOutcome[]
  tags: string[]
  heroImage: ProjectImage
  links?: ProjectLink[]
  /** Facts the reader must know (confidentiality, QA-only scope). */
  notice?: string
  caseStudy?: CaseStudySection[]
}

export interface Project extends ProjectData {
  /** What Shivam did on the project (from career.ts). */
  role: string
  /** Where the work happened (from career.ts). */
  engagement: string
  /** Display label for the project period (from career.ts). */
  timeline: string
}

const projectData: ProjectData[] = [
  // ─────────────────────────────────────────────
  // PROJECT 1: SHYNR — HRMS & JOB PORTAL
  // ─────────────────────────────────────────────
  {
    slug: "shynr",
    title: "Shynr — HRMS & Job Portal",
    category: "Flagship Product",
    shortDescription:
      "A Next.js application combining an internal HRMS with a public job portal: GPS geofenced attendance, role-based access control and an ATS pipeline.",
    longDescription: [
      "Shynr merges two business domains into one Next.js application: a public job portal with listings, applications and an ATS pipeline, and an internal HRMS for attendance, leave, employee administration and activity logging.",
      "I built it as the solo developer during my engagement at Rapsora Technologies: the App Router frontend, MongoDB data models, NextAuth.js authentication, role-based access control and GPS geofenced attendance validation. It is live at shynr.in.",
    ],
    outcomes: [
      { value: "Solo", label: "Developer: architecture, frontend, APIs and data models" },
      { value: "4", label: "Role levels: Admin 100 · HR 50 · Employee 20 · User 10" },
      { value: "Live", label: "Production deployment at shynr.in" },
    ],
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "NextAuth.js v4",
      "Cloudinary",
      "date-fns-tz",
    ],
    heroImage: {
      src: "/images/projects/shynr/01-homepage.png",
      alt: "Shynr job portal homepage",
    },
    links: [
      { label: "Live site", url: "https://www.shynr.in/" },
      {
        label: "GitHub",
        url: "https://github.com/shivamsinghsp/Shynr-Productions",
        private: true,
      },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "JOB PORTAL & ATS",
        navLabel: "Job portal & ATS",
        content:
          "The public-facing portal allows candidates to search jobs and submit applications. The search is powered by MongoDB compound text indexes across title, description, and requirements.",
        image: {
          src: "/images/projects/shynr/02-job-portal.png",
          alt: "Shynr Job Portal Interface",
          caption: "Real-time job search interface.",
        },
        implementation: [
          "Job Listing",
          "MongoDB Text Index Search",
          "Application Submission",
          "Cloudinary Resume Upload",
          "ATS Pipeline (Pending → Reviewed → Shortlisted)",
          "Nodemailer Status Updates",
        ],
      },
      {
        type: "product-feature",
        title: "AUTHENTICATION & RBAC",
        navLabel: "Auth & RBAC",
        content:
          "A unified authentication layer serves both internal employees and public job seekers, coordinating access across the platform.",
        image: {
          src: "/images/projects/shynr/12-login-page.png",
          alt: "Shynr Authentication Interface",
          caption: "Unified login portal supporting Google OAuth and credentials.",
        },
        diagram: {
          src: "/diagrams/projects/shynr/auth-rbac.svg",
          alt: "Shynr Role Based Access Control",
          caption: "Middleware-based Role Access Control Flow",
          width: 800,
          height: 520,
        },
        implementation: [
          "NextAuth.js v4",
          "Google OAuth / Credential Providers",
          "Custom In-Memory Rate Limiter",
          "Role levels (Admin 100 · HR 50 · Employee 20 · User 10)",
          "Middleware Route Protection",
        ],
      },
      {
        type: "product-feature",
        title: "INTERNAL HRMS",
        navLabel: "Internal HRMS",
        content:
          "The admin dashboard provides complete control over employee management, department settings, leave approvals, and attendance tracking.",
        image: {
          src: "/images/projects/shynr/04-admin-dashboard.png",
          alt: "Shynr Admin Dashboard",
          caption: "Admin dashboard overview showing employee metrics.",
        },
        diagram: {
          src: "/diagrams/projects/shynr/architecture.svg",
          alt: "Shynr System Architecture",
          caption: "Monolithic App Router Architecture handling both Public and Internal domains",
          width: 800,
          height: 700,
        },
      },
      {
        type: "product-feature",
        title: "GEOSPATIAL ATTENDANCE",
        navLabel: "Geofenced attendance",
        content:
          "The attendance flow validates the employee's browser location against active company locations using Haversine spherical trigonometric calculation.",
        image: {
          src: "/images/projects/shynr/11-admin-attendance-locations.png",
          alt: "Admin Attendance Locations Configuration",
          caption: "Configuring company locations and allowed radiuses.",
        },
        diagram: {
          src: "/diagrams/projects/shynr/attendance-geofencing.svg",
          alt: "Shynr Attendance Geofencing Architecture",
          caption:
            "Browser Geolocation → Haversine Validation → Timezone Conversion → Database Record",
          width: 800,
          height: 900,
        },
        implementation: [
          "navigator.geolocation",
          "/api/attendance/mark",
          "Fetch active company locations",
          "Haversine formula calculation",
          "Distance <= Configured Radius",
          "UTC Timestamp → Asia/Kolkata Conversion",
          "Working-Hour Validation",
          "Save Attendance Record",
        ],
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        navLabel: "Challenges",
        content:
          "01\nGPS accuracy varies by device.\n→ Configurable attendance radius with graceful error thresholds.\n\n02\nAttendance rules depend on local time.\n→ UTC storage + Asia/Kolkata timezone conversion.\n\n03\nHRMS and Job Portal share one application.\n→ Unified authentication with hierarchical role-based authorization.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 2: KANPUR ARCHITECT ASSOCIATION
  // Only claims supported by screenshots, the resume or the owner's brief.
  // Removed as unverified: geo-spatial search (2dsphere/$near), OTP/TOTP auth,
  // "12 data models", ISR revalidation, ad click tracking/scheduling.
  // ─────────────────────────────────────────────
  {
    slug: "kanpur-architects-association",
    title: "Kanpur Architect Association",
    category: "Client Platform",
    shortDescription:
      "The website of an architects' association established in 1984: public pages, a members directory, an events calendar, a members portal and an admin panel for content, members, events and ad campaigns.",
    longDescription: [
      "Kanpur Architect Association (est. 1984) needed one website for the public, for its members and for the people who run it. The public site covers Home, Our Executives, Our Members, Membership, an Events calendar, a Members Portal and Contact.",
      "I developed the entire website as the sole developer, at Rapsora Technologies, with Next.js, React, TypeScript, Tailwind CSS and MongoDB. Behind the public pages is an admin panel where the association manages members, events, leadership profiles, inquiries, applications and banner ad campaigns.",
    ],
    outcomes: [
      { value: "Sole", label: "Developer of the entire website, at Rapsora Technologies" },
      {
        value: "7",
        label:
          "Public sections: Home, Executives, Members, Membership, Events, Members Portal, Contact",
      },
      { value: "Live", label: "In production at kanpurarchitects.in" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
    heroImage: {
      src: "/images/projects/kanpur-architects-association/01-kaa-homepage.png",
      alt: "Kanpur Architect Association homepage",
    },
    links: [{ label: "Live site", url: "https://www.kanpurarchitects.in" }],
    caseStudy: [
      {
        type: "product-feature",
        title: "PUBLIC SITE & MEMBERS DIRECTORY",
        navLabel: "Public site",
        content:
          "Visitors can browse the association's executives and an alphabetical members directory (A–Z index) with a profile page for each architect, and read about membership.",
        image: {
          src: "/images/projects/kanpur-architects-association/02-members.png",
          alt: "Members directory with an A–Z index",
          caption: "Members directory with an A–Z index.",
        },
        gallery: [
          {
            src: "/images/projects/kanpur-architects-association/03-members-details.png",
            alt: "Architect profile page",
            caption: "Architect profile page.",
          },
        ],
      },
      {
        type: "product-feature",
        title: "EVENTS & CALENDAR",
        navLabel: "Events",
        content:
          "Events are grouped into upcoming, past, calendar and archive views. Each event has a detail page with date, time, venue, organiser, description and a photo gallery.",
        image: {
          src: "/images/projects/kanpur-architects-association/04-events.png",
          alt: "Events listing with upcoming, past, calendar and archive tabs",
          caption: "Events listing: upcoming, past, calendar and archives.",
        },
        gallery: [
          {
            src: "/images/projects/kanpur-architects-association/05-events-calender.png",
            alt: "Monthly events calendar",
            caption: "Monthly calendar view.",
          },
          {
            src: "/images/projects/kanpur-architects-association/06-events-description.png",
            alt: "Event detail page",
            caption: "Event detail page.",
          },
        ],
      },
      {
        type: "product-feature",
        title: "ADMIN PANEL",
        navLabel: "Admin panel",
        content:
          "A separate admin panel lets the association run the site without a developer: a dashboard with totals and recent activity, member management with a live membership-card preview, a leadership content editor for the homepage profiles, and event management.",
        image: {
          src: "/images/projects/kanpur-architects-association/07-admin-dashboards.png",
          alt: "Admin dashboard with totals and recent activity",
          caption:
            "Dashboard: registered architects, upcoming events, unread inquiries, active ads.",
        },
        gallery: [
          {
            src: "/images/projects/kanpur-architects-association/08-admin-members-management.png",
            alt: "Add-member form with live membership-card preview",
            caption: "Add member, with a live membership-card preview.",
          },
          {
            src: "/images/projects/kanpur-architects-association/09-admin-leadership-management.png",
            alt: "Leadership content editor",
            caption: "Leadership content editor for homepage profiles.",
          },
          {
            src: "/images/projects/kanpur-architects-association/11-admin-events-management.png",
            alt: "Events management table",
            caption: "Events management.",
          },
        ],
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/site-map.svg",
          alt: "Site map: public pages and admin panel modules backed by MongoDB",
          caption: "Public pages and admin modules, both served by one Next.js app with MongoDB.",
          width: 800,
          height: 520,
        },
      },
      {
        type: "product-feature",
        title: "AD CAMPAIGNS",
        navLabel: "Ad campaigns",
        content:
          "Admins create banner campaigns with an image (16:7 recommended), headline, subtitle and sponsor name. The dashboard shows how many ads are active.",
        image: {
          src: "/images/projects/kanpur-architects-association/10-ads-management.png",
          alt: "Create new ad campaign form",
          caption: "Creating a banner ad campaign.",
        },
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 3: AAO SEEKHE
  // ─────────────────────────────────────────────
  {
    slug: "aao-seekhe",
    title: "AaoSeekhe",
    category: "Product Build",
    shortDescription:
      "A multi-page website for an education-services company, with animated UI and validated enquiry forms that send email through serverless API routes.",
    longDescription: [
      "AaoSeekhe is a multi-page website for an education-services company, covering test preparation (GRE, GMAT, SAT, IELTS), admissions, training, careers and free consultation booking.",
      "I built it as the solo full-stack developer, at Rapsora Technologies: the responsive frontend with Framer Motion, and serverless API routes that validate each form with Zod, sanitise input against XSS and send emails with Nodemailer.",
    ],
    outcomes: [
      { value: "Solo", label: "Full-stack developer, at Rapsora Technologies" },
      { value: "4", label: "Enquiry flows: careers, consultation, general enquiry, partner" },
      { value: "Live", label: "Deployed at aaoseekhe.com" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zod", "Nodemailer"],
    heroImage: {
      src: "/images/projects/aao-seekhe/03-aaoseekhe-homepage.png",
      alt: "AaoSeekhe homepage",
    },
    links: [
      { label: "Live site", url: "https://www.aaoseekhe.com" },
      { label: "GitHub", url: "https://github.com/shivamsinghsp/Aao-Seekhe", private: true },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "INTERACTIVE UI",
        navLabel: "Interactive UI",
        content:
          "The frontend emphasizes highly interactive, animated components to present diverse educational services, using Framer Motion to orchestrate complex entrance sequences and gestural interactions.",
        image: {
          src: "/images/projects/aao-seekhe/01-pop-ups-1.png",
          alt: "Aao Seekhe Hero Welcome Popup",
          caption: "HeroWelcomePopup with frosted-glass UI and Framer Motion animations.",
        },
        diagram: {
          src: "/diagrams/projects/aao-seekhe/architecture.svg",
          alt: "Aao Seekhe Architecture",
          caption: "Stateless frontend architecture with serverless endpoints.",
          width: 800,
          height: 800,
        },
      },
      {
        type: "product-feature",
        title: "FORMS & SUBMISSION WORKFLOWS",
        navLabel: "Forms & email",
        content:
          "The platform captures inquiries across different business lines (careers, consultation, general enquiry, partner registration) using reusable form architectures with dual client-server validation. Every API route securely processes form submissions using a rigorous pipeline before any emails are dispatched.",
        image: {
          src: "/images/projects/aao-seekhe/05-contact-us.png",
          alt: "Aao Seekhe Contact Form",
          caption: "Contact form; every form is validated on the client and the server.",
        },
        diagram: {
          src: "/diagrams/projects/aao-seekhe/email-pipeline.svg",
          alt: "Aao Seekhe Form Pipeline Architecture",
          caption: "Pipeline from form submission to email delivery.",
          width: 800,
          height: 700,
        },
        implementation: [
          "React Hook Form",
          "Zod Schema Definition",
          "Next.js API Route",
          "Server Zod Validation",
          "XSS Sanitization",
          "Nodemailer / SMTP",
          "Admin Notification + User Confirmation",
        ],
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        navLabel: "Challenges",
        content:
          "01\nConsistent email delivery across four APIs.\n→ Built a reusable email-sending utility with template composition.\n\n02\nComplex animation composition causing visual glitches on fast navigation.\n→ Careful Framer Motion sequencing and component unmount cleanup.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 4: ENTERPRISE KNOWLEDGE HUB
  // ─────────────────────────────────────────────
  {
    slug: "sharepoint-knowledge-hub",
    title: "Enterprise Knowledge Hub",
    category: "Enterprise Project",
    shortDescription:
      "A SharePoint Online knowledge hub for a large enterprise: a homepage, a metadata-driven document library and an SME Finder enriched with Microsoft Graph.",
    longDescription: [
      "The Knowledge Hub is a SharePoint Online application built from SPFx web parts. It addresses knowledge scattered across OneDrive, Teams and email, which made templates, current document versions and subject-matter experts hard to find.",
      "During my engagement at Rapsora Technologies I contributed SPFx 1.20 web parts in React and TypeScript for the Homepage, the Library and the SME Finder (Phase 2B). The client is confidential, so it is not named here and the visuals are original illustrations rather than screenshots.",
    ],
    notice:
      "Confidential enterprise client. The client is not named, and no internal data, URLs or people are shown.",
    tags: [
      "SharePoint Online",
      "SPFx 1.20",
      "React",
      "TypeScript",
      "Fluent UI",
      "PnPjs",
      "Microsoft Graph",
    ],
    outcomes: [
      { value: "3", label: "Areas contributed: Homepage, Library, SME Finder (Phase 2B)" },
      { value: "SPFx 1.20", label: "Web parts in React and TypeScript" },
      {
        value: "M365",
        label: "Runs inside SharePoint Online, on the existing M365 security model",
      },
    ],
    heroImage: {
      // Original illustration. Real screenshots show the confidential client's branding.
      src: "/diagrams/projects/sharepoint-knowledge-hub/hero.svg",
      alt: "Illustration of the Knowledge Hub homepage layout (not a screenshot)",
    },
    caseStudy: [
      {
        type: "product-feature",
        title: "KNOWLEDGE LIBRARY & DISCOVERY",
        navLabel: "Library",
        content:
          "A real-time, multi-dimensional discovery experience allowing users to filter governed documents across specific metadata dimensions (Category, Document Type, Capability, Market).",
        image: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/library-ui.svg",
          alt: "Illustration of the library with search and metadata filters (not a screenshot)",
          caption: "Illustration, not a screenshot: search with metadata filters.",
        },
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/knowledge-discovery.svg",
          alt: "Knowledge Hub Discovery Flow",
          caption: "Metadata-driven discovery workflow without external databases.",
          width: 800,
          height: 740,
        },
        implementation: [
          "React / SPFx",
          "PnPjs Data Access Layer",
          "SharePoint APIs / Search API / CAML",
          "Dynamic Library Filtering",
        ],
      },
      {
        type: "product-feature",
        title: "SME FINDER",
        navLabel: "SME Finder",
        content:
          "An expert directory backed by a SharePoint List, enriched with live organizational data to help users find domain experts.",
        image: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/sme-finder-ui.svg",
          alt: "Illustration of SME Finder profile cards with presence and contact actions (not a screenshot)",
          caption: "Illustration, not a screenshot: expert profiles with presence.",
        },
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/sme-finder.svg",
          alt: "SME Finder Data Architecture",
          caption: "Data merging from SharePoint Lists and Microsoft Graph API.",
          width: 800,
          height: 460,
        },
        implementation: [
          "SharePoint List (Profiles & Capabilities)",
          "Microsoft Graph API Integration",
          "Live User Photos",
          "Real-time Presence Status (Available/Busy/Away)",
        ],
      },
      {
        type: "diagram",
        title: "SYSTEM ARCHITECTURE",
        navLabel: "Architecture",
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/architecture.svg",
          alt: "Knowledge Hub SharePoint Architecture",
          caption: "Fully integrated M365 architecture running strictly within SharePoint Online.",
          width: 800,
          height: 720,
        },
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        navLabel: "Challenges",
        content:
          "01\nSharePoint API throttling and pagination limits.\n→ Optimized PnPjs queries with robust error handling and caching.\n\n02\nCombining disparate API structures (REST, Graph, CAML).\n→ Unified data layer abstraction smoothing out response formats.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 5: PLEDGE PORTAL — QA & VERIFICATION
  // ─────────────────────────────────────────────
  {
    slug: "pledge-portal-qa",
    title: "PLEDGE Portal — QA & Verification",
    category: "QA Engagement",
    shortDescription:
      "QA only: functional, workflow and regression testing of PLEDGE, the Government of Uttar Pradesh portal for private industrial park development and MSME growth.",
    longDescription: [
      "PLEDGE (Promoting Leadership and Enterprises for Development of Growth Engine) is a DIEP (Government of Uttar Pradesh) portal. It supports private industrial park development and MSME growth through online applications, approvals and fund tracking.",
      "My role was QA only. I did not build the portal. During my engagement at Rapsora Technologies I tested it manually: running scenarios across applicant, approver and admin roles, checking form boundaries and attachments, writing reproducible defect reports, and re-testing after each fix to catch regressions in dependent workflows.",
    ],
    notice:
      "QA-only engagement. I tested this portal; I did not build it. Only synthetic test data is described, and no authenticated screens, real records, credentials or internal URLs are shown.",
    outcomes: [
      { value: "3", label: "User roles verified (Applicant · Approver · Admin)" },
      { value: "5-stage", label: "QA lifecycle from requirement intake to staging sign-off" },
      { value: "Regression", label: "Re-test cycle after every developer fix" },
    ],
    tags: [
      "Functional Testing",
      "Regression Testing",
      "Manual QA",
      "Workflow Verification",
      "Defect Lifecycle",
      "Form Boundary Testing",
      "RBAC Validation",
      "Government Systems",
    ],
    heroImage: {
      src: "/diagrams/projects/pledge/hero.svg",
      alt: "Illustration of a QA checklist over an application approval flow",
    },
    links: [{ label: "Public portal", url: "https://pledgeup.in" }],
    caseStudy: [
      {
        type: "product-feature",
        title: "QA PROTOCOL & VERIFICATION LIFECYCLE",
        navLabel: "QA protocol",
        content:
          "A disciplined testing lifecycle was established to catch defects early and verify fixes before staging deployments. Each release cycle encompassed five distinct stages: intake requirement analysis, cross-role functional test execution, structured defect documentation with exact replication steps, developer fix handoff, and regression re-testing to provide staging verification reports that informed lead engineering sign-off.",
        diagram: {
          src: "/diagrams/projects/pledge/qa-workflow.svg",
          alt: "PLEDGE QA Protocol Lifecycle",
          caption:
            "Structured 5-stage testing workflow from requirement analysis to staging deployment verification.",
          width: 800,
          height: 360,
        },
        implementation: [
          "Requirement & Acceptance Criteria Intake",
          "Test Scenario Matrix Planning",
          "Functional Test Case Execution",
          "Step-by-Step Defect Reproduction Documentation",
          "Regression Testing Following Fixes",
          "Staging Verification Report Handoff",
        ],
      },
      {
        type: "product-feature",
        title: "MULTI-TIER ROLE & STATE TRANSITION TESTING",
        navLabel: "Multi-tier roles",
        content:
          "The portal requires strict role segregation across Citizen Applicants submitting documentation, Department Approvers verifying attachments and issuing remarks, and Department Administrators monitoring high-level governance. Testing focused on boundary checks, state machine transitions, and verifying that users could never access or execute actions outside their designated tier.",
        diagram: {
          src: "/diagrams/projects/pledge/multi-role-testing.svg",
          alt: "Multi-Tier Role Validation Matrix",
          caption:
            "Validation pipeline across Citizen Applicant, Department Approver, and Department Admin.",
          width: 800,
          height: 360,
        },
        implementation: [
          "Citizen Submission Form Validation",
          "File Attachment Format & Size Limits",
          "State Machine Verification (Draft → Submitted → Under Review → Approved/Rejected)",
          "Remark Logging & Audit Trail Inspection",
          "Access Control & Session Invalidation Checks",
          "Cross-Browser Rendering & Form Stability",
        ],
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES & QA METHODOLOGY",
        navLabel: "QA methodology",
        content:
          "01\nFunctional Testing vs. Regression Testing vs. Automated Testing:\nThis engagement was dedicated to manual functional and regression testing. Functional testing verified that each module operated in exact alignment with government specifications and business rules. Regression testing re-executed critical test suites across previously passing modules after bug fixes were merged to identify regressions and verify that changes did not introduce defects into stable modules.\n\n02\nSecurity & Government Data Confidentiality:\nAll test procedures respected strict data protection guidelines. Only synthetic dummy data was used during test execution; no confidential government records, internal IPs, restricted citizen data, or production credentials are ever stored or disclosed.",
      },
    ],
  },
]

function withCareer(p: ProjectData): Project {
  const ctx = projectContext(p.slug)
  if (!ctx) throw new Error(`Project "${p.slug}" has no entry in src/content/career.ts`)
  const org = ctx.engagement?.organization.name
  const engagement = ctx.engagement
    ? `${ctx.engagement.title} · ${org === RAPSORA ? RAPSORA_SHORT : org} (${periodLabel(ctx.engagement.period)})`
    : "Independent"
  return {
    ...p,
    role: ctx.projectRole.role,
    engagement,
    timeline: periodLabel(ctx.projectRole.period),
  }
}

export const projects: Project[] = projectData.map(withCareer)
