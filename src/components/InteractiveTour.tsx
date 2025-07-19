import { useState, useEffect, useMemo } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Zap, Target, Crown, Star } from 'lucide-react';
import { useVoiceEffects } from './VoiceEffects';
import { useTheme } from 'next-themes';

interface InteractiveTourProps {
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export const InteractiveTour = ({ isOpen, onComplete, onSkip }: InteractiveTourProps) => {
  const [run, setRun] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { speak, speakPreset } = useVoiceEffects();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Theme-aware styles for Joyride - memoized for performance
  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const isDark = currentTheme === 'dark';

  // Add CSS custom properties for theme-aware styling
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.style.setProperty('--joyride-primary', isDark ? '#00c9ff' : '#3b82f6');
      root.style.setProperty('--joyride-bg', isDark ? '#1a1a2e' : '#ffffff');
      root.style.setProperty('--joyride-text', isDark ? '#ffffff' : '#000000');
      root.style.setProperty('--joyride-border', isDark ? '#00c9ff' : '#3b82f6');
      root.style.setProperty('--joyride-overlay', isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)');
    }
  }, [mounted, isDark]);

  const tourStyles = useMemo(() => ({
    options: {
      primaryColor: isDark ? '#00c9ff' : '#3b82f6',
      zIndex: 1000,
    },
    overlay: {
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)',
    },
    tooltip: {
      backgroundColor: isDark ? 'hsl(217, 33%, 16%)' : 'hsl(0, 0%, 100%)',
      borderRadius: '12px',
      border: isDark
        ? '1px solid hsl(195, 100%, 50%, 0.3)'
        : '1px solid hsl(221, 83%, 53%, 0.2)',
      boxShadow: isDark
        ? '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 40px hsl(195, 100%, 50%, 0.4)'
        : '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 20px hsl(221, 83%, 53%, 0.2)',
      color: isDark ? 'hsl(210, 40%, 98%)' : 'hsl(222, 84%, 5%)',
      fontSize: '16px',
      padding: '24px',
      backdropFilter: 'blur(20px)',
    },
    tooltipContainer: {
      textAlign: 'left' as const,
    },
    tooltipTitle: {
      color: isDark ? 'hsl(195, 100%, 50%)' : 'hsl(221, 83%, 53%)',
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '12px',
    },
    tooltipContent: {
      color: isDark ? 'hsl(210, 40%, 98%)' : 'hsl(222, 84%, 5%)',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    buttonNext: {
      backgroundColor: isDark ? 'hsl(195, 100%, 50%)' : 'hsl(221, 83%, 53%)',
      borderRadius: '8px',
      border: 'none',
      color: 'white',
      fontSize: '14px',
      fontWeight: '600',
      padding: '12px 24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonBack: {
      backgroundColor: 'transparent',
      border: isDark
        ? '2px solid hsl(195, 100%, 50%, 0.5)'
        : '2px solid hsl(221, 83%, 53%, 0.5)',
      borderRadius: '8px',
      color: isDark ? 'hsl(195, 100%, 50%)' : 'hsl(221, 83%, 53%)',
      fontSize: '14px',
      fontWeight: '600',
      padding: '10px 22px',
      cursor: 'pointer',
      marginRight: '12px',
      transition: 'all 0.3s ease',
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      border: 'none',
      color: isDark ? 'hsl(210, 40%, 70%)' : 'hsl(222, 47%, 40%)',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonClose: {
      backgroundColor: 'transparent',
      border: 'none',
      color: isDark ? 'hsl(210, 40%, 70%)' : 'hsl(222, 47%, 40%)',
      fontSize: '18px',
      fontWeight: '500',
      padding: '8px',
      cursor: 'pointer',
      position: 'absolute' as const,
      right: '12px',
      top: '12px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    beacon: {
      backgroundColor: isDark ? 'hsl(195, 100%, 50%)' : 'hsl(221, 83%, 53%)',
      border: isDark
        ? '4px solid hsl(195, 100%, 50%, 0.3)'
        : '4px solid hsl(221, 83%, 53%, 0.3)',
    },
    beaconInner: {
      backgroundColor: isDark ? 'hsl(195, 100%, 50%)' : 'hsl(221, 83%, 53%)',
    },
    beaconOuter: {
      backgroundColor: isDark
        ? 'hsl(195, 100%, 50%, 0.3)'
        : 'hsl(221, 83%, 53%, 0.3)',
      border: isDark
        ? '2px solid hsl(195, 100%, 50%, 0.5)'
        : '2px solid hsl(221, 83%, 53%, 0.5)',
    },
    spotlight: {
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
    },
  }), [mounted, currentTheme, isDark]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

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
        floaterProps={{
          disableAnimation: false,
          styles: {
            floater: {
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
            }
          }
        }}
      />
      
      {!run && !isOpen && (
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