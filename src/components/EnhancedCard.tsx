import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  hoverScale?: number;
  hoverRotate?: number;
}

const glowColors = {
  primary: "shadow-primary/20 hover:shadow-primary/40",
  secondary: "shadow-secondary/20 hover:shadow-secondary/40", 
  accent: "shadow-accent/20 hover:shadow-accent/40",
  success: "shadow-green-500/20 hover:shadow-green-500/40",
  warning: "shadow-yellow-500/20 hover:shadow-yellow-500/40",
  error: "shadow-red-500/20 hover:shadow-red-500/40"
};

export const EnhancedCard = ({ 
  children, 
  className, 
  glowColor = "primary",
  hoverScale = 1.02,
  hoverRotate = 0
}: EnhancedCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: hoverScale, 
        rotateY: hoverRotate,
        y: -8
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-border/70 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/50",
        `shadow-xl ${glowColors[glowColor]}`,
        className
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};