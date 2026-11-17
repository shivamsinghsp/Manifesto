import type { Metadata } from "next"
import NextLink from "next/link"
import { buttonClass } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist or has moved.",
  robots: { index: false },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center border-b border-border bg-blueprint py-24">
      <div className="container-x flex flex-col items-center text-center">
        <p className="mb-6 text-mono-label text-accent-hover">{"// ERROR_404"}</p>
        <h1 className="mb-6 text-display">Page not found</h1>
        <p className="mx-auto mb-12 max-w-lg text-body-large text-text-secondary">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <NextLink href="/" className={buttonClass("primary")}>Return home</NextLink>
          <NextLink href="/work" className={buttonClass("secondary")}>Selected work</NextLink>
        </div>
      </div>
    </section>
  )
}
