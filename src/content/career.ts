/**
 * ─────────────────────────────────────────────────────────────
 * CAREER FACTS — the single source of truth.
 * ─────────────────────────────────────────────────────────────
 * Every page, the career.log timeline, durations, metadata, JSON-LD, /resume
 * and the "Ask Shivam's Work" knowledge base read from this file.
 * No other file may state career dates, titles or durations.
 * (A unit test in src/content/career.test.ts enforces this.)
 *
 * Dates: "YYYY-MM" or "YYYY-MM-DD". Set `confirmed: false` for anything not yet
 * verified — it renders as "(to be confirmed)". Durations are computed.
 */
import { formatDuration, formatPeriod, hasEnded, type Period } from "@/lib/dates"

export type EngagementKind = "work" | "education"

export interface Organization {
  name: string
  /** Short label for logo tiles (no third-party logos are shipped). */
  monogram: string
  location?: string
}

export interface ProjectRole {
  /** Matches a slug in src/content/projects.ts. */
  slug: string
  /** What Shivam did — exact wording approved by the owner. */
  role: string
  period: Period
  /** One factual line for the timeline. */
  summary: string
}

export interface Engagement {
  id: string
  kind: EngagementKind
  title: string
  organization: Organization
  period: Period
  /** Client the work was delivered for, if it may be named publicly. */
  client?: string
  summary: string
  highlights: string[]
  tags: string[]
  /** Projects delivered during this engagement (in delivery order). */
  projects?: ProjectRole[]
}

export interface IndependentProject extends ProjectRole {
  title: string
  tags: string[]
}

export interface Recognition {
  id: string
  title: string
  organization: string
  description: string
}

export const RAPSORA = "Rapsora Technologies Private Limited"
export const RAPSORA_SHORT = "Rapsora Technologies"

export const engagements: Engagement[] = [
  {
    id: "rapsora",
    kind: "work",
    title: "Software Engineering Intern",
    organization: { name: RAPSORA, monogram: "RT", location: "Kanpur, India" },
    period: { start: "2026-01", end: "2026-10", confirmed: true },
    summary:
      "One continuous engagement in which I delivered client and product work end to end: two solo full-stack builds, the sole development of an association website, enterprise SharePoint frontend work, and QA for a Government of Uttar Pradesh portal.",
    highlights: [
      "Solo developer of the Shynr HRMS & Job Portal (Next.js, MongoDB, NextAuth, geofenced attendance).",
      "Sole developer of the Kanpur Architect Association website.",
      "Solo full-stack developer of AaoSeekhe.",
      "Frontend contributor on an enterprise SharePoint Knowledge Hub (SPFx, React, TypeScript).",
      "QA engineer (QA only) for the PLEDGE portal: functional, workflow and regression testing.",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "SPFx",
      "SharePoint Online",
      "Functional Testing",
      "Regression Testing",
    ],
    projects: [
      {
        slug: "shynr",
        role: "Solo developer",
        period: { start: "2026-01-15", end: "2026-02-09", confirmed: true },
        summary:
          "Built the HRMS and public job portal: RBAC, GPS geofenced attendance, leave and an ATS pipeline.",
      },
      {
        slug: "sharepoint-knowledge-hub",
        role: "Frontend contributor (SPFx / React)",
        period: { start: null, end: null, confirmed: false },
        summary:
          "Contributed SPFx web parts for the Homepage, Library and SME Finder (Phase 2B) of an enterprise SharePoint Knowledge Hub.",
      },
      {
        slug: "pledge-portal-qa",
        role: "QA engineer (QA only)",
        period: { start: "2026-03", end: "2026-05", confirmed: true },
        summary:
          "Functional, workflow and regression testing of a public Government of Uttar Pradesh portal. Did not build the portal.",
      },
      {
        slug: "kanpur-architects-association",
        role: "Sole developer",
        period: {
          start: "2026-05",
          end: "2026-09",
          confirmed: true,
          approximate: true,
          startQualifier: "mid",
          endQualifier: "early",
        },
        summary:
          "Developed the entire association website: public pages, members directory, events calendar and an admin panel.",
      },
      {
        slug: "aao-seekhe",
        role: "Solo full-stack developer",
        period: { start: null, end: null, confirmed: false },
        summary:
          "Built the multi-page education-services site with validated enquiry forms and email delivery.",
      },
    ],
  },
  {
    id: "androcoders",
    kind: "work",
    title: "Web Developer Intern",
    organization: { name: "Androcoders", monogram: "AC" },
    period: { start: "2025-05", end: "2025-07", confirmed: true },
    client: "Crowe Oman",
    summary:
      "Developed and maintained 15+ web pages in Sitecore CMS for the Crowe Oman client, working in a 5-member development team.",
    highlights: [
      "Built reusable UI components, responsive layouts and CMS-driven page structures.",
      "Collaborated with a 5-member development team.",
    ],
    tags: ["Sitecore CMS", "JavaScript", "HTML/CSS", "Responsive Design"],
  },
  {
    id: "csjmu",
    kind: "education",
    title: "B.Tech in Information Technology",
    organization: {
      name: "Chhatrapati Shahu Ji Maharaj University",
      monogram: "CSJMU",
      location: "Kanpur, Uttar Pradesh",
    },
    period: { start: "2022-10", end: "2026-07", confirmed: true },
    summary:
      "Bachelor of Technology in Information Technology: software engineering, data structures, algorithms and system design.",
    highlights: [],
    tags: ["Data Structures", "Algorithms", "Software Engineering"],
  },
]

