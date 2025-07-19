import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Play, Zap, Sparkles, Trophy, Target, Users, Globe, RefreshCw, Sword, Copy, User, Clock, Terminal, Code, Shield, Flame } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DuelLobby } from "./arena/DuelLobby";
import { MatchArena } from "./arena/MatchArena";
import { VoiceEffects, useVoiceEffects } from "./VoiceEffects";
import { InteractiveTour } from "./InteractiveTour";
import { Link } from "react-router-dom";

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
  const { toast } = useToast();
  const { speak, speakPreset } = useVoiceEffects();
  
  // Enhanced CP Arena state
  const [cfUsername, setCfUsername] = useState("");
  const [cfUserData, setCfUserData] = useState<any>(null);
  const [isValidatingCF, setIsValidatingCF] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [matchType, setMatchType] = useState<'friend' | 'bot' | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [showFullArena, setShowFullArena] = useState(false);
  
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
    
    // Placeholder: Always succeed for demo
    setTimeout(() => {
      setCfUserData({
        handle: cfUsername.trim(),
        rating: 1500,
      });
      speakPreset('success');
      toast({
        title: "Warrior Verified! ⚔️",
        description: `${cfUsername.trim()} (1500) ready for battle!`,
      });
      setIsValidatingCF(false);
    }, 1000);
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

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-lg">2,547+ Active Warriors</span>
            </div>
            <div className="flex items-center gap-2">
              <Sword className="h-5 w-5 text-accent" />
              <span className="text-lg">25K+ Arena Battles</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="text-lg">150+ FAANG Placements</span>
            </div>
          </motion.div>

          {/* Full Arena Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Link to="/cp-arena">
              <Button 
                variant="outline" 
                className="group relative overflow-hidden border-primary/50 hover:border-primary"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Globe className="h-4 w-4 mr-2" />
                <span>Explore Full CP Arena</span>
                <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded-full">New</span>
              </Button>
            </Link>
          </motion.div>
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

        {/* Arena Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Arena Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <Card className="h-full magical-glow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/20 p-3 rounded-full mb-4">
                    <Sword className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time 1v1 Duels</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Challenge friends or random opponents to competitive programming battles with real-time performance tracking.
                </CardContent>
              </Card>
            </Tilt>
            
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <Card className="h-full magical-glow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-accent/20 p-3 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>AI Bot Matches</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Practice against intelligent bots with adjustable difficulty levels to improve your skills anytime.
                </CardContent>
              </Card>
            </Tilt>
            
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <Card className="h-full magical-glow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-yellow-500/20 p-3 rounded-full mb-4">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </div>
                  <CardTitle>Global Tournaments</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Compete in scheduled tournaments with participants worldwide and win prizes and recognition.
                </CardContent>
              </Card>
            </Tilt>
          </div>
        </motion.div>
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
};