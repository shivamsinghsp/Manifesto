"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import { LabFrame, chipBtn } from "./LabFrame"

const STAGES = ["Pending", "Reviewed", "Shortlisted"] as const
type Stage = (typeof STAGES)[number]

interface Card {
  id: string
  name: string
  role: string
  stage: Stage
}

// Synthetic candidates only.
const START: Card[] = [
  { id: "c1", name: "Candidate A", role: "Frontend Developer", stage: "Pending" },
  { id: "c2", name: "Candidate B", role: "HR Executive", stage: "Pending" },
  { id: "c3", name: "Candidate C", role: "Backend Developer", stage: "Reviewed" },
  { id: "c4", name: "Candidate D", role: "QA Analyst", stage: "Shortlisted" },
]

/** Shynr's ATS pipeline (Pending → Reviewed → Shortlisted). Drag cards or use the arrow buttons. */
export function AtsBoard() {
  const [cards, setCards] = useState(START)
  const [log, setLog] = useState<string>("")
  const [dragId, setDragId] = useState<string | null>(null)

  const move = (id: string, to: Stage) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, stage: to } : c)))
    const c = cards.find((x) => x.id === id)
    if (c && c.stage !== to) setLog(`${c.name}: ${c.stage} → ${to} · status email queued (model)`)
  }

  return (
    <LabFrame
      file="ats-pipeline.tsx"
      note="Model with synthetic candidates. The three stages match Shynr's ATS pipeline, where status changes trigger Nodemailer updates."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {STAGES.map((stage, si) => (
          <section
            key={stage}
            aria-label={`${stage} column`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dragId && move(dragId, stage)}
            className="min-h-[160px] rounded-xl border border-dashed border-border bg-surface-alt/50 p-3"
          >
            <h3 className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              {stage}
              <span>{cards.filter((c) => c.stage === stage).length}</span>
            </h3>
            <ul className="grid gap-2">
              {cards
                .filter((c) => c.stage === stage)
                .map((c) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    onDragEnd={() => setDragId(null)}
                    className="cursor-grab rounded-lg border border-border bg-surface p-3 shadow-sm active:cursor-grabbing"
                  >
                    <p className="text-sm font-medium text-text">{c.name}</p>
                    <p className="font-mono text-[11px] text-text-tertiary">{c.role}</p>
                    <div className="mt-2 flex gap-1.5">
                      <button
                        type="button"
                        className={`${chipBtn} min-h-[32px] px-2`}
                        disabled={si === 0}
                        onClick={() => move(c.id, STAGES[si - 1])}
                        aria-label={`Move ${c.name} back to ${STAGES[si - 1] ?? stage}`}
                      >
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`${chipBtn} min-h-[32px] px-2`}
                        disabled={si === STAGES.length - 1}
                        onClick={() => move(c.id, STAGES[si + 1])}
                        aria-label={`Advance ${c.name} to ${STAGES[si + 1] ?? stage}`}
                      >
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-3 min-h-[1.25rem] font-mono text-xs text-accent-text" aria-live="polite">
        {log}
      </p>
    </LabFrame>
  )
}
