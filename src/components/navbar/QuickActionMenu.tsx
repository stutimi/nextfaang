import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Share2, Bookmark, Flag, MessageSquare, Copy, Star } from "lucide-react";

export const QuickActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const actions = [
    { icon: Share2, label: "Share", onClick: () => console.log("Share clicked") },
    { icon: Bookmark, label: "Save", onClick: () => console.log("Save clicked") },
    { icon: Copy, label: "Copy Link", onClick: () => console.log("Copy clicked") },
    { icon: Star, label: "Favorite", onClick: () => console.log("Favorite clicked") },
    { icon: MessageSquare, label: "Comment", onClick: () => console.log("Comment clicked") },
    { icon: Flag, label: "Report", onClick: () => console.log("Report clicked") },
  ];

  return (
    <div className="fixed top-3 left-3 z-40 lg:hidden" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-background/90 border border-border/70 shadow-md flex items-center justify-center"
        aria-label="Quick actions"
      >
        <MoreVertical size={16} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-10 w-40 bg-background/95 backdrop-blur-lg border border-border/70 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-1">
              {actions.map((action) => (
                <motion.button
                  key={action.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left p-2 rounded-md hover:bg-primary/10 active:bg-primary/20 transition-colors"
                >
                  <action.icon size={14} />
                  <span className="text-xs">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};