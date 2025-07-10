import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Code, GitBranch, Brain, Search, Zap, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SmartToolsSection = () => {
  const tools = [
    {
      title: "Contest Performance Analyzer",
      description: "Analyze your Codeforces, CodeChef, and LeetCode performance with detailed insights",
      icon: BarChart,
      features: ["Rating trends", "Problem difficulty analysis", "Weak areas identification"],
      status: "Live",
      route: "/contest-analyzer"
    },
    {
      title: "CP Dictionary",
      description: "Comprehensive dictionary of competitive programming terms and algorithms",
      icon: Search,
      features: ["500+ algorithms", "Code templates", "Complexity analysis"],
      status: "Live", 
      route: "/cp-dictionary"
    },
    {
      title: "CP Tricks & Tips",
      description: "Advanced techniques and optimization tricks for competitive programming",
      icon: Brain,
      features: ["Optimization techniques", "Contest strategies", "Time-saving tips"],
      status: "Live",
      route: "/cp-tricks-tips"
    },
    {
      title: "Language Translator",
      description: "Translate code and problem statements between multiple programming languages",
      icon: Code,
      features: ["15+ languages", "Smart translation", "Code explanation"],
      status: "Enhanced",
      route: "/language-translation"
    },
    {
      title: "DSA Mastery Tracker",
      description: "Track your Data Structures and Algorithms learning progress",
      icon: GitBranch,
      features: ["Progress tracking", "Skill assessment", "Personalized roadmap"],
      status: "Live",
      route: "/dsa-mastery"
    },
    {
      title: "Resume Builder Pro",
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
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden" id="tools">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Badge className="glass-card border-violet-500/30 text-violet-400 px-6 py-3 text-lg mb-4">
              <Zap className="h-5 w-5 mr-2" />
              Smart Tools Suite
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered <span className="text-violet-400">Developer Tools</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful AI-driven tools to accelerate your competitive programming journey. From performance analysis to personalized learning paths.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className="glass-card border-gray-800 hover:border-violet-500/30 transition-all duration-500 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge className={`${
                    tool.status === 'Live' ? 'bg-green-500' : 
                    tool.status === 'Enhanced' ? 'bg-blue-500' : 'bg-orange-500'
                  } text-white`}>
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-violet-400 transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-violet-400">Key Features:</h4>
                  <div className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link to={tool.route}>
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                    disabled={tool.status === 'Coming Soon'}
                  >
                    {tool.status === 'Coming Soon' ? (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Coming Soon
                      </>
                    ) : (
                      <>
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Try Now
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card border-gray-800 hover:border-violet-500/30 transition-all duration-500 text-center group"
            >
              <CardContent className="pt-8">
                <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl w-fit mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800">
            <CardContent className="py-12">
              <div className="p-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full w-fit mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Supercharge Your CP Journey</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Use our smart tools to identify weak areas, track progress, and get personalized recommendations for faster improvement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contest-analyzer">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-12"
                  >
                    <BarChart className="mr-2 h-5 w-5" />
                    Try Performance Analyzer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800/30 hover:border-violet-500/50"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Explore All Tools
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};