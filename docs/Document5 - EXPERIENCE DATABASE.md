DOCUMENT 05: EXPERIENCE DATABASE
STRUCTURED EXPERIENCE SPECIFICATIONS

Version: 1.0
Format: Implementation-ready experience data

EXPERIENCE DATA STRUCTURE
javascript
const experienceEntrySchema = {
  id: string,              // Unique identifier
  type: string,            // "education" | "internship" | "professional" | "project"
  
  title: string,           // Job title, degree, project name
  organization: string,    // Company, school, institution
  
  timeline: {
    start: string,         // YYYY-MM [PLACEHOLDER]
    end: string | null,    // null if ongoing
  },
  duration: string,        // "3 months" | "4 years" etc
  
  location: string | null, // City, country, or "remote"
  
  // Description
  role: string,            // Brief role description
  description: string,     // Detailed description
  responsibilities: string[],
  technologies: string[],
  
  // Outcomes
  key_contributions: string[],
  learnings: string[],
  
  // Visibility
  public: boolean,
  
  // Verification
  verified: boolean,
};
EXPERIENCE 01: B.TECH
javascript
{
  id: "btech",
  type: "education",
  
  title: "Bachelor of Technology",
  organization: "[PLACEHOLDER — INSTITUTION NAME]",
  
  timeline: {
    start: "2021-08", // [PLACEHOLDER]
    end: "2025-05",   // [PLACEHOLDER]
  },
  duration: "4 years",
  
  location: "India", // [PLACEHOLDER IF DIFFERENT]
  
  role: "Computer Science Student",
  description: "Undergraduate degree program focusing on computer science fundamentals.",
  
  responsibilities: [
    "Foundational coursework in data structures, algorithms, databases",
    "Software engineering principles and project management",
    "Web development and modern application building",
  ],
  
  technologies: [
    "[PLACEHOLDER — RELEVANT COURSEWORK TECHNOLOGIES]",
  ],
  
  key_contributions: [
    "[PLACEHOLDER]",
  ],
  
  learnings: [
    "Foundational computer science concepts",
    "Software development processes",
    "Collaborative project work",
  ],
  
  public: true,
  verified: false,
}
EXPERIENCE 02: INTERNSHIP 01
javascript
{
  id: "internship-01",
  type: "internship",
  
  title: "Web Development Intern",
  organization: "[PLACEHOLDER — COMPANY NAME]",
  
  timeline: {
    start: "2024-06", // Jun 2024 [VERIFY]
    end: "2024-09",   // Sep 2024 [VERIFY]
  },
  duration: "3 months",
  
  location: "[PLACEHOLDER]",
  
  role: "Web Development Intern",
  description: "[PLACEHOLDER — WHAT WAS THE ROLE?]",
  
  responsibilities: [
    "[PLACEHOLDER — ACTUAL TASKS]",
  ],
  
  technologies: [
    "[PLACEHOLDER — VERIFY WHICH ONES]",
  ],
  
  key_contributions: [
    "[PLACEHOLDER]",
  ],
  
  learnings: [
    "Production development workflows",
    "Real-world debugging and problem-solving",
    "[PLACEHOLDER]",
  ],
  
  public: "[PLACEHOLDER — IS THIS PUBLICLY SHAREABLE?]",
  verified: false,
}
EXPERIENCE 03: INTERNSHIP 02
javascript
{
  id: "internship-02",
  type: "internship",
  
  title: "Full-Stack Development Intern",
  organization: "[PLACEHOLDER — COMPANY NAME]",
  
  timeline: {
    start: "2024-10", // Oct 2024 [VERIFY]
    end: "2025-02",   // Feb 2025 [VERIFY]
  },
  duration: "4 months",
  
  location: "[PLACEHOLDER]",
  
  role: "Full-Stack Development Intern",
  description: "[PLACEHOLDER]",
  
  responsibilities: [
    "[PLACEHOLDER — ACTUAL TASKS]",
  ],
  
  technologies: [
    "[PLACEHOLDER — VERIFY]",
  ],
  
  key_contributions: [
    "[PLACEHOLDER]",
  ],
  
  learnings: [
    "Full-stack architecture thinking",
    "Backend systems and API design",
    "Database modeling and optimization",
    "[PLACEHOLDER]",
  ],
  
  public: "[PLACEHOLDER]",
  verified: false,
}
EXPERIENCE 04: CURRENT — REAL PRODUCT WORK
javascript
{
  id: "current-aao-seekhe",
  type: "professional",
  
  title: "Full-Stack Developer / CMS Developer",
  organization: "Aao Seekhe",
  
  timeline: {
    start: "2025-01", // [PLACEHOLDER]
    end: null,        // ongoing
  },
  duration: "ongoing",
  
  location: "Remote",
  
  role: "Building production CMS platform for EdTech company",
  description: "Designing and developing sophisticated content infrastructure for educational platform",
  
  responsibilities: [
    "Full-stack development",
    "CMS architecture design",
    "Database modeling",
    "[PLACEHOLDER]",
  ],
  
  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "[PLACEHOLDER]",
  ],
  
  key_contributions: [
    "[PLACEHOLDER]",
  ],
  
  learnings: [
    "Real-world product development",
    "Systems architecture at scale",
    "User-centered feature prioritization",
  ],
  
  public: true,
  verified: false,
}
EXPERIENCE 05: CURRENT — MBA
javascript
{
  id: "mba-manipal",
  type: "education",
  
  title: "Master of Business Administration (MBA)",
  organization: "Manipal University Jaipur",
  
  timeline: {
    start: "2026-01", // [PLACEHOLDER — START DATE]
    end: null,        // ongoing
  },
  duration: "ongoing",
  
  location: "Distance Learning",
  
  role: "MBA Student (Part-time)",
  description: "Pursuing MBA while actively developing products, deepening business and product thinking",
  
  responsibilities: [
    "Coursework in business fundamentals",
    "Strategic thinking",
    "Financial accounting and analysis",
  ],
  
  technologies: [],
  
  key_contributions: [],
  
  learnings: [
    "Business strategy and operations",
    "Product management thinking",
    "Financial literacy",
    "[PLACEHOLDER — CURRENT COURSEWORK]",
  ],
  
  public: true,
  verified: false,
}
EXPERIENCE DATA LOAD

When verified:

Create /data/experience.js
Export array of all experience objects (ordered chronologically)
Homepage timeline renders from this source
Experience page renders full expanded version from this source
Single source of truth — no content duplication