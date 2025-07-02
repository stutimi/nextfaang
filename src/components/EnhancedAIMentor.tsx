import { useState, useEffect, useRef } from 'react';
import { Bot, MessageCircle, X, Zap, Brain, Code2, Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Message {
  type: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

interface EnhancedAIMentorProps {
  onClose: () => void;
}

export const EnhancedAIMentor = ({ onClose }: EnhancedAIMentorProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'ai', 
      text: "Hi! I'm your NEXTFAANG AI Mentor 🚀 Building India's First LGM (Large Generative Model) for competitive programming! I can help with personalized roadmaps, contest strategies, and real-time problem analysis. How can I boost your CP journey today?", 
      timestamp: new Date() 
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
        // Auto-send voice input
        handleSendMessage(transcript);
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "🎤 Listening...",
        description: "Speak now, I'm listening to your question!",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = async (text: string) => {
    if (elevenLabsKey && !isSpeaking) {
      try {
        setIsSpeaking(true);
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsKey,
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5
            }
          }),
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          
          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };
          
          audio.onerror = () => {
            setIsSpeaking(false);
            fallbackToWebSpeech(text);
          };
          
          audio.play();
        } else {
          fallbackToWebSpeech(text);
        }
      } catch (error) {
        console.error('ElevenLabs TTS error:', error);
        fallbackToWebSpeech(text);
      }
    } else {
      fallbackToWebSpeech(text);
    }
  };

  const fallbackToWebSpeech = (text: string) => {
    if (synthRef.current && !isSpeaking) {
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

  const getAIResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "I need an OpenAI API key to provide intelligent responses. Please set your API key in the settings above. 🔑";
    }

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert competitive programming mentor for NEXTFAANG - Building India's First LGM (Large Generative Model). You specialize in:
              
              - Data Structures & Algorithms (DSA)
              - Competitive Programming strategies
              - Codeforces, LeetCode, and contest preparation
              - FAANG interview preparation
              - System design for Indian tech ecosystem
              - Performance optimization techniques
              
              Keep responses practical, encouraging, and focused on actionable advice. Use emojis appropriately and maintain an enthusiastic but professional tone. Always provide specific next steps or resources when possible.`
            },
            ...conversationHistory,
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again! 🤔";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "I'm experiencing some technical difficulties. Please check your API key and try again. If the issue persists, I can still help with basic guidance! 💪";
    }
  };

  const handleSendMessage = async (message: string = currentInput) => {
    if (!message.trim()) return;

    const userMessage: Message = { 
      type: 'user', 
      text: message, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(message);
      
      // Simulate typing effect
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: Message = { 
          type: 'ai', 
          text: aiResponse, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Auto-speak AI response if voice is enabled
        if (elevenLabsKey || synthRef.current) {
          setTimeout(() => speakText(aiResponse), 500);
        }
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const quickActions = [
    "Analyze my coding pattern",
    "Suggest today's practice",
    "Contest strategy tips",
    "Mock interview prep",
    "DSA roadmap help",
    "Debug approach"
  ];

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  // API Key Setup UI
  if (!isApiKeySet && isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-96 h-[500px] card-3d white-glow border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl">
          <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-purple-200">NEXTFAANG AI Setup</h3>
                <p className="text-xs text-purple-300">Configure your AI mentor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-purple-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-bold text-purple-200 mb-2">Welcome to NEXTFAANG! 🚀</h4>
              <p className="text-sm text-purple-300 mb-4">Building India's First LGM for Competitive Programming</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-200 mb-2 block">
                  OpenAI API Key (Required)
                </label>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-slate-800 border-purple-400/30 text-white"
                />
                <p className="text-xs text-purple-400 mt-1">For intelligent AI responses</p>
              </div>

              <div>
                <label className="text-sm font-medium text-purple-200 mb-2 block">
                  ElevenLabs API Key (Optional)
                </label>
                <Input
                  type="password"
                  placeholder="el_..."
                  value={elevenLabsKey}
                  onChange={(e) => setElevenLabsKey(e.target.value)}
                  className="bg-slate-800 border-purple-400/30 text-white"
                />
                <p className="text-xs text-purple-400 mt-1">For high-quality voice synthesis</p>
              </div>
            </div>

            <Button
              onClick={() => {
                if (apiKey.trim()) {
                  setIsApiKeySet(true);
                  toast({
                    title: "🎉 Setup Complete!",
                    description: "Your NEXTFAANG AI mentor is ready to help!",
                  });
                } else {
                  toast({
                    title: "API Key Required",
                    description: "Please enter your OpenAI API key to continue.",
                    variant: "destructive",
                  });
                }
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Start Learning Journey 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[600px] card-3d white-glow border-2 border-purple-400/30 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl">
        <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-purple-200">NEXTFAANG AI Mentor</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-purple-300">Building India's First LGM</p>
                <Badge className="text-xs bg-green-500/20 text-green-300">
                  🟢 Online
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-purple-300 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-4 h-[450px] overflow-y-auto">
          <div className="space-y-3 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 text-purple-100 border border-purple-400/20'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-purple-400 hover:text-white"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(message.text)}
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                      <span className="text-xs text-purple-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
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
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="p-4 border-t border-purple-400/30 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.slice(0, 4).map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(action)}
                className="text-xs border-purple-400/30 text-purple-200 hover:bg-purple-800/50 hover:scale-105 transition-all duration-300"
              >
                {action}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask about CP, DSA, contests..."
                className="text-sm pr-12 bg-slate-800 border-purple-400/30 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                size="sm"
                variant="ghost"
                className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'text-red-500 animate-pulse' : 'text-purple-400 hover:text-white'
                }`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => handleSendMessage()}
              disabled={isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
