import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Sparkles,
  Sword,
  Book,
  Rocket,
  Star,
  Globe,
  Layout,
  Code,
  BookOpen,
  Users,
  Info,
  Home
} from "lucide-react";
import { toolsItems, type ToolItem } from "./navigationData";

// Hardcoded fallback data to bypass any import issues
const HARDCODED_TOOLS = [
  { label: "CP Arena", href: "/cp-arena", icon: "Sword", description: "Compete in coding battles", badge: "New" },
  { label: "Contest Analyzer", href: "/contest-analyzer", icon: "Sparkles", description: "Analyze your contest performance" },
  { label: "CP Dictionary", href: "/cp-dictionary", icon: "Book", description: "Learn competitive programming terms" },
  { label: "Language Translator", href: "/language-translation", icon: "Globe", description: "Translate code between programming languages", badge: "Live" },
  { label: "Tricks & Tips", href: "/cp-tricks-tips", icon: "Rocket", description: "Master advanced techniques" },
  { label: "DSA Mastery", href: "/dsa", icon: "Star", description: "Complete data structures guide" },
  { label: "System Design", href: "/system-design", icon: "Layout", description: "Master system design concepts", badge: "New" }
] as const;

// Debug hardcoded data
console.log('ToolsDropdown - HARDCODED_TOOLS defined:', HARDCODED_TOOLS);
console.log('ToolsDropdown - hardcoded first item:', HARDCODED_TOOLS[0]);

// Map icon strings to actual icon components
const toolIconMap = {
  Sword: Sword,
  Sparkles: Sparkles,
  Book: Book,
  Globe: Globe,
  Rocket: Rocket,
  Star: Star,
  Layout: Layout,
  Code: Code,
  BookOpen: BookOpen,
  Users: Users,
  Info: Info,
  Home: Home
};

// Custom dropdown implementation as fallback
export const ToolsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Create tools data inline to avoid any import/reference issues
  const safeToolsItems = [
    { label: "CP Arena", href: "/cp-arena", icon: "Sword", description: "Compete in coding battles", badge: "New" },
    { label: "Contest Analyzer", href: "/contest-analyzer", icon: "Sparkles", description: "Analyze your contest performance" },
    { label: "CP Dictionary", href: "/cp-dictionary", icon: "Book", description: "Learn competitive programming terms" },
    { label: "Language Translator", href: "/language-translation", icon: "Globe", description: "Translate code between programming languages", badge: "Live" },
    { label: "Tricks & Tips", href: "/cp-tricks-tips", icon: "Rocket", description: "Master advanced techniques" },
    { label: "DSA Mastery", href: "/dsa", icon: "Star", description: "Complete data structures guide" },
    { label: "System Design", href: "/system-design", icon: "Layout", description: "Master system design concepts", badge: "New" }
  ];
  
  console.log('ToolsDropdown - Inline tools count:', safeToolsItems.length);
  console.log('ToolsDropdown - First tool label:', safeToolsItems[0]?.label);
  console.log('ToolsDropdown - All tool labels:', safeToolsItems.map(t => t.label));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-foreground/90 hover:text-primary px-4 py-2.5 rounded-xl transition-all duration-300"
        onClick={() => {
          console.log('Tools button clicked, current state:', isOpen);
          setIsOpen(!isOpen);
        }}
      >
        <Sparkles className="h-4 w-4" />
        <span className="font-medium">Tools</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 bg-background border-2 border-red-500 rounded-lg shadow-lg z-[9999] max-h-96 overflow-y-auto"
          style={{ position: 'absolute', zIndex: 9999 }}
        >
          <div className="p-4">
            <div className="text-sm font-bold mb-3 text-primary">
              Developer Tools ({safeToolsItems.length})
            </div>
            {safeToolsItems.length > 0 ? (
              <div className="space-y-1">
                {safeToolsItems.map((tool) => (
                  <Link
                    key={tool.label}
                    to={tool.href}
                    className="block p-3 hover:bg-primary/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-primary/10 rounded">
                        {(() => {
                          const IconComponent = toolIconMap[tool.icon as keyof typeof toolIconMap] || Sparkles;
                          return <IconComponent className="h-4 w-4" />;
                        })()}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{tool.label}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-2 text-muted-foreground">No tools available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


