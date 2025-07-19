import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";
import { SignupRequired } from "@/components/SignupRequired";
import { CelebrationEffect } from "@/components/CelebrationEffect";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";

import { CPSection } from "@/components/CPSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { SmartToolsSection } from "@/components/SmartToolsSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FutureScope } from "@/components/FutureScope";
import { ContactSection } from "@/components/ContactSection";
import { Chatbot } from "@/components/Chatbot";
import { VoiceAITour } from "@/components/VoiceAITour";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InteractiveBackground } from "@/components/InteractiveBackground";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const navigate = useNavigate();

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useVisitorTracker();

  useEffect(() => {
    const signupData = localStorage.getItem('user_signup');
    if (signupData) {
      setHasSignedUp(true);
    }

    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowTour(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px;
      }
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);



  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <InteractiveBackground />
      <Navbar />
      <main className="space-y-20 md:space-y-32">
        <div id="hero">
          <HeroSection />
        </div>
        
        <StatsSection />
        
        <section id="learning-sections" className="space-y-20 md:space-y-32">

          <div id="cp-section">
            <CPSection />
          </div>
          <SystemDesignSection />
        </section>

        <div id="smart-tools">
          <SmartToolsSection />
        </div>
        
        <OpenSourceSection />
        
        <div id="community">
          <CommunitySection />
        </div>
        
        <FutureScope />
        
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      
      {/* Enhanced UI Components */}
      <ScrollProgress />
      <Chatbot />
      {showTour && <VoiceAITour onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default Index;
