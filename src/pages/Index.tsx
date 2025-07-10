import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";
import { SignupRequired } from "@/components/SignupRequired";
import { CelebrationEffect } from "@/components/CelebrationEffect";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { DSASection } from "@/components/DSASection";
import { CPSection } from "@/components/CPSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { SmartToolsSection } from "@/components/SmartToolsSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FutureScope } from "@/components/FutureScope";
import { ContactSection } from "@/components/ContactSection";
import { CodingArena } from "@/components/CodingArena";
import { Chatbot } from "@/components/Chatbot";
import { VoiceAITour } from "@/components/VoiceAITour";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const { user, loading } = useAuth();
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

  if (loading) {
    return <LoadingScreen />;
  }

  if (!hasSignedUp && !user) {
    return (
      <>
        <SignupRequired 
          onSignupComplete={() => {
            setHasSignedUp(true);
            setShowCelebration(true);
          }} 
        />
        <CelebrationEffect 
          show={showCelebration} 
          onComplete={() => setShowCelebration(false)} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {user ? (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="text-primary">{user.email?.split('@')[0]}</span>!
            </h1>
            <p className="text-muted-foreground">Ready for your next coding challenge?</p>
          </div>
          <CodingArena />
        </div>
      ) : (
        <main className="space-y-20 md:space-y-32">
          <div id="hero">
            <HeroSection />
          </div>
          
          <StatsSection />
          
          <section id="learning-sections" className="space-y-20 md:space-y-32">
            <div id="dsa-section">
              <DSASection />
            </div>
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
      )}
      
      <Chatbot />
      {showTour && <VoiceAITour onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default Index;