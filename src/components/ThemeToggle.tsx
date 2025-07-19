import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Loading theme...</span>
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 px-0 hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Monitor className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-popover border border-border rounded-md shadow-lg z-[100]">
          <div
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 rounded-lg transition-all duration-200"
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
          <div
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 rounded-lg transition-all duration-200"
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
          <div
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 rounded-lg transition-all duration-200"
          >
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </div>
        </div>
      )}
    </div>
  );
};