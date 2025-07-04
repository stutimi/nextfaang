
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SignupRequired } from "@/components/SignupRequired";
import { CelebrationEffect } from "@/components/CelebrationEffect";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { DSASection } from "@/components/DSASection";
import { CPSection } from "@/components/CPSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { SmartToolsSection } from "@/components/SmartToolsSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { CommunitySection } from "@/components/CommunitySection";
import { EnhancedChatbot } from "@/components/EnhancedChatbot";
import { FloatingAIMentor } from "@/components/FloatingAIMentor";
import { EnhancedAIMentor } from "@/components/EnhancedAIMentor";
import { FutureScope } from "@/components/FutureScope";
import { ContactSection } from "@/components/ContactSection";
import { CodingArena } from "@/components/CodingArena";
import { VoiceAITour } from "@/components/VoiceAITour";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAIMentor, setShowAIMentor] = useState(false);
  const [showVoiceTour, setShowVoiceTour] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Check if user has already signed up
  useEffect(() => {
    const signupData = localStorage.getItem('user_signup');
    if (signupData) {
      setHasSignedUp(true);
    }
  }, []);

  // Track visitor if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      // Track visitor (this could be enhanced with IP geolocation)
      const trackVisitor = async () => {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const { ip } = await response.json();
          
          // You could add more visitor tracking here
          console.log('Visitor tracked:', { ip, timestamp: new Date() });
        } catch (error) {
          console.error('Failed to track visitor:', error);
        }
      };
      
      trackVisitor();
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show signup form if user hasn't signed up and isn't authenticated
  if (!hasSignedUp && !user) {
    return (
      <>
        <SignupRequired onSignupComplete={() => {
          setHasSignedUp(true);
          setShowCelebration(true);
        }} />
        <CelebrationEffect 
          show={showCelebration} 
          onComplete={() => setShowCelebration(false)} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar />
      
      {user ? (
        // Authenticated user - show the arena
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.email?.split('@')[0]}!</h1>
            <p className="text-muted-foreground">Ready for your next coding duel?</p>
          </div>
          <CodingArena />
        </div>
      ) : (
        // Public landing page
        <>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Stats Section */}
          <StatsSection />
          
          {/* Core Learning Sections */}
          <div id="dsa-section">
            <DSASection />
          </div>
          
          <div id="cp-section">
            <CPSection />
          </div>
          
          <SystemDesignSection />
          
          {/* Smart Tools Section */}
          <div id="smart-tools">
            <SmartToolsSection />
          </div>
          
          {/* Open Source Section */}
          <OpenSourceSection />
          
          {/* Community Section */}
          <div id="community">
            <CommunitySection />
          </div>
          
          {/* Future Scope Section */}
          <FutureScope />
          
          {/* Contact Section */}
          <div id="contact">
            <ContactSection />
          </div>
        </>
      )}
      
      {/* Enhanced Chatbot */}
      {showChatbot && (
        <EnhancedChatbot onClose={() => setShowChatbot(false)} />
      )}
      
      {/* Floating AI Mentor */}
      <FloatingAIMentor 
        onToggle={() => setShowAIMentor(!showAIMentor)}
        isOpen={showAIMentor}
      />
      
      {showAIMentor && (
        <EnhancedAIMentor onClose={() => setShowAIMentor(false)} />
      )}

      {/* Voice AI Tour */}
      {showVoiceTour && (
        <VoiceAITour onClose={() => setShowVoiceTour(false)} />
      )}

      {/* Floating Voice Tour Button */}
      {!user && !showVoiceTour && (
        <button
          onClick={() => setShowVoiceTour(true)}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          title="Start Voice Tour"
        >
          🎤 Tour
        </button>
      )}
    </div>
  );
};

export default Index;
