import { site } from "@/content/site"
import { projects } from "@/content/projects"
import {
  availability,
  education,
  engagements,
  independentProjects,
  periodLabel,
  projectContext,
  rapsora,
  RAPSORA_SHORT,
  work,
  durationLabel,
} from "@/content/career"

const period = (slug: string) => {
  const ctx = projectContext(slug)
  return ctx ? periodLabel(ctx.projectRole.period) : "dates to be confirmed"
}
const edu = education[0]
const hume = independentProjects[0]

function experienceSummary() {
  return work
    .map((e) => {
      const dur = durationLabel(e.period)
      return `${e.title} at ${e.organization.name} (${periodLabel(e.period)}${dur ? `, ${dur}` : ""})${e.client ? ` for ${e.client}` : ""}`
    })
    .join("; ")
    .concat(". The Rapsora engagement has ended and he is open to new opportunities.")
}

function roleSummary() {
  const lines = engagements.flatMap((e) =>
    (e.projects ?? []).map(
      (p) => `${p.role} on ${projects.find((x) => x.slug === p.slug)?.title ?? p.slug}`
    )
  )
  return `At ${RAPSORA_SHORT}: ${lines.join("; ")}.`
}

export interface KnowledgeEntry {
  id: string
  keywords: string[]
  projectSlug?: string
  answer: string
  sourceSection?: string
}

