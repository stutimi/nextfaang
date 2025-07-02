
import { useState, useEffect, useRef } from 'react';
import { Bot, MessageCircle, X, Compass, Play, CheckCircle, ArrowRight, Lightbulb, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface GuideStep {
  id: number;
  title: string;
  description: string;
  action: string;
  completed: boolean;
  element?: string;
}

const platformSteps: GuideStep[] = [
  {
    id: 1,
    title: "Welcome to NEXTFAANG! 🚀",
    description: "Let's start your journey to become India's next coding champion. I'll guide you through every feature!",
    action: "Get Started",
    completed: false
  },
  {
    id: 2,
    title: "Explore Hero Section",
    description: "Check out our main features showcase with live stats and company partnerships.",
    action: "View Hero Section",
    completed: false,
    element: "#hero"
  },
  {
    id: 3,
    title: "Interactive Features",
    description: "Discover powerful tools like progress charts, CP roadmap, and dictionary.",
    action: "Explore Features",
    completed: false,
    element: "#features"
  },
  {
    id: 4,
    title: "DSA Mastery Roadmap",
    description: "Follow our structured learning path for Data Structures and Algorithms.",
    action: "Start DSA Journey",
    completed: false,
    element: "#roadmap"
  },
  {
    id: 5,
    title: "Join Community",
    description: "Connect with fellow coders, participate in discussions, and grow together.",
    action: "Join Community",
    completed: false,
    element: "#community"
  },
  {
    id: 6,
    title: "AI Assistant",
    description: "Use our advanced AI chatbot for personalized help and coding guidance.",
    action: "Chat with AI",
    completed: false,
    element: "[data-chatbot]"
  }
];

export const PlatformGuideMentor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(platformSteps);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isGuiding, setIsGuiding] = useState(false);
  
  const { toast } = useToast();

  const progress = (steps.filter(step => step.completed).length / steps.length) * 100;

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    if (stepId < steps.length) {
      setCurrentStep(stepId);
    }
    
    toast({
      title: "Step Completed! 🎉",
      description: "Great job! Moving to the next step.",
    });
  };

  const navigateToElement = (element?: string) => {
    if (element) {
      const targetElement = document.querySelector(element);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add highlight effect
        targetElement.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-75');
        setTimeout(() => {
          targetElement.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-75');
        }, 3000);
      }
    }
  };

  const startGuide = () => {
    setShowWelcome(false);
    setIsGuiding(true);
    setCurrentStep(1);
    toast({
      title: "🎯 Platform Tour Started!",
      description: "I'll guide you through all the amazing features!",
    });
  };

  const handleStepAction = (step: GuideStep) => {
    if (step.element) {
      navigateToElement(step.element);
    }
    completeStep(step.id);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl card-3d white-glow animate-pulse"
        >
          <Compass className="h-8 w-8 text-white animate-spin" />
        </Button>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-medium animate-bounce">
          Platform Guide
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <Card className="w-96 h-[600px] card-3d white-glow border-2 border-indigo-400/30 bg-gradient-to-br from-slate-900/95 to-indigo-900/95 backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-400/30 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full animate-pulse">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Platform Guide</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-indigo-200">NEXTFAANG Assistant</p>
                <Badge className="text-xs bg-green-500/20 text-green-300">
                  🟢 Active
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 border-b border-indigo-400/30 bg-slate-800/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-indigo-200">Progress</span>
            <span className="text-sm text-indigo-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-700" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-400">{steps.filter(s => s.completed).length} of {steps.length} completed</span>
            <span className="text-xs text-indigo-400">🎯 Building India's First LGM</span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0 h-[420px] overflow-y-auto">
          {showWelcome ? (
            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-indigo-200 mb-2">Welcome to NEXTFAANG! 🚀</h2>
                <p className="text-indigo-300 mb-4">Building India's First LGM for Competitive Programming</p>
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 rounded-lg border border-indigo-400/30 mb-6">
                  <h3 className="font-semibold text-indigo-200 mb-2">🎯 What I'll help you with:</h3>
                  <ul className="text-sm text-indigo-300 space-y-1 text-left">
                    <li>• Navigate all platform features</li>
                    <li>• Set up your learning journey</li>
                    <li>• Maximize your coding potential</li>
                    <li>• Connect with the community</li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={startGuide}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Platform Tour
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    step.completed
                      ? 'bg-green-500/10 border-green-400/30'
                      : index === currentStep
                      ? 'bg-indigo-500/20 border-indigo-400/50 ring-2 ring-indigo-400/30'
                      : 'bg-slate-800/50 border-slate-600/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-indigo-500 text-white animate-pulse'
                        : 'bg-slate-600 text-slate-300'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : index === currentStep ? (
                        <Zap className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-2 ${
                        step.completed ? 'text-green-300' : 'text-indigo-200'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-300 mb-3">{step.description}</p>
                      {!step.completed && index === currentStep && (
                        <Button
                          onClick={() => handleStepAction(step)}
                          size="sm"
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                        >
                          {step.action}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {progress === 100 && (
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="font-bold text-green-300 mb-2">Congratulations!</h3>
                  <p className="text-sm text-green-200 mb-3">You've completed the platform tour! Ready to start your coding journey?</p>
                  <Button
                    onClick={() => {
                      setShowWelcome(true);
                      setCurrentStep(0);
                      setSteps(platformSteps.map(s => ({ ...s, completed: false })));
                    }}
                    size="sm"
                    variant="outline"
                    className="border-green-400/30 text-green-300 hover:bg-green-500/20"
                  >
                    Restart Tour
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
