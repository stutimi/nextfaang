import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sword, Book, Rocket, Star, Languages } from "lucide-react";
import { NavAuthSection } from "./NavAuthSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavItem } from "./NavItem";
import { NavItem as NavItemType, ToolItem } from "./navigationData";

const toolIconMap = {
  Sword: Sword,
  Sparkles: Sparkles,
  Book: Book,
  Languages: Languages,
  Rocket: Rocket,
  Star: Star,
};

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItemType[];
  toolsItems: ToolItem[];
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, navItems, toolsItems, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -20 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="glass-card m-4 p-6 rounded-2xl border-primary/20 shadow-2xl shadow-primary/10">
            <div className="flex flex-col gap-4">
              {/* Mobile Nav Items */}
              <div className="space-y-2">
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

              {/* Mobile Tools Section */}
              <div className="pt-4 border-t border-primary/20">
                <div className="text-sm font-semibold text-primary mb-3 px-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Developer Tools
                </div>
                <div className="space-y-2">
                  {toolsItems.map((tool, index) => (
                    <motion.div
                      key={tool.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + index) * 0.1 }}
                    >
                      <Link
                        to={tool.href}
                        onClick={onClose}
                        className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-primary/10 group"
                      >
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                          {(() => {
                            const IconComponent = toolIconMap[tool.icon as keyof typeof toolIconMap];
                            return <IconComponent className="h-4 w-4" />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {tool.label}
                            {tool.badge && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 border-green-500/30"
                              >
                                {tool.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{tool.description}</div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-primary/20">
                <div className="flex items-center justify-center mb-4">
                  <ThemeToggle />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <NavAuthSection />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};