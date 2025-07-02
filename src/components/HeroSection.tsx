
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Star, Zap, Rocket, Bot, ChevronDown, Github, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative virtual-stage py-32 overflow-hidden">
      {/* Enhanced 3D Virtual Stage with White Shining Spotlights and More Animation */}
      <div className="absolute inset-0">
        <div className="spotlight-white absolute top-20 left-1/4 animate-pulse"></div>
        <div className="spotlight-white absolute top-32 right-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="spotlight-white absolute bottom-20 left-1/3 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Enhanced background company images with more animation */}
        <div className="absolute inset-0 opacity-15">
          {/* Square format images with enhanced animations */}
          <div className="absolute top-10 left-10 w-40 h-40 overflow-hidden animate-fade-in card-3d hover:scale-125 transition-all duration-700">
            <img 
              src="https://i.postimg.cc/Bbz4DZXg/ce9fedd7b042038f4b5a597ab8f52d45.jpg" 
              alt="Competitive Programming Contest"
              className="w-full h-full object-cover opacity-40 animate-pulse"
            />
          </div>
          <div className="absolute top-10 right-10 w-40 h-40 overflow-hidden animate-fade-in card-3d hover:scale-125 transition-all duration-700" style={{animationDelay: '0.5s'}}>
            <img 
              src="https://i.postimg.cc/fyC5gkxc/2021-ICPC-World-Champions.jpg" 
              alt="ICPC World Champions"
              className="w-full h-full object-cover opacity-40 animate-pulse"
            />
          </div>

          {/* Circular format images with floating animation */}
          <div className="absolute top-1/4 left-5 w-32 h-32 rounded-full overflow-hidden animate-fade-in floating-3d card-3d" style={{animationDelay: '1s'}}>
            <img 
              src="https://i.postimg.cc/wv8p94nW/45227950-2137472146284962-8222995478405447680-n.jpg" 
              alt="Programming Competition"
              className="w-full h-full object-cover opacity-35 animate-pulse"
            />
          </div>
          <div className="absolute top-1/4 right-5 w-32 h-32 rounded-full overflow-hidden animate-fade-in floating-3d card-3d" style={{animationDelay: '1.2s'}}>
            <img 
              src="https://i.postimg.cc/Gmx747B7/IOI-2023-1.webp" 
              alt="IOI 2023"
              className="w-full h-full object-cover opacity-35 animate-pulse"
            />
          </div>

          {/* Enhanced floating images with better positioning */}
          <img 
            src="https://i.postimg.cc/XYh1bSd5/maxresdefault.jpg" 
            alt="Tech Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-25 animate-fade-in"
          />
          <img 
            src="https://i.postimg.cc/Y9t92Vwr/apple-store.jpg" 
            alt="Apple Store"
            className="absolute top-1/4 right-0 w-1/3 h-1/3 object-cover opacity-30 rounded-l-3xl animate-fade-in card-3d hover:scale-105 transition-all duration-500"
            style={{animationDelay: '0.5s'}}
          />
          <img 
            src="https://i.postimg.cc/rp3Jv16N/google-head-office-campus-mountain-view-californias-usa-E94-EK8.jpg" 
            alt="Google Campus"
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 object-cover opacity-30 rounded-r-3xl animate-fade-in card-3d hover:scale-105 transition-all duration-500"
            style={{animationDelay: '1s'}}
          />
          <img 
            src="https://i.postimg.cc/xTXZ83YM/Meta-Completes-Another-Round-of-Layoffs.webp" 
            alt="Meta"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 object-cover opacity-25 rounded-2xl animate-fade-in floating-3d"
            style={{animationDelay: '1.5s'}}
          />
          <img 
            src="https://i.postimg.cc/gkpwkN3B/maxresdefault-1.jpg" 
            alt="Innovation Hub"
            className="absolute bottom-10 right-20 w-48 h-32 object-cover opacity-30 rounded-xl animate-fade-in card-3d hover:scale-110 transition-all duration-500"
            style={{animationDelay: '2s'}}
          />
        </div>

        {/* Enhanced 3D Floating Elements with More Dynamic Animation */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-green-500/30 rounded-full blur-3xl animate-floating-3d white-glow animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-floating-3d white-glow animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-red-500/20 to-pink-500/30 rounded-full blur-3xl animate-floating-3d white-glow animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Badge with company logo */}
          <div className="mb-12 flex justify-center animate-fade-in">
            <Badge variant="secondary" className="mb-8 gap-4 card-3d pulse-glow-white text-xl px-12 py-6 animate-scale-in hover:scale-110 transition-all duration-500">
              <img 
                src="https://i.postimg.cc/4NLSdfjB/cedf0ef6-a561-4074-aa6b-8993a0ba5baa.png" 
                alt="NEXTFAANG Logo"
                className="h-10 w-10 rounded-full animate-spin" style={{animationDuration: '8s'}}
              />
              <Star className="h-6 w-6 animate-pulse text-yellow-400" />
              India's First LGM Platform
            </Badge>
          </div>

          {/* Enhanced Headline with More Dynamic Animation */}
          <h1 className="text-5xl md:text-8xl font-bold mb-8 text-gradient slide-in-up leading-tight white-text-shadow animate-fade-in">
            <span className="inline-block animate-scale-in hover:scale-110 transition-transform duration-300">Welcome to</span>
            <br />
            <span className="inline-block animate-scale-in bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.2s'}}>NEXTFAANG</span>
            <br />
            <span className="relative inline-block animate-scale-in text-4xl md:text-6xl hover:scale-105 transition-transform duration-500" style={{animationDelay: '0.4s'}}>
              <span className="blue-gradient">Master CP & DSA to Crack FAANG</span>
              <div className="absolute -top-6 -right-6">
                <Rocket className="h-16 w-16 text-accent animate-floating-3d white-glow animate-pulse" />
              </div>
            </span>
          </h1>

          {/* Enhanced tagline with better animation */}
          <div className="mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-6 max-w-5xl mx-auto leading-relaxed white-text-shadow">
              <strong className="blue-gradient animate-pulse hover:scale-105 inline-block transition-transform duration-300">Real Progress</strong> • <strong className="silver-gradient animate-pulse hover:scale-105 inline-block transition-transform duration-300">Smart Guidance</strong> • <strong className="golden-gradient animate-pulse hover:scale-105 inline-block transition-transform duration-300">Battle-Tested Tools</strong>
            </p>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join thousands of students already transforming their coding journey with India's most comprehensive CP platform 🇮🇳
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <Button size="lg" className="gap-4 text-2xl px-16 py-8 bg-gradient-to-r from-orange-500 via-white to-green-500 hover:from-orange-600 hover:to-green-600 text-black font-bold card-3d pulse-glow-white white-glow hover:scale-125 transition-all duration-500 animate-scale-in">
              <TrendingUp className="h-8 w-8 animate-bounce" />
              Start Your Journey 🚀
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-4 text-2xl px-16 py-8 border-4 border-primary/60 hover:bg-primary/30 card-3d white-glow hover:scale-125 transition-all duration-500 animate-scale-in" 
              style={{animationDelay: '0.2s'}}
              onClick={scrollToFeatures}
            >
              <ChevronDown className="h-8 w-8 animate-bounce" />
              Explore Features
            </Button>
            <Link to="#" onClick={() => {
              const chatbot = document.querySelector('[data-chatbot]');
              if (chatbot) {
                chatbot.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <Button variant="outline" size="lg" className="gap-4 text-2xl px-16 py-8 border-4 border-accent/60 hover:bg-accent/30 card-3d white-glow hover:scale-125 transition-all duration-500 animate-scale-in" style={{animationDelay: '0.4s'}}>
                <Bot className="h-8 w-8 animate-pulse" />
                AI Mentor 🤖
              </Button>
            </Link>
          </div>

          {/* Enhanced Quick Stats & Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 animate-fade-in" style={{animationDelay: '1.2s'}}>
            <div className="card-3d glass-morphism p-10 rounded-3xl white-glow hover:scale-115 transition-all duration-500 border-2 border-blue-400/30">
              <div className="text-5xl font-bold text-primary mb-4 white-text-shadow animate-pulse">2,547+</div>
              <div className="text-muted-foreground text-lg">Active Students</div>
              <div className="text-4xl mt-2 animate-bounce">👨‍💻</div>
            </div>
            <div className="card-3d glass-morphism p-10 rounded-3xl white-glow hover:scale-115 transition-all duration-500 border-2 border-green-400/30">
              <div className="text-5xl font-bold text-green-400 mb-4 white-text-shadow animate-pulse">150+</div>
              <div className="text-muted-foreground text-lg">FAANG Placements</div>
              <div className="text-4xl mt-2 animate-bounce">🏆</div>
            </div>
            <div className="card-3d glass-morphism p-10 rounded-3xl white-glow hover:scale-115 transition-all duration-500 border-2 border-orange-400/30">
              <div className="text-5xl font-bold text-orange-400 mb-4 white-text-shadow animate-pulse">98%</div>
              <div className="text-muted-foreground text-lg">Success Rate</div>
              <div className="text-4xl mt-2 animate-bounce">🎯</div>
            </div>
          </div>

          {/* Enhanced Dev Details Section */}
          <div className="glass-morphism border-4 border-primary/40 rounded-3xl p-12 max-w-6xl mx-auto card-3d pulse-glow-white white-glow animate-fade-in hover:scale-105 transition-all duration-700" style={{animationDelay: '1.4s'}}>
            <div className="flex items-center justify-center gap-6 mb-8">
              <Zap className="h-12 w-12 text-primary floating-3d white-glow animate-pulse" />
              <h3 className="text-4xl font-bold text-gradient white-text-shadow animate-scale-in">
                🚧 Ongoing Development
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
              <div className="text-left">
                <h4 className="font-bold text-2xl mb-6 text-primary white-text-shadow">Tech Stack</h4>
                <div className="space-y-3 text-muted-foreground text-lg">
                  <div className="hover:scale-105 transition-transform duration-300">• React + TypeScript</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Tailwind CSS + Shadcn UI</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Vite + React Router</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Tanstack Query</div>
                </div>
              </div>
              
              <div className="text-left">
                <h4 className="font-bold text-2xl mb-6 text-secondary white-text-shadow">Future Plans</h4>
                <div className="space-y-3 text-muted-foreground text-lg">
                  <div className="hover:scale-105 transition-transform duration-300">• Advanced AI Mentor</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Resume Builder Pro</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Live CP Battles</div>
                  <div className="hover:scale-105 transition-transform duration-300">• Company-wise Prep</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              <Button variant="outline" size="lg" className="gap-3 border-primary/50 hover:bg-primary/30 white-glow hover:scale-110 transition-all duration-500 text-lg px-8 py-4">
                <Github className="h-6 w-6" />
                ✅ GitHub Repo
              </Button>
              <Button variant="outline" size="lg" className="gap-3 border-secondary/50 hover:bg-secondary/30 white-glow hover:scale-110 transition-all duration-500 text-lg px-8 py-4">
                <FileText className="h-6 w-6" />
                ✅ Pitch Deck
              </Button>
              <Button variant="outline" size="lg" className="gap-3 border-accent/50 hover:bg-accent/30 white-glow hover:scale-110 transition-all duration-500 text-lg px-8 py-4">
                <Target className="h-6 w-6" />
                ✅ Working Prototype
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
