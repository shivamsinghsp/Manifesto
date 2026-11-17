/**
 * Technology clusters for the Stack section.
 * Every entry appears in at least one project's `tags`/implementation in projects.ts,
 * in experience.ts, or in the "Technical Skills" section of public/resume.pdf.
 * Java, SQL, MySQL and AWS are listed on the resume but not shown in any project here,
 * so they are intentionally left out until confirmed (see README → Content TODOs).
 */
export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "enterprise"
  label: string
  color: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#00E5FF",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
      "ShadCN UI",
      "HTML5 / CSS3",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#7C9CFF",
    items: [
      "Node.js",
      "REST APIs",
      "NextAuth.js",
      "Zod",
      "Nodemailer",
      "WebSockets",
      "Cloudinary",
      "Hume AI EVI",
    ],
  },
  {
    id: "database",
    label: "Database",
    color: "#34D399",
    items: ["MongoDB", "Mongoose", "2dsphere Geo Queries", "Text Indexes"],
  },
  {
    id: "enterprise",
    label: "Enterprise / CMS",
    color: "#F2C069",
    items: [
      "SharePoint Online",
      "SPFx",
      "Microsoft Graph",
      "PnPjs",
      "Fluent UI",
      "CAML",
      "Sitecore CMS",
    ],
  },
]

/** Day-to-day tooling (resume → Cloud & DevOps / Platforms & Tools). */
export const tooling = ["Git", "GitHub", "Vercel", "Postman", "Linux"]
