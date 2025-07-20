import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  BarChart3, 
  BookOpen, 
  Lightbulb, 
  Languages, 
  TrendingUp, 
  FileText,
  Brain,
  Zap,
  Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  status: "New" | "Premium" | "Coming Soon" | "Free";
  gradient: string;
  action: () => void;
}

const tools: Tool[] = [
  {
    id: "performance-analyzer",
    title: "Contest Performance Analyzer",
    description: "Analyze your CodeForces, CodeChef and LeetCode performance with detailed insights.",
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    features: ["Rating analysis", "Problem difficulty analysis", "Weak areas identification"],
    status: "Live",
    gradient: "from-blue-500 to-purple-600",
    action: () => window.location.href = '/contest-analyzer'
  },
  {
    id: "cp-dictionary",
    title: "CP Dictionary",
    description: "Comprehensive dictionary of competitive programming terms and algorithms.",
    icon: <BookOpen className="h-6 w-6 text-white" />,
    features: ["500+ algorithms", "Code templates", "Time complexity"],
    status: "Live",
    gradient: "from-green-500 to-blue-500",
    action: () => window.location.href = '/cp-dictionary'
  },
  {
    id: "language-translator",
    title: "Language Translator",
    description: "Translate code snippets and explanations between multiple programming languages.",
    icon: <Languages className="h-6 w-6 text-white" />,
    features: ["15+ languages", "Smart translation", "Code explanation"],
    status: "Live",
    gradient: "from-orange-500 to-red-500",
    action: () => window.location.href = '/language-translation'
  },
  {
    id: "cp-tricks",
    title: "CP Tricks & Tips",
    description: "Advanced techniques and optimization tricks for competitive programming.",
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    features: ["Optimization techniques", "Contest strategies", "Time-saving tips"],
    status: "Live",
    gradient: "from-purple-500 to-pink-500",
    action: () => window.location.href = '/cp-tricks-tips'
  },
  {
    id: "dsa-tracker",
    title: "DSA Mastery Tracker",
    description: "Track your Data Structures and Algorithms learning progress.",
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    features: ["Progress tracking", "Skill assessment", "Personalized roadmap"],
    status: "Live",
    gradient: "from-cyan-500 to-blue-500",
    action: () => window.location.href = '/dsa-mastery'
  },
  {
    id: "resume-builder",
    title: "Resume Builder Pro",
    description: "AI-powered resume builder optimized for tech roles.",
    icon: <FileText className="h-6 w-6 text-white" />,
    features: ["ATS-friendly templates", "Skills highlighting", "Achievement metrics"],
    status: "Live",
    gradient: "from-violet-500 to-purple-500",
    action: () => window.location.href = '/resume-tips'
  },
  {
    id: "ai-analysis",
    title: "AI-powered Analysis",
    description: "Get intelligent insights about your coding patterns and areas for improvement.",
    icon: <Brain className="h-6 w-6 text-white" />,
    features: ["Pattern analysis", "Improvement suggestions", "Personalized feedback"],
    status: "Premium",
    gradient: "from-indigo-500 to-purple-500",
    action: () => window.open('#', '_blank')
  },
  {
    id: "performance-data",
    title: "Performance Data",
    description: "Access live contest data and performance metrics from major platforms.",
    icon: <Zap className="h-6 w-6 text-white" />,
    features: ["Live data", "Performance metrics", "Platform integration"],
    status: "Free",
    gradient: "from-emerald-500 to-teal-500",
    action: () => window.open('#', '_blank')
  },
  {
    id: "recommendations",
    title: "Personalized Recommendations",
    description: "Receive customized problem suggestions based on your skill level and goals.",
    icon: <Search className="h-6 w-6 text-white" />,
    features: ["Smart recommendations", "Skill-based filtering", "Goal tracking"],
    status: "Free",
    gradient: "from-pink-500 to-rose-500",
    action: () => window.open('#', '_blank')
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "New": return "bg-green-500";
    case "Premium": return "bg-orange-500";
    case "Coming Soon": return "bg-blue-500";
    case "Free": return "bg-emerald-500";
    default: return "bg-gray-500";
  }
};

export function ToolsDropdown() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    tool.action();
  };

  return (
    <div className="mb-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full mb-6">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">Smart Tools Suite</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI-Powered Developer Tools
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
          Powerful AI-driven tools to accelerate your competitive programming journey. From performance analysis to personalized learning paths.
        </p>

        {/* Tools Dropdown */}
        <div className="flex justify-center mb-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="h-5 w-5 mr-2" />
                Explore All Tools
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
              {tools.map((tool) => (
                <DropdownMenuItem
                  key={tool.id}
                  className="p-4 cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
                  onClick={() => handleToolSelect(tool)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.gradient} flex-shrink-0`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{tool.title}</h4>
                        <Badge 
                          className={`${getStatusColor(tool.status)} text-white text-xs px-2 py-0.5 flex-shrink-0`}
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Featured Tools Grid - Show top 6 tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tools.slice(0, 6).map((tool) => (
          <Card 
            key={tool.id} 
            className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 bg-gradient-to-br from-card/90 to-primary/5 hover:scale-105 hover:-translate-y-2"
          >
            <CardHeader className="text-center pb-4">
              <div className="relative mb-4">
                <div className={`p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 border border-primary/20`}>
                  {tool.icon}
                </div>
                <Badge 
                  className={`absolute -top-2 -right-2 ${getStatusColor(tool.status)} text-white text-xs px-2 py-1`}
                >
                  {tool.status}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6 pt-0">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300`}
                onClick={tool.action}
              >
                Try Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 p-8 max-w-4xl mx-auto">
          <CardContent className="pt-0">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Supercharge Your CP Journey
            </h3>
            <p className="text-muted-foreground mb-6">
              Use our smart tools to identify weak areas, track progress, and get personalized recommendations for faster improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-primary hover:to-secondary text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('#', '_blank')}
              >
                Try Performance Analyzer
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/10 font-semibold px-6 py-3"
                onClick={() => window.open('#', '_blank')}
              >
                Explore All Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}