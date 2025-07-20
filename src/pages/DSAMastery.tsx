import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ExternalLink, 
  BookOpen, 
  Trophy, 
  Star, 
  Database, 
  Code, 
  Target, 
  ArrowRight, 
  Brain, 
  Zap, 
  Clock, 
  Users, 
  CheckCircle,
  Play,
  Award,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/navbar/BottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const dsaCourses = [
  {
    title: "Striver's A2Z DSA Course",
    image: "https://i.postimg.cc/zXK8tB9D/Screenshot-2025-06-10-134124.png",
    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    description: "Complete DSA course covering all topics from basics to advanced level",
    difficulty: "Beginner to Advanced",
    rating: "4.9/5",
    students: "500K+",
    duration: "6-8 months"
  },
  {
    title: "Love Babbar DSA Series",
    image: "https://i.postimg.cc/fyMJzd4K/Screenshot-2025-06-10-133619.png",
    url: "https://youtube.com/playlist?list=PL4PCksYQGLJM2mKe1n8LnFgcm3FRLhxZ9",
    description: "Comprehensive placement preparation with focus on DSA fundamentals",
    difficulty: "Intermediate",
    rating: "4.8/5",
    students: "300K+",
    duration: "4-6 months"
  },
  {
    title: "CodeHelp DSA Bootcamp",
    image: "https://i.postimg.cc/9fKvKvBh/codehelp.png",
    url: "https://www.codehelp.in/",
    description: "Interactive DSA bootcamp with live coding sessions and doubt solving",
    difficulty: "All Levels",
    rating: "4.7/5",
    students: "200K+",
    duration: "3-5 months"
  }
];

const practiceplatforms = [
  {
    name: "LeetCode",
    url: "https://leetcode.com",
    description: "Most popular platform for technical interview preparation",
    features: ["2000+ Problems", "Company-wise Questions", "Mock Interviews", "Discussion Forum"],
    difficulty: "All Levels",
    price: "Free + Premium",
    icon: <Code className="h-6 w-6 text-orange-500" />
  },
  {
    name: "GeeksforGeeks",
    url: "https://geeksforgeeks.org",
    description: "Comprehensive computer science portal with practice problems",
    features: ["Articles & Tutorials", "Practice Problems", "Interview Experiences", "Courses"],
    difficulty: "Beginner to Advanced",
    price: "Free + Paid Courses",
    icon: <BookOpen className="h-6 w-6 text-green-500" />
  },
  {
    name: "HackerRank",
    url: "https://hackerrank.com",
    description: "Skills-based coding challenges and certifications",
    features: ["Domain-wise Problems", "Certificates", "Interview Prep", "Company Challenges"],
    difficulty: "All Levels",
    price: "Free + Pro",
    icon: <Target className="h-6 w-6 text-purple-500" />
  },
  {
    name: "CodeChef",
    url: "https://codechef.com",
    description: "Competitive programming platform with regular contests",
    features: ["Monthly Contests", "Practice Problems", "Learning Modules", "Certification"],
    difficulty: "Intermediate+",
    price: "Free",
    icon: <Trophy className="h-6 w-6 text-blue-500" />
  }
];

const dsaRoadmap = [
  {
    phase: "Foundation (Weeks 1-4)",
    topics: ["Arrays & Strings", "Basic Math", "Recursion Basics", "Time Complexity Analysis"],
    duration: "4 weeks",
    problems: "50-80 problems",
    icon: <Database className="h-6 w-6 text-blue-500" />,
    color: "blue"
  },
  {
    phase: "Core Concepts (Weeks 5-12)",
    topics: ["Linked Lists", "Stacks & Queues", "Binary Search", "Sorting Algorithms"],
    duration: "8 weeks", 
    problems: "100-150 problems",
    icon: <Brain className="h-6 w-6 text-green-500" />,
    color: "green"
  },
  {
    phase: "Advanced Topics (Weeks 13-20)",
    topics: ["Trees & BST", "Graphs", "Dynamic Programming", "Greedy Algorithms"],
    duration: "8 weeks",
    problems: "150-200 problems", 
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    color: "purple"
  },
  {
    phase: "Expert Level (Weeks 21-24)",
    topics: ["Advanced DP", "Graph Algorithms", "String Algorithms", "System Design Basics"],
    duration: "4 weeks",
    problems: "100+ problems",
    icon: <Award className="h-6 w-6 text-red-500" />,
    color: "red"
  }
];

