import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const buttonBaseStyles = "group relative inline-flex items-center justify-center font-mono font-medium text-[12px] uppercase tracking-wider leading-none transition-all duration-300 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-none overflow-hidden [&>*]:relative [&>*]:z-10"

export const buttonVariants = {
  primary: "bg-cta-bg text-cta-text hover:text-black focus-visible:outline-text before:absolute before:inset-0 before:bg-white before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100",
  secondary: "bg-transparent text-text border border-border focus-visible:outline-border before:absolute before:inset-0 before:bg-text before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:text-bg",
  ghost: "bg-transparent text-text-secondary hover:text-text p-0 focus-visible:outline-text",
}

export const buttonSizes = {
  sm: "h-8 px-4",
  md: "h-12 px-8",
  lg: "h-14 px-10",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const appliedSize = variant === "ghost" ? "" : buttonSizes[size]

    return (
      <button
        className={cn(buttonBaseStyles, buttonVariants[variant], appliedSize, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
