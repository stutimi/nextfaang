import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigation } from "./useNavigation";

export const MiniBreadcrumb = () => {
  const { location } = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<{name: string, path: string}[]>([]);
  
  // Show breadcrumbs after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Generate breadcrumbs based on current path
  useEffect(() => {
    const path = location.pathname;
    const pathSegments = path.split('/').filter(segment => segment);
    
    const crumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path
      };
    });
    
    setBreadcrumbs(crumbs);
  }, [location]);
  
  if (breadcrumbs.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-14 left-0 right-0 z-30 lg:hidden bg-background/70 backdrop-blur-md border-b border-border/30 px-3 py-1 overflow-x-auto whitespace-nowrap hide-scrollbar"
        >
          <div className="flex items-center text-xs text-muted-foreground">
            <Link to="/" className="flex items-center hover:text-primary transition-colors">
              <Home size={12} />
            </Link>
            
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                <ChevronRight size={12} className="mx-1" />
                <Link 
                  to={crumb.path}
                  className={`hover:text-primary transition-colors ${
                    index === breadcrumbs.length - 1 ? "text-primary font-medium" : ""
                  }`}
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};