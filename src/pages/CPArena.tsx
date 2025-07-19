import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "./CPArena.css";
import { Navbar } from "@/components/Navbar";
import { CodingArena } from "@/components/CodingArena";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sword, Trophy, Users, Bot, Star, Target, Crown, Globe, Clock, Zap, Sparkles, Medal, Flame, Eye, Code } from "lucide-react";
import { VoiceEffects } from "@/components/VoiceEffects";
import { TournamentBracket } from "@/components/arena/TournamentBracket";
import { SpectatorMode } from "@/components/arena/SpectatorMode";
import { SkillMatchmaking } from "@/components/arena/SkillMatchmaking";
import { CodeEditor } from "@/components/arena/CodeEditor";
import { FloatingParticles } from "@/components/arena/FloatingParticles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CPArena = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("arena");
  const [showLeaderboardDetails, setShowLeaderboardDetails] = useState(false);
  const [showSpectatorMode, setShowSpectatorMode] = useState(false);
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [showTournamentDetails, setShowTournamentDetails] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, handle: "tourist", country: "🇧🇾", rating: 3979, wins: 245, losses: 12 },
    { rank: 2, handle: "Petr", country: "🇺🇸", rating: 3516, wins: 198, losses: 24 },
    { rank: 3, handle: "Benq", country: "🇺🇸", rating: 3493, wins: 187, losses: 31 },
    { rank: 4, handle: "Radewoosh", country: "🇵🇱", rating: 3472, wins: 176, losses: 29 },
    { rank: 5, handle: "Um_nik", country: "🇷🇺", rating: 3438, wins: 165, losses: 35 },
    { rank: 6, handle: "ecnerwala", country: "🇺🇸", rating: 3354, wins: 159, losses: 42 },
    { rank: 7, handle: "Endagorion", country: "🇷🇺", rating: 3335, wins: 152, losses: 47 },
    { rank: 8, handle: "scott_wu", country: "🇺🇸", rating: 3304, wins: 148, losses: 51 },
    { rank: 9, handle: "mnbvmar", country: "🇷🇺", rating: 3280, wins: 143, losses: 56 },
    { rank: 10, handle: "I_love_Tanya_Romanova", country: "🇯🇵", rating: 3278, wins: 141, losses: 58 },
  ];

  // Mock upcoming tournaments
  const upcomingTournaments = [
    { 
      id: 1, 
      name: "NextFaang Grand Prix", 
      date: "2023-12-15", 
      time: "18:00 UTC",
      participants: 1245,
      prize: "$5,000",
      difficulty: "Hard",
      status: "registration"
    },
    { 
      id: 2, 
      name: "Algorithm Masters", 
      date: "2023-12-22", 
      time: "15:00 UTC",
      participants: 876,
      prize: "$2,500",
      difficulty: "Medium",
      status: "registration"
    },
    { 
      id: 3, 
      name: "Code Titans Showdown", 
      date: "2023-12-29", 
      time: "20:00 UTC",
      participants: 1032,
      prize: "$3,500",
      difficulty: "Hard",
      status: "upcoming"
    },
  ];

  // Mock recent matches
  const recentMatches = [
    { 
      id: 1, 
      player1: "tourist", 
      player2: "Petr", 
      winner: "tourist", 
      score: "3-2",
      date: "2023-12-01"
    },
    { 
      id: 2, 
      player1: "Benq", 
      player2: "Radewoosh", 
      winner: "Benq", 
      score: "3-1",
      date: "2023-12-02"
    },
    { 
      id: 3, 
      player1: "Um_nik", 
      player2: "ecnerwala", 
      winner: "ecnerwala", 
      score: "3-2",
      date: "2023-12-03"
    },
  ];

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return <Star className="h-4 w-4 text-green-400" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-400" />;
      case 'hard': return <Crown className="h-4 w-4 text-red-400" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingParticles />
      <Helmet>
        <title>CP Arena | NextFaang</title>
        <meta name="description" content="Compete in real-time coding battles at NextFaang CP Arena" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold rainbow-text mb-4">
            NextFaang CP Arena
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where legendary coders battle in real-time competitive programming duels.
            Test your skills, climb the leaderboard, and forge your coding legacy.
          </p>
        </motion.div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="arena" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="arena" className="text-lg py-3">
              <Sword className="h-5 w-5 mr-2" />
              Arena
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-lg py-3">
              <Trophy className="h-5 w-5 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="text-lg py-3">
              <Globe className="h-5 w-5 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="spectate" className="text-lg py-3">
              <Eye className="h-5 w-5 mr-2" />
              Spectate
            </TabsTrigger>
            <TabsTrigger value="history" className="text-lg py-3">
              <Clock className="h-5 w-5 mr-2" />
              Match History
            </TabsTrigger>
          </TabsList>
          
          {/* Arena Tab */}
          <TabsContent value="arena" className="mt-0">
            {showMatchmaking ? (
              <div className="max-w-md mx-auto">
                <SkillMatchmaking 
                  userRating={1500}
                  onMatchFound={(matchData) => {
                    setShowMatchmaking(false);
                    toast({
                      title: "Match Found! ⚔️",
                      description: `Opponent: ${matchData.opponent.handle} (${matchData.opponent.rating})`,
                    });
                  }}
                  onCancel={() => setShowMatchmaking(false)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="magical-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Skill-Based Matchmaking
                      </CardTitle>
                      <CardDescription>
                        Find opponents with similar skill levels for balanced matches
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-medium">Your Rating: 1500</div>
                            <div className="text-sm text-muted-foreground">Expert</div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Top 25%
                          </Badge>
                        </div>
                        
                        <Progress value={65} className="h-2" />
                        
                        <div className="text-xs text-muted-foreground flex justify-between">
                          <span>1400</span>
                          <span>1600</span>
                        </div>
                        
                        <Button 
                          className="w-full button-3d sparkle-trail pulse-animation"
                          onClick={() => setShowMatchmaking(true)}
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Find Match
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="magical-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Medal className="h-5 w-5 text-yellow-400" />
                        Practice Arena
                      </CardTitle>
                      <CardDescription>
                        Improve your skills with AI opponents or specific problem types
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                            <Bot className="h-6 w-6 text-primary" />
                            <span>AI Bot Match</span>
                          </Button>
                          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                            <Flame className="h-6 w-6 text-red-400" />
                            <span>Daily Challenge</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <CodingArena />
              </div>
            )}
          </TabsContent>
          
          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="magical-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      Global Leaderboard
                    </CardTitle>
                    <CardDescription>
                      Top competitive programmers ranked by performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4">Rank</th>
                            <th className="text-left py-3 px-4">Handle</th>
                            <th className="text-left py-3 px-4">Country</th>
                            <th className="text-right py-3 px-4">Rating</th>
                            <th className="text-right py-3 px-4">W/L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboardData.map((user) => (
                            <motion.tr 
                              key={user.rank}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: user.rank * 0.05 }}
                              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                            >
                              <td className="py-3 px-4">
                                <Badge 
                                  variant="outline" 
                                  className={user.rank <= 3 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : ""}
                                >
                                  #{user.rank}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 font-medium">{user.handle}</td>
                              <td className="py-3 px-4">{user.country}</td>
                              <td className="py-3 px-4 text-right font-mono">{user.rating}</td>
                              <td className="py-3 px-4 text-right">
                                <span className="text-green-400">{user.wins}</span>
                                <span className="text-muted-foreground">/</span>
                                <span className="text-red-400">{user.losses}</span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowLeaderboardDetails(!showLeaderboardDetails)}
                      >
                        {showLeaderboardDetails ? "Show Less" : "Show More"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="magical-glow h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Leaderboard Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Rating Distribution</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Legendary Grandmaster (3000+)</span>
                          <span>12 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "2%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Grandmaster (2600-2999)</span>
                          <span>48 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-400" style={{ width: "5%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Master (2200-2599)</span>
                          <span>156 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400" style={{ width: "12%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Candidate Master (1900-2199)</span>
                          <span>342 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-400" style={{ width: "18%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Expert (1600-1899)</span>
                          <span>578 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-400" style={{ width: "25%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>Specialist (1400-1599)</span>
                          <span>864 users</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: "38%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Top Countries</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>🇺🇸 USA</span>
                          <Badge variant="outline">1,245 users</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🇮🇳 India</span>
                          <Badge variant="outline">1,128 users</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🇷🇺 Russia</span>
                          <Badge variant="outline">876 users</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🇨🇳 China</span>
                          <Badge variant="outline">742 users</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>🇯🇵 Japan</span>
                          <Badge variant="outline">534 users</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Spectate Tab */}
          <TabsContent value="spectate" className="mt-0">
            {showSpectatorMode ? (
              <SpectatorMode
                matchId="match-123"
                participant1={{
                  id: "user1",
                  handle: "tourist",
                  country: "🇧🇾",
                  rating: 3979
                }}
                participant2={{
                  id: "user2",
                  handle: "Petr",
                  country: "🇺🇸",
                  rating: 3516
                }}
                problems={[{title: "Problem 1"}, {title: "Problem 2"}, {title: "Problem 3"}]}
                startTime={new Date().toISOString()}
                viewers={128}
                onClose={() => setShowSpectatorMode(false)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="magical-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-primary" />
                        Live Matches
                      </CardTitle>
                      <CardDescription>
                        Watch top competitive programmers battle in real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((match) => (
                          <div 
                            key={match}
                            className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
                            onClick={() => setShowSpectatorMode(true)}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                                    LIVE
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">Started 10 minutes ago</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <span>🇧🇾</span>
                                    <span className="font-medium">tourist</span>
                                    <span className="text-xs text-muted-foreground">(3979)</span>
                                  </div>
                                  <span className="text-muted-foreground">vs</span>
                                  <div className="flex items-center gap-1">
                                    <span>🇺🇸</span>
                                    <span className="font-medium">Petr</span>
                                    <span className="text-xs text-muted-foreground">(3516)</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                  <span>128 viewers</span>
                                </div>
                                <Button size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Watch
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="magical-glow h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Featured Streamers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[1, 2, 3].map((streamer) => (
                        <div key={streamer} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>CP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">CodeMaster{streamer}</div>
                            <div className="text-sm text-muted-foreground">Solving Div1 problems</div>
                          </div>
                          <Badge className="ml-auto">Live</Badge>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        View All Streamers
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="magical-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Upcoming Tournaments
                    </CardTitle>
                    <CardDescription>
                      Join official NextFaang competitive programming tournaments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {showTournamentDetails ? (
                      <div className="space-y-6">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowTournamentDetails(false)}
                          className="mb-4"
                        >
                          Back to tournaments
                        </Button>
                        
                        <TournamentBracket
                          tournamentId="t-123"
                          tournamentName="NextFaang Grand Prix"
                          matches={[
                            {
                              id: "m1",
                              round: 1,
                              position: 1,
                              participant1: { id: "p1", handle: "tourist", country: "🇧🇾", rating: 3979 },
                              participant2: { id: "p2", handle: "Petr", country: "🇺🇸", rating: 3516 },
                              winner: "p1",
                              score: "2-1",
                              status: "completed"
                            },
                            {
                              id: "m2",
                              round: 1,
                              position: 2,
                              participant1: { id: "p3", handle: "Benq", country: "🇺🇸", rating: 3493 },
                              participant2: { id: "p4", handle: "Radewoosh", country: "🇵🇱", rating: 3472 },
                              winner: "p3",
                              score: "2-0",
                              status: "completed"
                            },
                            {
                              id: "m3",
                              round: 2,
                              position: 1,
                              participant1: { id: "p1", handle: "tourist", country: "🇧🇾", rating: 3979 },
                              participant2: { id: "p3", handle: "Benq", country: "🇺🇸", rating: 3493 },
                              status: "live",
                              scheduledTime: "Live Now"
                            }
                          ]}
                        />
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Tournament Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Start Date:</span>
                                <span>December 15, 2023</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">End Date:</span>
                                <span>December 17, 2023</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Format:</span>
                                <span>Single Elimination</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Participants:</span>
                                <span>16 players</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Prize Pool:</span>
                                <span>$5,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">Live</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Rules & Format</h3>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                            <li>Single elimination bracket with best-of-3 matches</li>
                            <li>Each match consists of 3 algorithmic problems</li>
                            <li>First player to solve 2 problems wins the match</li>
                            <li>Time limit: 60 minutes per match</li>
                            <li>Languages allowed: C++, Java, Python</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                    <div className="space-y-4">
                      {upcomingTournaments.map((tournament) => (
                        <motion.div
                          key={tournament.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: tournament.id * 0.1 }}
                          className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => setShowTournamentDetails(true)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-medium flex items-center gap-2">
                                {tournament.name}
                                <Badge 
                                  variant="outline" 
                                  className={getDifficultyColor(tournament.difficulty)}
                                >
                                  {getDifficultyIcon(tournament.difficulty)}
                                  <span className="ml-1">{tournament.difficulty}</span>
                                </Badge>
                              </h3>
                              <div className="text-sm text-muted-foreground mt-1">
                                {new Date(tournament.date).toLocaleDateString()} at {tournament.time}
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-sm">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{tournament.participants} participants</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <Trophy className="h-4 w-4 text-yellow-400" />
                                  <span>{tournament.prize}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Button 
                                className={tournament.status === "registration" ? "bg-primary" : "bg-muted"}
                                disabled={tournament.status !== "registration"}
                              >
                                {tournament.status === "registration" ? "Register Now" : "Coming Soon"}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    )}

                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="magical-glow h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      Tournament Champions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">November Grand Prix</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-medium">tourist</div>
                          <div className="text-sm text-muted-foreground">🇧🇾 Belarus</div>
                        </div>
                        <Badge className="ml-auto">$2,500</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">October Algorithm Masters</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-medium">Benq</div>
                          <div className="text-sm text-muted-foreground">🇺🇸 USA</div>
                        </div>
                        <Badge className="ml-auto">$1,500</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">September Code Titans</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-medium">Petr</div>
                          <div className="text-sm text-muted-foreground">🇺🇸 USA</div>
                        </div>
                        <Badge className="ml-auto">$2,000</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View All Champions</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Match History Tab */}
          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="magical-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Recent Matches
                    </CardTitle>
                    <CardDescription>
                      Latest competitive programming duels on NextFaang
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMatches.map((match) => (
                        <motion.div
                          key={match.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: match.id * 0.1 }}
                          className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-lg font-medium">
                                  <span className={match.winner === match.player1 ? "text-green-400" : ""}>
                                    {match.player1}
                                  </span>
                                  <span className="text-muted-foreground mx-2">vs</span>
                                  <span className={match.winner === match.player2 ? "text-green-400" : ""}>
                                    {match.player2}
                                  </span>
                                </div>
                                <Badge variant="outline">{match.score}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {new Date(match.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Button>Load More Matches</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="magical-glow h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Most Wins (This Month)</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">tourist</span>
                          <Badge variant="outline" className="bg-green-500/20 text-green-400">32 wins</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Benq</span>
                          <Badge variant="outline" className="bg-green-500/20 text-green-400">28 wins</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Petr</span>
                          <Badge variant="outline" className="bg-green-500/20 text-green-400">25 wins</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Highest Win Rate</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">tourist</span>
                          <Badge variant="outline">95.3%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Petr</span>
                          <Badge variant="outline">89.2%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Benq</span>
                          <Badge variant="outline">85.8%</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Fastest Solutions</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">tourist</span>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">1m 24s</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Benq</span>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">1m 52s</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Um_nik</span>
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">2m 05s</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Code Editor Demo */}
      <div className="fixed bottom-4 right-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 rounded-full shadow-lg border-primary/50"
                onClick={() => {
                  toast({
                    title: "Code Editor",
                    description: "This feature is coming soon!",
                  });
                }}
              >
                <Code className="h-5 w-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Code Editor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <VoiceEffects />
    </div>
  );
};

export default CPArena;

// Enhanced UI styles for CP Arena
document.documentElement.style.setProperty('--primary-rgb', '56, 189, 248');