import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MobileNavbarProps {
  showBackButton?: boolean;
  backTo?: string;
  title?: string;
}

export const MobileNavbar = ({ showBackButton = false, backTo = "/", title }: MobileNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(backTo);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Mobile Navbar - No animations, no scroll behavior */}
      <nav
        className="mobile-navbar-fixed bg-background/95 backdrop-blur-md border-b border-border/70"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left side - Back button or Logo */}
            <div className="flex items-center gap-3">
              {showBackButton ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackClick}
                  className="p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              ) : (
                <Link to="/" className="flex items-center">
                  <div className="text-xl font-bold text-primary">N</div>
                </Link>
              )}
              {title && (
                <h1 className="text-lg font-semibold text-foreground truncate">
                  {title}
                </h1>
              )}
            </div>

            {/* Right side - Menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border/70 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-3">
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-3">
                    <Home className="h-4 w-4" />
                    Home
                  </div>
                </Link>
                
                <Link 
                  to="/dsa" 
                  className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 text-primary">📚</div>
                    DSA Mastery
                  </div>
                </Link>
                
                <Link 
                  to="/system-design" 
                  className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 text-primary">🏗️</div>
                    System Design
                  </div>
                </Link>
                
                <Link 
                  to="/cp-arena" 
                  className="block px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 text-primary">⚔️</div>
                    CP Arena
                  </div>
                </Link>
                
                <div className="border-t border-border/50 pt-3 mt-3">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={closeMenu}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-14" />
    </>
  );
};
