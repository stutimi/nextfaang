import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, Trophy, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthContext } from '@/components/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthContext();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error('Failed to sign out');
      } else {
        toast.success('Signed out successfully');
        setIsOpen(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  // Enhanced user name extraction with multiple fallbacks
  const userName = user.user_metadata?.full_name || 
                   user.user_metadata?.name || 
                   user.user_metadata?.display_name ||
                   user.user_metadata?.preferred_username ||
                   (user.email ? user.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : null) ||
                   'User';
  
  const userEmail = user.email || '';
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';
  
  // Generate initials from name or email
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || userEmail.slice(0, 2).toUpperCase();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-primary/10 rounded-xl p-2 max-w-64"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-primary/20 text-primary text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col items-start min-w-0">
          <span className="text-sm font-medium truncate max-w-32">{userName}</span>
          <span className="text-xs text-muted-foreground truncate max-w-32">{userEmail}</span>
        </div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl shadow-primary/10 z-50 overflow-hidden"
            >
              {/* User Info */}
              <div className="p-4 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {userName}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  to="/profile-settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-primary/10 transition-colors duration-200 group"
                >
                  <User className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-medium">Profile Settings</span>
                </Link>

                <button
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-primary/10 transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-medium">Settings</span>
                </button>

                <button
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-primary/10 transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Trophy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-medium">Achievements</span>
                </button>

                <button
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-primary/10 transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Code className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm font-medium">My Solutions</span>
                </button>

                <div className="border-t border-border/30 mt-2 pt-2">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 group"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}