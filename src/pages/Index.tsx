import React, { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InteractiveBackground } from "@/components/InteractiveBackground";

// Lazy load non-critical components
const CPSection = lazy(() => import("@/components/CPSection").then(module => ({ default: module.CPSection })));
const SystemDesignSection = lazy(() => import("@/components/SystemDesignSection").then(module => ({ default: module.SystemDesignSection })));
const SmartToolsSection = lazy(() => import("@/components/SmartToolsSection").then(module => ({ default: module.SmartToolsSection })));
const OpenSourceSection = lazy(() => import("@/components/OpenSourceSection").then(module => ({ default: module.OpenSourceSection })));
const CommunitySection = lazy(() => import("@/components/CommunitySection").then(module => ({ default: module.CommunitySection })));
const FutureScope = lazy(() => import("@/components/FutureScope").then(module => ({ default: module.FutureScope })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const Chatbot = lazy(() => import("@/components/Chatbot").then(module => ({ default: module.Chatbot })));
const VoiceAITour = lazy(() => import("@/components/VoiceAITour").then(module => ({ default: module.VoiceAITour })));

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
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingScreen /></div>}>
            <div id="cp-section">
              <CPSection />
            </div>
            <SystemDesignSection />
          </Suspense>
        </section>

        <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingScreen /></div>}>
          <div id="smart-tools">
            <SmartToolsSection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingScreen /></div>}>
          <OpenSourceSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingScreen /></div>}>
          <div id="community">
            <CommunitySection />
          </div>
        </Suspense>
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingScreen /></div>}>
          <FutureScope />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><LoadingScreen /></div>}>
          <div id="contact">
            <ContactSection />
          </div>
        </Suspense>
      </main>
      
      {/* Enhanced UI Components */}
      <ScrollProgress />
      <Suspense fallback={null}>
        <Chatbot />
        {showTour && <VoiceAITour onClose={() => setShowTour(false)} />}
      </Suspense>
    </div>
  );
};

export default Index;
