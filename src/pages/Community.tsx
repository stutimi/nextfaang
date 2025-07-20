import { CommunitySection } from "@/components/CommunitySection";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Chatbot } from "@/components/Chatbot";

const Community = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <InteractiveBackground />
      <Navbar />
      <main className="pt-20">
        <CommunitySection />
      </main>
      
      {/* Enhanced UI Components */}
      <ScrollProgress />
      <Chatbot />
      <FloatingActionButton />
    </div>
  );
};

export default Community;