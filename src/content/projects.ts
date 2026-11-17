/** Recruiter-facing project classification (replaces the old internal "Tier" labels). */
export type ProjectCategory =
  "Flagship Product" | "Client Platform" | "Product Build" | "Enterprise Project" | "QA Engagement"

export interface ProjectMetric {
  label: string
  value: string
}

/** An outcome that is stated in the project record itself — never inferred. */
export interface ProjectOutcome {
  value: string
  label: string
}

export interface ProjectLink {
  label: string
  url: string
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
  content?: string | string[]
  image?: ProjectImage
  diagram?: ProjectDiagram
  leftCol?: string
  rightCol?: string
  implementation?: string[]
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  /** What Shivam did on the project. */
  role: string
  /** The context the work happened in (internship, client, team). */
  engagement: string
  timeline?: string
  shortDescription: string
  longDescription: string[]
  /** Outcomes / impact. Only facts already recorded in this file or the resume. */
  outcomes: ProjectOutcome[]
  tags: string[]
  heroImage: ProjectImage
  links?: ProjectLink[]
  caseStudy?: CaseStudySection[]
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // PROJECT 1: SHYNR — HRMS & JOB PORTAL
  // ─────────────────────────────────────────────
  {
    slug: "shynr",
    title: "Shynr — HRMS & Job Portal",
    category: "Flagship Product",
    role: "Primary Feature Developer",
    engagement: "Full-Stack Engineering Internship · Rapsora Technologies",
    timeline: "Jan 15 – Feb 9, 2026 (4-week core product sprint during Rapsora internship)",
    shortDescription:
      "A monolithic Next.js application combining an internal HRMS with a public job portal — featuring GPS-based geofencing attendance, RBAC, and an ATS workflow.",
    longDescription: [
      "Shynr is a production-deployed platform that merges two distinct business domains into a unified Next.js 15 application: a public job portal with listings, applications, and an ATS pipeline, and an internal HRMS handling attendance, leave management, employee administration, and activity logging.",
      "Developed during my software engineering internship at Rapsora Technologies. As the primary developer on the project, I implemented the foundational platform across 33 commits during an intensive 4-week product delivery sprint (January 15 – February 9, 2026)—translating technical specifications into working architecture, Next.js App Router frontend, MongoDB schemas, NextAuth.js authentication, role-based access control, and GPS-based geofencing attendance validation under senior engineering review.",
    ],
    outcomes: [
      { value: "4 weeks", label: "Core product sprint, Jan 15 – Feb 9, 2026" },
      { value: "33", label: "Verified commits as primary developer" },
      { value: "6", label: "MongoDB data models" },
      { value: "4", label: "Hierarchical roles (Admin · HR · Employee · User)" },
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
      alt: "Shynr Job Portal Homepage",
    },
    links: [
      { label: "Live Site", url: "https://www.shynr.in" },
      { label: "GitHub", url: "https://github.com/shivamsinghsp/Shynr-Productions" },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "JOB PORTAL & ATS",
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
          "Role Levels (Admin: 100, HR: 50, Emp: 20, User: 10)",
          "Middleware Route Protection",
        ],
      },
      {
        type: "product-feature",
        title: "INTERNAL HRMS",
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
        content:
          "01\nGPS accuracy varies by device.\n→ Configurable attendance radius with graceful error thresholds.\n\n02\nAttendance rules depend on local time.\n→ UTC storage + Asia/Kolkata timezone conversion.\n\n03\nHRMS and Job Portal share one application.\n→ Unified authentication with hierarchical role-based authorization.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 2: KANPUR ARCHITECTS ASSOCIATION
  // ─────────────────────────────────────────────
  {
    slug: "kanpur-architects-association",
    title: "Kanpur Architects Association",
    category: "Client Platform",
    role: "Independent Full-Stack Developer",
    engagement: "Client project",
    timeline: "~3.5 months (mid-May – early Sep 2026)",
    shortDescription:
      "A comprehensive platform combining a public architect directory, event management, membership, custom CMS, admin portal with ad/banner management, and geo-spatial architect search.",
    longDescription: [
      "The Kanpur Architects Association platform is a multi-surface web application serving three distinct audiences: public visitors searching for architects and browsing events, registered architects managing their profiles and membership, and administrators controlling content, members, events, advertisements, and SEO metadata through a dedicated admin portal.",
      "Delivered as an independent full-stack project for the client over approximately 3.5 months, managing direct stakeholder requirements, database architecture, and deployment. The system includes a custom CMS backed by MongoDB, a geo-spatial architect directory using 2dsphere indexing, an advertisement engine with click tracking and scheduling, phone OTP authentication for architects, and ISR cache invalidation to keep admin updates visible without full rebuilds.",
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "ShadCN UI",
      "TanStack Query",
    ],
    heroImage: {
      src: "/images/projects/kanpur-architects-association/01-kaa-homepage.png",
      alt: "Kanpur Architects Association Platform",
    },
    links: [{ label: "Live Site", url: "https://kanpur-architects-association.vercel.app/" }],
    outcomes: [
      { value: "~3.5 months", label: "Independent delivery, stakeholder to deployment" },
      { value: "12", label: "Interconnected data models behind the admin portal" },
      { value: "3", label: "Distinct authentication flows (Admin · Architect · Public)" },
      { value: "Live", label: "Deployed client platform" },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "PUBLIC DIRECTORY & GEO-SEARCH",
        content:
          "A dynamic architect directory supporting text queries, specialization filters, and location-based discovery powered by MongoDB 2dsphere indexing.",
        image: {
          src: "/images/projects/kanpur-architects-association/02-members.png",
          alt: "KAA Architect Directory",
          caption: "Public architect directory with robust filtering.",
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/geo-search.svg",
          alt: "KAA Geo Spatial Search",
          caption: "MongoDB 2dsphere indexing resolving location proximity.",
          width: 800,
          height: 520,
        },
        implementation: [
          "MongoDB 2dsphere indexing",
          "$near geospatial queries",
          "Compound text search",
          "Specialization filtering",
        ],
      },
      {
        type: "product-feature",
        title: "ADMIN PLATFORM & CUSTOM CMS",
        content:
          "A dedicated portal providing full CRUD for architects, event management with draft/publish states, and direct control over dynamic CMS pages without third-party vendor lock-in.",
        image: {
          src: "/images/projects/kanpur-architects-association/07-admin-dashboards.png",
          alt: "KAA Admin Dashboard",
          caption: "Comprehensive admin dashboard managing 12 interconnected models.",
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/architecture.svg",
          alt: "KAA System Architecture",
          caption: "Overall platform architecture handling multiple audiences.",
          width: 800,
          height: 780,
        },
        implementation: [
          "Architect & Member CRUD",
          "Event draft/publish/schedule states",
          "MongoDB-backed CMS schemas",
          "Next.js ISR (revalidatePath) for targeted invalidation",
        ],
      },
      {
        type: "product-feature",
        title: "AD/BANNER ENGINE",
        content:
          "An internal advertising system supporting banner placement (homepage hero, sidebar), schedule-based activation, and backend click tracking.",
        image: {
          src: "/images/projects/kanpur-architects-association/10-ads-management.png",
          alt: "KAA Ad Management Interface",
          caption: "Managing banner campaigns, scheduling, and metrics.",
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/ad-tracking.svg",
          alt: "KAA Ad Engine Tracking Flow",
          caption: "Click tracking pipeline from user interaction to backend analytics.",
          width: 800,
          height: 680,
        },
        implementation: [
          "Create Campaign",
          "Target Placement",
          "Schedule Activation",
          "Public Display",
          "Click → /api/ads/click/[id]",
          "Track Engagement → Redirect",
        ],
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        content:
          "01\nCoordinating three authentication flows.\n→ Distinct auth endpoints and middleware paths for Admin (email+TOTP), Architect (OTP), and Public (session).\n\n02\nFrequent CMS updates causing slow rebuilds.\n→ Targeted Next.js ISR (revalidatePath) invalidation on admin saves.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 3: AAO SEEKHE
  // ─────────────────────────────────────────────
  {
    slug: "aao-seekhe",
    title: "Aao Seekhe.in",
    category: "Product Build",
    role: "Full-Stack Web Developer",
    engagement: "Independent project",
    timeline: "~2 months",
    shortDescription:
      "A multi-page educational platform with rich interactive UI, animated components, reusable forms, and serverless API routes handling validation, XSS sanitization, and SMTP email workflows.",
    longDescription: [
      "Aao Seekhe is a multi-page web application for an educational services company, covering test preparation (GRE, GMAT, SAT, IELTS), global admissions, academic collaboration, training, and consultation booking.",
      "Responsible for full-stack implementation across 34 commits—building the responsive frontend with Framer Motion, designing serverless API route handlers with Zod validation and XSS protection, and configuring SMTP email pipelines with Nodemailer.",
    ],
    outcomes: [
      { value: "34", label: "Verified commits across the full stack" },
      { value: "4", label: "Validated serverless form endpoints" },
      { value: "~2 months", label: "Build timeline" },
      { value: "Live", label: "Deployed at aaoseekhe.com" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zod", "Nodemailer"],
    heroImage: {
      src: "/images/projects/aao-seekhe/03-aaoseekhe-homepage.png",
      alt: "Aao Seekhe.in Platform Interface",
    },
    links: [
      { label: "Live Site", url: "https://www.aaoseekhe.com" },
      { label: "GitHub", url: "https://github.com/shivamsinghsp/Aao-Seekhe" },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "INTERACTIVE UI",
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
        content:
          "The platform captures inquiries across different business lines (careers, consultation, general enquiry, partner registration) using reusable form architectures with dual client-server validation. Every API route securely processes form submissions using a rigorous pipeline before any emails are dispatched.",
        image: {
          src: "/images/projects/aao-seekhe/05-contact-us.png",
          alt: "Aao Seekhe Contact Form",
          caption: "One of the multiple highly validated forms across the site.",
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
    role: "Enterprise Frontend Engineer (SPFx / React)",
    engagement: "Enterprise engineering team",
    timeline: "~4 months (2026)",
    shortDescription:
      "A SharePoint Online knowledge platform with metadata-driven document discovery, an SME directory integrated with Microsoft Graph, and custom admin configuration.",
    longDescription: [
      "The Enterprise Knowledge Hub is a SharePoint Online application built with SPFx web parts to solve knowledge fragmentation within a large organization. Information was scattered across OneDrive, Teams, and email—making it difficult to find templates, correct document versions, and subject-matter experts.",
      "As an enterprise frontend contributor within the engineering team, I contributed to developing custom SPFx web parts using React and Fluent UI—collaborating on the metadata-driven knowledge library with real-time filtering, integrating the Microsoft Graph API for user profiles and presence in the SME Finder, and building the frontend configuration panel for site administrators. The application operated within SharePoint Online, leveraging the organization's existing M365 security model without external backends.",
    ],
    tags: [
      "SharePoint Online",
      "SPFx",
      "React",
      "TypeScript",
      "Fluent UI",
      "PnPjs",
      "Microsoft Graph",
      "CAML",
    ],
    outcomes: [
      { value: "~4 months", label: "Enterprise engagement (2026)" },
      { value: "0", label: "External backends — runs entirely inside SharePoint Online" },
      { value: "3", label: "Data sources unified: SharePoint REST, Microsoft Graph, CAML" },
    ],
    heroImage: {
      src: "/images/projects/sharepoint-knowledge-hub/01-home.png",
      alt: "Enterprise Knowledge Hub Interface",
    },
    caseStudy: [
      {
        type: "product-feature",
        title: "KNOWLEDGE LIBRARY & DISCOVERY",
        content:
          "A real-time, multi-dimensional discovery experience allowing users to filter governed documents across specific metadata dimensions (Category, Document Type, Capability, Market).",
        image: {
          src: "/images/projects/sharepoint-knowledge-hub/02-knowledge-library.png",
          alt: "Knowledge Library Discovery Interface",
          caption: "Metadata-driven search without external databases.",
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
        content:
          "An expert directory backed by a SharePoint List, enriched with live organizational data to help users find domain experts.",
        image: {
          src: "/images/projects/sharepoint-knowledge-hub/03-sme-finder.png",
          alt: "SME Finder Interface",
          caption: "Subject Matter Expert directory showing capabilities and presence.",
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
    title: "PLEDGE Portal — QA & Verification Engineering",
    category: "QA Engagement",
    role: "QA & Verification Engineer",
    engagement: "Internship · Rapsora Technologies",
    timeline: "March 2026 – May 2026 (During Rapsora Internship)",
    shortDescription:
      "Functional testing, workflow validation, defect documentation and regression verification for the Government of Uttar Pradesh's PLEDGE portal.",
    longDescription: [
      "The PLEDGE Portal (Government of Uttar Pradesh) is a large-scale governmental platform managing industrial infrastructure, applicant submissions, and departmental approval chains. With sensitive multi-tier government workflows, ensuring rock-solid data integrity, precise role-based boundaries, and defect-free application state transitions was critical prior to staging and production milestones.",
      "During my software engineering internship at Rapsora Technologies, I performed rigorous functional and regression testing across key portal surfaces. My responsibilities centered on manual QA verification: executing test scenarios across multi-tier user roles (Citizen Applicant, Department Approver, Department Admin), performing boundary and payload verification on complex application forms, documenting reproducible defect logs with exact steps to replicate, and executing regression test cycles following developer fixes to identify and resolve unintended side effects across dependent workflows.",
    ],
    outcomes: [
      { value: "3", label: "User roles verified (Applicant · Approver · Admin)" },
      { value: "5-stage", label: "QA lifecycle from requirement intake to staging sign-off" },
      { value: "Regression", label: "Re-test cycles after every developer fix" },
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
      src: "/diagrams/projects/pledge/qa-workflow.svg",
      alt: "PLEDGE Portal QA Verification Architecture",
    },
    caseStudy: [
      {
        type: "product-feature",
        title: "QA PROTOCOL & VERIFICATION LIFECYCLE",
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
        content:
          "01\nFunctional Testing vs. Regression Testing vs. Automated Testing:\nThis engagement was dedicated to manual functional and regression testing. Functional testing verified that each module operated in exact alignment with government specifications and business rules. Regression testing re-executed critical test suites across previously passing modules after bug fixes were merged to identify regressions and verify that changes did not introduce defects into stable modules.\n\n02\nSecurity & Government Data Confidentiality:\nAll test procedures respected strict data protection guidelines. Only synthetic dummy data was used during test execution; no confidential government records, internal IPs, restricted citizen data, or production credentials are ever stored or disclosed.",
      },
    ],
  },
]
