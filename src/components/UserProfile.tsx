import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  Trophy, 
  Star, 
  Code, 
  ChevronDown,
  UserCircle,
  Activity,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SafeSignedIn as SignedIn,
  SafeSignedOut as SignedOut,
  SafeSignInButton as SignInButton,
  SafeUserButton as UserButton,
  ClerkUserProvider,
} from '@/components/ClerkWrapper';

// Helper function to get user data from Clerk user object
const getUserData = (user: any) => {
  if (!user) {
    return {
      name: 'Code Warrior',
      email: 'warrior@nextfaang.com',
      avatar: '',
      initials: 'CW',
      level: 'Expert',
      points: 2450,
      streak: 15,
      problemsSolved: 127,
      joinDate: 'Jan 2024'
    };
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const fullName = `${firstName} ${lastName}`.trim() || user.username || 'User';
  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || '';
  const avatar = user.imageUrl || user.profileImageUrl || '';

  // Generate initials from name
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  // Format join date
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    : 'Recently';

  return {
    name: fullName,
    email,
    avatar,
    initials,
    level: 'Expert', // This would come from your backend
    points: 2450, // This would come from your backend
    streak: 15, // This would come from your backend
    problemsSolved: 127, // This would come from your backend
    joinDate
  };
};

export const UserProfile = () => {
  return (
    <ClerkUserProvider>
      {({ user, isLoaded, isSignedIn }) => (
        <UserProfileContent user={user} isLoaded={isLoaded} isSignedIn={isSignedIn} />
      )}
    </ClerkUserProvider>
  );
};

const UserProfileContent = ({ user, isLoaded, isSignedIn }: { user: any, isLoaded: boolean, isSignedIn: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  const userData = getUserData(user);

  // Debug: Log user data to console (remove in production)
  if (user && process.env.NODE_ENV === 'development') {
    console.log('Clerk User Data:', user);
    console.log('Processed User Data:', userData);
  }

  return (
    <div className="flex items-center gap-3">
      {/* When user is signed out */}
      {!isSignedIn && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <SignInButton>
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </SignInButton>

          {/* Pulsing indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </motion.div>
      )}

      {/* When user is signed in */}
      {isSignedIn && (
        <div className="relative" ref={dropdownRef}>
          {/* User Profile Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
          >
            <Avatar className="w-8 h-8 ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                {userData.initials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-foreground">
                {userData.name}
                {user && process.env.NODE_ENV === 'development' && (
                  <span className="ml-1 text-xs text-green-500">✓</span>
                )}
              </span>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {userData.level}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {userData.points} pts
                </span>
              </div>
            </div>
            
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dropdown Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-xl shadow-lg z-[100] overflow-hidden"
            >
              {/* Profile Header */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/30">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold text-lg">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {userData.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Joined {userData.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="p-4 border-b border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">{userData.points}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Activity className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">{userData.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Code className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-lg font-semibold text-foreground">{userData.problemsSolved}</div>
                    <div className="text-xs text-muted-foreground">Solved</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-200"
                >
                  <UserCircle className="h-4 w-4" />
                  View Profile
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  Activity History
                </button>
                <div className="border-t border-border my-2"></div>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonTrigger: "w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-destructive/10 rounded-lg transition-colors duration-200",
                      userButtonPopoverCard: "hidden", // Hide the default popover since we're using our custom one
                    }
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
