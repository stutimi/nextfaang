import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    // Load theme preference on mount or default to dark
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme === 'light' ? false : true; // Default to dark if no preference
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newIsDark = !isDark;
    
    if (newIsDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setIsDark(newIsDark);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="gap-2"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4" />
          Light
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Dark
        </>
      )}
    </Button>
  );
};