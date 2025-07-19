import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, X, Play, Pause } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VoiceAITourProps {
  onClose: () => void;
}

interface TourStep {
  title: string;
  text: string;
  section: string;
}

export const VoiceAITour = ({ onClose }: VoiceAITourProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const tourSteps: TourStep[] = [
    {
      title: "Welcome to Coding Arena",
      text: "Welcome to Coding Arena! I'm your AI tour guide. I'll show you around our amazing platform for competitive programming and coding duels.",
      section: "hero"
    },
    {
      title: "DSA Mastery Section",
      text: "First, let's explore our DSA Mastery section where you can learn data structures and algorithms to crack any interview.",
      section: "dsa-section"
    },
    {
      title: "Competitive Programming",
      text: "Next, we have our competitive programming section with Codeforces integration and performance tracking.",
      section: "cp-section"
    },
    {
      title: "Smart Tools",
      text: "Check out our smart tools including contest analyzer, performance tracker, and multi-platform integration.",
      section: "smart-tools"
    },
    {
      title: "Community Hub",
      text: "Join our vibrant community of programmers, get support, and participate in discussions.",
      section: "community"
    },
    {
      title: "Ready to Start?",
      text: "That's our tour! Ready to enter the arena and start your coding journey? Click Enter Arena to begin!",
      section: "contact"
    }
  ];

  const speakText = useCallback((text: string) => {
    if (!isVoiceEnabled) return;
    
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [isVoiceEnabled]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentTourStep < tourSteps.length - 1) {
      const nextStep = currentTourStep + 1;
      setCurrentTourStep(nextStep);
      speakText(tourSteps[nextStep].text);
      scrollToSection(tourSteps[nextStep].section);
    }
  }, [currentTourStep, tourSteps, speakText, scrollToSection]);

  const handlePreviousStep = useCallback(() => {
    if (currentTourStep > 0) {
      const prevStep = currentTourStep - 1;
      setCurrentTourStep(prevStep);
      speakText(tourSteps[prevStep].text);
      scrollToSection(tourSteps[prevStep].section);
    }
  }, [currentTourStep, tourSteps, speakText, scrollToSection]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSpeaking, isVoiceEnabled]);

  const toggleSpeaking = useCallback(() => {
    if (isSpeaking) {
      speechSynthesis.pause();
    } else {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      } else {
        speakText(tourSteps[currentTourStep].text);
      }
    }
  }, [isSpeaking, currentTourStep, tourSteps, speakText]);

  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Handle voice commands
        const lowerTranscript = transcript.toLowerCase();
        if (lowerTranscript.includes('next') || lowerTranscript.includes('continue')) {
          handleNextStep();
        } else if (lowerTranscript.includes('previous') || lowerTranscript.includes('back')) {
          handlePreviousStep();
        } else if (lowerTranscript.includes('repeat')) {
          speakText(tourSteps[currentTourStep].text);
        } else if (lowerTranscript.includes('stop') || lowerTranscript.includes('close')) {
          onClose();
        }
      };
    }

    // Start the tour
    setTimeout(() => {
      speakText(tourSteps[0].text);
      scrollToSection(tourSteps[0].section);
    }, 1000);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [handleNextStep, handlePreviousStep, onClose, scrollToSection, speakText, tourSteps, currentTourStep]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-lg border-primary/20 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Voice Tour Guide
              </h2>
              <p className="text-muted-foreground">Let me show you around the platform</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{tourSteps[currentTourStep].title}</h3>
              <Badge variant="outline">
                {currentTourStep + 1} / {tourSteps.length}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">{tourSteps[currentTourStep].text}</p>
            
            {transcript && (
              <div className="bg-primary/10 p-3 rounded-lg mb-4">
                <p className="text-sm text-primary">You said: "{transcript}"</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleListening}
              className={isListening ? "bg-primary/10 border-primary" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
              {isListening ? 'Stop Listening' : 'Voice Commands'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleVoice}
              className={!isVoiceEnabled ? "bg-destructive/10 border-destructive" : ""}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {isVoiceEnabled ? 'Voice On' : 'Voice Off'}
            </Button>
            
            <Button variant="outline" size="sm" onClick={toggleSpeaking}>
              {isSpeaking ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isSpeaking ? 'Pause' : 'Repeat'}
            </Button>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousStep}
              disabled={currentTourStep === 0}
            >
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Voice Commands:</p>
              <p className="text-xs text-muted-foreground">"Next", "Previous", "Repeat", "Stop"</p>
            </div>
            
            <Button 
              onClick={handleNextStep}
              disabled={currentTourStep === tourSteps.length - 1}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {currentTourStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};