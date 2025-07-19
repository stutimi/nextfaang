import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Users, 
  Zap, 
  Clock, 
  Target, 
  Shield, 
  Flame, 
  Sparkles,
  X
} from "lucide-react";

interface SkillMatchmakingProps {
  userRating: number;
  onMatchFound: (matchData: any) => void;
  onCancel: () => void;
}

export const SkillMatchmaking = ({ userRating, onMatchFound, onCancel }: SkillMatchmakingProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [ratingRange, setRatingRange] = useState([userRating - 100, userRating + 100]);
  const [preferredDifficulty, setPreferredDifficulty] = useState<'any' | 'easy' | 'medium' | 'hard'>('any');
  const [fastMatch, setFastMatch] = useState(false);
  const [playersInQueue, setPlayersInQueue] = useState(0);
  const [expandedRange, setExpandedRange] = useState(false);
  
  // Simulate players in queue
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersInQueue(Math.floor(Math.random() * 20) + 10);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle search time and auto-expand range
  useEffect(() => {
    if (!isSearching) return;
    
    const interval = setInterval(() => {
      setSearchTime(prev => prev + 1);
      
      // Auto-expand range after 30 seconds
      if (searchTime === 30 && !expandedRange) {
        setExpandedRange(true);
        setRatingRange([userRating - 200, userRating + 200]);
      }
      
      // Simulate match found after random time
      if ((fastMatch && searchTime > 5) || (!fastMatch && searchTime > 15)) {
        if (Math.random() > 0.7) {
          clearInterval(interval);
          handleMatchFound();
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isSearching, searchTime, expandedRange, fastMatch, userRating]);
  
  const handleStartSearch = () => {
    setIsSearching(true);
    setSearchTime(0);
    setExpandedRange(false);
  };
  
  const handleCancelSearch = () => {
    setIsSearching(false);
    setSearchTime(0);
    onCancel();
  };
  
  const handleMatchFound = () => {
    // Generate opponent with rating in the selected range
    const opponentRating = Math.floor(
      Math.random() * (ratingRange[1] - ratingRange[0]) + ratingRange[0]
    );
    
    const matchData = {
      opponent: {
        handle: `Player${Math.floor(Math.random() * 1000)}`,
        rating: opponentRating,
        country: "🌍"
      },
      problems: [
        { title: "Problem 1", difficulty: preferredDifficulty === 'any' ? 'medium' : preferredDifficulty },
        { title: "Problem 2", difficulty: preferredDifficulty === 'any' ? 'medium' : preferredDifficulty },
        { title: "Problem 3", difficulty: preferredDifficulty === 'any' ? 'hard' : preferredDifficulty }
      ]
    };
    
    onMatchFound(matchData);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Shield className="h-4 w-4 text-green-400" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-400" />;
      case 'hard': return <Flame className="h-4 w-4 text-red-400" />;
      default: return <Sparkles className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <Card className="magical-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Skill-Based Matchmaking
        </CardTitle>
        <CardDescription>
          Find opponents with similar skill levels for balanced matches
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSearching ? (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <Search className="h-12 w-12 text-primary mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold mt-2">Searching for opponents...</h3>
              <p className="text-muted-foreground">
                Looking for players rated {ratingRange[0]}-{ratingRange[1]}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Search time:</span>
                <span className="font-mono">{formatTime(searchTime)}</span>
              </div>
              <Progress value={(searchTime / 60) * 100} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{playersInQueue} players in queue</span>
              </div>
              
              {expandedRange && (
                <Badge variant="outline" className="animate-pulse">
                  Range expanded
                </Badge>
              )}
            </div>
            
            {expandedRange && (
              <div className="text-sm text-muted-foreground">
                Search range expanded to find matches faster
              </div>
            )}
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleCancelSearch}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Search
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Rating Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {ratingRange[0]} - {ratingRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[ratingRange[0], ratingRange[1]]}
                  min={Math.max(500, userRating - 500)}
                  max={Math.min(3500, userRating + 500)}
                  step={50}
                  onValueChange={(value) => setRatingRange(value as [number, number])}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Preferred Difficulty</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={preferredDifficulty === 'any' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferredDifficulty('any')}
                    className="flex items-center gap-1"
                  >
                    {getDifficultyIcon('any')}
                    Any
                  </Button>
                  <Button
                    variant={preferredDifficulty === 'easy' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferredDifficulty('easy')}
                    className="flex items-center gap-1"
                  >
                    {getDifficultyIcon('easy')}
                    Easy
                  </Button>
                  <Button
                    variant={preferredDifficulty === 'medium' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferredDifficulty('medium')}
                    className="flex items-center gap-1"
                  >
                    {getDifficultyIcon('medium')}
                    Medium
                  </Button>
                  <Button
                    variant={preferredDifficulty === 'hard' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferredDifficulty('hard')}
                    className="flex items-center gap-1"
                  >
                    {getDifficultyIcon('hard')}
                    Hard
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="fast-match"
                  checked={fastMatch}
                  onCheckedChange={setFastMatch}
                />
                <Label htmlFor="fast-match" className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Fast Match (wider rating range)
                </Label>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{playersInQueue} players in queue</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>~{fastMatch ? '30s' : '2m'} wait time</span>
              </div>
            </div>
            
            <Button 
              className="w-full button-3d sparkle-trail"
              onClick={handleStartSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              Find Match
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};