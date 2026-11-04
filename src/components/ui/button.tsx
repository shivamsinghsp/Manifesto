import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cvaButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonVariants = Object.assign(cvaButtonVariants, {
  primary: "bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.25)]",
  secondary: "bg-white/[0.04] text-white border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 shadow-sm",
  ghost: "bg-transparent text-slate-400 hover:text-white p-0",
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cvaButtonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(cvaButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export const buttonBaseStyles = "group relative inline-flex items-center justify-center font-mono font-medium text-[12px] uppercase tracking-wider leading-none transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl overflow-hidden [&>*]:relative [&>*]:z-10 shadow-md active:scale-[0.98]"

export const buttonSizes = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-7 text-[12px]",
  lg: "h-12 px-9 text-[13px]",
}

export { Button, buttonVariants }
