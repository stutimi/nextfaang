import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, ChevronDown, Home, Book, Phone, Users as CommunityIcon, Sparkles, Rocket, Star, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfile } from "@/components/UserProfile";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NextfaangLogo from '@/assets/nextfaang-logo.svg?react';


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", icon: <Home className="h-4 w-4" />, action: () => scrollToSection('#hero'), badge: null },
    { label: "DSA", icon: <Book className="h-4 w-4" />, action: () => scrollToSection('#dsa-section'), badge: "New" },
    { label: "CP", icon: <Code className="h-4 w-4" />, action: () => scrollToSection('#cp-section'), badge: "Hot" },
    { label: "Community", icon: <CommunityIcon className="h-4 w-4" />, action: () => scrollToSection('#community'), badge: null },
    { label: "Contact", icon: <Phone className="h-4 w-4" />, action: () => scrollToSection('#contact'), badge: null }
  ];

  const toolsItems = [
    { label: "Contest Analyzer", href: "/contest-analyzer", icon: <Sparkles className="h-4 w-4" />, description: "Analyze your contest performance" },
    { label: "CP Dictionary", href: "/cp-dictionary", icon: <Book className="h-4 w-4" />, description: "Learn competitive programming terms" },
    { label: "Tricks & Tips", href: "/cp-tricks-tips", icon: <Rocket className="h-4 w-4" />, description: "Master advanced techniques" },
    { label: "DSA Mastery", href: "/dsa-mastery", icon: <Star className="h-4 w-4" />, description: "Complete data structures guide" },
    { label: "Auth Test", href: "/auth-test", icon: <Users className="h-4 w-4" />, description: "Test Clerk authentication" }
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-500`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <NextfaangLogo className="h-10 w-auto" />
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.button
                  onClick={item.action}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-primary/10 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  {item.label}
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={`text-xs px-1.5 py-0.5 ml-1 ${
                        item.badge === 'Hot'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>
            ))}

            {/* Enhanced Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary hover:bg-primary/10 px-4 py-2.5 rounded-xl transition-all duration-300 group"
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Tools</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
              </Button>

              {toolsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-md shadow-lg z-[100]">
                  <div className="p-2">
                    <div className="text-sm font-semibold text-primary mb-3 px-2">Developer Tools</div>
                    {toolsItems.map((tool) => (
                      <Link
                        key={tool.label}
                        to={tool.href}
                        className="w-full flex items-start gap-3 cursor-pointer hover:bg-primary/10 rounded-lg p-3 group transition-all duration-200"
                        onClick={() => setToolsOpen(false)}
                      >
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                            {tool.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Auth Section */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <UserProfile />
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="lg:hidden"
          >
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

        {/* Enhanced Mobile Navigation */}
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
                      <motion.button
                        key={item.label}
                        onClick={item.action}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-primary/10 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          {item.label}
                        </div>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0.5 ${
                              item.badge === 'Hot'
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </motion.button>
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
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-all duration-300 p-4 rounded-xl hover:bg-primary/10 group"
                          >
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                              {tool.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{tool.label}</div>
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
                      <UserProfile />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