/** Work done outside any engagement. */
export const independentProjects: IndependentProject[] = [
  {
    slug: "hume-voice-assistant",
    title: "Real-time AI voice assistant (Hume EVI)",
    role: "Independent developer",
    // From the owner's resume; not yet confirmed by commit history or project records.
    period: { start: "2025-07", end: "2025-07", confirmed: false },
    summary:
      "A separate calling-agent experiment on Hume AI's Empathic Voice Interface: real-time voice, live transcripts and emotional cues over WebSockets.",
    tags: ["React", "TypeScript", "Hume EVI", "WebSockets"],
  },
]

export const recognitions: Recognition[] = [
  {
    id: "framework-hackathon",
    title: "Winner — Framework 1.0 Hackathon",
    organization: "Flutter Kanpur",
    description:
      "Won the Framework 1.0 Hackathon organised by Flutter Kanpur with a team-built solution.",
  },
  {
    id: "icscis",
    title: "Best Oral Presentation — ICSCIS",
    organization: "International Conference on Smart Computing and Intelligent Systems",
    description: "Awarded Best Oral Presentation at ICSCIS.",
  },
  {
    id: "codequezt",
    title: "Top 10% — CodeQuezt Coding Challenge",
    organization: "CodeQuezt",
    description: "Placed in the top 10% among 500+ participants.",
  },
]

/** Availability. The Rapsora engagement has ended, so this is the current status. */
export const availability = {
  open: true,
  label: "Open to new opportunities",
  detail: "Open to software engineering and full-stack roles.",
}

// ─── Derived helpers (use these instead of restating facts) ───

export const work = engagements.filter((e) => e.kind === "work")
export const education = engagements.filter((e) => e.kind === "education")
export const rapsora = engagements.find((e) => e.id === "rapsora")!

export const periodLabel = (p: Period, style: "short" | "long" = "short") => formatPeriod(p, style)
export const durationLabel = (p: Period) => formatDuration(p)
export const isCurrent = (e: Engagement, now?: Date) => !hasEnded(e.period, now)

/** The engagement (if any) a project was delivered in, plus Shivam's role on it. */
export function projectContext(slug: string) {
  for (const e of engagements) {
    const pr = e.projects?.find((p) => p.slug === slug)
    if (pr) return { engagement: e, projectRole: pr }
  }
  const indie = independentProjects.find((p) => p.slug === slug)
  return indie ? { engagement: undefined, projectRole: indie } : undefined
}

/** "Sole developer, at Rapsora Technologies" style label. */
export function projectRoleLine(slug: string): string | undefined {
  const ctx = projectContext(slug)
  if (!ctx) return undefined
  return ctx.engagement
    ? `${ctx.projectRole.role}, at ${ctx.engagement.organization.name === RAPSORA ? RAPSORA_SHORT : ctx.engagement.organization.name}`
    : ctx.projectRole.role
}
