import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "from-green-500/10 to-green-600/5",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
    titleColor: "text-green-700 dark:text-green-400"
  },
  error: {
    icon: AlertCircle,
    bgColor: "from-red-500/10 to-red-600/5",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
    titleColor: "text-red-700 dark:text-red-400"
  },
  warning: {
    icon: AlertCircle,
    bgColor: "from-yellow-500/10 to-yellow-600/5",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-700 dark:text-yellow-400"
  },
  info: {
    icon: Info,
    bgColor: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    titleColor: "text-blue-700 dark:text-blue-400"
  }
};

export const EnhancedToast = ({ id, type, title, description, onClose }: ToastProps) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        relative overflow-hidden rounded-2xl border-2 ${config.borderColor} 
        bg-gradient-to-r ${config.bgColor} backdrop-blur-xl shadow-2xl 
        p-4 max-w-sm w-full group hover:scale-105 transition-transform duration-200
      `}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex-shrink-0"
        >
          <div className={`p-2 rounded-full bg-gradient-to-br ${config.bgColor} border ${config.borderColor}`}>
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
          </div>
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.h4
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`font-semibold text-sm ${config.titleColor}`}
          >
            {title}
          </motion.h4>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground mt-1 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
        
        {/* Close button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-white/10 rounded-full"
            onClick={() => onClose(id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.bgColor} origin-left`}
        onAnimationComplete={() => onClose(id)}
      />
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onClose }: { 
  toasts: ToastProps[], 
  onClose: (id: string) => void 
}) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <EnhancedToast
            key={toast.id}
            {...toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};