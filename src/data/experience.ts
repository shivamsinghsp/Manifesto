export interface Experience {
  id: string;
  type: "Work" | "Education";
  title: string;
  organization: string;
  dateRange?: string; // Optional to safely omit dates
  description: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-01",
    type: "Work",
    title: "Software Engineering Intern",
    organization: "Rapsora Technologies Private Limited",
    dateRange: "January 2026 – June 2026",
    description: "Built Shynr — a full-stack HRMS and job portal (Next.js 15, React 19, MongoDB, NextAuth.js) as the sole developer, including GPS-based geofencing attendance with Haversine distance validation and a role-based access control system. Also contributed to AaoSeekhe.in as a solo full-stack developer, building responsive interfaces, animated components, serverless API routes with Zod validation, XSS sanitization, and SMTP email workflows.",
    skills: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth.js", "REST APIs", "Geofencing"]
  },
  {
    id: "exp-02",
    type: "Work",
    title: "Web Developer Intern",
    organization: "Androcoders",
    dateRange: "May 2025 – July 2025",
    description: "Developed and maintained 15+ web pages using Sitecore CMS for the Crowe Oman client. Built reusable UI components, responsive layouts, and CMS-driven page structures while collaborating closely with the development team.",
    skills: ["React", "Sitecore CMS", "JavaScript", "HTML/CSS", "Responsive Design"]
  },
  {
    id: "edu-01",
    type: "Education",
    title: "Bachelor of Technology (B.Tech)",
    organization: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
    dateRange: "October 2022 – July 2026",
    description: "Degree in Information Technology. Built foundational knowledge in software engineering, algorithms, and data structures. Developed full-stack applications as capstone projects.",
    skills: ["Information Technology", "Computer Science Fundamentals", "Data Structures", "Algorithms"]
  }
];
