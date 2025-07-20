import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "glass" | "gradient" | "interactive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "rounded-2xl border border-border/60 bg-card/95 backdrop-blur-sm text-card-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 group relative overflow-hidden",
    elevated: "rounded-2xl border border-border/40 bg-card text-card-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 group relative overflow-hidden hover:scale-[1.02]",
    glass: "rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 dark:hover:bg-white/10 group relative overflow-hidden",
    gradient: "rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card/95 to-primary/5 text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 group relative overflow-hidden",
    interactive: "rounded-2xl border border-border/50 bg-card/90 backdrop-blur-sm text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card group relative overflow-hidden cursor-pointer active:scale-[0.98]"
  }

  return (
    <div
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-300",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
