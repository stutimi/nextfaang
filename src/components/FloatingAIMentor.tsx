
import { useState, useEffect } from 'react';
import { Bot, MessageCircle, X, Zap, Brain, Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FloatingAIMentorProps {
  onToggle: () => void;
  isOpen: boolean;
}

export const FloatingAIMentor = ({ onToggle, isOpen }: FloatingAIMentorProps) => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm your AI Mentor. Ready to boost your CP skills? 🚀" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Analyze my coding pattern",
    "Suggest today's practice",
    "Mock interview prep",
    "Contest strategy tips"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, { type: 'user', text: suggestion }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const responses = {
        "Analyze my coding pattern": "Based on your activity, I recommend focusing on Dynamic Programming. You've solved 67% of Array problems! 📊",
        "Suggest today's practice": "Perfect day for Tree algorithms! Try 3 medium problems on Binary Trees. Your success rate is 89% 🌟",
        "Mock interview prep": "Let's simulate a Google interview! I'll give you a system design question followed by coding challenges 💼",
        "Contest strategy tips": "For upcoming contests: Start with implementation problems, save DP for last. Your average solve time: 12 mins ⚡"
      };
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: responses[suggestion as keyof typeof responses] || "Great question! Let me analyze that for you... 🤖"
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={onToggle}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl card-3d white-glow animate-pulse"
        >
          <Bot className="h-8 w-8 text-white animate-bounce" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-96 h-[500px] card-3d white-glow border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl">
          <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-purple-200">AI Mentor</h3>
                <p className="text-xs text-purple-300">Online & Learning</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-purple-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-4 h-[350px] overflow-y-auto">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 text-purple-100 border border-purple-400/20'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-slate-800 text-purple-100 p-3 rounded-lg border border-purple-400/20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <div className="p-4 border-t border-purple-400/30">
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs border-purple-400/30 text-purple-200 hover:bg-purple-800/50 hover:scale-105 transition-all duration-300"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
