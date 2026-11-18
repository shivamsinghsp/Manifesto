/**
 * Resume content. Titles, organisations and dates come from career.ts; only the
 * wording of bullets lives here. Every bullet must be a fact from the owner's records
 * (previous resume, owner instructions or verified project content). No metrics
 * that cannot be supported.
 *
 * Rendered at /resume and printed to public/resume.pdf by `npm run resume:pdf`.
 */
import { site, SITE_URL } from "@/content/site"
import {
  education,
  projectContext,
  independentProjects,
  periodLabel,
  rapsora,
  recognitions,
  work,
  type Engagement,
} from "@/content/career"

export interface ResumeItem {
  heading: string
  meta?: string
  bullets: string[]
}

export interface ResumeRole {
  engagement: Engagement
  location?: string
  subtitle?: string
  /** Grouped by project (Rapsora) or flat (Androcoders). */
  items: ResumeItem[]
}

const androcoders = work.find((e) => e.id === "androcoders")!
const edu = education[0]
/** Role · extra · period (the period only when known). */
const meta = (slug: string, extra: string) => {
  const p = projectContext(slug)?.projectRole
  const when = p?.period.start ? periodLabel(p.period) : null
  return [p?.role, extra, when].filter(Boolean).join(" · ")
}

const hume = independentProjects.find((p) => p.slug === "hume-voice-assistant")!

