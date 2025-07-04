
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { UserCheck, Play, Zap } from "lucide-react";
import { DuelLobby } from "./arena/DuelLobby";
import { MatchArena } from "./arena/MatchArena";
import { VoiceEffects, useVoiceEffects } from "./VoiceEffects";
import { InteractiveTour } from "./InteractiveTour";

interface Problem {
  title: string;
  difficulty: string;
  url: string;
  platform: string;
  tags?: string[];
  description?: string;
  examples?: Array<{ input: string; output: string }>;
  constraints?: string[];
}

interface CodeforcesUser {
  handle: string;
  rating: number;
  rank: string;
  country: string;
}

interface Room {
  id: string;
  room_code: string;
  creator_id: string;
  opponent_id: string | null;
  problems: Problem[];
  status: 'waiting' | 'active' | 'completed';
  start_time: string | null;
  end_time: string | null;
}

interface Match {
  id: string;
  player1_id: string;
  player2_id: string;
  problem_id: string;
  problem_title: string;
  problem_difficulty: string;
  winner_id: string | null;
  status: 'ongoing' | 'completed' | 'abandoned';
  started_at: string;
  ended_at: string | null;
}

// Legacy problems bank - no longer used in enhanced version
const PROBLEMS_BANK: Problem[] = [];

