import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

import { 
  NavLogo, 
  NavAuthSection, 
  NavItem, 
  ToolsDropdown, 
  MobileMenu
} from "./navbar/index";
import { useNavigation } from "./navbar/useNavigation";
import { getNavItems, toolsItems } from "./navbar/navigationData";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate, location, scrollToSection } = useNavigation();
  
  const navItems = getNavItems(location, scrollToSection, navigate);

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/70 transition-all duration-500 shadow-lg shadow-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <NavItem key={item.label} item={item} index={index} />
            ))}
            <ToolsDropdown />
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <NavAuthSection />
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileTap={{ scale: 0.95 }} className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-primary/10 hover:text-primary p-2 rounded-xl transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu
          isOpen={isOpen}
          navItems={navItems}
          toolsItems={toolsItems}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </nav>
  );
};
