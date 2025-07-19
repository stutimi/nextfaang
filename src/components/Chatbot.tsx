
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, MessageCircle, Minimize2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm your NEXTFANG AI assistant with voice support! 🎤 I can help you with CP roadmaps, problem recommendations, resume tips, and more! What would you like to know?"
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

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

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

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
      // Cancel any ongoing speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = { type: "user", content: message };
    setMessages(prev => [...prev, userMessage]);

    // Simple bot responses
    setTimeout(() => {
      let botResponse = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("roadmap") || lowerMessage.includes("path")) {
        botResponse = "Great question! For CP roadmap, I recommend: 1) Start with basic DSA (Arrays, Strings) 2) Learn sorting/searching 3) Master recursion and DP 4) Practice on Codeforces regularly. Would you like specific resources for any topic?";
      } else if (lowerMessage.includes("codeforces") || lowerMessage.includes("cf")) {
        botResponse = "Codeforces is the premier CP platform! Start with Div 2 A problems, gradually move to B and C. I recommend solving 2-3 problems daily. Use virtual contests to practice. Need help with specific CF topics?";
      } else if (lowerMessage.includes("resume")) {
        botResponse = "For FANG-ready resumes: 1) Highlight projects with impact 2) Use action verbs 3) Quantify achievements 4) Include relevant tech stack 5) ATS-friendly format. Want me to review specific sections?";
      } else if (lowerMessage.includes("dsa")) {
        botResponse = "DSA mastery path: Arrays → Strings → Sorting → Searching → Recursion → Trees → Graphs → DP. Practice on LeetCode, GFG, and TUF. Aim for 2-3 problems daily. Which topic would you like resources for?";
      } else if (lowerMessage.includes("voice") || lowerMessage.includes("speak")) {
        botResponse = "I can speak! Click the volume button next to my messages to hear me talk. You can also use the microphone to speak to me instead of typing!";
      } else {
        botResponse = "I can help you with: 🚀 CP roadmaps 📚 DSA guidance 🏆 Contest strategies 💼 Resume tips 🎯 FANG preparation 🎤 Voice interactions. What specific area interests you?";
      }

      const botMessage = { type: "bot", content: botResponse };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setMessage("");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 button-3d pulse-glow"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
      <Card className="h-full flex flex-col shadow-2xl card-3d glass-morphism border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 to-red-600/5">
        <CardHeader className="pb-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full pulse-3d">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">NEXTFANG AI Assistant</CardTitle>
                <div className="text-xs opacity-90">Voice-Enabled • Powered by AI</div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Badge className="w-fit text-xs bg-green-500/20 text-green-300 border-green-500/30">
            🟢 Online • Voice Ready
          </Badge>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`p-3 rounded-2xl text-sm slide-in-3d ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "bg-gradient-to-r from-muted to-muted/80 glass-morphism"
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {msg.content}
                  </div>
                  {msg.type === "bot" && (
                    <div className="flex justify-start mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-red-500/20"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about CP, DSA, FANG... or speak!"
                className="text-sm pr-12 bg-gradient-to-r from-background to-muted/50 border-red-500/30 focus:border-red-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="sm"
                variant="ghost"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'text-red-500 pulse-glow' : 'hover:bg-red-500/20'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 button-3d"
              onClick={handleSendMessage}
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
