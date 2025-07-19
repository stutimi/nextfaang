import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VoiceEffectsProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export const VoiceEffects = ({ enabled = true, onToggle }: VoiceEffectsProps) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [speaking, setSpeaking] = useState(false);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // Select a futuristic-sounding voice if available
    if (window.speechSynthesis) {
      const availableVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
      const preferredVoice = availableVoices.find(v => 
        v.name.toLowerCase().includes('karen') || 
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('daniel')
      ) || availableVoices[0];
      
      setCurrentVoice(preferredVoice);

      // Handle voices loading asynchronously
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
        const voice = voices.find(v => 
          v.name.toLowerCase().includes('karen') || 
          v.name.toLowerCase().includes('samantha') ||
          v.name.toLowerCase().includes('daniel')
        ) || voices[0];
        setCurrentVoice(voice);
      };
    }
  }, []);

  const speakMessage = (message: string, priority: 'low' | 'high' = 'low') => {
    if (!isEnabled || !window.speechSynthesis) return;
    
    if (priority === 'high' && speaking) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(message);
    if (currentVoice) utterance.voice = currentVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };
  
  const cancel = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const toggleVoice = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle?.(newState);
    
    if (newState) {
      speakMessage("Voice effects enabled. Welcome to the NextFang CP Arena.", 'high');
    } else {
      cancel();
    }
  };

  // Pre-defined voice messages for different scenarios
  const voiceMessages = {
    matchStart: "Match started. Begin coding, warrior.",
    matchWin: "You win! Victory is yours.",
    matchLose: "You lose! Better luck next time.",
    botThinking: "AI is thinking... Analyzing the problem.",
    problemSolved: "Excellent solution! Moving to the next challenge.",
    buttonHover: "Click to engage.",
    duelRequest: "A challenger approaches. Will you accept?",
    timeWarning: "Time grows short. Code swiftly.",
    welcome: "Welcome to the NextFang Competitive Programming Arena.",
    tournamentStart: "The tournament begins. May the best mind prevail.",
    error: "System anomaly detected. Recalibrating...",
    success: "Operation successful. Proceeding to next phase.",
  };

  // Expose voice methods for external use
  useEffect(() => {
    (window as any).voiceEffects = {
      speak: speakMessage,
      messages: voiceMessages,
      isEnabled,
      speaking,
    };
  }, [isEnabled, speaking]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="cp-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={speaking ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: speaking ? Infinity : 0, duration: 0.8 }}
              className={`voice-indicator w-8 h-8 flex items-center justify-center ${
                speaking ? 'animate-pulse' : ''
              }`}
            >
              {speaking ? (
                <Mic className="h-4 w-4 text-white" />
              ) : isEnabled ? (
                <Volume2 className="h-4 w-4 text-white" />
              ) : (
                <VolumeX className="h-4 w-4 text-white" />
              )}
            </motion.div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-xs futuristic-button"
            >
              {isEnabled ? 'Voice ON' : 'Voice OFF'}
            </Button>
            
            {speaking && (
              <Badge variant="secondary" className="text-xs animate-pulse">
                Speaking...
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Hook for using voice effects in other components
export const useVoiceEffects = () => {
  const speak = (message: string, priority: 'low' | 'high' = 'low') => {
    const voiceSystem = (window as any).voiceEffects;
    if (voiceSystem?.isEnabled) {
      voiceSystem.speak(message, priority);
    }
  };

  const speakPreset = (preset: keyof typeof voiceMessages) => {
    const voiceSystem = (window as any).voiceEffects;
    if (voiceSystem?.isEnabled && voiceSystem.messages[preset]) {
      voiceSystem.speak(voiceSystem.messages[preset], 'high');
    }
  };

  return { speak, speakPreset };
};

const voiceMessages = {
  matchStart: "Match started. Begin coding, warrior.",
  matchWin: "You win! Victory is yours.",
  matchLose: "You lose! Better luck next time.",
  botThinking: "AI is thinking... Analyzing the problem.",
  problemSolved: "Excellent solution! Moving to the next challenge.",
  buttonHover: "Click to engage.",
  duelRequest: "A challenger approaches. Will you accept?",
  timeWarning: "Time grows short. Code swiftly.",
  welcome: "Welcome to the NextFang Competitive Programming Arena.",
  tournamentStart: "The tournament begins. May the best mind prevail.",
  error: "System anomaly detected. Recalibrating...",
  success: "Operation successful. Proceeding to next phase.",
};