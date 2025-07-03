
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { DSASection } from "@/components/DSASection";
import { CPSection } from "@/components/CPSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { SmartToolsSection } from "@/components/SmartToolsSection";
import { HackathonSection } from "@/components/HackathonSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { EnhancedChatbot } from "@/components/EnhancedChatbot";
import { FloatingAIMentor } from "@/components/FloatingAIMentor";
import { EnhancedAIMentor } from "@/components/EnhancedAIMentor";
import { FutureScope } from "@/components/FutureScope";
import { ContactSection } from "@/components/ContactSection";
import { CodingArena } from "@/components/CodingArena";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAIMentor, setShowAIMentor] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
          <DSASection />
          <CPSection />
          <SystemDesignSection />
          
          {/* Smart Tools Section */}
          <SmartToolsSection />
          
          {/* Hackathon Section */}
          <HackathonSection />
          
          {/* Open Source Section */}
          <OpenSourceSection />
          
          {/* Future Scope Section */}
          <FutureScope />
          
          {/* Contact Section */}
          <ContactSection />
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
    </div>
  );
};

export default Index;
