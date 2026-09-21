import { Metadata } from "next"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume — Shivam Singh",
  description: "Download my professional resume.",
}

export default function ResumePage() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center border-b border-border py-24">
      <div className="grid-container text-center">
        <div className="col-span-full lg:col-span-12 flex flex-col items-center">
          <span className="text-mono-label text-text-tertiary mb-6 block uppercase">{`// CURRICULUM_VITAE`}</span>
          <h1 className="text-display mb-6">Resume</h1>
          <p className="text-body-large text-text-secondary max-w-lg mx-auto mb-12">
            A comprehensive overview of my professional experience, education, and technical skills.
          </p>
          
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-body font-semibold text-[14px] leading-[1.4] tracking-[0.5px] rounded-button h-12 px-8 bg-cta-bg text-cta-text hover:bg-cta-hover transition-colors gap-2 group"
          >
            Download PDF
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
