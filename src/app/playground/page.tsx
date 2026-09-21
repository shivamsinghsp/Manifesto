import { Metadata } from "next"
import { GeofencingLab } from "@/components/engineering/playgrounds/GeofencingLab"

export const metadata: Metadata = {
  title: "Engineering Playground — Shivam Singh",
  description: "Interactive engineering models based on production systems built by Shivam Singh.",
}

export default function PlaygroundPage() {
  return (
    <article className="pb-24">
      <header className="pt-32 pb-24 md:pt-48 md:pb-32 border-b border-border bg-blueprint bg-fixed">
        <div className="grid-container">
          <div className="col-span-full lg:col-span-8">
            <span className="text-mono-label text-text-tertiary mb-6 block uppercase">{`// ENGINEERING_PLAYGROUND`}</span>
            <h1 className="text-display mb-8">Interactive Models</h1>
            <p className="text-body-large text-text-secondary leading-relaxed">
              These are not production systems. They are lightweight interactive models demonstrating the concepts, algorithms, and logic behind systems I have actually built.
            </p>
          </div>
        </div>
      </header>

      <section className="py-24 border-b border-border bg-bg relative overflow-hidden">
        <div className="grid-container relative z-10">
          <div className="col-span-full mb-12">
            <h2 className="text-mono-label text-text-tertiary mb-3">{`// MODEL_01`}</h2>
            <h3 className="text-display-secondary">Geospatial Validation</h3>
          </div>
          
          <div className="col-span-full">
            <GeofencingLab />
          </div>
        </div>
      </section>
    </article>
  )
}
