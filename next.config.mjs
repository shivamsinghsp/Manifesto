/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
]

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Largest rendered image is the 1440px case-study hero (≈2× on retina tablets).
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [256, 384, 480],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'inline; filename="Shivam-Singh-Resume.pdf"' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: "/manifesto", destination: "/about", permanent: true },
      { source: "/labs", destination: "/playground", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/cv", destination: "/resume", permanent: true },
    ]
  },
}

export default nextConfig
