
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Star, Zap, Rocket, Bot, ChevronDown, Github, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative futuristic-bg py-32 overflow-hidden">
      {/* Futuristic Effects Background */}
      <div className="absolute inset-0">
        <div className="sparkle-effect w-full h-full"></div>
        
        {/* Enhanced background with holographic effects */}
        <div className="absolute inset-0 opacity-20">
          {/* Holographic cards with 3D tilt */}
          <div className="absolute top-10 left-10 w-40 h-40 overflow-hidden holographic-card tilt-3d">
            <img 
              src="https://i.postimg.cc/Bbz4DZXg/ce9fedd7b042038f4b5a597ab8f52d45.jpg" 
              alt="Competitive Programming Contest"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="absolute top-10 right-10 w-40 h-40 overflow-hidden holographic-card tilt-3d">
            <img 
              src="https://i.postimg.cc/fyC5gkxc/2021-ICPC-World-Champions.jpg" 
              alt="ICPC World Champions"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Floating circular images with cyber borders */}
          <div className="absolute top-1/4 left-5 w-32 h-32 rounded-full overflow-hidden cyber-border glass-card">
            <img 
              src="https://i.postimg.cc/wv8p94nW/45227950-2137472146284962-8222995478405447680-n.jpg" 
              alt="Programming Competition"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute top-1/4 right-5 w-32 h-32 rounded-full overflow-hidden cyber-border glass-card">
            <img 
              src="https://i.postimg.cc/Gmx747B7/IOI-2023-1.webp" 
              alt="IOI 2023"
              className="w-full h-full object-cover opacity-70"
            />
          </div>

          {/* Additional floating elements with new effects */}
          <img 
            src="https://i.postimg.cc/Y9t92Vwr/apple-store.jpg" 
            alt="Apple Store"
            className="absolute top-1/4 right-0 w-1/3 h-1/3 object-cover opacity-40 rounded-l-3xl holographic-card tilt-3d"
          />
          <img 
            src="https://i.postimg.cc/rp3Jv16N/google-head-office-campus-mountain-view-californias-usa-E94-EK8.jpg" 
            alt="Google Campus"
            className="absolute bottom-1/4 left-0 w-1/3 h-1/3 object-cover opacity-40 rounded-r-3xl holographic-card tilt-3d"
          />
        </div>

        {/* Futuristic floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple/30 to-pink/30 rounded-full blur-3xl animate-floating-3d"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-neon-blue/30 to-light-blue/30 rounded-full blur-3xl animate-floating-3d"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-accent/20 to-primary/30 rounded-full blur-3xl animate-floating-3d"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Badge with futuristic design */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex justify-center"
          >
            <Badge className="glass-card cyber-border text-xl px-12 py-6 hover:scale-110 transition-all duration-500 gap-4">
              <img 
                src="https://i.postimg.cc/4NLSdfjB/cedf0ef6-a561-4074-aa6b-8993a0ba5baa.png" 
                alt="NEXTFAANG Logo"
                className="h-10 w-10 rounded-full animate-spin" style={{animationDuration: '8s'}}
              />
              <Star className="h-6 w-6 animate-pulse text-accent" />
              <span className="neon-text-accent">India's First LGM Platform</span>
            </Badge>
          </motion.div>

          {/* Futuristic Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, staggerChildren: 0.2 }}
            className="text-5xl md:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="block neon-text">Welcome to</span>
            <span className="block neon-text-accent text-6xl md:text-9xl">NEXTFAANG</span>
            <span className="relative block text-4xl md:text-6xl neon-text">
              Master CP & DSA to Crack FAANG
              <div className="absolute -top-6 -right-6">
                <Rocket className="h-16 w-16 text-accent animate-floating-3d" />
              </div>
            </span>
          </motion.h1>

          {/* Enhanced tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl text-foreground/80 mb-6 max-w-5xl mx-auto leading-relaxed">
              <strong className="neon-text-accent">Real Progress</strong> • <strong className="neon-text">Smart Guidance</strong> • <strong className="text-accent">Battle-Tested Tools</strong>
            </p>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Join thousands of students already transforming their coding journey with India's most comprehensive CP platform 🇮🇳
            </p>
          </motion.div>

          {/* Futuristic CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
          >
            <Button size="lg" className="futuristic-btn text-2xl px-16 py-8 gap-4">
              <TrendingUp className="h-8 w-8 animate-bounce" />
              Start Your Journey 🚀
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-card cyber-border text-2xl px-16 py-8 gap-4 hover:scale-110 transition-all duration-500" 
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
              <Button className="futuristic-btn text-2xl px-16 py-8 gap-4">
                <Bot className="h-8 w-8 animate-pulse" />
                AI Mentor 🤖
              </Button>
            </Link>
          </motion.div>

          {/* Futuristic Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
          >
            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05}>
              <div className="glass-card cyber-border p-10 rounded-3xl hover:scale-105 transition-all duration-500">
                <div className="text-5xl font-bold neon-text mb-4">1M+</div>
                <div className="text-muted-foreground text-lg">Problems Solved</div>
                <div className="text-4xl mt-2 animate-bounce">💻</div>
              </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05}>
              <div className="glass-card cyber-border p-10 rounded-3xl hover:scale-105 transition-all duration-500">
                <div className="text-5xl font-bold text-accent mb-4">150+</div>
                <div className="text-muted-foreground text-lg">FAANG Placements</div>
                <div className="text-4xl mt-2 animate-bounce">🏆</div>
              </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.05}>
              <div className="glass-card cyber-border p-10 rounded-3xl hover:scale-105 transition-all duration-500">
                <div className="text-5xl font-bold neon-text-accent mb-4">98%</div>
                <div className="text-muted-foreground text-lg">Success Rate</div>
                <div className="text-4xl mt-2 animate-bounce">🎯</div>
              </div>
            </Tilt>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
