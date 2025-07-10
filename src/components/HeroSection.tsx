import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Star, Zap, Rocket, Bot, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <Badge variant="outline" className="px-4 py-2 border-primary/30 bg-primary/5 text-primary">
              <Star className="h-4 w-4 mr-2" />
              India's First LGM Platform
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block text-gray-100">Welcome to</span>
            <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              NEXTFAANG
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Master competitive programming and data structures to crack top tech companies
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of students transforming their coding journey with India's most comprehensive platform
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button size="lg" className="px-8 gap-2">
              <TrendingUp className="h-5 w-5" />
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 gap-2" 
              onClick={scrollToFeatures}
            >
              <ChevronDown className="h-5 w-5" />
              Explore Features
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-300">Problems Solved</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-gray-300">FAANG Placements</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};