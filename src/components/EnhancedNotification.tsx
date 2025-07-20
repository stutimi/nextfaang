import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NotificationProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    title: "text-green-800 dark:text-green-200",
    message: "text-green-700 dark:text-green-300",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-800 dark:text-red-200",
    message: "text-red-700 dark:text-red-300",
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400",
    title: "text-yellow-800 dark:text-yellow-200",
    message: "text-yellow-700 dark:text-yellow-300",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-800 dark:text-blue-200",
    message: "text-blue-700 dark:text-blue-300",
  },
};

export const EnhancedNotification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  onClose,
}) => {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        ${colors.bg} ${colors.border} border-2 rounded-xl p-4 shadow-lg backdrop-blur-sm
        max-w-md w-full relative overflow-hidden group
      `}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      
      <div className="flex items-start gap-3 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Icon className={`h-6 w-6 ${colors.icon} flex-shrink-0 mt-0.5`} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`font-semibold ${colors.title} text-sm`}
          >
            {title}
          </motion.h4>
          
          {message && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-1 text-sm ${colors.message} leading-relaxed`}
            >
              {message}
            </motion.p>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onClose(id)}
            className="h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
      />
    </motion.div>
  );
};

export const NotificationContainer: React.FC<{
  notifications: NotificationProps[];
  onClose: (id: string) => void;
}> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <EnhancedNotification
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};