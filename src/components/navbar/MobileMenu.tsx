import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sword, Book, Rocket, Star, Languages, Layout, X } from "lucide-react";
import { NavAuthSection } from "./NavAuthSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavItem } from "./NavItem";
import { NavItem as NavItemType, ToolItem } from "./navigationData";
import { useEffect, useCallback } from "react";

const toolIconMap = {
  Sword: Sword,
  Sparkles: Sparkles,
  Book: Book,
  Languages: Languages,
  Globe: Languages, // Added Globe mapping to Languages icon
  Rocket: Rocket,
  Star: Star,
  Layout: Layout, // Added Layout icon for System Design
};

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItemType[];
  toolsItems: ToolItem[];
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, navItems, toolsItems, onClose }: MobileMenuProps) => {
  const dragControls = useDragControls();

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent background scrolling on mobile
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle swipe to close with better error handling
  const handleDragEnd = useCallback((event: any, info: any) => {
    try {
      if (info?.offset?.y < -50) {
        onClose();
      }
    } catch (error) {
      console.warn('Error in drag end handler:', error);
    }
  }, [onClose]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Mobile menu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-50 lg:hidden overflow-auto"
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragDirectionLock
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="bg-background mx-0 p-4 rounded-none border-primary/10 shadow-xl shadow-primary/10">
              {/* Search bar for quick navigation */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-100 dark:bg-gray-800/50 border-none rounded-full px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                {/* Main Navigation Section */}
                <div>
                  <div className="text-sm font-semibold text-primary mb-3 px-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Main Navigation
                  </div>
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <NavItem 
                        key={item.label} 
                        item={item} 
                        index={index} 
                        isMobile={true} 
                        onItemClick={onClose} 
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Tools Section */}
                <div className="pt-4 border-t border-primary/20">
                  <div className="text-sm font-semibold text-primary mb-3 px-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Developer Tools
                  </div>
                  <div className="space-y-1">
                    {toolsItems.map((tool, index) => (
                      <motion.div
                        key={tool.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (navItems.length + index) * 0.05 }}
                      >
                        <Link
                          to={tool.href}
                          onClick={onClose}
                          className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 p-3 rounded-xl hover:bg-primary/5 active:bg-primary/10 group"
                        >
                          <div className="p-2 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors duration-200">
                            {(() => {
                              const IconComponent = toolIconMap[tool.icon as keyof typeof toolIconMap];
                              return <IconComponent className="h-5 w-5" />;
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              {tool.label}
                              {tool.badge && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-green-500/10 text-green-500">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{tool.description}</div>
                          </div>
                          <div className="text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>



                {/* Mobile Auth Section */}
                <div className="pt-3 border-t border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium">Theme</div>
                    <ThemeToggle />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center"
                  >
                    <NavAuthSection />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};