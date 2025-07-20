import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

interface EnhancedSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  results?: SearchResult[];
  isLoading?: boolean;
}

export const EnhancedSearch = ({ 
  placeholder = "Search resources, tutorials, problems...",
  onSearch,
  results = [],
  isLoading = false
}: EnhancedSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
    setIsOpen(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.open(results[selectedIndex].url, '_blank');
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [...new Set(results.map(r => r.category))];

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={resultsRef}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl border-2 border-border/70 bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50"
        >
          <div className="flex items-center gap-3 p-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => query && setIsOpen(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            )}
            
            {/* Clear button */}
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/10 rounded-full"
                onClick={clearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {/* Filter button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10 rounded-full"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-focus-within:border-primary/50 transition-colors duration-300" />
        </motion.div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-50 overflow-hidden"
          >
            {/* Categories */}
            {categories.length > 0 && (
              <div className="p-4 border-b border-border/50">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-xs px-2 py-1 hover:bg-primary/10 cursor-pointer transition-colors"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 hover:bg-primary/5 cursor-pointer transition-colors border-l-4 ${
                      selectedIndex === index 
                        ? "bg-primary/10 border-l-primary" 
                        : "border-l-transparent"
                    }`}
                    onClick={() => {
                      window.open(result.url, '_blank');
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {result.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {result.description}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : query ? (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Try different keywords or browse our categories
                  </p>
                </div>
              ) : null}
            </div>
            
            {/* Quick actions */}
            <div className="p-4 border-t border-border/50 bg-muted/20">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Press ↑↓ to navigate, Enter to select, Esc to close</span>
                <span>{results.length} results</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};