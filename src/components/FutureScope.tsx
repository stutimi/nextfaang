import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Brain, 
  Zap, 
  Target, 
  Users, 
  Trophy, 
  Code, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  Orbit,
  Globe,
  Cpu,
  Database,
  Layers,
  Network
} from "lucide-react";

const SparkleEffect = ({ count = 50 }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent opacity-70 shadow-lg"></div>
        </div>
      ))}
    </div>
  );
};

const FloatingOrb = ({ size, color, duration, delay }) => (
  <div
    className="absolute rounded-full blur-xl opacity-30 animate-floating-3d"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
    }}
  />
);

export const FutureScope = () => {
  const futureFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Code Review",
      description: "Advanced AI that analyzes your code quality, suggests optimizations, and provides personalized feedback.",
      status: "Coming Soon",
      color: "bg-purple-500",
      features: ["Code Quality Analysis", "Performance Optimization", "Best Practices Guide"]
    },
    {
      icon: Trophy,
      title: "Global Competitive Leagues",
      description: "Join seasonal leagues, compete with peers worldwide, and climb the global leaderboards.",
      status: "In Development",
      color: "bg-yellow-500",
      features: ["Seasonal Tournaments", "Skill-based Matchmaking", "Real Rewards"]
    },
    {
      icon: Users,
      title: "Virtual Study Groups",
      description: "Form study groups, share resources, and learn together with peers from around the world.",
      status: "Planning",
      color: "bg-green-500",
      features: ["Group Challenges", "Shared Whiteboards", "Peer Learning"]
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Pair programming sessions, live code sharing, and instant mentorship connections.",
      status: "Coming Soon",
      color: "bg-blue-500",
      features: ["Live Code Editing", "Video Calls", "Screen Sharing"]
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "AI-curated learning journeys based on your goals, current skill level, and career aspirations.",
      status: "Beta",
      color: "bg-red-500",
      features: ["Adaptive Learning", "Progress Tracking", "Goal Setting"]
    },
    {
      icon: Rocket,
      title: "Industry Projects",
      description: "Work on real-world projects from top tech companies and build your professional portfolio.",
      status: "Coming Soon",
      color: "bg-indigo-500",
      features: ["Real Projects", "Company Partnerships", "Portfolio Building"]
    }
  ];

  const smartTools = [
    {
      title: "Code Complexity Analyzer",
      description: "Analyze time & space complexity with visual explanations",
      icon: TrendingUp,
      coming: true
    },
    {
      title: "Interview Simulator",
      description: "Practice technical interviews with AI interviewers",
      icon: Users,
      coming: true
    },
    {
      title: "Bug Detector Pro",
      description: "AI-powered bug detection and fixing suggestions",
      icon: Target,
      coming: true
    },
    {
      title: "Performance Optimizer",
      description: "Automatic code optimization recommendations",
      icon: Zap,
      coming: true
    }
  ];

  return (
    <section id="future" className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 border-primary/30 bg-primary/5 text-primary mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Future Vision
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-gray-100">Building the</span>
            <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Future of CP Education
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionary features and smart tools that will transform how you learn competitive programming
          </p>
        </div>

        {/* Smart Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
              Upcoming Smart Tools
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {smartTools.map((tool, index) => (
              <Card 
                key={index} 
                className="bg-gray-900/50 border border-gray-800 hover:border-primary/40 transition-colors group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-blue-500/10 group-hover:from-primary/20 group-hover:to-blue-500/20 transition-colors">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    {tool.coming && (
                      <Badge className="bg-gradient-to-r from-primary/20 to-blue-500/20 border-primary/30">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-100">{tool.title}</h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
              Revolutionary Features
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {futureFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gray-900/50 border border-gray-800 hover:border-primary/40 transition-colors group"
              >
                <CardHeader className="flex flex-row items-start space-y-0 space-x-4 pb-4">
                  <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl text-gray-100">{feature.title}</CardTitle>
                    <Badge 
                      variant={feature.status === "Beta" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-primary">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="border-gray-700 text-gray-300 hover:bg-primary/10 hover:border-primary/30"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/90 to-blue-500/90">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <SparkleEffect count={20} />
          </div>
          
          <CardContent className="p-12 text-center relative z-10">
            <div className="flex justify-center mb-8">
              <Rocket className="h-16 w-16 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Our Vision for the Future
            </h2>
            
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're building the world's most advanced platform for competitive programming and 
              technical education, powered by AI and designed for students by students.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="group">
                <div className="text-4xl font-bold mb-2 text-white group-hover:text-primary transition-colors">1M+</div>
                <div className="text-white/80 text-sm font-medium">Students Worldwide</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 text-white group-hover:text-primary transition-colors">100+</div>
                <div className="text-white/80 text-sm font-medium">Industry Partners</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold mb-2 text-white group-hover:text-primary transition-colors">50+</div>
                <div className="text-white/80 text-sm font-medium">Smart AI Tools</div>
              </div>
            </div>
            
            <Button 
              className="bg-white text-gray-900 hover:bg-white/90 font-bold px-8 py-4 shadow-lg"
              size="lg"
            >
              Join the Revolution
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};