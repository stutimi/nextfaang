
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { DSASection } from "@/components/DSASection";
import { CPSection } from "@/components/CPSection";
import { SystemDesignSection } from "@/components/SystemDesignSection";
import { EnhancedChatbot } from "@/components/EnhancedChatbot";
import { FloatingAIMentor } from "@/components/FloatingAIMentor";
import { EnhancedAIMentor } from "@/components/EnhancedAIMentor";
import { FutureScope } from "@/components/FutureScope";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAIMentor, setShowAIMentor] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Core Learning Sections */}
      <DSASection />
      <CPSection />
      <SystemDesignSection />
      
      {/* Future Scope Section */}
      <FutureScope />
      
      {/* Contact Section */}
      <ContactSection />
      
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
