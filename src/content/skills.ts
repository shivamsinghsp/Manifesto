/**
 * Technology clusters for the Stack section.
 * Every entry appears in at least one project's `tags`/implementation in projects.ts,
 * in career.ts, or in the "Technical Skills" section of public/resume.pdf.
 * Java, SQL, MySQL and AWS are listed on the resume but not shown in any project here,
 * so they are intentionally left out until confirmed (see README → Content TODOs).
 */
export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "enterprise"
  label: string
  /** CSS custom property holding the group colour (themed in globals.css). */
  color: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "var(--skill-frontend)",
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
    color: "var(--skill-backend)",
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
    color: "var(--skill-database)",
    items: ["MongoDB", "Mongoose", "2dsphere Geo Queries", "Text Indexes"],
  },
  {
    id: "enterprise",
    label: "Enterprise / CMS",
    color: "var(--skill-enterprise)",
    items: ["SharePoint Online", "SPFx", "Microsoft Graph", "Sitecore CMS"],
  },
]

/** Day-to-day tooling (resume → Cloud & DevOps / Platforms & Tools). */
export const tooling = ["Git", "GitHub", "Vercel", "Postman", "Linux"]
