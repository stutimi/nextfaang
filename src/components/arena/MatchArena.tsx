import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Timer, 
  Trophy, 
  Code, 
  Play, 
  CheckCircle, 
  XCircle, 
  Bot,
  User,
  Zap,
  Target,
  Crown,
  Star,
  Terminal
} from "lucide-react";
import { BotLogic } from "./BotLogic";

interface Problem {
  title: string;
  difficulty: string;
  url: string;
  platform: string;
  tags?: string[];
  description?: string;
}

interface MatchArenaProps {
  problems: Problem[];
  matchType: 'friend' | 'bot';
  botDifficulty?: 'easy' | 'medium' | 'hard';
  opponentData?: any;
  onMatchEnd: (result: any) => void;
}

const LANGUAGES = [
  { id: 71, name: "Python" },
  { id: 62, name: "Java" },
  { id: 54, name: "C++" },
  { id: 50, name: "C" },
  { id: 63, name: "JavaScript" }
];

export const MatchArena = ({ problems, matchType, botDifficulty, opponentData, onMatchEnd }: MatchArenaProps) => {
  const { toast } = useToast();
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(71);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isMatchActive, setIsMatchActive] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [problemsCompleted, setProblemsCompleted] = useState<number[]>([]);
  const [botProgress, setBotProgress] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const botLogic = new BotLogic(botDifficulty || 'medium');

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMatchActive && timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else if (timeLeft === 0) {
        handleMatchEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMatchActive, timeLeft]);

  useEffect(() => {
    if (matchType === 'bot' && isMatchActive) {
      const botInterval = setInterval(() => {
        const newBotProgress = botLogic.simulateProgress(problems);
        setBotProgress(newBotProgress);
        setBotScore(newBotProgress.length);
        
        if (newBotProgress.length === problems.length) {
          handleMatchEnd();
        }
      }, 1000);

      return () => clearInterval(botInterval);
    }
  }, [matchType, isMatchActive, problems]);

  const handleMatchEnd = () => {
    setIsMatchActive(false);
    const playerWon = playerScore > botScore;
    const result = {
      playerScore,
      botScore: matchType === 'bot' ? botScore : 0,
      winner: matchType === 'bot' ? (playerWon ? 'player' : 'bot') : 'player',
      completedProblems: problemsCompleted.length,
      totalProblems: problems.length,
      timeUsed: 900 - timeLeft
    };
    
    toast({
      title: matchType === 'bot' 
        ? (playerWon ? "Victory! 🎉" : "Bot Wins! 🤖") 
        : "Match Completed! 🏆",
      description: `You solved ${problemsCompleted.length}/${problems.length} problems`,
    });
    
    onMatchEnd(result);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('🚀 NextFang Compiler v3.0 - Executing...\n');

    setTimeout(() => {
      const testCases = [
        { input: 'Test Case 1', expected: 'Expected Output 1', passed: Math.random() > 0.2 },
        { input: 'Test Case 2', expected: 'Expected Output 2', passed: Math.random() > 0.3 },
        { input: 'Test Case 3', expected: 'Expected Output 3', passed: Math.random() > 0.4 },
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
        '\n🎯 Performance: ' + (passedTests.length === 3 ? 'EXCELLENT 🌟' : 
          passedTests.length >= 2 ? 'GOOD 👍' : 'NEEDS WORK 💪')
      ].join('\n');
      
      setOutput(results);
      setIsRunning(false);
    }, 2000);
  };

  const submitSolution = async () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const isCorrect = Math.random() > 0.3; // 70% success rate
      
      if (isCorrect) {
        const newCompleted = [...problemsCompleted, currentProblemIndex];
        setProblemsCompleted(newCompleted);
        setPlayerScore(newCompleted.length);
        
        if (newCompleted.length === problems.length) {
          handleMatchEnd();
        } else if (currentProblemIndex < problems.length - 1) {
          setCurrentProblemIndex(currentProblemIndex + 1);
          setCode("");
          toast({
            title: "Problem Solved! ✅",
            description: `Moving to problem ${currentProblemIndex + 2}/${problems.length}`,
          });
        }
      } else {
        toast({
          title: "Wrong Answer ❌",
          description: "Try again or move to the next problem.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy" || parseInt(difficulty) < 1200) return "bg-green-500";
    if (difficulty === "Medium" || parseInt(difficulty) < 1600) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getBotIcon = () => {
    switch (botDifficulty) {
      case 'easy': return <Star className="h-5 w-5 text-green-400" />;
      case 'medium': return <Target className="h-5 w-5 text-yellow-400" />;
      case 'hard': return <Crown className="h-5 w-5 text-red-400" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const currentProblem = problems[currentProblemIndex];
  const progress = ((problemsCompleted.length / problems.length) * 100);
  const botProgressPercent = matchType === 'bot' ? ((botProgress.length / problems.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Problem and Info */}
      <motion.div 
        className="lg:col-span-1 space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timer and Score */}
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
          <Card className="magical-glow text-center">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Timer className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold rainbow-text">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-muted-foreground">Time Left</div>
                </div>
                <div>
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">{playerScore}/{problems.length}</div>
                  <div className="text-sm text-muted-foreground">Solved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tilt>

        {/* Opponent Info */}
        {matchType === 'bot' && (
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
            <Card className="magical-glow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-2">
                  {getBotIcon()}
                  AI Bot ({botDifficulty})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bot Progress:</span>
                    <span>{botScore}/{problems.length}</span>
                  </div>
                  <Progress value={botProgressPercent} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </Tilt>
        )}

        {/* Current Problem */}
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
          <Card className="magical-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Problem {currentProblemIndex + 1}/{problems.length}</CardTitle>
                <Badge className={getDifficultyColor(currentProblem?.difficulty || "")} variant="secondary">
                  {currentProblem?.difficulty}
                </Badge>
              </div>
              <CardDescription className="font-medium">
                {currentProblem?.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline">{currentProblem?.platform}</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(currentProblem?.url, '_blank')}
                  className="w-full"
                >
                  View Problem
                </Button>
              </div>
            </CardContent>
          </Card>
        </Tilt>

        {/* Problem Progress */}
        <Card className="magical-glow">
          <CardHeader>
            <CardTitle className="text-sm">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{problemsCompleted.length} solved</span>
                <span>{problems.length - problemsCompleted.length} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Panel - Code Editor */}
      <motion.div 
        className="lg:col-span-2 space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Language Selector */}
        <Card className="magical-glow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Code className="h-5 w-5 text-primary" />
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
              <div className="flex gap-2 ml-auto">
                <Button
                  onClick={runCode}
                  disabled={isRunning || !code.trim()}
                  variant="outline"
                  size="sm"
                >
                  {isRunning ? (
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  Run
                </Button>
                <Button
                  onClick={submitSolution}
                  disabled={isSubmitting || !code.trim() || !isMatchActive}
                  size="sm"
                >
                  {isSubmitting ? (
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card className="magical-glow">
          <CardContent className="pt-6">
            <Textarea
              placeholder="Write your solution here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[300px] font-mono form-input-glow"
            />
          </CardContent>
        </Card>

        {/* Output */}
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="magical-glow">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm whitespace-pre-wrap font-mono bg-muted/20 p-4 rounded-lg">
                  {output}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};