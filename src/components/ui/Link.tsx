import NextLink from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Inline call-to-action link with an arrow. */
export function CtaLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <NextLink
      href={href}
      className={cn(
        "text-label group inline-flex min-h-[44px] items-center gap-2 text-accent transition-colors duration-200 hover:text-accent-hover",
        className
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </NextLink>
  )
}
