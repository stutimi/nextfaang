import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:from-destructive/90 hover:to-destructive shadow-lg hover:shadow-xl hover:shadow-destructive/25 hover:-translate-y-0.5",
        outline:
          "border-2 border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 shadow-sm hover:shadow-lg",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/80 hover:to-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5",
        ghost: "hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 transition-all duration-200",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        premium: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:shadow-amber/30 hover:-translate-y-0.5 border border-amber-400/50",
        neon: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:shadow-cyan/30 hover:-translate-y-0.5 border border-cyan-400/50 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400/20 before:to-blue-400/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 hover:-translate-y-0.5 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-xl px-10 py-3 text-base",
        xl: "h-16 rounded-2xl px-12 py-4 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
