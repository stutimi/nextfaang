import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle, BookOpen, Trophy, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: MessageCircle,
      label: "Join Community",
      href: "/resources#community",
      color: "from-blue-500 to-blue-600",
      delay: 0.1
    },
    {
      icon: BookOpen,
      label: "Resources",
      href: "/resources",
      color: "from-green-500 to-green-600",
      delay: 0.2
    },
    {
      icon: Trophy,
      label: "CP Arena",
      href: "/cp-arena",
      color: "from-purple-500 to-purple-600",
      delay: 0.3
    },
    {
      icon: Users,
      label: "Contributors",
      href: "/cp-contributors",
      color: "from-orange-500 to-orange-600",
      delay: 0.4
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ delay: action.delay, type: "spring", stiffness: 200 }}
              >
                <Link to={action.href}>
                  <motion.div
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 group"
                  >
                    {/* Label */}
                    <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-sm font-medium whitespace-nowrap">
                        {action.label}
                      </span>
                    </div>
                    
                    {/* Button */}
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                      <action.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-2xl hover:shadow-3xl border-2 border-white/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary-foreground" />
          ) : (
            <Plus className="h-6 w-6 text-primary-foreground" />
          )}
        </Button>
      </motion.div>
    </div>
  );
};