import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Code, 
  ChevronDown, 
  Home, 
  Book, 
  Phone, 
  User, 
  Sparkles, 
  Rocket, 
  Star, 
  BookOpen,
  Sword,
  CommunityIcon,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserProfile } from '@/components/UserProfile';
import NextfaangLogo from '@/assets/nextfaang-logo.svg?react';
import { useAuthContext } from '@/components/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const navItems = [
    { 
      label: "Home", 
      href: location.pathname === '/' ? '#hero' : '/',
      icon: <Home className="h-4 w-4" />, 
      type: location.pathname === '/' ? 'scroll' : 'link',
      action: location.pathname === '/' ? () => scrollToSection('#hero') : () => navigate('/'),
      badge: null
    },
    {
      label: "Competitive Programming",
      href: "/competitive-programming",
      icon: <Code className="h-4 w-4" />,
      type: 'link',
      badge: null
    },
    {
      label: "DSA",
      href: "/dsa",
      icon: <BookOpen className="h-4 w-4" />,
      type: 'link',
      badge: "New"
    },
    {
      label: "Resources",
      href: "/resources",
      icon: <Book className="h-4 w-4" />,
      type: 'link',
      badge: null
    },
    {
      label: "Community",
      href: location.pathname === '/' ? '#community' : '/',
      icon: <CommunityIcon className="h-4 w-4" />,
      type: location.pathname === '/' ? 'scroll' : 'link',
      action: location.pathname === '/' ? () => scrollToSection('#community') : () => navigate('/'),
      badge: null
    },
    {
      label: "Contact",
      href: location.pathname === '/' ? '#contact' : '/',
      icon: <Phone className="h-4 w-4" />,
      type: location.pathname === '/' ? 'scroll' : 'link',
      action: location.pathname === '/' ? () => scrollToSection('#contact') : () => navigate('/'),
      badge: null
    }
  ];

  const toolsItems = [
    {
      label: "CP Dictionary",
      href: "/cp-dictionary",
      icon: <Book className="h-4 w-4" />,
      description: "Complete CP terminology guide",
      badge: null
    },
    {
      label: "DSA Mastery",
      href: "/dsa-mastery",
      icon: <Rocket className="h-4 w-4" />,
      description: "Master advanced data structures",
      badge: "New"
    },
    {
      label: "Tricks & Tips",
      href: "/cp-tricks-tips",
      icon: <Star className="h-4 w-4" />,
      description: "Master advanced techniques",
      badge: null
    },
    {
      label: "Contest Analyzer",
      href: "/contest-analyzer",
      icon: <Sparkles className="h-4 w-4" />,
      description: "Analyze your contest performance",
      badge: null
    },
    {
      label: "CP Arena",
      href: "/cp-arena",
      icon: <Sword className="h-4 w-4" />,
      description: "Compete in coding battles",
      badge: "New"
    }
  ];

  const notifications = [
    { id: 1, title: "New Contest Available", message: "Codeforces Round #900 starts in 2 hours!", time: "2m ago", unread: true },
    { id: 2, title: "Achievement Unlocked", message: "You've solved 100 problems!", time: "1h ago", unread: true },
    { id: 3, title: "Weekly Report", message: "Your coding progress this week", time: "1 day ago", unread: false },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/70 shadow-lg shadow-border/30'
          : 'bg-background/80 backdrop-blur-sm border-b border-border/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <NextfaangLogo className="h-10 w-auto" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:text-primary/90 transition-colors duration-300">
              NEXTFAANG
            </span>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
                    className="relative flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary/90 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-primary/10 group"
                  >
                    <motion.div
                      className="p-2 bg-gradient-to-r from-primary/20 to-accent/50 border border-primary/20 rounded-xl group-hover:from-primary/10 group-hover:to-accent/20 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.label}
                      </div>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className={`text-xs px-2 py-0.5 ml-1 ${
                        item.badge === 'Hot' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/30' 
                          : 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/30'
                      }`}>
                        {item.badge}
                      </Badge>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navHover"
                    />
                  </Link>
                ) : (
                  <motion.button
                    onClick={item.action}
                    className="relative flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary/90 transition-all duration-300 px-4 py-3 rounded-xl hover:bg-primary/10 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className={`relative z-10 text-xs px-2 py-0.5 ml-1 ${
                        item.badge === 'Hot' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/30' 
                          : 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/30'
                      }`}>
                        {item.badge}
                      </Badge>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navHover"
                    />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Enhanced Tools Dropdown */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.div
              className="relative"
              ref={toolsRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setToolsOpen(!toolsOpen)}
                className="gap-2 text-primary/90 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 px-4 py-3 rounded-xl group"
              >
                <span className="font-semibold">Tools</span>
                <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <motion.div
                  animate={{ rotate: toolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.div>
              </Button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-[100] overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/30">
                        <span className="text-sm font-bold text-primary">Developer Tools</span>
                        <Sparkles className="h-4 w-4 text-primary" />
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
                              onClick={() => setToolsOpen(false)}
                              className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group cursor-pointer border border-primary/10 hover:border-primary/20"
                            >
                              <div className="p-2 bg-gradient-to-r from-primary/10 hover:from-primary/20 to-accent/5 hover:to-accent/10 border border-primary/20 rounded-xl transition-all duration-300 group-hover:scale-110 transform">
                                {tool.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                  {tool.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {tool.description}
                                </div>
                              </div>
                              {tool.badge && (
                                <Badge variant="secondary" className={`text-xs px-2 py-0.5 shadow-sm ${
                                  tool.badge === 'Hot' 
                                    ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-green-400 border-green-500/30 shadow-green-500/30' 
                                    : 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 shadow-green-500/30'
                                }`}>
                                  {tool.badge}
                                </Badge>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Notifications */}
            <motion.div
              className="relative"
              ref={notificationsRef}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative hover:bg-primary/10 hover:text-primary rounded-xl"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-[100] overflow-hidden max-h-80 overflow-y-auto"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/30">
                        <span className="text-sm font-bold text-foreground">Notifications</span>
                        <Badge variant="secondary" className="text-xs">
                          {notifications.filter(n => n.unread).length} new
                        </Badge>
                      </div>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                              notification.unread 
                                ? 'border-primary/20 bg-primary/5 hover:border-primary/30' 
                                : 'border-border/30 hover:border-border/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-sm text-foreground">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {notification.message}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <ThemeToggle />
            
            {user ? (
              <UserProfile />
            ) : (
              <AuthModal>
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </AuthModal>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-300 p-2 rounded-xl"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
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
              <div className="flex flex-col p-4 mt-4 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-xl">
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
                          className="w-full flex items-center justify-between text-sm font-semibold text-foreground hover:text-primary/90 transition-all duration-300 p-4 rounded-xl hover:bg-primary/10 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${
                              item.badge === 'Hot' 
                                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }`}>
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ) : (
                        <motion.button
                          onClick={item.action}
                          className="w-full flex items-center justify-between text-sm font-semibold text-foreground hover:text-primary/90 transition-all duration-300 p-4 rounded-xl hover:bg-primary/10 group"
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${
                              item.badge === 'Hot' 
                                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }`}>
                              {item.badge}
                            </Badge>
                          )}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Tools Section */}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <span className="text-sm font-bold text-primary">Developer Tools</span>
                    <Sparkles className="h-4 w-4 text-primary" />
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
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="p-2 bg-primary/20 border border-primary/20 rounded-xl group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 transform">
                            {tool.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {tool.label}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {tool.description}
                            </div>
                          </div>
                          {tool.badge && (
                            <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${
                              tool.badge === 'Hot' 
                                ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }`}>
                              {tool.badge}
                            </Badge>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile Auth Section */}
                <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-center gap-4">
                  <ThemeToggle />
                  {user ? (
                    <UserProfile />
                  ) : (
                    <AuthModal>
                      <Button variant="default" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </AuthModal>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;