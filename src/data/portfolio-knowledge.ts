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
    keywords: ["shynr", "hrms", "job portal", "ats", "full stack", "full-stack", "primary developer"],
    projectSlug: "shynr",
    answer: "Shivam built Shynr as a full-stack HRMS + Job Portal during his internship at Rapsora Technologies. As primary feature developer, he implemented the foundational platform in a 4-week core product sprint (33 commits) using Next.js 15, MongoDB, NextAuth, and Cloudinary, featuring geofenced attendance, RBAC, and an ATS pipeline.",
    sourceSection: "CONTEXT",
  },
  {
    id: "shynr-geofencing",
    keywords: ["geofencing", "attendance", "gps", "haversine", "location", "distance", "radius"],
    projectSlug: "shynr",
    answer: "Shynr's attendance system uses browser geolocation and the Haversine formula to validate employee proximity to company locations. It checks if the calculated distance is within the configured radius before allowing check-in.",
    sourceSection: "GEOSPATIAL ATTENDANCE",
  },
  {
    id: "shynr-rbac",
    keywords: ["auth", "authentication", "rbac", "authorization", "roles", "login", "oauth"],
    projectSlug: "shynr",
    answer: "Shynr uses NextAuth.js for Google OAuth and credential login. Authorization uses a numeric hierarchy (Super Admin = 100, Employee = 20), allowing simple greater-than comparisons across the HRMS and Job Portal boundaries.",
    sourceSection: "AUTHENTICATION + RBAC",
  },
  
  // KAA
  {
    id: "kaa-overview",
    keywords: ["kaa", "kanpur", "architects", "association", "directory", "cms", "events"],
    projectSlug: "kanpur-architects-association",
    answer: "Shivam delivered the Kanpur Architects Association platform as an independent client project over 3.5 months. It serves three audiences with a public directory, member dashboard, and admin portal. Features include a custom MongoDB-backed CMS, geo-spatial search, and an ad/banner engine.",
    sourceSection: "PUBLIC PLATFORM",
  },
  {
    id: "kaa-geo-search",
    keywords: ["geo search", "spatial", "2dsphere", "$near", "proximity", "mongodb geo"],
    projectSlug: "kanpur-architects-association",
    answer: "The KAA architect directory uses MongoDB 2dsphere indexing. Stored coordinates allow $near queries to return architects sorted by proximity to the search location, combined with text and specialization filters.",
    sourceSection: "GEO-SPATIAL SEARCH",
  },
  {
    id: "kaa-cms",
    keywords: ["cms", "content management", "isr", "cache", "invalidation", "revalidatepath"],
    projectSlug: "kanpur-architects-association",
    answer: "The custom CMS in KAA uses MongoDB-backed schemas directly in Next.js. Content updates trigger targeted Next.js ISR (revalidatePath) from the service layer to immediately reflect changes without full rebuilds.",
    sourceSection: "CUSTOM CMS",
  },

  // AAO SEEKHE
  {
    id: "aao-seekhe-overview",
    keywords: ["aao seekhe", "education", "stateless", "forms", "framer motion", "animations"],
    projectSlug: "aao-seekhe",
    answer: "Aao Seekhe is an independent multi-page educational platform built with Next.js, Framer Motion, and serverless API endpoints with Zod validation, XSS sanitization, and Nodemailer SMTP delivery.",
    sourceSection: "INTERACTIVE UI",
  },
  {
    id: "aao-seekhe-forms",
    keywords: ["forms", "validation", "zod", "xss", "sanitization", "email", "nodemailer", "smtp"],
    projectSlug: "aao-seekhe",
    answer: "Aao Seekhe processes form submissions via Next.js serverless API routes. Each request is validated using Zod schemas, sanitized against XSS injection, and processed via Nodemailer to send HTML emails to both admins and users.",
    sourceSection: "FORMS + VALIDATION",
  },

  // SHAREPOINT
  {
    id: "sharepoint-overview",
    keywords: ["sharepoint", "spfx", "microsoft", "m365", "fluent ui", "enterprise", "confidential"],
    projectSlug: "sharepoint-knowledge-hub",
    answer: "As an enterprise frontend contributor within the team, Shivam contributed to developing SPFx web parts using React, Fluent UI, and PnPjs—collaborating on the metadata-driven knowledge library and Microsoft Graph-powered SME directory within M365.",
    sourceSection: "CONTEXT",
  },
  {
    id: "sharepoint-search",
    keywords: ["search", "knowledge hub", "metadata", "filtering", "caml", "pnpjs", "discovery"],
    projectSlug: "sharepoint-knowledge-hub",
    answer: "The Knowledge Library features real-time, multi-dimensional discovery. The data layer combines PnPjs, SharePoint REST, Search APIs, and CAML queries to filter documents by category, capability, and market.",
    sourceSection: "SEARCH + DISCOVERY",
  },
  {
    id: "sharepoint-sme",
    keywords: ["sme", "expert", "microsoft graph", "graph api", "presence", "directory", "profiles"],
    projectSlug: "sharepoint-knowledge-hub",
    answer: "The SME Finder is an expert directory backed by a SharePoint List. It integrates with the Microsoft Graph API to enrich profiles with live user data, photos, and real-time presence (available/busy).",
    sourceSection: "SME FINDER",
  },

  // PLEDGE QA
  {
    id: "pledge-qa-overview",
    keywords: ["pledge", "qa", "testing", "functional testing", "regression testing", "government", "quality assurance"],
    projectSlug: "pledge-portal-qa",
    answer: "During his Rapsora internship, Shivam performed functional and regression testing on the Government of Uttar Pradesh's PLEDGE portal, verifying multi-tier role permissions, form validation, and documenting reproducible defect reports across staging releases.",
    sourceSection: "QA PROTOCOL",
  },
  {
    id: "pledge-qa-methodology",
    keywords: ["functional vs regression", "manual qa", "automated testing", "testing methodology", "bug reports"],
    projectSlug: "pledge-portal-qa",
    answer: "Shivam's work on PLEDGE focused on disciplined manual functional and regression QA: validating user acceptance criteria across Citizen, Approver, and Admin tiers, logging step-by-step reproducible defects, and verifying regression test suites after developer fixes. No automated test frameworks are fabricated.",
    sourceSection: "METHODOLOGY",
  },

  // TECHNOLOGIES & GENERAL
  {
    id: "tech-mongodb",
    keywords: ["mongodb", "mongoose", "nosql", "database"],
    answer: "Shivam has extensive experience with MongoDB, implementing 6 models in Shynr (HRMS/ATS entities) and 12 models in Kanpur Architects Association (custom CMS, directory, and ads). He uses Mongoose for schema modeling and leverages features like 2dsphere geospatial indexing.",
  },
  {
    id: "tech-nextjs",
    keywords: ["next.js", "nextjs", "react", "app router", "ssr", "server components"],
    answer: "Next.js App Router is Shivam's primary framework. He used it as a monolithic architecture for Shynr, a multi-audience platform with ISR cache invalidation for KAA, and a serverless API backend for Aao Seekhe.",
  },
  {
    id: "role-ownership",
    keywords: ["role", "ownership", "solo", "responsibility", "contributions", "lead"],
    answer: "Shivam's work includes: Primary Feature Developer for Shynr (4-week core product sprint during Rapsora internship), Independent Full-Stack Developer for KAA (client delivery over 3.5 months), Full-Stack Developer for Aao Seekhe (independent project), Enterprise Contributor for SharePoint Knowledge Hub, and QA & Verification Engineer for PLEDGE Portal.",
  },
  {
    id: "topic-automation",
    keywords: ["automation", "automated", "workflow", "workflows", "pipeline", "pipelines", "process", "scripts"],
    answer: "Shivam has engineered several automated workflows, including GPS geofenced attendance verification in Shynr, serverless form validation with transactional email dispatch in Aao Seekhe, and automated ISR cache revalidation (revalidatePath) triggered on CMS publishing in KAA.",
  },
  {
    id: "topic-ai-ml",
    keywords: ["ai", "artificial intelligence", "ml", "machine learning", "llm", "genai", "gpt", "openai", "deep learning", "nlp"],
    answer: "Shivam's core focus is on full-stack web engineering, distributed application architecture, and enterprise platforms (Next.js, TypeScript, MongoDB, SharePoint). He has explored real-time voice streaming with Hume AI's EVI API in his Engineering Playground, but does not claim dedicated ML model training.",
  },
  {
    id: "tech-python",
    keywords: ["python", "django", "flask", "fastapi", "pandas", "numpy", "py"],
    answer: "Shivam does not use Python for his primary development. His production stack is heavily specialized in TypeScript, Next.js, React, Node.js, and MongoDB for building scalable full-stack web applications, custom CMS platforms, and enterprise solutions.",
    sourceSection: "CORE STACK FOCUS",
  },
  {
    id: "tech-typescript",
    keywords: ["typescript", "ts", "javascript", "js", "frontend", "programming language"],
    answer: "TypeScript is Shivam's primary programming language across the entire stack. He uses it end-to-end for type-safe Next.js App Router applications, REST API contracts with Zod validation, Mongoose schemas, and SharePoint SPFx enterprise components.",
    sourceSection: "PRIMARY LANGUAGE",
  },
  {
    id: "tech-backend",
    keywords: ["backend", "server", "api", "apis", "rest", "serverless", "node", "nodejs", "express"],
    answer: "Shivam designs backend architectures using Next.js Serverless Route Handlers, Node.js, and MongoDB. His backend systems feature Zod schema validation, secure authentication via NextAuth.js and RBAC, transactional email dispatch via Nodemailer, and MongoDB aggregation pipelines.",
    sourceSection: "BACKEND ARCHITECTURE",
  },
  {
    id: "tech-databases",
    keywords: ["sql", "database", "databases", "postgresql", "mysql", "nosql", "postgres", "sqlite", "prisma"],
    answer: "Shivam's primary database specialization is MongoDB / NoSQL, utilizing Mongoose for schema modeling, indexing strategies (including 2dsphere for geospatial queries), and relationship referencing. In enterprise settings, he has also worked with SharePoint Lists and CAML querying.",
    sourceSection: "DATA STORAGE & MODELING",
  },
  {
    id: "tech-cloud-devops",
    keywords: ["cloud", "devops", "docker", "aws", "kubernetes", "deploy", "deployment", "hosting", "vercel", "ci/cd", "git"],
    answer: "Shivam deploys and hosts his full-stack applications primarily on Vercel, utilizing edge/serverless runtimes and Cloudinary for media asset delivery pipelines. He manages source control, versioning, and release workflows using Git and GitHub.",
    sourceSection: "DEPLOYMENT & INFRASTRUCTURE",
  },
  {
    id: "profile-experience",
    keywords: ["experience", "background", "career", "jobs", "internship", "internships", "companies", "company", "work history", "rapsora"],
    answer: "Shivam completed a 6-month Software Engineering Internship at Rapsora Technologies (January–June 2026, delivering Shynr HRMS and conducting QA on the PLEDGE Portal) and a Web Developer Internship at Androcoders (developing 15+ pages with Sitecore CMS for Crowe Oman).",
    sourceSection: "WORK EXPERIENCE",
  },
  {
    id: "profile-education",
    keywords: ["education", "college", "degree", "university", "btech", "csjm", "academics", "gpa"],
    answer: "Shivam is pursuing his Bachelor of Technology (B.Tech) in Information Technology at Chhatrapati Shahu Ji Maharaj University (CSJM), Kanpur (2022–2026), building strong foundations in software engineering, data structures, algorithms, and system design.",
    sourceSection: "ACADEMIC BACKGROUND",
  },
  {
    id: "profile-hire",
    keywords: ["hire", "hiring", "available", "availability", "job", "full-time", "contract", "open to work", "opportunities", "contact"],
    answer: "Shivam is currently open to software engineering and full-stack developer opportunities. He can be contacted directly via the contact form on this website or by email at shivamsinghabc439@gmail.com.",
    sourceSection: "STATUS & AVAILABILITY",
  },
  {
    id: "topic-voice-ai",
    keywords: ["voice", "voice assistant", "hume", "evi", "emotion", "empathic", "websocket", "audio", "microphone", "streaming"],
    answer: "Shivam built a Real-Time AI Voice Assistant as a Tier 3 experiment using Hume AI's Empathic Voice Interface (EVI) API. The project demonstrates real-time bidirectional voice interaction, live transcription, and emotional-cue detection through WebSocket streaming, built with React.js and TypeScript.",
    sourceSection: "ENGINEERING PLAYGROUND",
  },
  {
    id: "profile-achievements",
    keywords: ["achievements", "awards", "recognition", "hackathon", "conference", "competition", "winner"],
    answer: "Shivam's recognitions include: Winner of the Framework 1.0 Hackathon (Flutter Kanpur), Best Oral Presentation at the International Conference on Smart Computing and Intelligent Systems (ICSCIS), and placing in the top 10% among 500+ participants in the CodeQuezt Coding Challenge.",
    sourceSection: "RECOGNITION",
  }
]
