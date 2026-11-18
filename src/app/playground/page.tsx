import { GeoLab } from "@/components/engineering/playgrounds/GeoLab"
import { RbacSandbox } from "@/components/engineering/labs/RbacSandbox"
import { AtsBoard } from "@/components/engineering/labs/AtsBoard"
import { QaStateMachine } from "@/components/engineering/labs/QaStateMachine"
import { RateLimiterLab } from "@/components/engineering/labs/RateLimiterLab"
import { pageMetadata } from "@/lib/seo"
import { independentProjects, periodLabel } from "@/content/career"

const hume = independentProjects.find((p) => p.slug === "hume-voice-assistant")!

export const metadata = pageMetadata({
  title: "Engineering Playground",
  description:
    "Interactive models of systems Shivam Singh has built: a 3D geofencing lab, an RBAC sandbox, an ATS pipeline board, a QA state-machine simulator and a rate-limiter visualiser.",
  path: "/playground",
})

export default function PlaygroundPage() {
  return (
    <article className="pb-16">
      <header className="bg-blueprint border-b border-border py-16 md:py-24">
        <div className="container-x">
          <p className="text-mono-label mb-6 text-text-tertiary">{"// ENGINEERING_PLAYGROUND"}</p>
          <h1 className="text-display mb-8">Interactive models</h1>
          <p className="text-body-large max-w-3xl text-text-secondary">
            These are not production systems. They are lightweight interactive models demonstrating
            the concepts, algorithms, and logic behind systems I have actually built.
          </p>
        </div>
      </header>

      <section aria-labelledby="geo-h" className="section-y border-b border-border">
        <div className="container-x">
          <div className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// MODEL_01"}</p>
              <span className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-hover">
                Interactive model
              </span>
            </div>
            <h2 id="geo-h" className="text-display-secondary mb-4">
              Geofencing lab
            </h2>
            <p className="text-body-large max-w-3xl text-text-secondary">
              Shynr validates attendance by comparing an employee&apos;s browser location against
              configured company locations with the Haversine formula. This model runs the same
              check on a 3D map of a reference office in Kanpur.
            </p>
          </div>
          <GeoLab />
        </div>
      </section>

      <section aria-labelledby="rbac-h" className="section-y border-b border-border bg-surface/60">
        <div className="container-x">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// MODEL_02"}</p>
              <span className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-text">
                Interactive model
              </span>
            </div>
            <h2 id="rbac-h" className="text-display-secondary mb-4">
              RBAC sandbox
            </h2>
            <p className="text-body-large max-w-3xl text-text-secondary">
              Shynr authorises with a numeric role hierarchy, so every permission check is one
              comparison. Switch roles and watch the access table change.
            </p>
          </div>
          <RbacSandbox />
        </div>
      </section>

      <section aria-labelledby="ats-h" className="section-y border-b border-border">
        <div className="container-x">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// MODEL_03"}</p>
              <span className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-text">
                Interactive model
              </span>
            </div>
            <h2 id="ats-h" className="text-display-secondary mb-4">
              ATS pipeline board
            </h2>
            <p className="text-body-large max-w-3xl text-text-secondary">
              Shynr&apos;s applicant tracking moves candidates from Pending to Reviewed to Shortlisted.
              Drag a card, or use its arrow buttons from the keyboard.
            </p>
          </div>
          <AtsBoard />
        </div>
      </section>

      <section aria-labelledby="qa-h" className="section-y border-b border-border bg-surface/60">
        <div className="container-x">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// MODEL_04"}</p>
              <span className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-text">
                Interactive model
              </span>
            </div>
            <h2 id="qa-h" className="text-display-secondary mb-4">
              QA state-machine simulator
            </h2>
            <p className="text-body-large max-w-3xl text-text-secondary">
              In PLEDGE QA every transition was tried as every role, and only legal (state, role)
              pairs may pass. Try to break it.
            </p>
          </div>
          <QaStateMachine />
        </div>
      </section>

      <section aria-labelledby="rate-h" className="section-y border-b border-border">
        <div className="container-x">
          <div className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// MODEL_05"}</p>
              <span className="rounded border border-accent/30 bg-accent/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-text">
                Interactive model
              </span>
            </div>
            <h2 id="rate-h" className="text-display-secondary mb-4">
              Rate-limiter visualiser
            </h2>
            <p className="text-body-large max-w-3xl text-text-secondary">
              The contact form on this site allows five messages per window per IP. This runs the
              same fixed-window algorithm, sped up.
            </p>
          </div>
          <RateLimiterLab />
        </div>
      </section>

      <section aria-labelledby="voice-h" className="section-y border-b border-border bg-surface/60">
        <div className="container-x">
          <div className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-mono-label text-text-tertiary">{"// EXPERIMENT_06"}</p>
              <span className="rounded border border-border bg-surface-alt px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                Experiment
              </span>
            </div>
            <h2 id="voice-h" className="text-display-secondary">
              Real-time AI voice assistant
            </h2>
          </div>

          <div className="max-w-4xl rounded-2xl border border-border bg-surface/90 p-6 shadow-2xl md:p-8">
            <dl className="mb-6 flex flex-wrap gap-8 border-b border-border pb-6">
              <div>
                <dt className="mb-1 font-mono text-[11px] uppercase text-text-tertiary">
                  Timeline
                </dt>
                <dd className="text-sm text-text">{periodLabel(hume.period)}</dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-[11px] uppercase text-text-tertiary">Role</dt>
                <dd className="text-sm text-text">{hume.role}</dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-[11px] uppercase text-text-tertiary">
                  Protocol
                </dt>
                <dd className="font-mono text-sm text-accent-hover">WebSocket full-duplex</dd>
              </div>
            </dl>
            <p className="text-body-large mb-6 max-w-2xl text-text-secondary">
              An emotion-aware voice assistant built using Hume AI&apos;s Empathic Voice Interface
              (EVI) API, enabling real-time bidirectional voice interaction, live transcription, and
              emotional-cue detection through WebSocket streaming.
            </p>
            <ul className="mb-8 flex flex-wrap gap-2">
              {["React.js", "TypeScript", "Hume AI", "EVI API", "WebSockets"].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-chip px-3 py-1 font-mono text-xs text-text-secondary"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="relative overflow-hidden rounded-xl border border-border bg-chip p-6">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-hover">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-hover" />{" "}
                Streaming pipeline
              </h3>
              <ol className="space-y-2 font-mono text-xs leading-relaxed text-text-secondary">
                <li>
                  <span className="text-accent-hover">01.</span> Browser microphone audio capture
                  (PCM stream)
                </li>
                <li aria-hidden="true" className="pl-6 text-accent/70">
                  ↓ low-latency WebSocket transport
                </li>
                <li>
                  <span className="text-accent-hover">02.</span> Hume AI EVI server pipeline
                </li>
                <li aria-hidden="true" className="pl-6 text-accent/70">
                  ↓ bidirectional audio + prosody analysis
                </li>
                <li>
                  <span className="text-accent-hover">03.</span> Live transcription + prosodic
                  emotion vector streaming
                </li>
                <li aria-hidden="true" className="pl-6 text-accent/70">
                  ↓ client state synthesis
                </li>
                <li>
                  <span className="text-accent-hover">04.</span> Real-time UI visualizer &
                  synthesized empathic speech
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
