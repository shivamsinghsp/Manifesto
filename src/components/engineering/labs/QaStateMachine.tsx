"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { LabFrame, chipBtn } from "./LabFrame"

type State = "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected"
type Role = "Applicant" | "Approver" | "Admin"

const STATES: State[] = ["Draft", "Submitted", "Under Review", "Approved", "Rejected"]

interface Action {
  label: string
  from: State
  to: State
  by: Role
}

const ACTIONS: Action[] = [
  { label: "Submit application", from: "Draft", to: "Submitted", by: "Applicant" },
  { label: "Start review", from: "Submitted", to: "Under Review", by: "Approver" },
  { label: "Approve", from: "Under Review", to: "Approved", by: "Approver" },
  { label: "Reject with remarks", from: "Under Review", to: "Rejected", by: "Approver" },
]

/**
 * The kind of check run in PLEDGE QA: every transition is tried as every role,
 * and only the legal (state, role) pairs may succeed.
 */
export function QaStateMachine() {
  const [state, setState] = useState<State>("Draft")
  const [role, setRole] = useState<Role>("Applicant")
  const [log, setLog] = useState<{ ok: boolean; text: string }[]>([])

  const attempt = (a: Action) => {
    const ok = a.from === state && a.by === role
    const reason = ok
      ? `PASS  ${role}: ${a.from} → ${a.to}`
      : a.from !== state
        ? `BLOCKED  "${a.label}" is not valid from ${state}`
        : `BLOCKED  ${role} may not "${a.label}" (needs ${a.by})`
    if (ok) setState(a.to)
    setLog((l) => [{ ok, text: reason }, ...l].slice(0, 6))
  }

  return (
    <LabFrame
      file="qa-state-machine.test"
      note="Model with synthetic data, illustrating the role and state-transition checks performed during PLEDGE QA. Not the portal's code; I did not build the portal."
    >
      <ol className="mb-5 flex flex-wrap items-center gap-1.5" aria-label="Application states">
        {STATES.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <span
              aria-current={s === state ? "step" : undefined}
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[11px]",
                s === state
                  ? "border-accent bg-accent/10 text-accent-text"
                  : "border-border text-text-tertiary"
              )}
            >
              {s}
            </span>
            {i < 2 && (
              <span aria-hidden="true" className="text-text-tertiary">
                →
              </span>
            )}
            {i === 2 && (
              <span aria-hidden="true" className="text-text-tertiary">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
            Act as
          </p>
          <div role="radiogroup" aria-label="Acting role" className="mb-4 flex flex-wrap gap-2">
            {(["Applicant", "Approver", "Admin"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={role === r}

                onClick={() => setRole(r)}
                className={chipBtn}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
            Try a transition
          </p>
          <div className="grid gap-2">
            {ACTIONS.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => attempt(a)}
                className={`${chipBtn} justify-start`}
              >
                {a.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setState("Draft")
                setLog([])
              }}
              className={`${chipBtn} justify-start text-text-tertiary`}
            >
              Reset to Draft
            </button>
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
            Test log
          </p>
          <ul
            aria-live="polite"
            className="min-h-[180px] space-y-1.5 rounded-lg border border-border bg-surface-alt/60 p-3 font-mono text-[12px]"
          >
            {log.length === 0 && <li className="text-text-tertiary">No attempts yet.</li>}
            {log.map((l, i) => (
              <li key={i} className={l.ok ? "text-success" : "text-error"}>
                {l.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LabFrame>
  )
}
