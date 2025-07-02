
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
  TrendingUp
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">NEXTFAANG Future Scope</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Smart Tools for Smart Students
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionizing competitive programming and technical education with cutting-edge AI, 
            collaborative learning, and industry-focused training programs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
              <Star className="h-4 w-4 mr-1" />
              Student-Focused
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-sm px-4 py-2">
              <Brain className="h-4 w-4 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 text-sm px-4 py-2">
              <Trophy className="h-4 w-4 mr-1" />
              Industry-Ready
            </Badge>
          </div>
        </div>

        {/* Smart Tools Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Smart Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {smartTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <tool.icon className="h-8 w-8 text-blue-600" />
                    {tool.coming && (
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Revolutionary Features in Development
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {futureFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${feature.color} text-white`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <Badge 
                          variant={feature.status === "Beta" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
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
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-12 text-center">
            <Rocket className="h-16 w-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-3xl font-bold mb-6">Our Vision for the Future</h2>
            <p className="text-lg mb-8 text-white/90 max-w-3xl mx-auto">
              We're building the world's most advanced platform for competitive programming and technical education. 
              Our AI-powered tools, collaborative learning environment, and industry partnerships will transform 
              how students learn, practice, and succeed in their tech careers.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1M+</div>
                <div className="text-white/80">Students Worldwide</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-white/80">Industry Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-white/80">Smart AI Tools</div>
              </div>
            </div>
            <Button 
              className="mt-8 bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
              size="lg"
            >
              Join the Revolution
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Beta Program CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Be Part of the Future</h3>
              <p className="text-gray-600 mb-6">
                Join our beta program and get early access to revolutionary features. 
                Help shape the future of competitive programming education.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Join Beta Program
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
