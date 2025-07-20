import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export const CompactSearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Show search bar after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // Implement search functionality
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        document.getElementById("mobile-search-input")?.focus();
      }, 300);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    document.getElementById("mobile-search-input")?.focus();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-3 left-1/2 transform -translate-x-1/2 z-40 lg:hidden"
        >
          <form onSubmit={handleSubmit}>
            <motion.div
              animate={{ width: isExpanded ? "80vw" : "40px" }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center h-8 bg-background/90 backdrop-blur-md border border-border/70 rounded-full shadow-md overflow-hidden"
            >
              {isExpanded ? (
                <>
                  <input
                    id="mobile-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-full bg-transparent border-none outline-none pl-3 pr-8 text-xs"
                  />
                  <button
                    type="button"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1"
                    onClick={clearSearch}
                  >
                    {searchQuery && <X size={12} />}
                  </button>
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary/10 rounded-full"
                  >
                    <Search size={12} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={toggleExpand}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Search size={16} />
                </button>
              )}
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};