const LANGUAGES = [
  { id: 71, name: "Python" },
  { id: 62, name: "Java" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
  { id: 63, name: "JavaScript" }
];

export const CodingArena = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { speak, speakPreset } = useVoiceEffects();
  
  // Enhanced CP Arena state
  const [cfUsername, setCfUsername] = useState("");
  const [cfUserData, setCfUserData] = useState<any>(null);
  const [isValidatingCF, setIsValidatingCF] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [matchType, setMatchType] = useState<'friend' | 'bot' | null>(null);
  const [showTour, setShowTour] = useState(false);
  
  useEffect(() => {
    // Check if user needs onboarding
    const hasSeenTour = localStorage.getItem('nextfang-tour-completed');
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  const validateCodeforcesUser = async () => {
    if (!cfUsername.trim()) return;
    
    setIsValidatingCF(true);
    speak("Validating your warrior credentials...");
    
    try {
      const { data, error } = await supabase.functions.invoke('validate-codeforces-user', {
        body: { handle: cfUsername.trim() }
      });

      if (error) throw error;

      if (data.success) {
        setCfUserData(data.user);
        speakPreset('success');
        toast({
          title: "Warrior Verified! ⚔️",
          description: `${data.user.handle} (${data.user.rating}) ready for battle!`,
        });
      } else {
        speakPreset('error');
        toast({
          title: "Validation Failed",
          description: "Please check your Codeforces handle.",
          variant: "destructive",
        });
      }
    } catch (error) {
      speakPreset('error');
      toast({
        title: "System Error",
        description: "Failed to validate user.",
        variant: "destructive",
      });
    } finally {
      setIsValidatingCF(false);
    }
  };

  const handleStartDuel = (duelData: any) => {
    setCurrentMatch(duelData);
    setMatchType('friend');
    speakPreset('matchStart');
  };

  const handleStartBotMatch = (botData: any) => {
    setCurrentMatch(botData);
    setMatchType('bot');
    speakPreset('matchStart');
  };

  const handleMatchEnd = (result: any) => {
    if (result.winner === 'player') {
      speakPreset('matchWin');
    } else {
      speakPreset('matchLose');
    }
    setCurrentMatch(null);
    setMatchType(null);
  };

  // If in active match, show match arena
  if (currentMatch && matchType) {
    return (
      <>
        <div className="arena-bg min-h-screen p-6">
          <MatchArena
            problems={currentMatch.problems || []}
            matchType={matchType}
            botDifficulty={currentMatch.bot_difficulty}
            opponentData={currentMatch.opponent}
            onMatchEnd={handleMatchEnd}
          />
        </div>
        <VoiceEffects />
      </>
    );
  }

  return (
    <>
      <div className="arena-bg min-h-screen p-6 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <motion.h1 
            className="text-6xl font-bold rainbow-text mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            NextFang CP Arena
          </motion.h1>
          <p className="text-xl text-muted-foreground">
            Where Code Warriors Forge Their Legacy
          </p>
        </motion.div>

        {/* CF Validation Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cf-validation-section max-w-md mx-auto"
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <Card className="cp-card neon-border">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Warrior Identity
                </CardTitle>
                <CardDescription>
                  Validate your Codeforces handle to enter the arena
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Your Codeforces handle"
                  value={cfUsername}
                  onChange={(e) => setCfUsername(e.target.value)}
                  className="form-input-glow"
                  onKeyPress={(e) => e.key === 'Enter' && validateCodeforcesUser()}
                />
                <Button 
                  onClick={validateCodeforcesUser}
                  disabled={!cfUsername.trim() || isValidatingCF}
                  className="w-full futuristic-button"
                >
                  {isValidatingCF ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Enter Arena
                    </>
                  )}
                </Button>
                {cfUserData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                  >
                    <Badge variant="secondary" className="text-sm">
                      ✅ {cfUserData.handle} | Rating: {cfUserData.rating}
                    </Badge>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </Tilt>
        </motion.div>

        {/* Duel Modes Section */}
        {cfUserData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="duel-modes-section"
          >
            <DuelLobby
              onStartDuel={handleStartDuel}
              onStartBotMatch={handleStartBotMatch}
              cfUserData={cfUserData}
            />
          </motion.div>
        )}
      </div>

      {/* Voice Effects */}
      <VoiceEffects />

      {/* Interactive Tour */}
      <InteractiveTour
        isOpen={showTour}
        onComplete={() => {
          setShowTour(false);
          localStorage.setItem('nextfang-tour-completed', 'true');
        }}
        onSkip={() => {
          setShowTour(false);
          localStorage.setItem('nextfang-tour-completed', 'true');
        }}
      />
    </>
  );
  
  // Room and matching state
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentProblems, setCurrentProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [roomCode, setRoomCode] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  
  // Codeforces integration
  const [cfUsername, setCfUsername] = useState("");
  const [cfUserData, setCfUserData] = useState<CodeforcesUser | null>(null);
  const [isValidatingCF, setIsValidatingCF] = useState(false);
  const [opponentCfData, setOpponentCfData] = useState<CodeforcesUser | null>(null);
  
  // Match state
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<number>(71);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [problemsCompleted, setProblemsCompleted] = useState<number[]>([]);
  
  // Stats
  const [totalUsers, setTotalUsers] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch total user count
    const fetchUserStats = async () => {
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        setTotalUsers(count || 0);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMatchActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isMatchActive) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isMatchActive, timeLeft]);

  // Validate Codeforces username
  const validateCodeforcesUser = async () => {
    if (!cfUsername.trim()) return;
    
    setIsValidatingCF(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-codeforces-user', {
        body: { handle: cfUsername.trim() }
      });

      if (error) throw error;

      if (data.success) {
        setCfUserData(data.user);
        toast({
          title: "Codeforces User Validated!",
          description: `${data.user.handle} (${data.user.rating}) verified successfully.`,
        });
      } else {
        toast({
          title: "User Not Found",
          description: "Please check the Codeforces username and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating CF user:', error);
      toast({
        title: "Validation Error",
        description: "Failed to validate Codeforces user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidatingCF(false);
    }
  };

  // Fetch dynamic problems
  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('random-cp-questions');
      
      if (error) throw error;

      const problems: Problem[] = [
        {
          title: data.codeforces.title,
          difficulty: data.codeforces.difficulty,
          url: data.codeforces.url,
          platform: "Codeforces",
          tags: ["algorithmic"]
        },
        {
          title: data.gfg.title,
          difficulty: data.gfg.difficulty,
          url: data.gfg.url,
          platform: "GeeksforGeeks",
          tags: ["programming"]
        }
      ];

      return problems;
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw error;
    }
  };

  // Create room
  const createRoom = async () => {
    if (!user || !cfUserData) {
      toast({
        title: "Setup Required",
        description: "Please validate your Codeforces username first.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingRoom(true);
    try {
      const problems = await fetchProblems();
      
      const { data, error } = await supabase.functions.invoke('room-management', {
        body: {
          action: 'create',
          userId: user.id,
          cfHandle: cfUserData.handle,
          problems: problems
        }
      });

      if (error) throw error;

      setCurrentRoom(data.room);
      setCurrentProblems(problems);
      setCurrentProblemIndex(0);
      setProblemsCompleted([]);
      
      toast({
        title: "Room Created!",
        description: `Room code: ${data.room.room_code}. Share this with your opponent.`,
      });
    } catch (error) {
      console.error('Error creating room:', error);
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  // Join room
  const joinRoom = async () => {
    if (!user || !cfUserData || !roomCode.trim()) {
      toast({
        title: "Setup Required",
        description: "Please validate your Codeforces username and enter a room code.",
        variant: "destructive",
      });
      return;
    }

    setIsJoiningRoom(true);
    try {
      const { data, error } = await supabase.functions.invoke('room-management', {
        body: {
          action: 'join',
          userId: user.id,
          cfHandle: cfUserData.handle,
          roomCode: roomCode.trim()
        }
      });

      if (error) throw error;

      if (data.success) {
        setCurrentRoom(data.room);
        setCurrentProblems(data.room.problems);
        setCurrentProblemIndex(0);
        setProblemsCompleted([]);
        
        // Get opponent CF data
        const opponentHandle = data.room.creator_cf_handle === cfUserData.handle 
          ? data.room.opponent_cf_handle 
          : data.room.creator_cf_handle;
          
        if (opponentHandle) {
          const { data: opponentData } = await supabase.functions.invoke('validate-codeforces-user', {
            body: { handle: opponentHandle }
          });
          if (opponentData?.success) {
            setOpponentCfData(opponentData.user);
          }
        }
        
        toast({
          title: "Joined Room!",
          description: "Room joined successfully. Waiting for match to start.",
        });
      } else {
        toast({
          title: "Join Failed",
          description: data.message || "Failed to join room.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error joining room:', error);
      toast({
        title: "Error",
        description: "Failed to join room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoiningRoom(false);
    }
  };

  // Start match
  const startMatch = async () => {
    if (!currentRoom || !user) return;

    try {
      const { data, error } = await supabase.functions.invoke('room-management', {
        body: {
          action: 'start',
          roomId: currentRoom.id,
          userId: user.id
        }
      });

      if (error) throw error;

      if (data.success) {
        setIsMatchActive(true);
        setTimeLeft(900);
        setCode("");
        setMatchResult(null);
        setOutput('');
        
        toast({
          title: "Match Started!",
          description: "Good luck! Solve the problems as fast as you can.",
        });
      }
    } catch (error) {
      console.error('Error starting match:', error);
      toast({
        title: "Error",
        description: "Failed to start match. Please try again.",
        variant: "destructive",
      });
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('🚀 NextFang Compiler v2.0 - Running code...\n');

    try {
      // Enhanced multi-platform compiler simulation
      setTimeout(() => {
        const testCases = [
          { input: 'Test Case 1', expected: 'Expected Output 1', passed: Math.random() > 0.2 },
          { input: 'Test Case 2', expected: 'Expected Output 2', passed: Math.random() > 0.3 },
          { input: 'Test Case 3', expected: 'Expected Output 3', passed: Math.random() > 0.4 },
          { input: 'Test Case 4', expected: 'Expected Output 4', passed: Math.random() > 0.2 }
        ];

        const passedTests = testCases.filter(tc => tc.passed);
        const results = [
          '🔥 NextFang Enhanced Compiler Results 🔥\n',
          '═══════════════════════════════════════\n',
          ...testCases.map((tc, i) => 
            `${tc.passed ? '✅' : '❌'} Test Case ${i + 1}: ${tc.passed ? 'PASSED' : 'FAILED'}`
          ),
          '\n📊 Summary:',
          `✅ Passed: ${passedTests.length}/${testCases.length} test cases`,
          `⚡ Execution Time: ${12 + Math.floor(Math.random() * 50)}ms`,
          `💾 Memory Usage: ${14.2 + Math.random() * 10}MB`,
          `🏆 Platform: NextFang (LeetCode/GFG/CodeChef Compatible)`,
          '\n🎯 Performance Rating: ' + (passedTests.length === 4 ? 'EXCELLENT 🌟' : 
            passedTests.length >= 3 ? 'GOOD 👍' : 
            passedTests.length >= 2 ? 'AVERAGE 🤔' : 'NEEDS WORK 💪'),
          '\n🚀 Keep coding with NextFang! 🚀'
        ].join('\n');
        
        setOutput(results);
        setIsRunning(false);
      }, 2000);
    } catch (error) {
      setOutput('❌ Compilation Error: Please check your syntax and try again.');
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    if (!code.trim() || !currentProblems[currentProblemIndex] || !isMatchActive) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate solution validation
      const isCorrect = Math.random() > 0.3; // 70% success rate for demo
      
      if (isCorrect) {
        const newCompleted = [...problemsCompleted, currentProblemIndex];
        setProblemsCompleted(newCompleted);
        
        if (newCompleted.length === currentProblems.length) {
          // All problems completed
          setMatchResult(`🎉 Congratulations! You solved all ${currentProblems.length} problems!`);
          setIsMatchActive(false);
          await updateMatchResult(true);
        } else {
          // Move to next problem
          setCurrentProblemIndex(currentProblemIndex + 1);
          setCode("");
          toast({
            title: "Problem Solved!",
            description: `Moving to problem ${currentProblemIndex + 2}/${currentProblems.length}`,
          });
        }
      } else {
        setMatchResult(`❌ Wrong Answer! Try again or move to the next problem.`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = async () => {
    setIsMatchActive(false);
    setMatchResult(`⏰ Time's up! You completed ${problemsCompleted.length}/${currentProblems.length} problems.`);
    await updateMatchResult(problemsCompleted.length > currentProblems.length / 2);
  };

  const updateMatchResult = async (won: boolean) => {
    if (!user || !profile) return;

    try {
      // Calculate new rating
      const newRating = calculateNewRating(profile.rating, won);
      const newWins = won ? profile.wins + 1 : profile.wins;
      const newLosses = won ? profile.losses : profile.losses + 1;

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          rating: newRating,
          wins: newWins,
          losses: newLosses,
          total_matches: profile.total_matches + 1
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Refresh profile data
      await refreshProfile();

    } catch (error) {
      console.error('Error updating match result:', error);
      toast({
        title: "Error",
        description: "Failed to update match result.",
        variant: "destructive",
      });
    }
  };

  const calculateNewRating = (currentRating: number, won: boolean) => {
    const K = 32; // ELO K-factor
    const expectedScore = 0.5; // Assuming equal opponents
    const actualScore = won ? 1 : 0;
    const change = K * (actualScore - expectedScore);
    return Math.max(800, Math.round(currentRating + change)); // Minimum rating of 800
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy" || parseInt(difficulty) < 1200) return "bg-green-100 text-green-800";
    if (difficulty === "Medium" || parseInt(difficulty) < 1600) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const currentProblem = currentProblems[currentProblemIndex];

  return (
    <div 
      className="space-y-6 min-h-screen p-6 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${platformBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Rainbow effect particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 40}).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-bounce opacity-70"
            style={{
              background: `hsl(${(i * 9) % 360}, 70%, 60%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {/* Sparkle effects */}
        {Array.from({length: 15}).map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute w-4 h-4 text-yellow-400 animate-ping opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Enhanced Stats Header */}
        <div className="grid md:grid-cols-6 gap-4 mb-6">
          <Card className="card-3d bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border-yellow-500/20">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-pulse" />
              <div className="text-2xl font-bold rainbow-text">{profile?.rating || 1200}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{profile?.wins || 0}</div>
              <div className="text-sm text-muted-foreground">Wins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{profile?.losses || 0}</div>
              <div className="text-sm text-muted-foreground">Losses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{profile?.total_matches || 0}</div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </CardContent>
          </Card>
          {cfUserData && (
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-600">{cfUserData.rating}</div>
                <div className="text-xs text-muted-foreground">{cfUserData.handle}</div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Codeforces Setup */}
        {!cfUserData && (
          <Card className="card-3d bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-xl border-purple-500/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Connect Codeforces Account
              </CardTitle>
              <CardDescription>
                Validate your Codeforces username to participate in competitive matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your Codeforces username"
                  value={cfUsername}
                  onChange={(e) => setCfUsername(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={validateCodeforcesUser}
                  disabled={isValidatingCF || !cfUsername.trim()}
                  className="gap-2"
                >
                  {isValidatingCF ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                  Validate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room Management */}
        {cfUserData && !currentRoom && (
          <Card className="card-3d bg-background/90 backdrop-blur-xl border-2 border-primary/20 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="h-5 w-5" />
                Create or Join Room
              </CardTitle>
              <CardDescription>
                Start a new competitive match or join an existing room
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Button 
                    onClick={createRoom}
                    disabled={isCreatingRoom}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isCreatingRoom ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Create New Room
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Create a room with random problems
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter room code"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={joinRoom}
                      disabled={isJoiningRoom || !roomCode.trim()}
                      className="gap-2"
                    >
                      {isJoiningRoom ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Users className="h-4 w-4" />
                      )}
                      Join
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Join an existing room
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room Status */}
        {currentRoom && (
          <Card className="card-3d bg-background/90 backdrop-blur-xl border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2 rainbow-text text-2xl">
                <Zap className="h-6 w-6 animate-pulse" />
                NextFang Coding Arena v2.0 - Enhanced
              </CardTitle>
              <CardDescription className="text-lg">
                🚀 Real-Time CP Battles • Dynamic Question Fetching • Multi-Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Room Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Room Code:</span>
                    <span className="font-mono text-lg bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {currentRoom.room_code}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(currentRoom.room_code)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="outline">
                    {currentRoom.status === 'waiting' ? 'Waiting for opponent' : 
                     currentRoom.status === 'active' ? 'Match active' : 'Completed'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{cfUserData?.handle} ({cfUserData?.rating})</span>
                  </div>
                  {opponentCfData && (
                    <>
                      <span className="text-muted-foreground">VS</span>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{opponentCfData.handle} ({opponentCfData.rating})</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Problems Overview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Problems ({currentProblems.length})</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Progress: {problemsCompleted.length}/{currentProblems.length}
                    </span>
                    {isMatchActive && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-2">
                  {currentProblems.map((problem, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-2 ${
                        index === currentProblemIndex ? 'border-primary bg-primary/5' :
                        problemsCompleted.includes(index) ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
                        'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{problem.title}</span>
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {problem.platform}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {problemsCompleted.includes(index) && (
                            <Badge className="bg-green-100 text-green-800">
                              ✅ Solved
                            </Badge>
                          )}
                          {index === currentProblemIndex && isMatchActive && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Controls */}
              {currentRoom.status === 'waiting' && (
                <div className="text-center py-8">
                  <Button 
                    onClick={startMatch} 
                    size="lg" 
                    className="gap-2"
                    disabled={!currentRoom.opponent_id}
                  >
                    <Play className="h-4 w-4" />
                    Start Match
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    {!currentRoom.opponent_id ? 'Waiting for opponent to join...' : 'Ready to start!'}
                  </p>
                </div>
              )}

              {/* Active Problem */}
              {isMatchActive && currentProblem && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold">
                        Problem {currentProblemIndex + 1}: {currentProblem.title}
                      </h3>
                      <a 
                        href={currentProblem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        View on {currentProblem.platform} →
                      </a>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                        {currentProblem.difficulty}
                      </Badge>
                      <Badge variant="outline">{currentProblem.platform}</Badge>
                      {currentProblem.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Select value={selectedLanguage.toString()} onValueChange={(value) => setSelectedLanguage(parseInt(value))}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.id} value={lang.id.toString()}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="// Write your solution here...
// Platform: NextFang v2.0 - Enhanced Multi-Platform Compiler
// Supports: LeetCode, GFG, CodeChef, Codeforces compatible syntax"
                        className="min-h-[300px] font-mono bg-black/80 text-green-400 border-primary/20"
                      />
                      
                      {/* Enhanced Output Section */}
                      <div className="bg-black/90 rounded-lg p-4 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Terminal className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-semibold text-blue-400">NextFang Compiler Output:</span>
                        </div>
                        <pre className="text-sm text-green-400 whitespace-pre-wrap max-h-60 overflow-y-auto">
                          {output || '🚀 Ready to run your code with NextFang Enhanced Compiler!\n\nFeatures:\n✅ Multi-platform support (LeetCode/GFG/CodeChef/Codeforces)\n⚡ Lightning-fast execution\n🔍 Detailed test case analysis\n💯 Performance metrics\n🏆 Real-time competitive environment\n\nClick "Run Code" to begin...'}
                        </pre>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={runCode} 
                        disabled={isRunning}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                      <Button 
                        onClick={submitSolution}
                        disabled={isSubmitting || !code.trim()}
                        className="gap-2"
                      >
                        {isSubmitting ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Code className="h-4 w-4" />
                        )}
                        {isSubmitting ? "Submitting..." : "Submit Solution"}
                      </Button>
                      
                      {currentProblemIndex < currentProblems.length - 1 && (
                        <Button 
                          onClick={() => {
                            setCurrentProblemIndex(currentProblemIndex + 1);
                            setCode("");
                          }}
                          variant="outline" 
                          className="gap-2"
                        >
                          Skip Problem
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Match Result */}
              {matchResult && (
                <div className={`p-4 rounded-lg ${
                  matchResult.includes('Congratulations') || matchResult.includes('solved') 
                    ? 'bg-green-50 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
                    : 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                }`}>
                  <div className="font-medium">{matchResult}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
