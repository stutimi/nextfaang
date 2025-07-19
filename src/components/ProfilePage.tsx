import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Trophy, 
  Star, 
  Code, 
  Calendar,
  Activity,
  Target,
  Zap,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Edit3
} from 'lucide-react';
import {
  SafeSignedIn as SignedIn,
  SafeSignedOut as SignedOut,
  ClerkUserProvider,
} from '@/components/ClerkWrapper';

// Helper function to get user data from Clerk user object
const getUserData = (user: any) => {
  if (!user) {
    return {
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      avatar: '',
      initials: 'AC',
      level: 'Expert',
      points: 2450,
      streak: 15,
      problemsSolved: 127,
      joinDate: 'January 2024',
      bio: 'Passionate software engineer with a love for competitive programming and system design.',
      location: 'San Francisco, CA',
      company: 'Tech Innovators Inc.',
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'System Design'],
      achievements: [
        { name: 'First Problem Solved', icon: '🎯', date: 'Jan 15, 2024' },
        { name: '10 Day Streak', icon: '🔥', date: 'Feb 1, 2024' },
        { name: '50 Problems Solved', icon: '💯', date: 'Feb 20, 2024' },
        { name: 'Contest Winner', icon: '🏆', date: 'Mar 5, 2024' },
      ],
      recentActivity: [
        { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', date: '2 hours ago' },
        { type: 'solved', problem: 'Binary Tree Inorder', difficulty: 'Medium', date: '1 day ago' },
        { type: 'attempted', problem: 'Merge K Sorted Lists', difficulty: 'Hard', date: '2 days ago' },
      ],
      stats: {
        easy: { solved: 45, total: 60 },
        medium: { solved: 62, total: 120 },
        hard: { solved: 20, total: 80 },
      }
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
    joinDate,
    bio: user.publicMetadata?.bio || 'Passionate software engineer with a love for competitive programming and system design.',
    location: user.publicMetadata?.location || 'San Francisco, CA',
    company: user.publicMetadata?.company || 'Tech Innovators Inc.',
    skills: user.publicMetadata?.skills || ['JavaScript', 'Python', 'React', 'Node.js', 'System Design'],
    achievements: [
      { name: 'First Problem Solved', icon: '🎯', date: 'Jan 15, 2024' },
      { name: '10 Day Streak', icon: '🔥', date: 'Feb 1, 2024' },
      { name: '50 Problems Solved', icon: '💯', date: 'Feb 20, 2024' },
      { name: 'Contest Winner', icon: '🏆', date: 'Mar 5, 2024' },
    ],
    recentActivity: [
      { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', date: '2 hours ago' },
      { type: 'solved', problem: 'Binary Tree Inorder', difficulty: 'Medium', date: '1 day ago' },
      { type: 'attempted', problem: 'Merge K Sorted Lists', difficulty: 'Hard', date: '2 days ago' },
    ],
    stats: {
      easy: { solved: 45, total: 60 },
      medium: { solved: 62, total: 120 },
      hard: { solved: 20, total: 80 },
    }
  };
};

// Mock user data - in a real app, this would come from Clerk and your backend
const mockUserData = {
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatar: '',
  initials: 'AC',
  level: 'Expert',
  points: 2450,
  streak: 15,
  problemsSolved: 127,
  joinDate: 'January 2024',
  bio: 'Passionate software engineer with a love for competitive programming and system design.',
  location: 'San Francisco, CA',
  company: 'Tech Innovators Inc.',
  skills: ['JavaScript', 'Python', 'React', 'Node.js', 'System Design'],
  achievements: [
    { name: 'First Problem Solved', icon: '🎯', date: 'Jan 15, 2024' },
    { name: '10 Day Streak', icon: '🔥', date: 'Feb 1, 2024' },
    { name: '50 Problems Solved', icon: '💯', date: 'Feb 20, 2024' },
    { name: 'Contest Winner', icon: '🏆', date: 'Mar 5, 2024' },
  ],
  recentActivity: [
    { type: 'solved', problem: 'Two Sum', difficulty: 'Easy', date: '2 hours ago' },
    { type: 'solved', problem: 'Binary Tree Inorder', difficulty: 'Medium', date: '1 day ago' },
    { type: 'attempted', problem: 'Merge K Sorted Lists', difficulty: 'Hard', date: '2 days ago' },
  ],
  stats: {
    easy: { solved: 45, total: 60 },
    medium: { solved: 62, total: 120 },
    hard: { solved: 20, total: 80 },
  }
};

export const ProfilePage = () => {
  return (
    <ClerkUserProvider>
      {({ user, isLoaded, isSignedIn }) => (
        <ProfilePageContent user={user} isLoaded={isLoaded} isSignedIn={isSignedIn} />
      )}
    </ClerkUserProvider>
  );
};

const ProfilePageContent = ({ user, isLoaded, isSignedIn }: { user: any, isLoaded: boolean, isSignedIn: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-xl animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const userData = getUserData(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {!isSignedIn && (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to view your profile
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {isSignedIn && (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="glass-card border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="w-24 h-24 ring-4 ring-primary/30">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {userData.name}
                        </h1>
                        <p className="text-muted-foreground mb-2">{userData.email}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-sm">
                            {userData.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Member since {userData.joinDate}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                    
                    <p className="text-foreground mb-4">{userData.bio}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">{userData.points}</div>
                        <div className="text-sm text-muted-foreground">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Activity className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">{userData.streak}</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Code className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">{userData.problemsSolved}</div>
                        <div className="text-sm text-muted-foreground">Solved</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Star className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">4.8</div>
                        <div className="text-sm text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem Solving Stats */}
                <Card className="glass-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Problem Solving
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Easy</span>
                        <span>{userData.stats.easy.solved}/{userData.stats.easy.total}</span>
                      </div>
                      <Progress value={(userData.stats.easy.solved / userData.stats.easy.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Medium</span>
                        <span>{userData.stats.medium.solved}/{userData.stats.medium.total}</span>
                      </div>
                      <Progress value={(userData.stats.medium.solved / userData.stats.medium.total) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Hard</span>
                        <span>{userData.stats.hard.solved}/{userData.stats.hard.total}</span>
                      </div>
                      <Progress value={(userData.stats.hard.solved / userData.stats.hard.total) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="glass-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your coding journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Progress tracking coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">{achievement.date}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div className="flex-1">
                          <div className="font-medium">
                            {activity.type === 'solved' ? 'Solved' : 'Attempted'} {activity.problem}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.difficulty} • {activity.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
