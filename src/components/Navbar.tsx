
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, Users, Zap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    { label: "Community", href: "#community", action: () => scrollToSection('#community') },
    { label: "Contact", href: "#contact", action: () => scrollToSection('#contact') }
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
                NEXTFANG
              </h1>
              <p className="text-xs text-muted-foreground">Building India's First LGM</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            
            {/* Tools Dropdown */}
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
          </div>

          {/* User Counter & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Badge variant="secondary" className="gap-1 pulse-glow">
              <Users className="h-3 w-3" />
              2,547 Users
            </Badge>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('#community')}
            >
              Join Community
            </Button>
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
                <Badge variant="secondary" className="gap-1 mb-3">
                  <Users className="h-3 w-3" />
                  2,547 Users
                </Badge>
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
