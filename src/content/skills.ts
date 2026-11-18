/**
 * Technology clusters for the Stack section.
 * Every entry appears in at least one project's `tags`/implementation in projects.ts,
 * in career.ts, or in the "Technical Skills" section of public/resume.pdf.
 * Java and MySQL come from the owner's resume (skills section).
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
      "HTML5 / CSS3",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "var(--skill-backend)",
    items: [
      "Node.js",
      "Java",
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
    items: ["MongoDB", "Mongoose", "MongoDB Text Search", "MySQL"],
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
