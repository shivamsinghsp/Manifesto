import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "ghost"
export type ButtonSize = "sm" | "md" | "lg"

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-mono font-medium uppercase leading-none tracking-wider transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cta-bg text-cta-text shadow-[0_4px_16px_rgba(255,255,255,0.12)] hover:bg-cta-hover hover:shadow-[0_6px_28px_rgba(0,229,255,0.28)]",
  secondary:
    "border border-white/10 bg-white/[0.04] text-text hover:border-accent/50 hover:bg-accent/10 hover:text-accent-hover",
  ghost: "text-text-secondary hover:text-text",
}

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-4 text-[11px]",
  md: "min-h-[48px] px-7 text-xs",
  lg: "min-h-[52px] px-9 text-[13px]",
}

/** Class string for button-styled links and buttons. */
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
