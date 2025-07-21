import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

import {
  NavLogo,
  NavAuthSection,
  NavItem,
  ToolsDropdown,
  MobileMenu,
  BottomNav,
  ScrollProgress,
  CompactSearchBar,
  MiniBreadcrumb
} from "./navbar/index";
import { useNavigation } from "./navbar/useNavigation";
import { getNavItems, toolsItems } from "./navbar/navigationData";
import { useSwipeDetection } from "@/hooks/useSwipeDetection";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { navigate, location, scrollToSection } = useNavigation();
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Memoize swipe handlers to prevent unnecessary re-renders
  const handleSwipeDown = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSwipeUp = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Use swipe detection for mobile - only when not hiding navbar
  useSwipeDetection(navRef, {
    onSwipeDown: handleSwipeDown,
    onSwipeUp: handleSwipeUp,
    threshold: 30
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // On mobile, always keep navbar visible
      if (mobile) {
        setIsVisible(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle navbar visibility on scroll - DISABLED on mobile
  useEffect(() => {
    // On mobile, completely skip scroll handling and keep navbar always visible
    if (isMobile) {
      setIsVisible(true);
      return; // Don't add scroll listener on mobile
    }

    // Desktop-only scroll handling
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // On desktop, allow hiding when scrolling down
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Initial check for desktop
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = getNavItems(location, scrollToSection, navigate);

  return (
    <>
    {/* Scroll Progress Indicator */}
    <ScrollProgress />

    {isMobile ? (
      // For mobile: Use regular nav element without motion animations
      <nav
        ref={navRef}
        className="sticky top-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border/70 mobile-navbar-visible"
        style={{
          position: 'sticky',
          top: '0',
          transform: 'translateY(0)',
          opacity: '1',
          visibility: 'visible'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo - Different versions for mobile and desktop */}
            <div className="hidden lg:block">
              <NavLogo />
            </div>
            <div className="lg:hidden">
              <NavLogo />
            </div>

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
                onClick={handleToggleMenu}
                className="text-foreground p-2 rounded-lg transition-all duration-300"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <MobileMenu
            isOpen={isOpen}
            navItems={navItems}
            toolsItems={toolsItems}
            onClose={handleCloseMenu}
          />
        </div>
      </nav>
    ) : (
      // For desktop: Use motion.nav with scroll animations
      <motion.nav
        ref={navRef}
        className="sticky top-0 z-[60] bg-background/95 backdrop-blur-md border-b border-border/70 transition-all duration-300"
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo - Different versions for mobile and desktop */}
            <div className="hidden lg:block">
              <NavLogo />
            </div>
            <div className="lg:hidden">
              <NavLogo />
            </div>

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
                onClick={handleToggleMenu}
                className="text-foreground p-2 rounded-lg transition-all duration-300"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <MobileMenu
            isOpen={isOpen}
            navItems={navItems}
            toolsItems={toolsItems}
            onClose={handleCloseMenu}
          />
        </div>
      </motion.nav>
    )}

    {/* Bottom Navigation for Mobile */}
    <BottomNav onMenuClick={handleSwipeDown} />

    {/* Compact Search Bar for Mobile */}
    <CompactSearchBar />


    {/* Mini Breadcrumb for Mobile */}
    <MiniBreadcrumb />
    </>
  );
};
