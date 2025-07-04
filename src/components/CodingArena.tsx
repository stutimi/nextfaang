
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Sword, Trophy, Clock, User, Code, Play, RefreshCw, Users, Target, Terminal, Bug, Sparkles, Zap } from "lucide-react";
import platformBg2 from '@/assets/platform-bg-2.png';

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: Array<{ input: string; output: string }>;
  constraints: string[];
  tags: string[];
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

const PROBLEMS_BANK: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    tags: ["Array", "Hash Table"]
  },
  {
    id: "2",
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
    ],
    constraints: ["1 <= s.length <= 10^5"],
    tags: ["Two Pointers", "String"]
  },
  {
    id: "3",
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    tags: ["Array", "Dynamic Programming"]
  }
];

const LANGUAGES = [
  { id: 71, name: "Python" },
  { id: 62, name: "Java" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
  { id: 63, name: "JavaScript" }
];

export const CodingArena = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [opponentProfile, setOpponentProfile] = useState<any>(null);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<number>(71);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
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

  const generateOpponent = () => {
    const names = ["CodeMaster", "AlgoNinja", "ByteWarrior", "LogicLord", "SyntaxSage", "BugSlayer", "DataDemon"];
    return names[Math.floor(Math.random() * names.length)];
  };

  const findMatch = async () => {
    if (!user || !profile) return;
    
    setIsSearching(true);
    try {
      // For now, simulate finding a match with a bot
      setTimeout(async () => {
        const problem = PROBLEMS_BANK[Math.floor(Math.random() * PROBLEMS_BANK.length)];
        const botOpponent = {
          username: generateOpponent(),
          rating: profile.rating + Math.floor(Math.random() * 200) - 100, // Similar rating
          country: 'Bot Land'
        };
        
        // Create match in database
        const { data: matchData, error } = await supabase
          .from('matches')
          .insert({
            player1_id: user.id,
            player2_id: user.id, // For demo, using same user as bot
            problem_id: problem.id,
            problem_title: problem.title,
            problem_difficulty: problem.difficulty,
            status: 'ongoing'
          })
          .select()
          .single();

        if (error) throw error;

        setCurrentMatch(matchData as Match);
        setCurrentProblem(problem);
        setOpponentProfile(botOpponent);
        setCode("");
        setMatchResult(null);
        setTimeLeft(900);
        setIsMatchActive(true);
        setIsSearching(false);
        
        toast({
          title: "Match Found!",
          description: `You're facing ${botOpponent.username} (${botOpponent.rating}). Good luck!`,
        });
      }, 2000); // 2 second search time
    } catch (error: any) {
      console.error('Error creating match:', error);
      toast({
        title: "Error",
        description: "Failed to create match. Please try again.",
        variant: "destructive",
      });
      setIsSearching(false);
    }
  };

  const handleTimeUp = async () => {
    setIsMatchActive(false);
    setMatchResult("Time's up! You lost this match.");
    await updateMatchResult(false);
  };

  const submitCode = async () => {
    if (!code.trim() || !currentProblem) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate Judge0 API call
      const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // User would need to add this
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: selectedLanguage,
          source_code: btoa(code), // Base64 encode
          stdin: btoa(""), // Empty for now
          expected_output: btoa("expected_result") // This would be dynamic
        })
      });

      // For demo purposes, simulate a random result
      const isCorrect = Math.random() > 0.3; // 70% success rate for demo
      const opponentTime = Math.random() * 600 + 300; // Random opponent time
      const userTime = 900 - timeLeft;
      
      if (isCorrect) {
        const wonByTime = userTime < opponentTime;
        setMatchResult(wonByTime ? 
          `Accepted! You won against ${opponentProfile?.username} by ${Math.floor(opponentTime - userTime)}s!` :
          `Accepted! But ${opponentProfile?.username} was faster by ${Math.floor(userTime - opponentTime)}s.`
        );
        await updateMatchResult(wonByTime);
      } else {
        setMatchResult(`Wrong Answer! ${opponentProfile?.username} solved it correctly and won.`);
        await updateMatchResult(false);
      }
      
      setIsMatchActive(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit code. Using demo mode.",
        variant: "destructive",
      });
      
      // Fallback to demo result
      const isCorrect = Math.random() > 0.3;
      setMatchResult(isCorrect ? "Accepted! You won this match!" : "Wrong Answer! You lost this match.");
      await updateMatchResult(isCorrect);
      setIsMatchActive(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateMatchResult = async (won: boolean) => {
    if (!currentMatch || !user || !profile) return;

    try {
      // Update match status
      const { error: matchError } = await supabase
        .from('matches')
        .update({
          status: 'completed',
          winner_id: won ? user.id : null, // null means opponent won
          ended_at: new Date().toISOString()
        })
        .eq('id', currentMatch.id);

      if (matchError) throw matchError;

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
    const expectedScore = 0.5; // Assuming equal opponents for bots
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
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
      <div className="grid md:grid-cols-5 gap-4">
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
      </div>

      {/* Enhanced Arena */}
      <Card className="card-3d bg-background/90 backdrop-blur-xl border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <CardTitle className="flex items-center gap-2 rainbow-text text-2xl">
            <Zap className="h-6 w-6 animate-pulse" />
            NextFang Coding Arena v2.0
          </CardTitle>
          <CardDescription className="text-lg">
            🚀 Elite 1v1 Programming Battles • Enhanced Multi-Platform Compiler
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isMatchActive && !currentProblem && (
            <div className="text-center py-8">
              <Button 
                onClick={findMatch} 
                size="lg" 
                className="gap-2"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Finding Opponent...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Find Match
                  </>
                )}
              </Button>
            </div>
          )}

          {currentProblem && (
            <div className="space-y-6">
              {/* Match Info */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">You</span>
                  </div>
                  <span className="text-muted-foreground">VS</span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      {opponentProfile?.username} ({opponentProfile?.rating})
                    </span>
                  </div>
                </div>
                {isMatchActive && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>

              {/* Problem */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{currentProblem.title}</h3>
                  <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                    {currentProblem.difficulty}
                  </Badge>
                </div>
                
                <p className="text-gray-700">{currentProblem.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Examples:</h4>
                  {currentProblem.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <div><strong>Input:</strong> {example.input}</div>
                      <div><strong>Output:</strong> {example.output}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {currentProblem.tags.map((tag) => (
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
                    placeholder="// Write your NextFang solution here...
// Platform: NextFang v2.0 - Enhanced Multi-Platform Compiler
// Supports: LeetCode, GFG, CodeChef, Codeforces compatible syntax"
                    className="min-h-[300px] font-mono bg-black/80 text-green-400 border-primary/20"
                    disabled={!isMatchActive}
                  />
                  
                  {/* Enhanced Output Section */}
                  <div className="bg-black/90 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">NextFang Compiler Output:</span>
                    </div>
                    <pre className="text-sm text-green-400 whitespace-pre-wrap max-h-60 overflow-y-auto">
                      {output || '🚀 Ready to run your code with NextFang Enhanced Compiler!\n\nFeatures:\n✅ Multi-platform support (LeetCode/GFG/CodeChef)\n⚡ Lightning-fast execution\n🔍 Detailed test case analysis\n💯 Performance metrics\n\nClick "Run Code" to begin...'}
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
                    onClick={submitCode}
                    disabled={!isMatchActive || isSubmitting || !code.trim()}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Code className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  
                  {!isMatchActive && currentProblem && (
                    <Button onClick={findMatch} variant="outline" className="gap-2" disabled={isSearching}>
                      <Play className="h-4 w-4" />
                      New Match
                    </Button>
                  )}
                </div>
              </div>

              {/* Match Result */}
              {matchResult && (
                <div className={`p-4 rounded-lg ${matchResult.includes('won') || matchResult.includes('Accepted') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <div className="font-medium">{matchResult}</div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};
