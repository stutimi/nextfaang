import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, MessageCircle, Mic, MicOff, Volume2, VolumeX, Settings, Sparkles, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface EnhancedChatbotProps {
  onClose: () => void;
}

export const EnhancedChatbot = ({ onClose }: EnhancedChatbotProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "🚀 Welcome to NEXTFAANG AI Assistant! I'm here to help you master competitive programming and build your journey towards India's First LGM. Ask me anything about DSA, contests, FAANG prep, or platform features!",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current && !isSpeaking) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Enhanced free ChatGPT-like responses with more comprehensive knowledge
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("roadmap") || lowerMessage.includes("path") || lowerMessage.includes("guide")) {
      return "🗺️ **NEXTFAANG CP Roadmap**: \n\n**Phase 1 (Beginner)**: Arrays, Strings, Basic Math, Two Pointers\n**Phase 2 (Intermediate)**: Recursion, Binary Search, Stack/Queue, Sliding Window\n**Phase 3 (Advanced)**: Dynamic Programming, Graph Algorithms, Trees\n**Phase 4 (Expert)**: Advanced DP, Segment Trees, Number Theory\n\n📚 Use Striver's A2Z DSA Course for structured learning. Practice 2-3 problems daily and participate in weekly contests!";
    } else if (lowerMessage.includes("contest") || lowerMessage.includes("codeforces") || lowerMessage.includes("cf")) {
      return "🏆 **Contest Strategy for Success**: \n\n✅ **Before Contest**: Virtual contests, solve A/B problems from past contests\n✅ **During Contest**: Read all problems first, start with easiest, manage time wisely\n✅ **After Contest**: Analyze editorial, upsolve unsolved problems\n\n🎯 **Rating Goals**: Newbie→Pupil (1200+)→Specialist (1400+)→Expert (1600+)\n\nTry our Contest Analyzer tool to track your performance and identify weak areas!";
    } else if (lowerMessage.includes("faang") || lowerMessage.includes("interview") || lowerMessage.includes("google") || lowerMessage.includes("microsoft")) {
      return "💼 **FAANG Interview Preparation**: \n\n**DSA Focus Areas**:\n• Arrays & Hashing (40%)\n• Trees & Graphs (25%)\n• Dynamic Programming (20%)\n• System Design (15%)\n\n**Preparation Timeline**:\n📅 **3-6 months**: 150+ LeetCode problems\n📅 **Mock Interviews**: Practice with peers weekly\n📅 **System Design**: Learn basics of scalable systems\n\nUse TakeUForward's interview platform and our Resume Builder for complete preparation!";
    } else if (lowerMessage.includes("dsa") || lowerMessage.includes("algorithm") || lowerMessage.includes("data structure")) {
      return "🧩 **DSA Mastery Path**: \n\n**Foundation (Week 1-2)**:\n• Arrays, Strings, Basic Math\n• Time/Space Complexity Analysis\n\n**Core Concepts (Week 3-8)**:\n• Linked Lists, Stacks, Queues\n• Binary Search, Two Pointers\n• Recursion & Backtracking\n\n**Advanced (Week 9-16)**:\n• Dynamic Programming\n• Graph Algorithms (BFS, DFS, Dijkstra)\n• Trees (Binary Trees, BST, Tries)\n\n📖 **Recommended**: Striver's A2Z DSA Course (FREE) - covers 180+ problems with video solutions!";
    } else if (lowerMessage.includes("system design") || lowerMessage.includes("scalability")) {
      return "🏗️ **System Design Fundamentals**: \n\n**Core Concepts**:\n• Load Balancing & Caching\n• Database Design (SQL vs NoSQL)\n• Microservices Architecture\n• Message Queues & APIs\n\n**Popular Questions**:\n• Design Twitter/Instagram\n• Design URL Shortener\n• Design Chat System\n• Design Video Streaming\n\n🎥 **Resources**: TakeUForward's System Design course with videos for SDEs. Practice drawing diagrams and explaining trade-offs!";
    } else if (lowerMessage.includes("open source") || lowerMessage.includes("github") || lowerMessage.includes("contribution")) {
      return "🌟 **Open Source Contribution Guide**: \n\n**Getting Started**:\n1️⃣ Learn Git/GitHub basics\n2️⃣ Find beginner-friendly repos (good first issue)\n3️⃣ Start with documentation/small bug fixes\n4️⃣ Gradually take on larger features\n\n**Benefits**: Portfolio building, networking, real-world experience, job opportunities\n\n📹 **Watch**: Our featured YouTube tutorial on open source contribution - covers everything from Git basics to making your first PR!";
    } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "📄 **FAANG Resume Tips**: \n\n**Structure**:\n• Contact Info + Professional Summary\n• Technical Skills (Languages, Frameworks)\n• Projects (2-3 impactful ones)\n• Experience (internships, jobs)\n• Education + Achievements\n\n**Key Points**:\n✅ ATS-friendly format\n✅ Quantify achievements (improved performance by 30%)\n✅ Highlight relevant tech stack\n✅ Include GitHub/portfolio links\n\nUse our Resume Builder Pro for ATS-optimized templates!";
    } else if (lowerMessage.includes("tool") || lowerMessage.includes("feature") || lowerMessage.includes("platform")) {
      return "🛠️ **NEXTFAANG Platform Tools**: \n\n🔥 **New**: Contest Performance Analyzer\n📚 CP Dictionary (algorithms & data structures)\n💡 CP Tricks & Tips (optimization techniques)\n🎯 DSA Mastery Hub (Striver's A2Z course)\n📄 Resume Builder Pro (ATS-friendly)\n🚀 Hackathon Guide (winning strategies)\n\n**Coming Soon**: Coding arena, community features, event management\n\nTry our Platform Guide mentor for a complete walkthrough!";
    } else if (lowerMessage.includes("help") || lowerMessage.includes("stuck") || lowerMessage.includes("problem")) {
      return "🆘 **Need Help? Here's What I Can Do**: \n\n💬 **Ask me about**:\n• CP strategies & roadmaps\n• DSA concepts & problem-solving\n• FAANG interview preparation\n• System design basics\n• Open source contribution\n• Platform features & tools\n\n🏆 **Pro Tip**: Be specific with your questions! Instead of 'help with DP', try 'explain knapsack problem approach'\n\nJoin our Discord/Telegram community for peer support!";
    } else if (lowerMessage.includes("time") || lowerMessage.includes("schedule") || lowerMessage.includes("plan")) {
      return "⏰ **Optimal Study Schedule**: \n\n**Daily (2-3 hours)**:\n• 1 hour: New concept learning\n• 1 hour: Problem solving practice\n• 30 min: Previous topics revision\n\n**Weekly**:\n• Contest participation (CF, CC, AC)\n• Mock interview practice\n• System design study\n\n**Monthly**:\n• Assess progress & adjust plan\n• Focus on weak areas\n• Update resume & projects\n\n🎯 **Key**: Consistency > Intensity. Small daily progress compounds!";
    } else {
      return "🚀 **Hi there! I'm your NEXTFAANG AI Assistant** \n\nI can help you with:\n\n🎯 **Competitive Programming**: Strategies, roadmaps, contest tips\n🧩 **DSA Mastery**: Concepts, problem-solving approaches\n💼 **FAANG Prep**: Interview tips, resume building\n🏗️ **System Design**: Scalability, architecture patterns\n🌟 **Open Source**: GitHub, contribution strategies\n🛠️ **Platform Tools**: Feature guidance and usage tips\n\n**Try asking**: 'Show me CP roadmap' or 'FAANG interview tips' or 'How to contribute to open source'\n\nBuilding India's First LGM together! 🇮🇳";
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { 
      type: "user", 
      content: message, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    const aiResponse = await getAIResponse(message);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = { 
        type: "bot", 
        content: aiResponse, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Auto-speak response if voice is enabled
      setTimeout(() => speakText(aiResponse.replace(/\*\*/g, '').replace(/\n/g, ' ')), 300);
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
      <Card className="h-full flex flex-col shadow-2xl card-3d glass-morphism border-2 border-blue-500/30 bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-xl overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full pulse-3d">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  NEXTFAANG Assistant
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </CardTitle>
                <div className="text-xs opacity-90">Building India's First LGM</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">
              🟢 FREE Version
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`p-4 rounded-2xl text-sm slide-in-3d whitespace-pre-wrap ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gradient-to-r from-slate-800 to-slate-700 text-white border border-blue-400/20"
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {msg.content}
                  </div>
                  {msg.type === "bot" && (
                    <div className="flex justify-start mt-2 gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-blue-500/20 text-blue-400"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content.replace(/\*\*/g, '').replace(/\n/g, ' '))}
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                      <span className="text-xs text-slate-400">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 rounded-2xl border border-blue-400/20">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about CP, DSA, NEXTFAANG features..."
                className="text-sm pr-12 bg-slate-800 border-blue-500/30 focus:border-blue-500 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="sm"
                variant="ghost"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'text-red-500 pulse-glow' : 'hover:bg-blue-500/20 text-blue-400'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 button-3d"
              onClick={handleSendMessage}
              disabled={isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {isListening && (
            <div className="text-center mt-2">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 pulse-3d">
                🎤 Listening...
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
