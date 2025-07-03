
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, Users, Zap, ChevronDown, LogOut, User, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const navItems = [
    { label: "Home", href: "#hero", action: () => scrollToSection('#hero') },
    { label: "Features", href: "#features", action: () => scrollToSection('#features') },
    { label: "Demo", href: "#demo", action: () => scrollToSection('#demo') },
    { label: "Roadmap", href: "#roadmap", action: () => scrollToSection('#roadmap') },
    { label: "Contact", href: "#contact", action: () => scrollToSection('#contact') },
    { label: "Community", href: "#community", action: () => scrollToSection('#community') }
  ];

  const toolsItems = [
    { label: "Contest Analyzer", href: "/contest-analyzer" },
    { label: "CP Dictionary", href: "/cp-dictionary" },
    { label: "Tricks & Tips", href: "/cp-tricks-tips" },
    { label: "Language Translation", href: "/language-translation" },
    { label: "DSA Mastery", href: "/dsa-mastery" },
    { label: "All Resources", href: "/resources" }
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl pulse-glow">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Coding Arena
              </h1>
              <p className="text-xs text-muted-foreground">1v1 Programming Duels</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!user && navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            
            {!user && (
              /* Tools Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Tools
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {toolsItems.map((tool) => (
                    <DropdownMenuItem key={tool.label} asChild>
                      <Link to={tool.href} className="cursor-pointer">
                        {tool.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                {profile && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {profile.rating}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      {profile.wins}W / {profile.losses}L
                    </Badge>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {profile?.username || user.email?.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In / Join
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 slide-in-up">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-sm font-medium hover:text-primary transition-colors p-2 rounded hover:bg-primary/10 text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Tools Section */}
              <div className="pt-2 border-t border-primary/20">
                <div className="text-sm font-medium text-muted-foreground mb-2 px-2">Tools</div>
                {toolsItems.map((tool) => (
                  <Link
                    key={tool.label}
                    to={tool.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-medium hover:text-primary transition-colors p-2 rounded hover:bg-primary/10"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 border-t border-primary/20">
                <div className="mb-3">
                  <ThemeToggle />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  onClick={() => scrollToSection('#community')}
                >
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
