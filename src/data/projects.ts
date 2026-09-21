export type ProjectCategory = "Tier 1: Product" | "Tier 2: System" | "Tier 3: Component";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudySection {
  type: "text" | "image" | "diagram" | "two-column" | "product-feature";
  category?: string;
  title?: string;
  content?: string | string[];
  image?: ProjectImage;
  diagram?: { src: string; alt: string; caption: string };
  leftCol?: string;
  rightCol?: string;
  implementation?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  role: string;
  timeline?: string;
  shortDescription: string;
  longDescription: string[];
  metrics?: ProjectMetric[];
  tags: string[];
  heroImage: ProjectImage;
  links?: ProjectLink[];
  explorerTabs?: { label: string; sectionTitle: string }[];
  caseStudy?: CaseStudySection[];
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // PROJECT 1: SHYNR — HRMS & JOB PORTAL
  // ─────────────────────────────────────────────
  {
    slug: "shynr",
    title: "Shynr — HRMS & Job Portal",
    category: "Tier 1: Product",
    role: "Lead Full-Stack Developer — Solo Developer",
    timeline: "Jan 15 – Feb 9, 2026 (~4 weeks)",
    shortDescription:
      "A monolithic Next.js application combining an internal HRMS with a public job portal — featuring GPS-based geofencing attendance, RBAC, and an ATS workflow.",
    longDescription: [
      "Shynr is a production-deployed platform that merges two distinct systems into a single Next.js 15 application: a public job portal with listings, applications, and an ATS pipeline, and an internal HRMS handling attendance, leave management, employee administration, and activity logging.",
      "I built the entire platform end-to-end as the sole developer — 33 commits covering architecture, frontend, backend, database, authentication, authorization, geofencing, and deployment. The most technically interesting subsystem is the GPS-based attendance validation, which uses the Haversine formula to verify employee proximity to company locations before allowing check-in.",
    ],
    metrics: [
      { label: "Development Time", value: "4 Weeks" },
      { label: "Database Models", value: "6" },
      { label: "Git Commits", value: "33" },
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
    explorerTabs: [
      { label: "JOB PORTAL", sectionTitle: "JOB PORTAL" },
      { label: "HRMS ADMIN", sectionTitle: "HRMS" },
      { label: "AUTH / RBAC", sectionTitle: "AUTHENTICATION" },
      { label: "GEOFENCING", sectionTitle: "GEOSPATIAL ATTENDANCE" },
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "JOB PORTAL & ATS",
        content: "The public-facing portal allows candidates to search jobs and submit applications. The search is powered by MongoDB compound text indexes across title, description, and requirements.",
        image: {
          src: "/images/projects/shynr/02-job-portal.png",
          alt: "Shynr Job Portal Interface",
          caption: "Real-time job search interface."
        },
        implementation: [
          "Job Listing",
          "MongoDB Text Index Search",
          "Application Submission",
          "Cloudinary Resume Upload",
          "ATS Pipeline (Pending → Reviewed → Shortlisted)",
          "Nodemailer Status Updates"
        ]
      },
      {
        type: "product-feature",
        title: "AUTHENTICATION & RBAC",
        content: "A unified authentication layer serves both internal employees and public job seekers, coordinating access across the platform.",
        image: {
          src: "/images/projects/shynr/12-login-page.png",
          alt: "Shynr Authentication Interface",
          caption: "Unified login portal supporting Google OAuth and credentials."
        },
        diagram: {
          src: "/diagrams/projects/shynr/auth-rbac.svg",
          alt: "Shynr Role Based Access Control",
          caption: "Middleware-based Role Access Control Flow"
        },
        implementation: [
          "NextAuth.js v4",
          "Google OAuth / Credential Providers",
          "Custom In-Memory Rate Limiter",
          "Role Levels (Admin: 100, HR: 50, Emp: 20, User: 10)",
          "Middleware Route Protection"
        ]
      },
      {
        type: "product-feature",
        title: "INTERNAL HRMS",
        content: "The admin dashboard provides complete control over employee management, department settings, leave approvals, and attendance tracking.",
        image: {
          src: "/images/projects/shynr/04-admin-dashboard.png",
          alt: "Shynr Admin Dashboard",
          caption: "Admin dashboard overview showing employee metrics."
        },
        diagram: {
          src: "/diagrams/projects/shynr/architecture.svg",
          alt: "Shynr System Architecture",
          caption: "Monolithic App Router Architecture handling both Public and Internal domains"
        }
      },
      {
        type: "product-feature",
        title: "GEOSPATIAL ATTENDANCE",
        content: "The attendance flow validates the employee's browser location against active company locations.",
        image: {
          src: "/images/projects/shynr/11-admin-attendance-locations.png",
          alt: "Admin Attendance Locations Configuration",
          caption: "Configuring company locations and allowed radiuses."
        },
        diagram: {
          src: "/diagrams/projects/shynr/attendance-geofencing.svg",
          alt: "Shynr Attendance Geofencing Architecture",
          caption: "Browser Geolocation → Haversine Validation → Timezone Conversion → Database Record"
        },
        implementation: [
          "navigator.geolocation",
          "/api/attendance/mark",
          "Fetch active company locations",
          "Haversine formula calculation",
          "Distance <= Configured Radius",
          "UTC Timestamp → Asia/Kolkata Conversion",
          "Working-Hour Validation",
          "Save Attendance Record"
        ]
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        content: "01\nGPS accuracy varies by device.\n→ Configurable attendance radius.\n\n02\nAttendance rules depend on local time.\n→ UTC storage + Asia/Kolkata conversion.\n\n03\nHRMS and Job Portal share one application.\n→ Shared authentication and authorization model."
      }
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 2: KANPUR ARCHITECTS ASSOCIATION
  // ─────────────────────────────────────────────
  {
    slug: "kanpur-architects-association",
    title: "Kanpur Architects Association",
    category: "Tier 1: Product",
    role: "Lead Full-Stack Developer — Solo Developer",
    timeline: "~3.5 months (mid-May – early Sep 2026)",
    shortDescription:
      "A comprehensive platform combining a public architect directory, event management, membership, custom CMS, admin portal with ad/banner management, and geo-spatial architect search.",
    longDescription: [
      "The Kanpur Architects Association platform is a multi-surface web application serving three distinct audiences: public visitors searching for architects and browsing events, registered architects managing their profiles and membership, and administrators controlling content, members, events, advertisements, and SEO metadata through a dedicated admin portal.",
      "I built the entire platform as the sole developer over approximately 3.5 months. The system includes a custom CMS backed by MongoDB, a geo-spatial architect directory using 2dsphere indexing, a banner/ad engine with click tracking and scheduling, phone OTP authentication for architects, and ISR cache invalidation to keep admin updates visible without full rebuilds.",
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
    links: [
      { label: "Live Site", url: "https://kanpur-architects-association.vercel.app/" },
    ],
    explorerTabs: [
      { label: "PUBLIC PLATFORM", sectionTitle: "PUBLIC DIRECTORY" },
      { label: "ADMIN PORTAL", sectionTitle: "ADMIN PLATFORM" },
      { label: "AD ENGINE", sectionTitle: "AD/BANNER ENGINE" }
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "PUBLIC DIRECTORY & GEO-SEARCH",
        content: "A dynamic architect directory supporting text queries, specialization filters, and location-based discovery powered by MongoDB 2dsphere indexing.",
        image: {
          src: "/images/projects/kanpur-architects-association/02-members.png",
          alt: "KAA Architect Directory",
          caption: "Public architect directory with robust filtering."
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/geo-search.svg",
          alt: "KAA Geo Spatial Search",
          caption: "MongoDB 2dsphere indexing resolving location proximity."
        },
        implementation: [
          "MongoDB 2dsphere indexing",
          "$near geospatial queries",
          "Compound text search",
          "Specialization filtering"
        ]
      },
      {
        type: "product-feature",
        title: "ADMIN PLATFORM & CUSTOM CMS",
        content: "A dedicated portal providing full CRUD for architects, event management with draft/publish states, and direct control over dynamic CMS pages without third-party vendor lock-in.",
        image: {
          src: "/images/projects/kanpur-architects-association/07-admin-dashboards.png",
          alt: "KAA Admin Dashboard",
          caption: "Comprehensive admin dashboard managing 12 interconnected models."
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/architecture.svg",
          alt: "KAA System Architecture",
          caption: "Overall platform architecture handling multiple audiences."
        },
        implementation: [
          "Architect & Member CRUD",
          "Event draft/publish/schedule states",
          "MongoDB-backed CMS schemas",
          "Next.js ISR (revalidatePath) for targeted invalidation"
        ]
      },
      {
        type: "product-feature",
        title: "AD/BANNER ENGINE",
        content: "An internal advertising system supporting banner placement (homepage hero, sidebar), schedule-based activation, and backend click tracking.",
        image: {
          src: "/images/projects/kanpur-architects-association/10-ads-management.png",
          alt: "KAA Ad Management Interface",
          caption: "Managing banner campaigns, scheduling, and metrics."
        },
        diagram: {
          src: "/diagrams/projects/kanpur-architects-association/ad-tracking.svg",
          alt: "KAA Ad Engine Tracking Flow",
          caption: "Click tracking pipeline from user interaction to backend analytics."
        },
        implementation: [
          "Create Campaign",
          "Target Placement",
          "Schedule Activation",
          "Public Display",
          "Click → /api/ads/click/[id]",
          "Track Engagement → Redirect"
        ]
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        content: "01\nCoordinating three authentication flows.\n→ Distinct auth endpoints and middleware paths for Admin (email+TOTP), Architect (OTP), and Public (session).\n\n02\nFrequent CMS updates causing slow rebuilds.\n→ Targeted Next.js ISR (revalidatePath) invalidation on admin saves."
      }
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 3: AAO SEEKHE
  // ─────────────────────────────────────────────
  {
    slug: "aao-seekhe",
    title: "Aao Seekhe.in",
    category: "Tier 1: Product",
    role: "Full-Stack Developer — Solo Developer",
    timeline: "~2 months",
    shortDescription:
      "A multi-page educational platform with rich interactive UI, animated components, reusable forms, and serverless API routes handling validation, XSS sanitization, and SMTP email workflows.",
    longDescription: [
      "Aao Seekhe is a multi-page web application for an educational services company, covering test preparation (GRE, GMAT, SAT, IELTS), global admissions, academic collaboration, training, and consultation booking. I built the entire application from scratch as the sole developer — 34 commits, 100% ownership.",
      "The frontend emphasizes interactive, animated experiences: a HeroSlider, HeroWelcomePopup with frosted-glass UI, animated grids, and an Embla carousel. The backend uses Next.js serverless API routes for form submissions — each route validates input with Zod, sanitizes against XSS, and sends HTML email notifications to both administrators and users via Nodemailer/SMTP.",
    ],
    metrics: [
      { label: "Git Commits", value: "34" },
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "Nodemailer",
    ],
    heroImage: {
      src: "/images/projects/aao-seekhe/03-aaoseekhe-homepage.png",
      alt: "Aao Seekhe.in Platform Interface",
    },
    links: [
      { label: "Live Site", url: "https://www.aaoseekhe.com" },
      { label: "GitHub", url: "https://github.com/shivamsinghsp/Aao-Seekhe" },
    ],
    explorerTabs: [
      { label: "INTERACTIVE UI", sectionTitle: "INTERACTIVE UI" },
      { label: "FORMS", sectionTitle: "FORMS" }
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "INTERACTIVE UI",
        content: "The frontend emphasizes highly interactive, animated components to present diverse educational services, using Framer Motion to orchestrate complex entrance sequences and gestural interactions.",
        image: {
          src: "/images/projects/aao-seekhe/01-pop-ups-1.png",
          alt: "Aao Seekhe Hero Welcome Popup",
          caption: "HeroWelcomePopup with frosted-glass UI and Framer Motion animations."
        },
        diagram: {
          src: "/diagrams/projects/aao-seekhe/architecture.svg",
          alt: "Aao Seekhe Architecture",
          caption: "Stateless frontend architecture with serverless endpoints."
        }
      },
      {
        type: "product-feature",
        title: "FORMS & SUBMISSION WORKFLOWS",
        content: "The platform captures inquiries across different business lines (careers, consultation, general enquiry, partner registration) using reusable form architectures with dual client-server validation. Every API route securely processes form submissions using a rigorous pipeline before any emails are dispatched.",
        image: {
          src: "/images/projects/aao-seekhe/05-contact-us.png",
          alt: "Aao Seekhe Contact Form",
          caption: "One of the multiple highly validated forms across the site."
        },
        diagram: {
          src: "/diagrams/projects/aao-seekhe/email-pipeline.svg",
          alt: "Aao Seekhe Form Pipeline Architecture",
          caption: "Pipeline from form submission to email delivery."
        },
        implementation: [
          "React Hook Form",
          "Zod Schema Definition",
          "Next.js API Route",
          "Server Zod Validation",
          "XSS Sanitization",
          "Nodemailer / SMTP",
          "Admin Notification + User Confirmation"
        ]
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        content: "01\nConsistent email delivery across four APIs.\n→ Built a reusable email-sending utility with template composition.\n\n02\nComplex animation composition causing visual glitches on fast navigation.\n→ Careful Framer Motion sequencing and component unmount cleanup."
      }
    ],
  },

  // ─────────────────────────────────────────────
  // PROJECT 4: ENTERPRISE KNOWLEDGE HUB
  // ─────────────────────────────────────────────
  {
    slug: "sharepoint-knowledge-hub",
    title: "Enterprise Knowledge Hub",
    category: "Tier 2: System",
    role: "SPFx Developer / Frontend React Engineer",
    timeline: "~4 months (2026)",
    shortDescription:
      "A SharePoint Online knowledge platform with metadata-driven document discovery, an SME directory integrated with Microsoft Graph, and custom admin configuration.",
    longDescription: [
      "The Enterprise Knowledge Hub is a SharePoint Online application built with SPFx web parts to solve knowledge fragmentation within a large organization. Information was scattered across OneDrive, Teams, and email — making it difficult to find templates, correct document versions, and subject-matter experts.",
      "I built custom SPFx web parts, React interfaces with Fluent UI, a metadata-driven knowledge library with real-time filtering, an SME Finder integrated with Microsoft Graph for user profiles and presence, and an admin configuration experience for non-technical site owners. The entire platform runs within SharePoint Online — no external databases, no external application backends.",
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
    heroImage: {
      src: "/images/projects/sharepoint-knowledge-hub/01-home.png",
      alt: "Enterprise Knowledge Hub Interface",
    },
    explorerTabs: [
      { label: "KNOWLEDGE LIBRARY", sectionTitle: "KNOWLEDGE LIBRARY" },
      { label: "SME FINDER", sectionTitle: "SME FINDER" }
    ],
    caseStudy: [
      {
        type: "product-feature",
        title: "KNOWLEDGE LIBRARY & DISCOVERY",
        content: "A real-time, multi-dimensional discovery experience allowing users to filter governed documents across specific metadata dimensions (Category, Document Type, Capability, Market).",
        image: {
          src: "/images/projects/sharepoint-knowledge-hub/02-knowledge-library.png",
          alt: "Knowledge Library Discovery Interface",
          caption: "Metadata-driven search without external databases."
        },
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/knowledge-discovery.svg",
          alt: "Knowledge Hub Discovery Flow",
          caption: "Metadata-driven discovery workflow without external databases."
        },
        implementation: [
          "React / SPFx",
          "PnPjs Data Access Layer",
          "SharePoint APIs / Search API / CAML",
          "Dynamic Library Filtering"
        ]
      },
      {
        type: "product-feature",
        title: "SME FINDER",
        content: "An expert directory backed by a SharePoint List, enriched with live organizational data to help users find domain experts.",
        image: {
          src: "/images/projects/sharepoint-knowledge-hub/03-sme-finder.png",
          alt: "SME Finder Interface",
          caption: "Subject Matter Expert directory showing capabilities and presence."
        },
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/sme-finder.svg",
          alt: "SME Finder Data Architecture",
          caption: "Data merging from SharePoint Lists and Microsoft Graph API."
        },
        implementation: [
          "SharePoint List (Profiles & Capabilities)",
          "Microsoft Graph API Integration",
          "Live User Photos",
          "Real-time Presence Status (Available/Busy/Away)"
        ]
      },
      {
        type: "diagram",
        title: "SYSTEM ARCHITECTURE",
        diagram: {
          src: "/diagrams/projects/sharepoint-knowledge-hub/architecture.svg",
          alt: "Knowledge Hub SharePoint Architecture",
          caption: "Fully integrated M365 architecture running strictly within SharePoint Online."
        }
      },
      {
        type: "text",
        title: "ENGINEERING CHALLENGES",
        content: "01\nSharePoint API throttling and pagination limits.\n→ Optimized PnPjs queries with robust error handling and caching.\n\n02\nCombining disparate API structures (REST, Graph, CAML).\n→ Unified data layer abstraction smoothing out response formats."
      }
    ],
  },
];
