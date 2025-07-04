import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Code, GitBranch, Brain, Search, Zap, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";


export const SmartToolsSection = () => {
  const tools = [
    {
      title: "🏆 Contest Performance Analyzer",
      description: "Analyze your Codeforces, CodeChef, and LeetCode performance with detailed insights",
      icon: BarChart,
      features: ["Rating trends", "Problem difficulty analysis", "Weak areas identification"],
      status: "Live",
      route: "/contest-analyzer"
    },
    {
      title: "📚 CP Dictionary",
      description: "Comprehensive dictionary of competitive programming terms and algorithms",
      icon: Search,
      features: ["500+ algorithms", "Code templates", "Complexity analysis"],
      status: "Live", 
      route: "/cp-dictionary"
    },
    {
      title: "💡 CP Tricks & Tips",
      description: "Advanced techniques and optimization tricks for competitive programming",
      icon: Brain,
      features: ["Optimization techniques", "Contest strategies", "Time-saving tips"],
      status: "Live",
      route: "/cp-tricks-tips"
    },
    {
      title: "🌐 Language Translator",
      description: "Translate code and problem statements between multiple programming languages",
      icon: Code,
      features: ["15+ languages", "Smart translation", "Code explanation"],
      status: "Enhanced",
      route: "/language-translation"
    },
    {
      title: "🎯 DSA Mastery Tracker",
      description: "Track your Data Structures and Algorithms learning progress",
      icon: GitBranch,
      features: ["Progress tracking", "Skill assessment", "Personalized roadmap"],
      status: "Live",
      route: "/dsa-mastery"
    },
    {
      title: "🚀 Resume Builder Pro",
      description: "AI-powered resume builder optimized for tech roles",
      icon: Zap,
      features: ["ATS-friendly templates", "Skills highlighting", "Achievement metrics"],
      status: "Coming Soon",
      route: "/resume-tips"
    }
  ];

  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Get intelligent insights about your coding patterns and areas for improvement",
      icon: Brain
    },
    {
      title: "Real-time Data",
      description: "Access live contest data and performance metrics from major platforms",
      icon: Zap
    },
    {
      title: "Personalized Recommendations",
      description: "Receive customized problem suggestions based on your skill level and goals",
      icon: Search
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              🛠️ Smart Tools Suite
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful AI-driven tools to accelerate your competitive programming journey. From performance analysis to personalized learning paths.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {tools.map((tool, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-violet-200 dark:hover:border-violet-800">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge className={`${
                    tool.status === 'Live' ? 'bg-green-500' : 
                    tool.status === 'Enhanced' ? 'bg-blue-500' : 'bg-orange-500'
                  } text-white`}>
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-violet-600 transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-violet-700 dark:text-violet-300">Key Features:</h4>
                  <div className="space-y-1">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link to={tool.route}>
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg"
                    disabled={tool.status === 'Coming Soon'}
                  >
                    {tool.status === 'Coming Soon' ? (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Coming Soon
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Try Now
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="pt-8">
                <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-violet-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Tools Demo */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-violet-500" />
              Try Our Tools Live
            </CardTitle>
            <CardDescription>
              Experience our powerful analysis tools directly in your browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Zap className="h-12 w-12 text-violet-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Tools Demo</h3>
              <p className="text-muted-foreground">Visit our dedicated pages to try these powerful tools</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-2 border-violet-100 dark:border-violet-800">
            <CardContent className="pt-8">
              <Zap className="h-16 w-16 text-violet-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Supercharge Your CP Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our smart tools to identify weak areas, track progress, and get personalized recommendations for faster improvement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contest-analyzer">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Try Performance Analyzer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-violet-300 hover:bg-violet-50 dark:border-violet-700 dark:hover:bg-violet-950/20"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Explore All Tools
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};