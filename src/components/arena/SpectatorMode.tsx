import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageSquare, ThumbsUp, Users, Clock, Code, Terminal, Zap } from "lucide-react";

interface Participant {
  id: string;
  handle: string;
  avatar?: string;
  country: string;
  rating: number;
}

interface SpectatorModeProps {
  matchId: string;
  participant1: Participant;
  participant2: Participant;
  problems: any[];
  startTime: string;
  viewers: number;
  onClose: () => void;
}

export const SpectatorMode = ({
  matchId,
  participant1,
  participant2,
  problems,
  startTime,
  viewers,
  onClose
}: SpectatorModeProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [p1Progress, setP1Progress] = useState<number[]>([]);
  const [p2Progress, setP2Progress] = useState<number[]>([]);
  const [p1Code, setP1Code] = useState<string>("");
  const [p2Code, setP2Code] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'p1' | 'p2'>('p1');
  const [messages, setMessages] = useState<{id: number, user: string, text: string}[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update elapsed time
      setElapsedTime(prev => prev + 1);
      
      // Simulate progress updates
      if (Math.random() > 0.8) {
        if (Math.random() > 0.5 && p1Progress.length < problems.length) {
          setP1Progress(prev => [...prev, prev.length]);
        } else if (p2Progress.length < problems.length) {
          setP2Progress(prev => [...prev, prev.length]);
        }
      }
      
      // Simulate code updates
      if (Math.random() > 0.7) {
        const codeSamples = [
          "def solve(nums):\n    return sum(nums)",
          "int main() {\n    cout << \"Hello World\";\n    return 0;\n}",
          "function findMax(arr) {\n    return Math.max(...arr);\n}"
        ];
        
        if (Math.random() > 0.5) {
          setP1Code(codeSamples[Math.floor(Math.random() * codeSamples.length)]);
        } else {
          setP2Code(codeSamples[Math.floor(Math.random() * codeSamples.length)]);
        }
      }
      
      // Simulate chat messages
      if (Math.random() > 0.9) {
        const newChatMessages = [
          "Great solution!",
          "Wow, that was fast!",
          "I think there's a more efficient approach",
          "This match is intense!",
          "Who do you think will win?"
        ];
        
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now(),
            user: `spectator${Math.floor(Math.random() * 100)}`,
            text: newChatMessages[Math.floor(Math.random() * newChatMessages.length)]
          }
        ]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [p1Progress, p2Progress, problems.length]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Match Info */}
      <div className="lg:col-span-3">
        <Card className="magical-glow">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                  LIVE
                </Badge>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{viewers} watching</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={onClose}>
                Exit Spectator Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Participants */}
      <div className="lg:col-span-3">
        <Card className="magical-glow">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Participant 1 */}
              <motion.div 
                className="flex-1 flex flex-col items-center"
                animate={{ 
                  scale: p1Progress.length > p2Progress.length ? [1, 1.02, 1] : 1 
                }}
                transition={{ 
                  repeat: p1Progress.length > p2Progress.length ? Infinity : 0,
                  duration: 2
                }}
              >
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={participant1.avatar} />
                  <AvatarFallback>{participant1.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-sm">{participant1.country}</span>
                    <span className="font-bold text-lg">{participant1.handle}</span>
                  </div>
                  <Badge variant="outline">{participant1.rating}</Badge>
                </div>
                <div className="mt-2 text-2xl font-bold text-primary">{p1Progress.length}</div>
              </motion.div>
              
              {/* VS */}
              <div className="my-4 md:my-0">
                <Badge variant="outline" className="text-lg px-4 py-2">VS</Badge>
              </div>
              
              {/* Participant 2 */}
              <motion.div 
                className="flex-1 flex flex-col items-center"
                animate={{ 
                  scale: p2Progress.length > p1Progress.length ? [1, 1.02, 1] : 1 
                }}
                transition={{ 
                  repeat: p2Progress.length > p1Progress.length ? Infinity : 0,
                  duration: 2
                }}
              >
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={participant2.avatar} />
                  <AvatarFallback>{participant2.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-sm">{participant2.country}</span>
                    <span className="font-bold text-lg">{participant2.handle}</span>
                  </div>
                  <Badge variant="outline">{participant2.rating}</Badge>
                </div>
                <div className="mt-2 text-2xl font-bold text-accent">{p2Progress.length}</div>
              </motion.div>
            </div>
            
            {/* Progress Bars */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{participant1.handle}</span>
                  <span>{p1Progress.length}/{problems.length}</span>
                </div>
                <Progress value={(p1Progress.length / problems.length) * 100} className="h-2 bg-muted" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{participant2.handle}</span>
                  <span>{p2Progress.length}/{problems.length}</span>
                </div>
                <Progress value={(p2Progress.length / problems.length) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Code View */}
      <div className="lg:col-span-2">
        <Card className="magical-glow h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Live Code View
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={activeTab === 'p1' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveTab('p1')}
                >
                  {participant1.handle}
                </Button>
                <Button 
                  variant={activeTab === 'p2' ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveTab('p2')}
                >
                  {participant2.handle}
                </Button>
              </div>
            </div>
            <CardDescription>
              Watch competitors code in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm h-[300px] overflow-auto">
              <pre className="whitespace-pre-wrap">
                {activeTab === 'p1' ? 
                  (p1Code || "// Waiting for code...") : 
                  (p2Code || "// Waiting for code...")}
              </pre>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-medium">Problem {activeProblemIndex + 1}/{problems.length}</span>
              </div>
              <div className="flex gap-2 overflow-x-auto py-2">
                {problems.map((problem, index) => (
                  <Button
                    key={index}
                    variant={activeProblemIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveProblemIndex(index)}
                    className="whitespace-nowrap"
                  >
                    Problem {index + 1}
                    {p1Progress.includes(index) && (
                      <Badge className="ml-1 bg-primary/20 text-xs">{participant1.handle.substring(0, 1)}</Badge>
                    )}
                    {p2Progress.includes(index) && (
                      <Badge className="ml-1 bg-accent/20 text-xs">{participant2.handle.substring(0, 1)}</Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chat */}
      <div className="lg:col-span-1">
        <Card className="magical-glow h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{viewers} spectators</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto space-y-2 mb-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No messages yet
                </div>
              ) : (
                messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted/20 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-muted-foreground">
                        just now
                      </span>
                    </div>
                    <div className="text-sm mt-1">{message.text}</div>
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    setMessages(prev => [
                      ...prev,
                      {
                        id: Date.now(),
                        user: "You",
                        text: newMessage
                      }
                    ]);
                    setNewMessage("");
                  }
                }}
              />
              <Button 
                size="sm"
                onClick={() => {
                  if (newMessage.trim()) {
                    setMessages(prev => [
                      ...prev,
                      {
                        id: Date.now(),
                        user: "You",
                        text: newMessage
                      }
                    ]);
                    setNewMessage("");
                  }
                }}
              >
                Send
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                Cheer
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                Boost
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};