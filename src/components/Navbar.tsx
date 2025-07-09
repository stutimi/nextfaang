import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, Users, Zap, ChevronDown, LogOut, User, Trophy, Home, Book, Phone, Users as CommunityIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Home", icon: <Home className="h-4 w-4" />, action: () => scrollToSection('#hero') },
    { label: "DSA", icon: <Book className="h-4 w-4" />, action: () => scrollToSection('#dsa-section') },
    { label: "CP", icon: <Code className="h-4 w-4" />, action: () => scrollToSection('#cp-section') },
    { label: "Community", icon: <CommunityIcon className="h-4 w-4" />, action: () => scrollToSection('#community') },
    { label: "Contact", icon: <Phone className="h-4 w-4" />, action: () => scrollToSection('#contact') }
  ];

  const toolsItems = [
    { label: "Contest Analyzer", href: "/contest-analyzer" },
    { label: "CP Dictionary", href: "/cp-dictionary" },
    { label: "Tricks & Tips", href: "/cp-tricks-tips" },
    { label: "DSA Mastery", href: "/dsa-mastery" }
  ];

  return (
    <nav className="bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  NEXTFAANG
                </h1>
                <p className="text-xs text-gray-400">India's First LGM Platform</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {!user && navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800"
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}
            
            {!user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-300 hover:bg-gray-800">
                      <span>Tools</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-gray-900 border border-gray-800"
                >
                  {toolsItems.map((tool) => (
                    <DropdownMenuItem 
                      key={tool.label} 
                      className="cursor-pointer text-gray-300 hover:bg-gray-800"
                      asChild
                    >
                      <Link to={tool.href} className="w-full">
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
            {user ? (
              <>
                {profile && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1 bg-blue-900/30 text-blue-400">
                      <Trophy className="h-3 w-3" />
                      {profile.rating}
                    </Badge>
                    <Badge variant="outline" className="gap-1 border-gray-700 text-gray-300">
                      {profile.wins}W / {profile.losses}L
                    </Badge>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-300 hover:bg-gray-800">
                      <User className="h-4 w-4" />
                      {profile?.username || user.email?.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-48 bg-gray-900 border border-gray-800"
                  >
                    <DropdownMenuItem disabled className="text-gray-500 hover:bg-gray-800">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={signOut} 
                      className="cursor-pointer text-red-400 hover:bg-red-900/30"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Start Coding
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileTap={{ scale: 0.95 }} className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:bg-gray-800"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors p-3 rounded-lg hover:bg-gray-800"
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
              
              {/* Mobile Tools Section */}
              <div className="pt-3 border-t border-gray-800">
                <div className="text-sm font-medium text-gray-500 mb-2 px-3">Tools</div>
                {toolsItems.map((tool) => (
                  <Link
                    key={tool.label}
                    to={tool.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors p-3 rounded-lg hover:bg-gray-800"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
              
              <div className="pt-3 border-t border-gray-800">
                {user ? (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-red-900 text-red-400 hover:bg-red-900/30"
                    onClick={signOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" className="block mt-2" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                      <Code className="h-4 w-4 mr-2" />
                      Start Coding
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};