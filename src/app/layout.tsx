import type { Metadata } from "next";
import { IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivamsingh.dev"),
  title: {
    default: "Shivam Singh — Software Engineer",
    template: "%s | Shivam Singh",
  },
  description: "Full-stack engineer building web applications, enterprise platforms, and interactive digital products. Next.js, React, TypeScript, MongoDB, SharePoint.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shivam Singh — Portfolio",
    title: "Shivam Singh — Software Engineer",
    description: "Full-stack engineer building web applications, enterprise platforms, and interactive digital products.",
    url: "https://shivamsingh.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Singh — Software Engineer",
    description: "Full-stack engineer building web applications, enterprise platforms, and interactive digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// JSON-LD Structured Data
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Shivam Singh — Portfolio",
        url: "https://shivamsingh.dev",
        description: "Full-stack engineer building web applications, enterprise platforms, and interactive digital products.",
      },
      {
        "@type": "Person",
        name: "Shivam Singh",
        url: "https://shivamsingh.dev",
        jobTitle: "Software Engineer",
        description: "Full-stack engineer specializing in Next.js, React, TypeScript, MongoDB, and SharePoint.",
        sameAs: [
          "https://github.com/shivamsinghsp",
          "https://www.linkedin.com/in/shivam2105-",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSerif.variable} ${ibmPlexMono.variable}`}>
        <JsonLd />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
