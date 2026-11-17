export interface ExperienceProject {
  title: string
  description: string
}

export interface Experience {
  id: string
  type: "Work" | "Education" | "Recognition"
  title: string
  organization: string
  dateRange?: string // Optional to safely omit dates
  description: string
  skills: string[]
  projects?: ExperienceProject[]
}

export const experiences: Experience[] = [
  {
    id: "exp-01",
    type: "Work",
    title: "Software Engineering Intern",
    organization: "Rapsora Technologies Private Limited",
    dateRange: "January 2026 – June 2026",
    description:
      "During my 6-month software engineering internship at Rapsora Technologies, I delivered key engineering assignments: served as primary feature developer for the Shynr HRMS platform delivered during an initial 4-week product sprint (Jan–Feb 2026), and executed comprehensive functional and regression test cycles for the Government of Uttar Pradesh's PLEDGE portal.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "NextAuth.js",
      "REST APIs",
      "Geofencing",
      "Functional Testing",
      "Regression Testing",
    ],
    projects: [
      {
        title: "PLEDGE Portal — Government of Uttar Pradesh",
        description:
          "Executed functional, workflow, and regression testing across citizen applicant and administrative approval flows, documenting reproducible defect reports and verifying fixes prior to staging releases.",
      },
      {
        title: "Shynr HRMS & Job Portal",
        description:
          "Primary feature developer implementing full-stack Next.js 15 architecture, MongoDB data models, NextAuth RBAC, and GPS geofencing attendance validation.",
      },
    ],
  },
  {
    id: "exp-02",
    type: "Work",
    title: "Web Developer Intern",
    organization: "Androcoders",
    dateRange: "May 2025 – July 2025",
    description:
      "Developed and maintained 15+ web pages using Sitecore CMS for the Crowe Oman client. Built reusable UI components, responsive layouts, and CMS-driven page structures while collaborating closely with the cross-functional engineering team.",
    skills: [
      "React",
      "Sitecore CMS",
      "JavaScript",
      "HTML/CSS",
      "Responsive Design",
      "Cross-functional Collaboration",
    ],
  },
  {
    id: "edu-01",
    type: "Education",
    title: "Bachelor of Technology (B.Tech)",
    organization: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    dateRange: "October 2022 – July 2026",
    description:
      "Degree in Information Technology. Built foundational knowledge in software engineering, algorithms, system architecture, and data structures. Developed full-stack applications as capstone projects.",
    skills: [
      "Information Technology",
      "Computer Science Fundamentals",
      "Data Structures",
      "Algorithms",
    ],
  },
  {
    id: "rec-01",
    type: "Recognition",
    title: "Winner — Framework 1.0 Hackathon",
    organization: "Flutter Kanpur",
    description: "Won the Framework 1.0 Hackathon organized by Flutter Kanpur.",
    skills: [],
  },
  {
    id: "rec-02",
    type: "Recognition",
    title: "Best Oral Presentation — ICSCIS",
    organization: "International Conference on Smart Computing and Intelligent Systems",
    description:
      "Awarded Best Oral Presentation at the International Conference on Smart Computing and Intelligent Systems (ICSCIS).",
    skills: [],
  },
  {
    id: "rec-03",
    type: "Recognition",
    title: "Top 10% — CodeQuezt Coding Challenge",
    organization: "CodeQuezt",
    description: "Placed in the top 10% among 500+ participants in the CodeQuezt Coding Challenge.",
    skills: [],
  },
]
