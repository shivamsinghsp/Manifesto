import { Metadata } from "next"
import NextLink from "next/link"

export const metadata: Metadata = {
  title: "404 Not Found — Shivam Singh",
}

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center border-b border-border py-24 bg-surface">
      <div className="grid-container text-center">
        <div className="col-span-full lg:col-span-12 flex flex-col items-center">
          <span className="text-mono-label text-accent mb-6 block uppercase">{`// ERROR_404`}</span>
          <h1 className="text-display mb-6">Page Not Found</h1>
          <p className="text-body-large text-text-secondary max-w-lg mx-auto mb-12">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          
          <NextLink 
            href="/" 
            className="inline-flex items-center justify-center font-body font-semibold text-[14px] leading-[1.4] tracking-[0.5px] rounded-button h-11 px-6 bg-transparent text-text border border-border hover:border-accent hover:text-accent hover:bg-accent-muted transition-colors"
          >
            Return Home
          </NextLink>
        </div>
      </div>
    </section>
  )
}
