import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Sparkles, Sword, Book, Rocket, Star, Globe } from "lucide-react";
import { toolsItems } from "./navigationData";

const toolIconMap = {
  Sword: Sword,
  Sparkles: Sparkles,
  Book: Book,
  Globe: Globe,
  Rocket: Rocket,
  Star: Star,
};

export const ToolsDropdown = () => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={toolsRef}>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-foreground/90 hover:text-primary hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/10 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-primary/30"
          onClick={() => setToolsOpen(!toolsOpen)}
        >
          <motion.div
            animate={{ rotate: toolsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
          </motion.div>
          <span className="font-medium">Tools</span>
          <motion.div
            animate={{ rotate: toolsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {toolsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-3 w-80 bg-popover/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-[100] overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4 px-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-primary">Developer Tools</span>
              </div>
              <div className="space-y-2">
                {toolsItems.map((tool, index) => (
                  <motion.div
                    key={tool.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.href}
                      className="w-full flex items-start gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/5 rounded-xl p-3 group transition-all duration-300 border border-transparent hover:border-primary/20"
                      onClick={() => setToolsOpen(false)}
                    >
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl group-hover:from-primary/20 group-hover:to-accent/10 transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                        {(() => {
                          const IconComponent = toolIconMap[tool.icon as keyof typeof toolIconMap];
                          return <IconComponent className="h-4 w-4" />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                          {tool.label}
                          {tool.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 shadow-sm"
                            >
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {tool.description}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
