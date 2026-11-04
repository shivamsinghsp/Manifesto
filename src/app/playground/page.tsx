import { Metadata } from "next"
import { GeofencingLab } from "@/components/engineering/playgrounds/GeofencingLab"

export const metadata: Metadata = {
  title: "Engineering Playground",
  description: "Interactive engineering models and experiments based on production systems built by Shivam Singh.",
}

export default function PlaygroundPage() {
  return (
    <article className="pb-24">
      <header className="py-16 md:py-20 lg:py-24 border-b border-border bg-blueprint bg-fixed">
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

      <section className="py-16 md:py-24 lg:py-32 border-b border-border bg-bg relative overflow-hidden">
        <div className="grid-container relative z-10">
          <div className="col-span-full mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-mono-label text-text-tertiary">{`// MODEL_01`}</h2>
              <span className="text-[9px] font-mono text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 uppercase tracking-widest">Tier 1: Interactive</span>
            </div>
            <h3 className="text-display-secondary">Geospatial Validation</h3>
          </div>
          
          <div className="col-span-full">
            <GeofencingLab />
          </div>
        </div>
      </section>

      {/* Tier 3 Experiment: Real-Time AI Voice Assistant */}
      <section className="py-16 md:py-24 lg:py-32 border-b border-border bg-surface relative overflow-hidden">
        <div className="grid-container relative z-10">
          <div className="col-span-full mb-12">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-mono-label text-text-tertiary">{`// EXPERIMENT_02`}</h2>
              <span className="text-[9px] font-mono text-text-secondary border border-border bg-surface-alt px-2 py-0.5 uppercase tracking-widest">Tier 3: Experiment</span>
            </div>
            <h3 className="text-display-secondary">Real-Time AI Voice Assistant</h3>
          </div>

          <div className="col-span-full lg:col-span-8">
            <div className="rounded-2xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">TIMELINE</span>
                  <span className="text-sm font-medium text-white">July 2025</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">ROLE</span>
                  <span className="text-sm font-medium text-white">Solo Developer</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">PROTOCOL</span>
                  <span className="text-sm font-mono text-cyan-400">WebSocket Full-Duplex</span>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
                An emotion-aware voice assistant built using Hume AI&apos;s Empathic Voice Interface (EVI) API, enabling real-time bidirectional voice interaction, live transcription, and emotional-cue detection through WebSocket streaming.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["React.js", "TypeScript", "Hume AI", "EVI API", "WebSockets"].map(tag => (
                  <span key={tag} className="text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Conceptual Flow */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  STREAMING PIPELINE ARCHITECTURE
                </h4>
                <div className="font-mono text-xs leading-relaxed relative z-10 text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">01.</span> Browser Microphone Audio Capture (PCM Stream)
                  </div>
                  <div className="text-cyan-400/60 pl-6">↓ [Low-Latency WebSocket Transport]</div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">02.</span> Hume AI EVI Server Pipeline
                  </div>
                  <div className="text-cyan-400/60 pl-6">↓ [Bidirectional Audio + Prosody Analysis]</div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">03.</span> Live Transcription + Prosodic Emotion Vector Streaming
                  </div>
                  <div className="text-cyan-400/60 pl-6">↓ [Dynamic Client State Synthesis]</div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">04.</span> Real-Time UI Visualizer & Synthesized Empathic Speech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
