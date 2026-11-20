import { skillGroups, type SkillGroup } from "./skills"

/**
 * Capability nodes orbiting the hero engine. Every `detail` is built from entries in
 * skills.ts (see capabilities.test.ts), so the scene can't claim a technology the
 * stack section doesn't list.
 */
export interface Capability {
  id: string
  label: string
  detail: string
}

const items = (id: SkillGroup["id"]) => skillGroups.find((g) => g.id === id)?.items ?? []
const all = skillGroups.flatMap((g) => g.items)
const pick = (...names: string[]) => names.filter((n) => all.includes(n)).join(" · ")

export const capabilities: Capability[] = [
  { id: "interfaces", label: "Interfaces", detail: items("frontend").slice(0, 3).join(" · ") },
  { id: "services", label: "Services & APIs", detail: items("backend").slice(0, 3).join(" · ") },
  { id: "data", label: "Data", detail: items("database").slice(0, 3).join(" · ") },
  {
    id: "enterprise",
    label: "Enterprise platforms",
    detail: items("enterprise").slice(0, 3).join(" · "),
  },
  { id: "realtime", label: "Realtime", detail: pick("WebSockets", "Node.js") },
  { id: "voice-ai", label: "Voice AI", detail: pick("Hume AI EVI") },
].filter((c) => c.detail.length > 0)
