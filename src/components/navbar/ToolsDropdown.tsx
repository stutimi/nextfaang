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
import { toolsItems } from "./navigationData";

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

  console.log('ToolsDropdown rendering, toolsItems:', toolsItems);

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
              Developer Tools ({toolsItems.length})
            </div>
            {toolsItems.length > 0 ? (
              <div className="space-y-1">
                {toolsItems.map((tool) => (
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


