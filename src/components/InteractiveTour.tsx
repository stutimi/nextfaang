import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Zap, Target, Crown, Star } from 'lucide-react';
import { useVoiceEffects } from './VoiceEffects';

interface InteractiveTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const InteractiveTour = ({ isOpen, onComplete, onSkip }: InteractiveTourProps) => {
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { speak, speakPreset } = useVoiceEffects();

  useEffect(() => {
    if (isOpen) {
      setRun(true);
      speakPreset('welcome');
    }
  }, [isOpen]);

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-primary to-accent mb-4"
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold rainbow-text mb-2">Welcome to NextFang CP Arena</h2>
            <p className="text-muted-foreground">The ultimate battlefield for code warriors</p>
          </div>
          <Badge variant="secondary" className="w-full justify-center py-2">
            🎯 Interactive Tour - Step 1 of 5
          </Badge>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.cf-validation-section',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Step 1: Identity Setup</h3>
          </div>
          <p>Enter your Codeforces handle to sync your competitive programming stats and unlock the arena.</p>
          <Badge variant="outline" className="text-xs">
            💡 Tip: This validates your skills and matches you with worthy opponents
          </Badge>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '.duel-modes-section',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-secondary" />
            <h3 className="font-semibold">Step 2: Choose Your Battle</h3>
          </div>
          <div className="space-y-2">
            <p>Two paths await you:</p>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-green-400" />
                <span><strong>Friend Mode:</strong> Challenge friends via their CF handle</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-400" />
                <span><strong>AI Mode:</strong> Face our intelligent bot opponents</span>
              </div>
            </div>
          </div>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '.match-arena-section',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-accent" />
            <h3 className="font-semibold">Step 3: The Arena</h3>
          </div>
          <p>This is your battlefield. Here you'll:</p>
          <ul className="text-sm space-y-1 list-disc list-inside ml-4">
            <li>Solve competitive programming problems</li>
            <li>Code against time and opponents</li>
            <li>Track your progress in real-time</li>
            <li>Experience the thrill of victory</li>
          </ul>
        </div>
      ),
      placement: 'left',
    },
    {
      target: '.voice-effects-section',
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Step 4: Voice Commander</h3>
          </div>
          <p>Enable voice effects for an immersive experience:</p>
          <ul className="text-sm space-y-1 list-disc list-inside ml-4">
            <li>Battle announcements</li>
            <li>Victory celebrations</li>
            <li>Strategic guidance</li>
            <li>Atmospheric immersion</li>
          </ul>
          <Badge variant="outline" className="text-xs">
            🎵 Toggle voice effects in the bottom-right corner
          </Badge>
        </div>
      ),
      placement: 'top',
    },
    {
      target: 'body',
      content: (
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block p-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-4"
          >
            <Crown className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold rainbow-text mb-2">Ready for Battle!</h2>
          <p className="text-muted-foreground mb-4">
            You're now equipped to conquer the NextFang CP Arena. 
            Your journey to coding legend begins now.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Badge variant="secondary">⚔️ Challenge Friends</Badge>
            <Badge variant="secondary">🤖 Face AI Bots</Badge>
            <Badge variant="secondary">🎯 Solve Problems</Badge>
            <Badge variant="secondary">🏆 Earn Glory</Badge>
          </div>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index, type } = data;
    
    if (type === 'step:after') {
      setCurrentStep(index + 1);
      
      // Voice narration for each step
      switch (index) {
        case 0:
          speak("Let's begin your journey. First, establish your identity in the arena.");
          break;
        case 1:
          speak("Choose your battle mode. Will you face friends or challenge our AI?");
          break;
        case 2:
          speak("This is where legends are made. Your coding arena awaits.");
          break;
        case 3:
          speak("Enable voice effects for the full warrior experience.");
          break;
        case 4:
          speakPreset('tournamentStart');
          break;
      }
    }

    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
      if (status === 'finished') {
        speakPreset('success');
        onComplete();
      } else {
        onSkip();
      }
    }
  };

  const tourStyles = {
    options: {
      primaryColor: '#00c9ff',
      zIndex: 1000,
    },
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        steps={steps}
        styles={tourStyles}
        locale={{
          back: 'Previous',
          close: 'Close',
          last: 'Begin Battle!',
          next: 'Next',
          skip: 'Skip Tour',
        }}
      />
      
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 left-4 z-40"
        >
          <Button
            onClick={() => {
              setRun(true);
              setCurrentStep(0);
              speakPreset('welcome');
            }}
            className="futuristic-button"
            size="sm"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Take Tour
          </Button>
        </motion.div>
      )}
    </>
  );
};