export const resume = {
  name: site.name,
  headline: "Software Engineer · Full-Stack Developer",
  contact: {
    location: "Kanpur, Uttar Pradesh, India",
    email: site.email,
    /** Shown in the PDF only (as on the owner's previous resume), not on the web page. */
    phone: "+91-9832012260",
    website: SITE_URL.replace(/^https?:\/\//, ""),
    github: site.socials.github.replace(/^https?:\/\//, ""),
    linkedin: site.socials.linkedin.replace(/^https?:\/\//, ""),
  },
  summary:
    "Full-stack developer with hands-on experience building and shipping web applications with React, Next.js, TypeScript, Node.js and MongoDB, plus enterprise SharePoint (SPFx) frontend work and functional/regression testing. Experienced in REST APIs, authentication and role-based access control, responsive UI and CMS-driven sites. Open to software engineering and full-stack roles.",
  roles: [
    {
      engagement: rapsora,
      location: "Kanpur · On-site",
      items: [
        {
          heading: "Shynr: HRMS & Job Portal",
          meta: meta("shynr", "shynr.in"),
          bullets: [
            "Built a full-stack HRMS and public job portal with Next.js, React, TypeScript, MongoDB and NextAuth.js.",
            "Implemented role-based authentication and authorisation (Super Admin, Sub Admin, Employee, User) across both domains.",
            "Built GPS geofenced attendance (Haversine distance checks against office radii) and REST APIs for attendance, leave, announcements, job applications and users.",
          ],
        },
        {
          heading: "Kanpur Architect Association website",
          meta: meta("kanpur-architects-association", "kanpurarchitects.in"),
          bullets: [
            "Developed the entire site: public pages, an A–Z members directory, events calendar and members portal, with an admin panel for members, events, leadership content and banner ad campaigns (Next.js, TypeScript, Tailwind CSS, MongoDB).",
          ],
        },
        {
          heading: "AaoSeekhe",
          meta: meta("aao-seekhe", "aaoseekhe.com"),
          bullets: [
            "Built a multi-page education-services site with Framer Motion UI and serverless form APIs using Zod validation, XSS sanitisation and Nodemailer email delivery.",
          ],
        },
        {
          heading: "Enterprise SharePoint Knowledge Hub",
          meta: meta("sharepoint-knowledge-hub", "Confidential client"),
          bullets: [
            "Contributed SPFx 1.20 web parts in React and TypeScript for the Homepage, Library and SME Finder (Phase 2B), with lazy loading of large lists via .getPaged(); worked with Microsoft Graph.",
          ],
        },
        {
          heading: "PLEDGE Portal, Government of Uttar Pradesh",
          meta: meta("pledge-portal-qa", ""),
          bullets: [
            "Performed functional, workflow and regression testing of application workflows, forms and validations across applicant, approver and admin roles.",
            "Identified, reproduced and documented defects, and re-tested fixes before release.",
          ],
        },
      ],
    },
    {
      engagement: androcoders,
      location: "On-site",
      subtitle: `Client: ${androcoders.client}`,
      items: [
        {
          heading: "",
          bullets: [
            "Developed and maintained 15+ web pages using Sitecore CMS for the Crowe Oman client.",
            "Built reusable UI components, responsive layouts and CMS-driven page structures in a 5-member development team.",
            `${androcoders.phases?.map((p) => `${p.label}: ${periodLabel(p.period)}`).join("; ")}.`,
          ],
        },
      ],
    },
  ] as ResumeRole[],
  projects: [
    {
      heading: "Real-Time AI Voice Assistant (Hume EVI)",
      meta: `${hume.tags.join(", ")} · ${periodLabel(hume.period)}`,
      bullets: [
        "Built an emotion-aware voice assistant on Hume AI's Empathic Voice Interface: real-time voice interaction, live transcripts and emotional cues over WebSockets.",
      ],
    },
  ] as ResumeItem[],
  skills: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Java", "SQL", "HTML5", "CSS3"] },
    { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    {
      label: "Backend",
      items: ["Node.js", "REST APIs", "NextAuth.js", "Zod", "Authentication & RBAC"],
    },
    { label: "Databases", items: ["MongoDB (Mongoose)", "MySQL"] },
    {
      label: "Platforms",
      items: [
        "SharePoint Online",
        "SPFx",
        "Microsoft Graph",
        "Sitecore CMS",
        "Vercel",
        "Cloudinary",
        "AWS (EC2, S3)",
      ],
    },
    {
      label: "Tools & QA",
      items: ["Git", "GitHub", "Postman", "Linux", "Functional & regression testing"],
    },
  ],
  education: {
    engagement: edu,
    line: `${edu.title} · ${edu.status} · ${edu.grade}`,
  },
  achievements: recognitions.map((r) => `${r.title} (${r.organization})`),
}

export const RESUME_SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
] as const

/** Markdown version (for "Copy Markdown"). Same data as the page and the PDF. */
export function resumeMarkdown(): string {
  const r = resume
  const lines: string[] = [
    `# ${r.name}`,
    `${r.headline}`,
    "",
    `${r.contact.location} · ${r.contact.email} · ${r.contact.website} · ${r.contact.github} · ${r.contact.linkedin}`,
    "",
    "## Summary",
    r.summary,
    "",
    "## Experience",
  ]
  for (const role of r.roles) {
    lines.push(
      "",
      `### ${role.engagement.title}, ${role.engagement.organization.name} (${periodLabel(role.engagement.period)})`
    )
    if (role.subtitle) lines.push(`_${role.subtitle}_`)
    for (const it of role.items) {
      if (it.heading) lines.push("", `**${it.heading}**${it.meta ? ` (${it.meta})` : ""}`)
      for (const b of it.bullets) lines.push(`- ${b}`)
    }
  }
  lines.push("", "## Projects")
  for (const p of r.projects) {
    lines.push("", `**${p.heading}** (${p.meta})`)
    for (const b of p.bullets) lines.push(`- ${b}`)
  }
  lines.push("", "## Skills")
  for (const s of r.skills) lines.push(`- **${s.label}:** ${s.items.join(", ")}`)
  lines.push(
    "",
    "## Education",
    `${r.education.engagement.organization.name}, ${r.education.engagement.organization.location} (${periodLabel(r.education.engagement.period)})`,
    r.education.line,
    "",
    "## Achievements"
  )
  for (const a of r.achievements) lines.push(`- ${a}`)
  return lines.join("\n") + "\n"
}
