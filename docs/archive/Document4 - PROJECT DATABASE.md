DOCUMENT 04: PROJECT DATABASE
STRUCTURED PROJECT SPECIFICATIONS

Version: 1.0
Format: Implementation-ready project data
Status: Being populated with verified information

PROJECT DATA STRUCTURE (Schema)
javascript
const projectSchema = {
  id: string,              // unique identifier (slug)
  name: string,            // project name
  type: string,            // Type (CMS, Platform, Tool, Academic, etc)
  category: string[],      // [Category, Role, Focus]
  tier: number,            // 1 (Flagship) | 2 (Strong) | 3 (Supporting)
  professional: boolean,   // true: production work | false: academic
  
  // Metadata
  duration: {
    start: string,         // YYYY-MM or YYYY-MM-DD [PLACEHOLDER]
    end: string | null,    // null if ongoing
  },
  
  role: string,            // Your specific role
  team: string | null,     // Team description or null if solo
  company: string,         // Company/Institution [PLACEHOLDER]
  
  // Content
  problem: string,         // The problem being solved
  objective: string,       // What were you trying to accomplish
  description: string,     // Overall project description
  context: string,         // Why it mattered
  
  // Implementation
  technologies: string[],  // [React, Node.js, MongoDB, ...]
  architecture: string,    // System architecture description
  approach: string,        // How you approached it
  
  // Outcomes
  result: string,          // What was built
  metrics: {               // ONLY verified metrics
    users: string | null,
    items: string | null,
    uptime: string | null,
    [key: string]: string | null,
  },
  learnings: string[],     // Key learnings
  
  // Shareable
  public: boolean,         // Can be shown publicly
  confidential: boolean,   // Contains confidential info
  
  // Assets
  assets: {
    hero: string | null,   // Hero image path or PLACEHOLDER
    screenshots: string[], // Screenshot paths
    diagrams: string[],    // Diagram paths
    additional: string[],  // Other media
  },
  
  // Links
  links: {
    live: string | null,
    github: string | null,
    case_study: boolean,
  },
  
  // Verification
  verified: boolean,       // All facts verified
  placeholders: string[],  // List of [PLACEHOLDER] items remaining
};
PROJECT 01: AAO SEEKHE CMS
javascript
{
  id: "aao-seekhe",
  name: "Aao Seekhe",
  type: "EdTech CMS Platform",
  category: ["CMS", "Full-Stack", "EdTech"],
  tier: 1,
  professional: true,
  
  duration: {
    start: "[PLACEHOLDER — VERIFY]",
    end: null, // ongoing
  },
  
  role: "[PLACEHOLDER — SPECIFY ROLE]",
  team: "[PLACEHOLDER — TEAM SIZE/NAMES]",
  company: "Aao Seekhe (EdTech)",
  
  problem: "Educational content scattered across systems, difficult to manage and access coherently",
  objective: "Build sophisticated CMS platform enabling efficient content management",
  description: "Content infrastructure for educational platform with hierarchical data model, publishing workflows, role-based permissions",
  context: "EdTech platforms need centralized content management at scale",
  
  technologies: [
    "React 18",
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "Cloudinary",
    "Vercel",
    "JWT"
  ],
  
  architecture: "Three-level hierarchy (Pages → Sections → Items). RESTful API layer. Flexible MongoDB schema. JWT authentication.",
  approach: "[PLACEHOLDER — DESCRIBE YOUR APPROACH]",
  
  result: "Live production platform managing [PLACEHOLDER] content items, serving [PLACEHOLDER] users",
  metrics: {
    users: "[PLACEHOLDER]",
    items: "[PLACEHOLDER]",
    uptime: "[PLACEHOLDER]",
    performance: "[PLACEHOLDER]",
  },
  
  learnings: [
    "Content model flexibility pays dividends in scalability",
    "Role-based permissions require careful planning",
    "Real-time collaboration introduces complex technical challenges",
    "Performance optimization needs early focus",
    "Documentation is as important as code",
  ],
  
  public: true,
  confidential: false,
  
  assets: {
    hero: "[PLACEHOLDER — AAO SEEKHE DASHBOARD SCREENSHOT]",
    screenshots: [
      "[PLACEHOLDER — FEATURE 1]",
      "[PLACEHOLDER — FEATURE 2]",
      "[PLACEHOLDER — MOBILE VIEW]",
    ],
    diagrams: [
      "content-model-diagram.svg",
      "publishing-workflow.svg",
      "system-architecture.svg",
      "database-schema.svg",
    ],
    additional: [],
  },
  
  links: {
    live: "aaoseekhe.in",
    github: "[PLACEHOLDER — IF PUBLIC]",
    case_study: true,
  },
  
  verified: false,
  placeholders: [
    "Exact start date",
    "End date or status",
    "Role specifics",
    "Team details",
    "Approach description",
    "User count",
    "Content item count",
    "Uptime percentage",
    "Performance metrics",
    "Screenshots",
  ],
}
PROJECT 02: SHAREPOINT KNOWLEDGE HUB
javascript
{
  id: "sharepoint-knowledge-hub",
  name: "SharePoint Knowledge Hub",
  type: "Enterprise Knowledge Platform",
  category: ["Documentation", "Information Architecture", "Enterprise"],
  tier: 2,
  professional: true,
  
  duration: {
    start: "[PLACEHOLDER]",
    end: "[PLACEHOLDER]",
  },
  
  role: "[PLACEHOLDER]",
  team: "[PLACEHOLDER]",
  company: "[PLACEHOLDER]",
  
  problem: "[PLACEHOLDER]",
  objective: "Centralize institutional knowledge and enable information discovery",
  description: "16-page structured knowledge platform organizing institutional content with professional presentation",
  context: "[PLACEHOLDER]",
  
  technologies: [
    "SharePoint",
    "[PLACEHOLDER — SPECIFY OTHERS]",
  ],
  
  architecture: "[PLACEHOLDER]",
  approach: "[PLACEHOLDER]",
  
  result: "Structured 16-page knowledge hub with clear information hierarchy and navigation",
  metrics: {
    users: null,
    items: null,
    uptime: null,
    performance: null,
  },
  
  learnings: [
    "[PLACEHOLDER]",
  ],
  
  public: "[PLACEHOLDER — VERIFY IF SHAREABLE]",
  confidential: "[PLACEHOLDER]",
  
  assets: {
    hero: "[PLACEHOLDER — IF SHAREABLE]",
    screenshots: ["[PLACEHOLDER — IF SHAREABLE]"],
    diagrams: ["[PLACEHOLDER — IF SHAREABLE]"],
    additional: [],
  },
  
  links: {
    live: null,
    github: null,
    case_study: true,
  },
  
  verified: false,
  placeholders: [
    "Confidentiality status",
    "Publicly shareable details",
    "Company name (if shareable)",
    "Role specifics",
    "Technologies",
    "Approach",
    "Impact metrics",
    "Screenshots/assets",
  ],
}
PROJECT 03: B.TECH PROJECT (CAMPUS CONNECT)
javascript
{
  id: "campus-connect",
  name: "[PLACEHOLDER — ACTUAL PROJECT NAME]",
  type: "Academic Final-Year Project",
  category: ["Academic", "[PLACEHOLDER — CATEGORY]", "[PLACEHOLDER]"],
  tier: 3,
  professional: false,
  
  duration: {
    start: "[PLACEHOLDER]",
    end: "[PLACEHOLDER]",
  },
  
  role: "[PLACEHOLDER — YOUR SPECIFIC ROLE]",
  team: "[PLACEHOLDER — SOLO OR GROUP?]",
  company: "ABC Institute of Technology [PLACEHOLDER]",
  
  problem: "[PLACEHOLDER]",
  objective: "[PLACEHOLDER]",
  description: "[PLACEHOLDER]",
  context: "Academic capstone project demonstrating fullstack development fundamentals",
  
  technologies: [
    "[PLACEHOLDER]",
  ],
  
  architecture: "[PLACEHOLDER]",
  approach: "[PLACEHOLDER]",
  
  result: "[PLACEHOLDER — WHAT WAS BUILT]",
  metrics: {
    users: null,
    items: null,
    uptime: null,
    performance: null,
  },
  
  learnings: [
    "[PLACEHOLDER]",
  ],
  
  public: "[PLACEHOLDER — SHAREABLE?]",
  confidential: false,
  
  assets: {
    hero: "[PLACEHOLDER — SCREENSHOT IF AVAILABLE]",
    screenshots: ["[PLACEHOLDER]"],
    diagrams: ["[PLACEHOLDER]"],
    additional: [],
  },
  
  links: {
    live: "[PLACEHOLDER — IF LIVE]",
    github: "[PLACEHOLDER — IF PUBLIC]",
    case_study: true,
  },
  
  verified: false,
  placeholders: [
    "Actual project name",
    "Project category",
    "All implementation details",
    "Problem description",
    "Technologies",
    "Architecture",
    "Results",
    "Learnings",
    "Screenshots",
  ],
}
PROJECT DATA LOAD PROCESS

When all projects are verified:

Create /data/projects.js or /data/projects.json
Export array of all project objects (schema-compliant)
Update verified: true only after all placeholders filled
Antigravity will load from this single source of truth
Homepage, work page, case studies all render from this data
