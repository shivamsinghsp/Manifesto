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
    keywords: ["shynr", "hrms", "job portal", "ats", "full stack", "full-stack", "solo"],
    projectSlug: "shynr",
    answer: "Shivam built Shynr as a full-stack HRMS + Job Portal. As the solo developer, he architected the system using Next.js, MongoDB, NextAuth, and Cloudinary. It features geofenced attendance, RBAC, and an ATS pipeline.",
    sourceSection: "CONTEXT",
  },
  {
    id: "shynr-geofencing",
    keywords: ["geofencing", "attendance", "gps", "haversine", "location", "distance", "radius"],
    projectSlug: "shynr",
    answer: "Shynr's attendance system uses browser geolocation and the Haversine formula to validate employee proximity to company locations. It checks if the calculated distance is within the configured radius (default 100m) before allowing check-in.",
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
    answer: "Shivam built the Kanpur Architects Association platform. It serves three audiences with a public directory, member dashboard, and admin portal. Features include a custom CMS, geo-spatial search, and an ad/banner engine.",
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
    answer: "Aao Seekhe is a multi-page educational platform built without a traditional database. It features rich interactive UI components, complex Framer Motion animations, and stateless serverless API routes.",
    sourceSection: "INTERACTIVE UI",
  },
  {
    id: "aao-seekhe-forms",
    keywords: ["forms", "validation", "zod", "xss", "sanitization", "email", "nodemailer", "smtp"],
    projectSlug: "aao-seekhe",
    answer: "Aao Seekhe processes form submissions via Next.js API routes. Each request is validated using Zod, sanitized against XSS injection, and processed via Nodemailer to send HTML emails to both admins and users.",
    sourceSection: "FORMS + VALIDATION",
  },

  // SHAREPOINT
  {
    id: "sharepoint-overview",
    keywords: ["sharepoint", "spfx", "microsoft", "m365", "fluent ui", "enterprise", "confidential"],
    projectSlug: "sharepoint-knowledge-hub",
    answer: "For a global enterprise, Shivam built a SharePoint Online Knowledge Hub using SPFx, React, Fluent UI, and PnPjs. It provides a governed knowledge source within the existing M365 environment.",
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

  // TECHNOLOGIES & GENERAL
  {
    id: "tech-mongodb",
    keywords: ["mongodb", "mongoose", "nosql", "database"],
    answer: "Shivam used MongoDB heavily in Shynr (6 models for HRMS/ATS entities) and Kanpur Architects Association (12 models for custom CMS, directory, and ads). He uses Mongoose for schema validation and leverages advanced features like 2dsphere indexing.",
  },
  {
    id: "tech-nextjs",
    keywords: ["next.js", "nextjs", "react", "app router", "ssr", "server components"],
    answer: "Next.js App Router is Shivam's primary framework. He used it as a monolith for Shynr, a multi-audience platform for KAA (with ISR cache invalidation), and a stateless backend for Aao Seekhe API routes.",
  },
  {
    id: "role-solo",
    keywords: ["solo", "alone", "ownership", "end-to-end", "lead"],
    answer: "Shivam was the sole end-to-end developer for Shynr (33 commits), KAA (100% ownership over 3.5 months), and Aao Seekhe (34 commits). He handled architecture, frontend, backend, and deployment for these systems.",
  }
]
