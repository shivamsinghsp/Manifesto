import { mailto, site } from "@/content/site"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/** The one way to link to Shivam's email. Never opens a new tab. */
export function EmailLink({ children, className, subject }: { children?: ReactNode; className?: string; subject?: string }) {
  return (
    <a href={mailto(subject)} className={cn(className)}>
      {children ?? site.email}
    </a>
  )
}
