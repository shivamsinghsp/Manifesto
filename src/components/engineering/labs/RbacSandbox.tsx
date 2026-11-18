"use client"

import { Check, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LabFrame, chipBtn } from "./LabFrame"

// Shynr's real role levels. The permission mapping below is an illustrative example.
const ROLES = [
  { name: "Super Admin", level: 100 },
  { name: "Sub Admin", level: 50 },
  { name: "Employee", level: 20 },
  { name: "User", level: 10 },
] as const

const ACTIONS = [
  { label: "Browse job listings", required: 10 },
  { label: "Apply to a job", required: 10 },
  { label: "Mark attendance", required: 20 },
  { label: "Request leave", required: 20 },
  { label: "Approve leave requests", required: 50 },
  { label: "Manage job postings", required: 50 },
  { label: "Manage users and roles", required: 100 },
  { label: "Configure office locations", required: 100 },
]

/** Numeric RBAC: access is granted when role level ≥ required level. */
export function RbacSandbox() {
  const [role, setRole] = useState<(typeof ROLES)[number]>(ROLES[2])
  const allowed = ACTIONS.filter((a) => role.level >= a.required).length
  return (
    <LabFrame
      file="rbac.ts"
      note="Model. The four role levels are Shynr's; the action → level mapping is an illustrative example. Rule: allow ⇔ role.level ≥ action.required."
    >
      <div role="radiogroup" aria-label="Signed-in role" className="mb-5 flex flex-wrap gap-2">
        {ROLES.map((r) => (
          <button
            key={r.name}
            type="button"
            role="radio"
            aria-checked={role.name === r.name}
           
            onClick={() => setRole(r)}
            className={chipBtn}
          >
            {r.name} <span className="text-text-tertiary">{r.level}</span>
          </button>
        ))}
      </div>
      <p className="mb-3 font-mono text-xs text-text-secondary" aria-live="polite">
        {role.name} ({role.level}) can perform {allowed} of {ACTIONS.length} actions
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {ACTIONS.map((a) => {
          const ok = role.level >= a.required
          return (
            <li
              key={a.label}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                ok
                  ? "border-success/40 bg-success/10 text-text"
                  : "border-border text-text-tertiary"
              )}
            >
              <span className="flex items-center gap-2">
                {ok ? (
                  <Check className="h-4 w-4 text-success" aria-hidden="true" />
                ) : (
                  <X className="h-4 w-4" aria-hidden="true" />
                )}
                {a.label}
                <span className="sr-only">{ok ? "(allowed)" : "(denied)"}</span>
              </span>
              <code className="font-mono text-[11px] text-text-tertiary">
                {role.level} ≥ {a.required}
              </code>
            </li>
          )
        })}
      </ul>
    </LabFrame>
  )
}
