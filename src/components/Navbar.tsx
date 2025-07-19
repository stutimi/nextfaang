import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, ChevronDown, Home, Book, Phone, Users as CommunityIcon, Sparkles, Rocket, Star, Sword, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfile } from "@/components/UserProfile";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NextfaangLogo from '@/assets/nextfaang-logo.svg?react';


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      // We're already on the home page, just scroll
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    setIsOpen(false);
  };

  const navItems = [
    { 
      label: "Home", 
      icon: <Home className="h-4 w-4" />, 
      action: location.pathname === '/' ? () => scrollToSection('#hero') : () => navigate('/'),
      href: location.pathname === '/' ? undefined : "/",
      badge: null, 
      type: location.pathname === '/' ? 'scroll' : 'link'
    },
    { label: "DSA", icon: <Book className="h-4 w-4" />, href: "/dsa", badge: "New", type: 'link' },
    { label: "Competitive Programming", icon: <Code className="h-4 w-4" />, href: "/competitive-programming", badge: "Hot", type: 'link' },
    { label: "Resources", icon: <BookOpen className="h-4 w-4" />, href: "/resources", badge: null, type: 'link' },
    { label: "Community", icon: <CommunityIcon className="h-4 w-4" />, action: () => scrollToSection('#community'), badge: null, type: 'scroll' },
    { label: "Contact", icon: <Phone className="h-4 w-4" />, action: () => scrollToSection('#contact'), badge: null, type: 'scroll' }
  ];

  const toolsItems = [
    { label: "CP Arena", href: "/cp-arena", icon: <Sword className="h-4 w-4" />, description: "Compete in coding battles", badge: "New" },
    { label: "Contest Analyzer", href: "/contest-analyzer", icon: <Sparkles className="h-4 w-4" />, description: "Analyze your contest performance" },
    { label: "CP Dictionary", href: "/cp-dictionary", icon: <Book className="h-4 w-4" />, description: "Learn competitive programming terms" },
    { label: "Tricks & Tips", href: "/cp-tricks-tips", icon: <Rocket className="h-4 w-4" />, description: "Master advanced techniques" },
    { label: "DSA Mastery", href: "/dsa", icon: <Star className="h-4 w-4" />, description: "Complete data structures guide" }
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/70 transition-all duration-500 shadow-lg shadow-primary/10`}>
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
                {item.type === 'link' ? (
                  <Link to={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/10 group overflow-hidden"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {item.icon}
                      </span>
                      <span className="relative z-10">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`text-xs px-2 py-0.5 ml-1 relative z-10 ${
                            item.badge === 'Hot'
                              ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20'
                              : 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-300" />
                    </motion.div>
                  </Link>
                ) : (
                  <motion.button
                    onClick={item.action}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-xl hover:bg-primary/15 group"
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
                )}
              </motion.div>
            ))}

            {/* Enhanced Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-foreground/90 hover:text-primary hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/10 px-4 py-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-primary/30"
                  onClick={() => setToolsOpen(!toolsOpen)}
                >
                  <motion.div
                    animate={{ rotate: toolsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <span className="font-medium">Tools</span>
                  <motion.div
                    animate={{ rotate: toolsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-80 bg-popover/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-[100] overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold text-primary">Developer Tools</span>
                      </div>
                      <div className="space-y-2">
                        {toolsItems.map((tool, index) => (
                          <motion.div
                            key={tool.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={tool.href}
                              className="w-full flex items-start gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/5 rounded-xl p-3 group transition-all duration-300 border border-transparent hover:border-primary/20"
                              onClick={() => setToolsOpen(false)}
                            >
                              <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl group-hover:from-primary/20 group-hover:to-accent/10 transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                                {tool.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                                  {tool.label}
                                  {tool.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 shadow-sm"
                                    >
                                      {tool.badge}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {tool.description}
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.type === 'link' ? (
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
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
                          </Link>
                        ) : (
                          <motion.button
                            onClick={item.action}
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
                        )}
                      </motion.div>
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
