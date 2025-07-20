import { createContext, useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function EnhancedThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    let resolvedTheme: "dark" | "light"

    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    } else {
      resolvedTheme = theme
    }

    // Add transition class
    setIsTransitioning(true)
    root.classList.add("theme-transitioning")
    
    // Apply theme
    root.classList.add(resolvedTheme)
    setActualTheme(resolvedTheme)

    // Remove transition class after animation
    setTimeout(() => {
      root.classList.remove("theme-transitioning")
      setIsTransitioning(false)
    }, 300)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    actualTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <AnimatePresence mode="wait">
        <motion.div
          key={actualTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}