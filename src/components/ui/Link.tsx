import * as React from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
  variant?: "text" | "cta"
  href: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, variant = "text", href, ...props }, ref) => {
    
    if (variant === "cta") {
      return (
        <NextLink
          href={href}
          ref={ref}
          className={cn(
            "group inline-flex items-center gap-2 text-label text-text transition-all duration-300 hover:text-text-secondary focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-text",
            className
          )}
          {...props}
        >
          {children}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </NextLink>
      )
    }

    return (
      <NextLink
        href={href}
        ref={ref}
        className={cn(
          "text-text underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-text-secondary hover:decoration-text-secondary focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-text",
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)
Link.displayName = "Link"

export { Link }
