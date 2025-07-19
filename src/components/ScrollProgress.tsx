import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-border/20 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          transformOrigin="left"
        />
      </div>
      
      {/* Circular progress indicator */}
      {scrollProgress > 0.1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <div className="relative w-12 h-12">
            {/* Background circle */}
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-border/30"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            
            {/* Progress circle */}
            <svg className="absolute top-0 left-0 w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <motion.path
                className="text-primary"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollProgress * 100}
                transition={{ duration: 0.1 }}
              />
            </svg>
            
            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};