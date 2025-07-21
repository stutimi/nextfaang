import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Book, Layout, Menu, Users } from "lucide-react";
import { useNavigation } from "./useNavigation";
import { useCallback } from "react";

interface BottomNavProps {
  onMenuClick: () => void;
}

export const BottomNav = ({ onMenuClick }: BottomNavProps) => {
  const { navigate, location } = useNavigation();

  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Book, label: "DSA", path: "/dsa" },
    { icon: Layout, label: "System", path: "/system-design" },
    { icon: Users, label: "Community", path: "/community" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[50] lg:hidden bg-background/95 backdrop-blur-md border-t border-border/70"
    >
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/5 h-full ${
              isActive(item.path) 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary/80"
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-primary" : ""}`} />
              <span className="text-xs mt-1">{item.label}</span>
            </motion.div>
          </Link>
        ))}
        <button
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center w-1/5 h-full text-muted-foreground hover:text-primary/80 touch-target"
          aria-label="Open menu"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">Menu</span>
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
};