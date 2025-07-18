import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Bot, 
  Sword, 
  Trophy, 
  Clock, 
  Send, 
  Check, 
  X, 
  Star,
  Zap,
  Target,
  Crown
} from "lucide-react";

interface DuelRequest {
  id: string;
  sender_id: string;
  receiver_cf_handle: string;
  status: 'pending' | 'accepted' | 'declined';
  match_type: 'friend' | 'bot';
  problems?: any[];
  created_at: string;
}

interface DuelLobbyProps {
  onStartDuel: (duelData: any) => void;
  onStartBotMatch: (botData: any) => void;
  cfUserData: any;
}

export const DuelLobby = ({ onStartDuel, onStartBotMatch, cfUserData }: DuelLobbyProps) => {
  const { toast } = useToast();
  
  const [friendHandle, setFriendHandle] = useState("");
  const [isSendingDuel, setIsSendingDuel] = useState(false);
  const [isCreatingBotMatch, setIsCreatingBotMatch] = useState(false);
  const [botDifficulty, setBotDifficulty] = useState("medium");
  const [duelRequests, setDuelRequests] = useState<DuelRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  useEffect(() => {
    // Mock: No backend, just clear requests
    setDuelRequests([]);
  }, []);

  const sendDuelRequest = async () => {
    if (!friendHandle.trim()) return;

    if (friendHandle.toLowerCase() === cfUserData?.handle?.toLowerCase()) {
      toast({
        title: "Invalid Request",
        description: "You cannot send a duel request to yourself!",
        variant: "destructive",
      });
      return;
    }

    setIsSendingDuel(true);
    setTimeout(() => {
      toast({
        title: "Duel Request Sent! ⚔️",
        description: `Challenge sent to ${friendHandle}. Waiting for their response.`,
      });
      setFriendHandle("");
      setIsSendingDuel(false);
    }, 1000);
  };

  const respondToDuel = async (duelId: string, response: 'accept' | 'decline') => {
    toast({
      title: response === 'accept' ? "Duel Accepted! 🔥" : "Duel Declined",
      description: response === 'accept' 
        ? "Get ready for battle! Starting match..." 
        : "Duel request declined.",
    });

    if (response === 'accept') {
      const duel = duelRequests.find(d => d.id === duelId);
      if (duel) {
        onStartDuel(duel);
      }
    }
  };

  const startBotMatch = async () => {
    setIsCreatingBotMatch(true);
    setTimeout(() => {
      toast({
        title: "Bot Match Created! 🤖",
        description: `Facing ${botDifficulty} difficulty bot. Good luck!`,
      });
      onStartBotMatch({
        bot_difficulty: botDifficulty,
        problems: [],
        opponent: { handle: "AI Bot" }
      });
      setIsCreatingBotMatch(false);
    }, 1000);
  };

  const getBotDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getBotDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Star className="h-4 w-4" />;
      case 'medium': return <Target className="h-4 w-4" />;
      case 'hard': return <Crown className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const pendingRequests = duelRequests.filter(r => r.status === 'pending');
  const sentRequests = pendingRequests.filter(r => r.sender_id === cfUserData?.handle);
  const receivedRequests = pendingRequests.filter(r => r.sender_id !== cfUserData?.handle);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Friend Duel Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
          <Card className="magical-glow rainbow-border h-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle className="rainbow-text">Challenge a Friend</CardTitle>
              </div>
              <CardDescription>
                Enter your friend's Codeforces handle to send a duel request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Friend's Codeforces handle"
                  value={friendHandle}
                  onChange={(e) => setFriendHandle(e.target.value)}
                  className="form-input-glow"
                  onKeyPress={(e) => e.key === 'Enter' && sendDuelRequest()}
                />
              </div>
              
              <Button 
                onClick={sendDuelRequest}
                disabled={!friendHandle.trim() || isSendingDuel}
                className="w-full button-3d sparkle-trail"
              >
                {isSendingDuel ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Sending Challenge...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Duel Request ⚔️
                  </>
                )}
              </Button>

              {/* Sent Requests */}
              {sentRequests.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Sent Requests:</h4>
                  {sentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between bg-muted/20 p-2 rounded">
                      <span className="text-sm">{request.receiver_cf_handle}</span>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Tilt>
      </motion.div>

      {/* Bot Match Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000}>
          <Card className="magical-glow rainbow-border h-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bot className="h-6 w-6 text-secondary" />
                <CardTitle className="rainbow-text">Face the AI Bot</CardTitle>
              </div>
              <CardDescription>
                Practice against our AI opponent with different difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bot Difficulty:</label>
                <Select value={botDifficulty} onValueChange={setBotDifficulty}>
                  <SelectTrigger className="form-input-glow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-green-400" />
                        <span>Easy Bot</span>
                        <Badge variant="outline" className="text-green-400">30s/problem</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-yellow-400" />
                        <span>Medium Bot</span>
                        <Badge variant="outline" className="text-yellow-400">60s/problem</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-red-400" />
                        <span>Hard Bot</span>
                        <Badge variant="outline" className="text-red-400">90s/problem</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={startBotMatch}
                disabled={isCreatingBotMatch}
                className="w-full button-3d sparkle-trail"
                variant="secondary"
              >
                {isCreatingBotMatch ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Creating Match...
                  </>
                ) : (
                  <>
                    {getBotDifficultyIcon(botDifficulty)}
                    <span className="ml-2">Start Bot Match 🤖</span>
                  </>
                )}
              </Button>

              <div className="text-xs text-muted-foreground text-center mt-2">
                Perfect for practice when friends aren't available!
              </div>
            </CardContent>
          </Card>
        </Tilt>
      </motion.div>

      {/* Received Duel Requests */}
      {receivedRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="magical-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Incoming Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {receivedRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-between bg-muted/20 p-4 rounded-lg border border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <Sword className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{request.receiver_cf_handle} challenges you!</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => respondToDuel(request.id, 'accept')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => respondToDuel(request.id, 'decline')}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
