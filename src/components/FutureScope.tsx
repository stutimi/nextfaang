
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <FloatingOrb size={200} color="hsl(var(--primary))" duration={8} delay={0} />
        <FloatingOrb size={150} color="hsl(var(--secondary))" duration={12} delay={2} />
        <FloatingOrb size={100} color="hsl(var(--accent))" duration={10} delay={4} />
        <FloatingOrb size={80} color="hsl(var(--primary))" duration={15} delay={6} />
        <SparkleEffect count={30} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="inline-flex items-center gap-3 glass-morphism px-8 py-4 rounded-full mb-8 border border-primary/20 rainbow-border animate-floating-3d">
            <Sparkles className="h-6 w-6 text-primary animate-spin" />
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NEXTFAANG Future Scope
            </span>
            <Orbit className="h-6 w-6 text-secondary animate-spin" style={{ animationDirection: 'reverse' }} />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 relative">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in rainbow-text">
              Smart Tools for
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.3s' }}>
              Smart Students
            </span>
            <div className="absolute -top-4 -right-4">
              <div className="animate-bounce">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
            </div>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Revolutionizing competitive programming and technical education with cutting-edge AI, 
            collaborative learning, and industry-focused training programs that prepare you for the future.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Badge className="glass-morphism border-primary/30 px-6 py-3 text-base hover:scale-110 transition-transform cursor-pointer">
              <Star className="h-5 w-5 mr-2 text-primary" />
              Student-Focused
            </Badge>
            <Badge className="glass-morphism border-secondary/30 px-6 py-3 text-base hover:scale-110 transition-transform cursor-pointer">
              <Brain className="h-5 w-5 mr-2 text-secondary" />
              AI-Powered
            </Badge>
            <Badge className="glass-morphism border-accent/30 px-6 py-3 text-base hover:scale-110 transition-transform cursor-pointer">
              <Trophy className="h-5 w-5 mr-2 text-accent" />
              Industry-Ready
            </Badge>
          </div>
        </div>

        {/* Smart Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Upcoming Smart Tools
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smartTools.map((tool, index) => (
              <Card 
                key={index} 
                className="card-3d glass-morphism border-primary/20 hover:border-primary/40 group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-300">
                      <tool.icon className="h-10 w-10 text-primary" />
                    </div>
                    {tool.coming && (
                      <Badge className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 pulse-glow">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revolutionary Features Grid */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Revolutionary Features
              </span>
              <br />
              <span className="text-4xl bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                in Development
              </span>
            </h2>
            <div className="flex justify-center gap-2">
              <div className="w-8 h-1 bg-primary rounded-full animate-pulse"></div>
              <div className="w-8 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-8 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 relative z-10">
            {futureFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="legend-card group hover:scale-105 transition-all duration-500 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
                  <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                </div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`p-4 rounded-2xl ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-8 w-8" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                      </div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                        <Badge 
                          variant={feature.status === "Beta" ? "default" : "secondary"}
                          className="mt-2 group-hover:scale-110 transition-transform"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-lg mb-8 leading-relaxed group-hover:text-foreground transition-colors">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-4">
                    <h4 className="font-bold text-base text-primary">Key Features:</h4>
                    <div className="flex flex-wrap gap-3">
                      {feature.features.map((item, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="px-4 py-2 border-primary/30 hover:bg-primary/10 hover:scale-105 transition-all cursor-pointer"
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
        <Card className="relative overflow-hidden border-0 mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <SparkleEffect count={20} />
          </div>
          
          <CardContent className="p-16 text-center relative z-10 text-white">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Rocket className="h-20 w-20 mx-auto animate-floating-3d" />
                <div className="absolute inset-0 animate-spin">
                  <Orbit className="h-20 w-20 opacity-30" />
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl font-black mb-8 white-text-shadow">
              Our Vision for the Future
            </h2>
            
            <p className="text-xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              We're building the world's most advanced platform for competitive programming and technical education. 
              Our AI-powered tools, collaborative learning environment, and industry partnerships will transform 
              how students learn, practice, and succeed in their tech careers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div className="group">
                <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">1M+</div>
                <div className="text-white/80 text-lg font-semibold flex items-center justify-center gap-2">
                  <Globe className="h-5 w-5" />
                  Students Worldwide
                </div>
              </div>
              <div className="group">
                <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">100+</div>
                <div className="text-white/80 text-lg font-semibold flex items-center justify-center gap-2">
                  <Network className="h-5 w-5" />
                  Industry Partners
                </div>
              </div>
              <div className="group">
                <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-white/80 text-lg font-semibold flex items-center justify-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Smart AI Tools
                </div>
              </div>
            </div>
            
            <Button 
              className="button-3d bg-white text-primary hover:bg-white/90 font-bold px-12 py-6 text-lg shadow-xl"
              size="lg"
            >
              Join the Revolution
              <ArrowRight className="h-6 w-6 ml-3" />
            </Button>
          </CardContent>
        </Card>

        {/* Beta Program CTA */}
        <div className="text-center relative">
          <Card className="glass-morphism border-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
            
            <CardContent className="p-12 relative z-10">
              <div className="flex justify-center mb-6">
                <div className="flex gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 animate-bounce">
                    <Database className="h-8 w-8 text-primary" />
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/10 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <Layers className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="p-3 rounded-xl bg-accent/10 animate-bounce" style={{ animationDelay: '0.4s' }}>
                    <Network className="h-8 w-8 text-accent" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Be Part of the Future
              </h3>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Join our beta program and get early access to revolutionary features. 
                Help shape the future of competitive programming education with cutting-edge AI tools.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button className="button-3d bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-4 text-lg font-bold shadow-xl">
                  <Star className="h-5 w-5 mr-2" />
                  Join Beta Program
                </Button>
                <Button variant="outline" className="border-primary/30 hover:bg-primary/5 px-10 py-4 text-lg font-semibold">
                  Learn More
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