const studyTips = [
  {
    title: "Consistent Practice",
    description: "Solve at least 2-3 problems daily to build momentum",
    icon: <Clock className="h-5 w-5 text-blue-500" />
  },
  {
    title: "Pattern Recognition",
    description: "Focus on identifying common patterns in problems",
    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />
  },
  {
    title: "Time Complexity",
    description: "Always analyze and optimize your solution's complexity",
    icon: <TrendingUp className="h-5 w-5 text-green-500" />
  },
  {
    title: "Mock Interviews",
    description: "Practice explaining your solutions clearly",
    icon: <Users className="h-5 w-5 text-purple-500" />
  }
];

export default function DSAMastery() {
  const isMobile = useIsMobile();

  const handleBottomNavMenu = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className={`container mx-auto px-4 py-8 pb-24 sm:pb-20 md:pb-8 ${isMobile ? '' : 'mobile-nav-safe'}`}>
        {/* Header */}
        {!isMobile && (
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2 mb-6 hover:bg-primary/10">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Master Data Structures & Algorithms
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-6">
            DSA Mastery
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete your journey from DSA beginner to expert with curated courses, practice problems, 
            and a structured roadmap designed for technical interview success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
              onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
            >
              <Play className="mr-2 h-5 w-5" />
              Start Learning Now
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="mr-2 h-5 w-5" />
              View Roadmap
            </Button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Students Trained", value: "500K+", icon: <Users className="h-6 w-6" /> },
            { label: "Problems Solved", value: "10M+", icon: <Code className="h-6 w-6" /> },
            { label: "Success Rate", value: "95%", icon: <Trophy className="h-6 w-6" /> },
            { label: "Companies", value: "200+", icon: <Target className="h-6 w-6" /> }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <div className="flex justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Featured Courses */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured DSA Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked courses from industry experts to accelerate your DSA learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dsaCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.rating}</Badge>
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">{course.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Level:</span>
                        <span className="font-medium">{course.difficulty}</span>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => window.open(course.url, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Start Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Practice Platforms */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Practice Platforms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Top platforms to practice DSA problems and prepare for technical interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {practiceplatforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                        {platform.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{platform.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{platform.difficulty}</Badge>
                          <Badge variant="secondary">{platform.price}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-4">{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {platform.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full mt-4"
                        variant="outline"
                        onClick={() => window.open(platform.url, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Platform
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* DSA Roadmap */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DSA Learning Roadmap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured 24-week journey to master Data Structures and Algorithms
            </p>
          </div>

          <div className="space-y-6">
            {dsaRoadmap.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className={`p-4 bg-gradient-to-br from-${phase.color}-500/20 to-${phase.color}-600/20 rounded-xl flex-shrink-0`}>
                        {phase.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{phase.phase}</h3>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Duration:</span>
                            <p className="font-medium">{phase.duration}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Problems:</span>
                            <p className="font-medium">{phase.problems}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Topics:</span>
                            <p className="font-medium">{phase.topics.length} areas</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.topics.map((topic, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Study Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Study Tips & Best Practices</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential strategies to maximize your DSA learning efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    {tip.icon}
                  </div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="py-12">
              <div className="p-4 bg-gradient-to-br from-primary to-blue-500 rounded-full w-fit mx-auto mb-6">
                <Database className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ready to Master DSA?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students who have successfully cracked technical interviews at top tech companies.
                Start your DSA journey today and transform your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                  onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                >
                  <Star className="mr-2 h-5 w-5" />
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Download Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      <BottomNav onMenuClick={handleBottomNavMenu} />
      <FloatingActionButton />
    </div>
  );
}