export const portfolioKnowledge: KnowledgeEntry[] = [
  // SHYNR
  {
    id: "shynr-overview",
    keywords: [
      "shynr",
      "hrms",
      "job portal",
      "ats",
      "full stack",
      "full-stack",
      "primary developer",
    ],
    projectSlug: "shynr",
    answer: `Shivam built Shynr, an HRMS + job portal, as the solo developer at ${RAPSORA_SHORT} (${period("shynr")}). It uses Next.js 15, MongoDB, NextAuth and Cloudinary, with geofenced attendance, RBAC and an ATS pipeline. Live at shynr.in.`,
    sourceSection: "CONTEXT",
  },
  {
    id: "shynr-geofencing",
    keywords: ["geofencing", "attendance", "gps", "haversine", "location", "distance", "radius"],
    projectSlug: "shynr",
    answer:
      "Shynr's attendance system uses browser geolocation and the Haversine formula to validate employee proximity to company locations. It checks if the calculated distance is within the configured radius before allowing check-in.",
    sourceSection: "GEOSPATIAL ATTENDANCE",
  },
  {
    id: "shynr-rbac",
    keywords: ["auth", "authentication", "rbac", "authorization", "roles", "login", "oauth"],
    projectSlug: "shynr",
    answer:
      "Shynr uses NextAuth.js for Google OAuth and credential login. Authorization is a numeric hierarchy (Super Admin 100 · Sub Admin 50 · Employee 20 · User 10), so permission checks are simple greater-than comparisons across the HRMS and job portal.",
    sourceSection: "AUTHENTICATION + RBAC",
  },

  // KAA
  {
    id: "kaa-overview",
    keywords: ["kaa", "kanpur", "architects", "association", "directory", "cms", "events"],
    projectSlug: "kanpur-architects-association",
    answer: `Shivam developed the entire Kanpur Architect Association website as the sole developer, at ${RAPSORA_SHORT} (${period("kanpur-architects-association")}). It has public pages (executives, an A–Z members directory, membership, events calendar, members portal, contact) and an admin panel for members, events, leadership profiles, inquiries, applications and banner ad campaigns. Live at kanpurarchitects.in.`,
    sourceSection: "PUBLIC PLATFORM",
  },

  // AAO SEEKHE
  {
    id: "aao-seekhe-overview",
    keywords: ["aao seekhe", "education", "stateless", "forms", "framer motion", "animations"],
    projectSlug: "aao-seekhe",
    answer: `Shivam built AaoSeekhe as the solo full-stack developer at ${RAPSORA_SHORT} (${period("aao-seekhe")}): a multi-page education-services site with Framer Motion UI and serverless API routes using Zod validation, XSS sanitisation and Nodemailer email delivery. Live at aaoseekhe.com.`,
    sourceSection: "INTERACTIVE UI",
  },
  {
    id: "aao-seekhe-forms",
    keywords: ["forms", "validation", "zod", "xss", "sanitization", "email", "nodemailer", "smtp"],
    projectSlug: "aao-seekhe",
    answer:
      "Aao Seekhe processes form submissions via Next.js serverless API routes. Each request is validated using Zod schemas, sanitized against XSS injection, and processed via Nodemailer to send HTML emails to both admins and users.",
    sourceSection: "FORMS + VALIDATION",
  },

  // SHAREPOINT
  {
    id: "sharepoint-overview",
    keywords: ["sharepoint", "spfx", "microsoft", "m365", "enterprise", "confidential"],
    projectSlug: "sharepoint-knowledge-hub",
    answer: `During his ${RAPSORA_SHORT} engagement, Shivam contributed SPFx 1.20 web parts in React and TypeScript to an enterprise SharePoint Knowledge Hub: the Homepage, Library and SME Finder (Phase 2B), and worked with Microsoft Graph. The client is confidential.`,
    sourceSection: "CONTEXT",
  },
  {
    id: "sharepoint-search",
    keywords: ["search", "knowledge hub", "metadata", "filtering", "discovery"],
    projectSlug: "sharepoint-knowledge-hub",
    answer:
      "The Knowledge Hub Library combines search with metadata filters (such as category, document type and date) and loads large lists page by page with .getPaged() so it stays responsive.",
    sourceSection: "SEARCH + DISCOVERY",
  },
  {
    id: "sharepoint-sme",
    keywords: ["sme", "expert", "directory", "profiles"],
    projectSlug: "sharepoint-knowledge-hub",
    answer:
      "The SME Finder (Phase 2B) is an expert directory: people search subject-matter experts and contact them by email or Teams from the profile card.",
    sourceSection: "SME FINDER",
  },

  // PLEDGE QA
  {
    id: "pledge-qa-overview",
    keywords: [
      "pledge",
      "qa",
      "testing",
      "functional testing",
      "regression testing",
      "government",
      "quality assurance",
    ],
    projectSlug: "pledge-portal-qa",
    answer: `Shivam was QA only on PLEDGE, a DIEP (Government of Uttar Pradesh) portal for private industrial park development and MSME growth (${period("pledge-portal-qa")}, at ${RAPSORA_SHORT}). He did functional, workflow and regression testing across applicant, approver and admin roles. He did not build the portal. Public portal: pledgeup.in.`,
    sourceSection: "QA PROTOCOL",
  },
  {
    id: "pledge-qa-methodology",
    keywords: [
      "functional vs regression",
      "manual qa",
      "automated testing",
      "testing methodology",
      "bug reports",
    ],
    projectSlug: "pledge-portal-qa",
    answer:
      "Shivam's work on PLEDGE focused on disciplined manual functional and regression QA: validating user acceptance criteria across Citizen, Approver, and Admin tiers, logging step-by-step reproducible defects, and verifying regression test suites after developer fixes. No automated test frameworks are fabricated.",
    sourceSection: "METHODOLOGY",
  },

  // TECHNOLOGIES & GENERAL
  {
    id: "tech-mongodb",
    keywords: ["mongodb", "mongoose", "nosql", "database"],
    answer:
      "Shivam has used MongoDB with Mongoose on Shynr (HRMS and ATS data) and on the Kanpur Architect Association website (members, events and admin content).",
  },
  {
    id: "tech-nextjs",
    keywords: ["next.js", "nextjs", "react", "app router", "ssr", "server components"],
    answer:
      "Next.js App Router is Shivam's main framework: one application serving both the HRMS and job portal in Shynr, a public site plus admin panel for Kanpur Architect Association, and serverless form APIs for AaoSeekhe.",
  },
  {
    id: "role-ownership",
    keywords: ["role", "ownership", "solo", "responsibility", "contributions", "lead"],
    answer: roleSummary(),
  },
  {
    id: "topic-automation",
    keywords: [
      "automation",
      "automated",
      "workflow",
      "workflows",
      "pipeline",
      "pipelines",
      "process",
      "scripts",
    ],
    answer:
      "Examples of automated workflows Shivam has built: GPS geofenced attendance verification in Shynr, and serverless form validation with transactional email in AaoSeekhe.",
  },
  {
    id: "topic-ai-ml",
    keywords: [
      "ai",
      "artificial intelligence",
      "ml",
      "machine learning",
      "llm",
      "genai",
      "gpt",
      "openai",
      "deep learning",
      "nlp",
    ],
    answer:
      "Shivam's core focus is on full-stack web engineering, distributed application architecture, and enterprise platforms (Next.js, TypeScript, MongoDB, SharePoint). He has explored real-time voice streaming with Hume AI's EVI API in his Engineering Playground, but does not claim dedicated ML model training.",
  },
  {
    id: "tech-python",
    keywords: ["python", "django", "flask", "fastapi", "pandas", "numpy", "py"],
    answer:
      "Shivam does not use Python for his primary development. His production stack is heavily specialized in TypeScript, Next.js, React, Node.js, and MongoDB for building scalable full-stack web applications, custom CMS platforms, and enterprise solutions.",
    sourceSection: "CORE STACK FOCUS",
  },
  {
    id: "tech-typescript",
    keywords: ["typescript", "ts", "javascript", "js", "frontend", "programming language"],
    answer:
      "TypeScript is Shivam's primary programming language across the entire stack. He uses it end-to-end for type-safe Next.js App Router applications, REST API contracts with Zod validation, Mongoose schemas, and SharePoint SPFx enterprise components.",
    sourceSection: "PRIMARY LANGUAGE",
  },
  {
    id: "tech-backend",
    keywords: [
      "backend",
      "server",
      "api",
      "apis",
      "rest",
      "serverless",
      "node",
      "nodejs",
      "express",
    ],
    answer:
      "Shivam designs backend architectures using Next.js Serverless Route Handlers, Node.js, and MongoDB. His backend systems feature Zod schema validation, secure authentication via NextAuth.js and RBAC, transactional email dispatch via Nodemailer, and MongoDB aggregation pipelines.",
    sourceSection: "BACKEND ARCHITECTURE",
  },
  {
    id: "tech-databases",
    keywords: [
      "sql",
      "database",
      "databases",
      "postgresql",
      "mysql",
      "nosql",
      "postgres",
      "sqlite",
      "prisma",
    ],
    answer:
      "Shivam's main database is MongoDB with Mongoose (schemas, indexes and document references). In SharePoint work he has used SharePoint lists as the data store for SPFx web parts.",
    sourceSection: "DATA STORAGE & MODELING",
  },
  {
    id: "tech-cloud-devops",
    keywords: [
      "cloud",
      "devops",
      "docker",
      "aws",
      "kubernetes",
      "deploy",
      "deployment",
      "hosting",
      "vercel",
      "ci/cd",
      "git",
    ],
    answer:
      "Shivam deploys and hosts his full-stack applications primarily on Vercel, utilizing edge/serverless runtimes and Cloudinary for media asset delivery pipelines. He manages source control, versioning, and release workflows using Git and GitHub.",
    sourceSection: "DEPLOYMENT & INFRASTRUCTURE",
  },
  {
    id: "profile-experience",
    keywords: [
      "experience",
      "background",
      "career",
      "jobs",
      "internship",
      "internships",
      "companies",
      "company",
      "work history",
      "rapsora",
    ],
    answer: experienceSummary(),
    sourceSection: "WORK EXPERIENCE",
  },
  {
    id: "profile-education",
    keywords: ["education", "college", "degree", "university", "btech", "csjm", "academics", "gpa"],
    answer: `${edu.title} at ${edu.organization.name}, ${edu.organization.location} (${periodLabel(edu.period)}). ${edu.status}, ${edu.grade}.`,
    sourceSection: "ACADEMIC BACKGROUND",
  },
  {
    id: "profile-hire",
    keywords: [
      "hire",
      "hiring",
      "available",
      "availability",
      "job",
      "full-time",
      "contract",
      "open to work",
      "opportunities",
      "contact",
    ],
    answer: `${availability.label}: ${availability.detail} His ${RAPSORA_SHORT} engagement (${periodLabel(rapsora.period)}) has ended. Contact him through the form on this site or at ${site.email}.`,
    sourceSection: "STATUS & AVAILABILITY",
  },
  {
    id: "topic-voice-ai",
    keywords: [
      "voice",
      "voice assistant",
      "hume",
      "evi",
      "emotion",
      "empathic",
      "websocket",
      "audio",
      "microphone",
      "streaming",
    ],
    answer: `Separately from his internships, Shivam built a real-time AI voice (calling) assistant on Hume AI's Empathic Voice Interface (EVI): bidirectional voice, live transcription and emotional cues over WebSockets. Date: ${periodLabel(hume.period)}.`,
    sourceSection: "ENGINEERING PLAYGROUND",
  },
  {
    id: "profile-achievements",
    keywords: [
      "achievements",
      "awards",
      "recognition",
      "hackathon",
      "conference",
      "competition",
      "winner",
    ],
    answer:
      "Shivam's recognitions include: Winner of the Framework 1.0 Hackathon (Flutter Kanpur), Best Oral Presentation at the International Conference on Smart Computing and Intelligent Systems (ICSCIS), and placing in the top 10% among 500+ participants in the CodeQuezt Coding Challenge.",
    sourceSection: "RECOGNITION",
  },
]
