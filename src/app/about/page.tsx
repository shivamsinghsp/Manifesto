import { Metadata } from "next"
import { Reveal } from "@/components/ui/Reveal"

export const metadata: Metadata = {
  title: "Manifesto — Shivam Singh",
  description: "My background, philosophy, and approach to software engineering.",
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 border-b border-border bg-atmosphere relative">
        <div className="grid-container relative z-10">
          <div className="col-span-full lg:col-span-10">
            <Reveal delay={100} direction="up">
              <span className="text-mono-label text-text-tertiary mb-8 block tracking-widest">{`// 03. MANIFESTO`}</span>
            </Reveal>
            <Reveal delay={300} direction="up">
              <h1 className="text-[clamp(3rem,8vw,120px)] font-display font-light leading-[1.05] tracking-tight mb-12">
                Systems <br />
                <span className="italic text-text-secondary">over</span> <br />
                Symptoms.
              </h1>
            </Reveal>
            <Reveal delay={500} direction="up">
              <p className="text-[clamp(1.2rem,2vw,24px)] text-text-secondary max-w-3xl leading-relaxed">
                I am a Full-Stack Engineer who believes that the best software is invisible—it simply works, getting out of the way so users can accomplish their goals.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      </section>

      <section className="py-24 md:py-32 border-b border-border">
        <div className="grid-container grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-8">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <Reveal direction="none">
              <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0">
                <h2 className="text-mono-label text-text-tertiary">{`// 01. THE JOURNEY`}</h2>
                <h3 className="text-display-secondary text-[2rem] mt-2 italic">The Journey</h3>
              </div>
            </Reveal>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-7">
            <Reveal delay={200} direction="up">
              <p className="text-[1.1rem] md:text-[1.25rem] text-text-secondary leading-[1.8] mb-12 font-light">
                I&apos;m interested in the engineering behind products that need to work reliably at scale. I enjoy turning complex requirements into clear systems, building practical interfaces, and improving the way people interact with technology. My work spans full-stack development, enterprise platforms, product engineering, and interactive web applications.
              </p>
            </Reveal>
            <Reveal delay={300} direction="up">
              <p className="text-[1.1rem] md:text-[1.25rem] text-text-secondary leading-[1.8] mb-12 font-light">
                I approach engineering with a systems mindset: understand the problem first, simplify where possible, and build solutions that are maintainable rather than merely functional. I’m particularly interested in backend architecture, APIs, developer tooling, and products that solve real operational problems.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 border-b border-border bg-surface">
        <div className="grid-container grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-8">
          <div className="col-span-full md:col-span-4 lg:col-span-3">
            <Reveal direction="none">
              <div className="md:sticky top-24 md:border-t border-b md:border-b-0 border-border md:pt-4 pb-4 md:pb-0 mb-8 md:mb-0">
                <h2 className="text-mono-label text-text-tertiary">{`// 02. PHILOSOPHY`}</h2>
                <h3 className="text-display-secondary text-[2rem] mt-2 italic">Philosophy</h3>
              </div>
            </Reveal>
          </div>
          <div className="col-span-full md:col-span-8 lg:col-span-7">
            
            <Reveal direction="up">
              <div className="mb-32 border-l border-border pl-8 relative group" style={{ perspective: "var(--perspective-standard)" }}>
                <div className="absolute left-[-4px] top-2 w-[7px] h-[7px] bg-text transition-all duration-[600ms] group-hover:bg-accent group-hover:scale-150" />
                <h3 className="text-display-secondary text-[2.5rem] text-text mb-6">Robust Systems</h3>
                <p className="text-[1.1rem] md:text-[1.25rem] text-text-secondary leading-[1.8] font-light max-w-2xl">
                  I prefer fixing root causes over patching symptoms. A well-designed system architecture prevents entire classes of bugs from ever existing.
                </p>
              </div>
            </Reveal>
            
            <Reveal direction="up">
              <div className="mb-32 border-l border-border pl-8 relative group" style={{ perspective: "var(--perspective-standard)" }}>
                <div className="absolute left-[-4px] top-2 w-[7px] h-[7px] bg-text transition-all duration-[600ms] group-hover:bg-accent group-hover:scale-150" />
                <h3 className="text-display-secondary text-[2.5rem] text-text mb-6">Performance is Accessibility</h3>
                <p className="text-[1.1rem] md:text-[1.25rem] text-text-secondary leading-[1.8] font-light max-w-2xl">
                  A fast website isn&apos;t a luxury; it&apos;s a requirement for global accessibility. I optimize for Core Web Vitals because speed directly impacts the user experience.
                </p>
              </div>
            </Reveal>
            
            <Reveal direction="up">
              <div className="border-l border-border pl-8 relative group" style={{ perspective: "var(--perspective-standard)" }}>
                <div className="absolute left-[-4px] top-2 w-[7px] h-[7px] bg-text transition-all duration-[600ms] group-hover:bg-accent group-hover:scale-150" />
                <h3 className="text-display-secondary text-[2.5rem] text-text mb-6">Content is the Interface</h3>
                <p className="text-[1.1rem] md:text-[1.25rem] text-text-secondary leading-[1.8] font-light max-w-2xl">
                  Design should support the content, not overshadow it. I build interfaces that get out of the way and let the core information shine.
                </p>
              </div>
            </Reveal>
            
          </div>
        </div>
      </section>
    </>
  )
}
