import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "floating" | "modern"
  label?: string
  error?: string
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", label, error, success, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
      props.onBlur?.(e)
    }

    const baseClasses = "flex h-12 w-full rounded-xl border-2 bg-background/50 backdrop-blur-sm px-4 py-3 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"

    const variants = {
      default: cn(
        baseClasses,
        "border-border/60 hover:border-border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
        error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        success && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20"
      ),
      floating: cn(
        baseClasses,
        "border-border/40 hover:border-border/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 pt-6 pb-2",
        error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        success && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20"
      ),
      modern: cn(
        baseClasses,
        "border-0 bg-muted/50 hover:bg-muted/70 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0 shadow-sm hover:shadow-md focus-visible:shadow-lg",
        error && "bg-red-50 dark:bg-red-900/20 focus-visible:ring-red-500/30",
        success && "bg-green-50 dark:bg-green-900/20 focus-visible:ring-green-500/30"
      )
    }

    if (variant === "floating" && label) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(variants[variant], className)}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          <motion.label
            className={cn(
              "absolute left-4 text-sm font-medium pointer-events-none transition-all duration-300",
              isFocused || hasValue || props.value
                ? "top-2 text-xs text-primary"
                : "top-1/2 -translate-y-1/2 text-muted-foreground"
            )}
            animate={{
              y: isFocused || hasValue || props.value ? -8 : 0,
              scale: isFocused || hasValue || props.value ? 0.85 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-foreground/80">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(variants[variant], className)}
          ref={ref}
          {...props}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
        {success && !error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-500 font-medium"
          >
            Input is valid
          </motion.p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
