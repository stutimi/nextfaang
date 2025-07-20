import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, X, MessageCircle, Minimize2, Mic, MicOff, Volume2, VolumeX, Loader2, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm your NEXTFANG AI assistant. 💁‍♀️ I can help with:\n\n• Competitive programming\n• DSA concepts\n• Interview prep\n• Resume tips\n\nAsk me anything!",
      isCode: false
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
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
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure female voice
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      utterance.volume = 0.9;
      
      // Try to find a female voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = [
        "Microsoft Zira Desktop", // Windows female voice
        "Google UK English Female",
        "Google US English",
        "Samantha" // Mac OS voice
      ];
      
      for (const voiceName of preferredVoices) {
        const voice = voices.find(v => v.name.includes(voiceName));
        if (voice) {
          utterance.voice = voice;
          break;
        }
      }

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

  // Frontend-only response generation
  const generateResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let isCode = false;

    if (lowerMessage.includes("roadmap") || lowerMessage.includes("path")) {
      response = `Here's a suggested competitive programming roadmap: 🌟

1. 𝐅𝐨𝐮𝐧𝐝𝐚𝐭𝐢𝐨𝐧𝐬 (1-2 months):
   • Basic data structures (arrays, strings)
   • Time complexity analysis
   • Math for CP (number theory)

2. 𝐈𝐧𝐭𝐞𝐫𝐦𝐞𝐝𝐢𝐚𝐭𝐞 (3-4 months):
   • Advanced DSA (trees, graphs)
   • Problem solving patterns
   • Regular contest participation

3. 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 (5-6+ months):
   • Dynamic programming mastery
   • Advanced algorithms
   • Virtual contests

Would you like specific resources for any phase?`;
    } 
    else if (lowerMessage.includes("codeforces") || lowerMessage.includes("cf")) {
      response = `For Codeforces strategy: 💡

• 𝐁𝐞𝐠𝐢𝐧𝐧𝐞𝐫𝐬: Start with Div 2/3 A & B problems
• 𝐈𝐧𝐭𝐞𝐫𝐦𝐞𝐝𝐢𝐚𝐭𝐞: Target 3 problems per contest (A-C)
• 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝: Focus on D+ problems

Example solution approach:
\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n; // Read input
    
    // Example solution
    cout << (n % 2 == 0 ? "Even" : "Odd") << endl;
    
    return 0;
}
\`\`\``;
      isCode = true;
    }
    else if (lowerMessage.includes("resume") || lowerMessage.includes("interview")) {
      response = `For FANG-ready resumes: 📄

✅ 𝐊𝐞𝐲 𝐒𝐞𝐜𝐭𝐢𝐨𝐧𝐬:
1. Education (GPA if >3.5)
2. Technical Skills
3. Projects with impact metrics
4. Competitive programming achievements

✨ 𝐓𝐢𝐩: Quantify achievements like:
• "Optimized algorithm reducing runtime by 70%"
• "Solved 300+ problems on Codeforces"`;
    }
    else if (lowerMessage.includes("dsa")) {
      response = `DSA Learning Path: 📚

1. 𝐀𝐫𝐫𝐚𝐲𝐬 & 𝐒𝐭𝐫𝐢𝐧𝐠𝐬:
   • Two pointer technique
   • Sliding window

2. 𝐓𝐫𝐞𝐞𝐬:
   • DFS/BFS traversals
   • Binary search trees

3. 𝐆𝐫𝐚𝐩𝐡𝐬:
   • Shortest path algorithms
   • Union-Find

Which topic would you like examples for?`;
    }
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hi there! 👋 I'm your NEXTFANG AI assistant. How can I help you today?";
    }
    else {
      response = `I can help with: 💁‍♀️

📚 Learning Resources 
💡 Concept Explanations
🏆 Contest Strategies
💼 Interview Prep

What would you like assistance with?`;
    }

    return { response, isCode };
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { type: "user", content: message, isCode: false };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate response
    const { response, isCode } = generateResponse(message);
    const botMessage = { type: "bot", content: response, isCode };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
    
    // Auto-speak the response
    speakText(response);
  };

  if (!isOpen) {
    return (
      <div className={`fixed z-50 ${
        isMobile
          ? "bottom-4 right-4"
          : "bottom-6 right-6"
      }`}>
        <Button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          size="lg"
          className={`rounded-full shadow-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 ${
            isMobile
              ? "h-14 w-14"
              : "h-16 w-16"
          }`}
        >
          <MessageCircle className={isMobile ? "h-6 w-6" : "h-8 w-8"} />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className={`fixed z-50 ${
        isMobile
          ? "bottom-4 right-4 left-4"
          : "bottom-6 right-6 w-72"
      }`}>
        <Card className="shadow-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
          <CardHeader className="pb-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
                <CardTitle className={`font-bold ${isMobile ? "text-sm" : "text-lg"}`}>
                  {isMobile ? "NEXTFANG AI" : "NEXTFANG AI"}
                </CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size={isMobile ? "sm" : "sm"}
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size={isMobile ? "sm" : "sm"}
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className={`fixed z-50 flex flex-col ${
      isMobile
        ? "bottom-0 left-0 right-0 top-0 w-full h-full"
        : "bottom-6 right-6 w-96"
    }`}>
      <Card className={`flex flex-col shadow-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5 ${
        isMobile
          ? "h-full rounded-none"
          : "h-[500px] rounded-lg"
      }`}>
        <CardHeader className={`bg-gradient-to-r from-pink-600 to-purple-600 text-white ${
          isMobile ? "pb-2 pt-4 px-4" : "pb-3 rounded-t-lg"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
              <div>
                <CardTitle className={`font-bold ${isMobile ? "text-base" : "text-lg"}`}>
                  NEXTFANG AI Assistant
                </CardTitle>
                <div className={`opacity-90 ${isMobile ? "text-xs" : "text-xs"}`}>
                  Female Voice • Always Ready to Help
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Badge className={`w-fit bg-green-500/20 text-green-300 border-green-500/30 ${
            isMobile ? "text-xs mt-1" : "text-xs"
          }`}>
            🟢 Online • Voice Ready
          </Badge>
        </CardHeader>

        <CardContent className={`flex-1 flex flex-col overflow-hidden ${
          isMobile ? "p-3" : "p-4"
        }`}>
          <div className={`flex-1 overflow-y-auto space-y-3 pr-2 ${
            isMobile ? "mb-3" : "mb-4"
          }`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={isMobile ? "max-w-[85%]" : "max-w-[80%]"}>
                  <div
                    className={`rounded-2xl whitespace-pre-wrap ${
                      isMobile ? "p-2 text-sm" : "p-3 text-sm"
                    } ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : msg.isCode
                          ? `bg-gray-800 text-green-400 font-mono overflow-x-auto ${
                              isMobile ? "text-xs p-2" : "text-xs p-2"
                            }`
                          : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {msg.content}
                    {msg.isCode && (
                      <div className="flex justify-end mt-1">
                        <Button
                          size="xs"
                          variant="ghost"
                          className="h-6 w-6 p-0 hover:bg-green-500/20 text-green-400"
                          onClick={() => navigator.clipboard.writeText(msg.content)}
                        >
                          <Code className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {msg.type === "bot" && !msg.isCode && (
                    <div className="flex justify-start mt-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-pink-500/20"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-3 w-3 text-pink-500" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-pink-500" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`flex gap-2 ${isMobile ? "pb-safe" : ""}`}>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isMobile ? "Ask me anything..." : "Ask me anything about CP..."}
                className={`bg-background border-pink-500/30 focus:border-pink-500 ${
                  isMobile
                    ? "text-base pr-12 h-12"
                    : "text-sm pr-12"
                }`}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size={isMobile ? "default" : "sm"}
                variant="ghost"
                className={`absolute right-1 top-1/2 -translate-y-1/2 p-0 ${
                  isMobile
                    ? "h-10 w-10"
                    : "h-8 w-8"
                } ${
                  isListening ? 'text-pink-500' : 'hover:bg-pink-500/20'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                ) : (
                  <Mic className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                )}
              </Button>
            </div>
            <Button
              size={isMobile ? "default" : "sm"}
              className={`bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 ${
                isMobile ? "h-12 px-4" : ""
              }`}
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className={isMobile ? "h-5 w-5 animate-spin" : "h-4 w-4 animate-spin"} />
              ) : (
                <Send className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
              )}
            </Button>
          </div>
          
          {isListening && (
            <div className={`text-center ${isMobile ? "mt-2 mb-2" : "mt-2"}`}>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                🎤 Listening...
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};