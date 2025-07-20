import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:via-primary/95 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:translate-y-0 border border-primary/20",
        destructive:
          "bg-gradient-to-r from-destructive via-destructive to-destructive/90 text-destructive-foreground hover:from-destructive/90 hover:via-destructive/95 hover:to-destructive shadow-lg hover:shadow-xl hover:shadow-destructive/30 hover:-translate-y-1 border border-destructive/20",
        outline:
          "border-2 border-primary/40 bg-background/90 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:text-primary hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-primary/10 text-foreground",
        secondary:
          "bg-gradient-to-r from-secondary via-secondary to-secondary/90 text-secondary-foreground hover:from-secondary/90 hover:via-secondary/95 hover:to-secondary shadow-md hover:shadow-lg hover:-translate-y-1 border border-secondary/20",
        ghost: "hover:bg-primary/10 hover:text-primary hover:-translate-y-1 transition-all duration-200 text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 p-0 h-auto",
        premium: "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:shadow-amber/40 hover:-translate-y-1 border border-amber-400/50 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-300/20 before:to-yellow-300/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        neon: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:shadow-cyan/40 hover:-translate-y-1 border border-cyan-400/50 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-300/30 before:to-blue-300/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        glass: "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-primary/10",
        success: "bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white shadow-lg hover:shadow-xl hover:shadow-green/40 hover:-translate-y-1 border border-green-400/50",
        warning: "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-orange/40 hover:-translate-y-1 border border-orange-400/50",
        info: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:shadow-blue/40 hover:-translate-y-1 border border-blue-400/50",
      },
      size: {
        default: "h-10 sm:h-11 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm",
        sm: "h-8 sm:h-9 rounded-lg px-3 sm:px-4 text-xs",
        lg: "h-12 sm:h-13 rounded-xl px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base",
        xl: "h-14 sm:h-16 rounded-2xl px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold",
        icon: "h-10 w-10 sm:h-11 sm:w-11",
        "icon-sm": "h-8 w-8 sm:h-9 sm:w-9 rounded-lg",
        "icon-lg": "h-12 w-12 sm:h-13 sm:w-13 rounded-xl",
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
