
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Play, Zap, Sparkles, Trophy, Target, Users, Globe, RefreshCw, Sword, Copy, User, Clock, Terminal, Code } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
};
