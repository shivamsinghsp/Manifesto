import { Download, ExternalLink } from "lucide-react"
import { site } from "@/content/site"
import { buttonClass } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Resume",
  description: "Download or view Shivam Singh's resume (PDF): experience, projects, technical skills and education.",
  path: "/resume",
})

export default function ResumePage() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center border-b border-border py-24">
      <div className="container-x flex flex-col items-center text-center">
        <p className="mb-6 text-mono-label text-text-tertiary">{"// CURRICULUM_VITAE"}</p>
        <h1 className="mb-6 text-display">Resume</h1>
        <p className="mx-auto mb-12 max-w-lg text-body-large text-text-secondary">
          A one-page overview of my professional experience, projects, technical skills and education.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {/* Direct static links — no redirects or tracking */}
          <a href={site.resumePath} download="Shivam-Singh-Resume.pdf" className={buttonClass("primary")}>
            <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
          </a>
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open in browser<span className="sr-only"> (new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
