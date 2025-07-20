import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play, BookOpen, Trophy, Star, Database, Code, Target, ArrowRight, Brain, Zap, Clock, Users, CheckCircle, Lightbulb, TrendingUp, Award, Globe, Calendar, Timer, Bookmark, FileText, Video, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/navbar/BottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";
import { FloatingActionButton } from "@/components/FloatingActionButton";


const dsaCourses = [
  {
    title: "Striver's A2Z DSA Sheet",
    image: "https://i.postimg.cc/zXK8tB9D/Screenshot-2025-06-10-134124.png",
    url: "https://youtu.be/0bHoB32fuj0?si=7uyvYOtUEVVzckRi",
    description: "Complete DSA course covering all topics from basics to advanced",
    difficulty: "Beginner to Advanced",
    rating: "4.9/5"
  },
  {
    title: "Love Babbar Placement Series",
    image: "https://i.postimg.cc/fyMJzd4K/Screenshot-2025-06-10-133619.png",
    url: "https://youtube.com/playlist?list=PL4PCksYQGLJM2mKe1n8LnFgcm3FRLhxZ9&si=ZEj1jN-onTPlSXRP",
    description: "Comprehensive placement preparation course with DSA focus",
    difficulty: "Intermediate",
    rating: "4.8/5"
  },
  {
    title: "Recursion & Backtracking",
    image: "https://i.postimg.cc/NfSBbXNz/Screenshot-2025-06-10-133611.png",
    url: "https://youtu.be/WQoB2z67hvY?si=3n00Hm7zvKQML5BF",
    description: "Master recursion and backtracking with practical examples",
    difficulty: "Intermediate",
    rating: "4.7/5"
  },
  {
    title: "Aditya Verma DP Playlist",
    image: "https://i.postimg.cc/x8WjkNhh/Screenshot-2025-06-10-134523.png",
    url: "https://youtu.be/nqowUJzG-iM?si=gRFcNgcwCtRTjIJz",
    description: "Complete dynamic programming course with pattern-based approach",
    difficulty: "Advanced",
    rating: "4.9/5"
  }
];

const practicePlatforms = [
  {
    name: "LeetCode",
    url: "https://leetcode.com",
    description: "Most popular platform for coding interviews",
    features: ["3000+ Problems", "Company Tags", "Mock Interviews", "Contest"],
    difficulty: "All Levels",
    price: "Free + Premium",
    icon: <Code className="h-6 w-6 text-orange-500" />
  },
  {
    name: "GeeksforGeeks",
    url: "https://geeksforgeeks.org",
    description: "Comprehensive DSA learning platform",
    features: ["Theory + Practice", "Interview Experiences", "Courses", "Articles"],
    difficulty: "Beginner Friendly",
    price: "Free + Paid",
    icon: <BookOpen className="h-6 w-6 text-green-500" />
  },
  {
    name: "CodeChef",
    url: "https://codechef.com",
    description: "Competitive programming platform",
    features: ["Monthly Contests", "Practice Problems", "Learning Modules", "Certification"],
    difficulty: "Intermediate+",
    price: "Free",
    icon: <Trophy className="h-6 w-6 text-blue-500" />
  },
  {
    name: "HackerRank",
    url: "https://hackerrank.com",
    description: "Skills-based coding challenges",
    features: ["Domain-wise Problems", "Certificates", "Interview Prep", "Company Challenges"],
    difficulty: "All Levels",
    price: "Free + Pro",
    icon: <Target className="h-6 w-6 text-purple-500" />
  }
];

const dsaRoadmap = [
  {
    phase: "Foundation (Weeks 1-4)",
    topics: ["Arrays & Strings", "Basic Math", "Recursion Basics", "Time Complexity"],
    duration: "4 weeks",
    problems: "50-80 problems",
    icon: <Database className="h-6 w-6 text-blue-500" />
  },
  {
    phase: "Core Concepts (Weeks 5-12)",
    topics: ["Linked Lists", "Stacks & Queues", "Binary Search", "Sorting Algorithms"],
    duration: "8 weeks", 
    problems: "100-150 problems",
    icon: <Brain className="h-6 w-6 text-green-500" />
  },
  {
    phase: "Advanced Topics (Weeks 13-20)",
    topics: ["Trees & BST", "Graphs", "Dynamic Programming", "Greedy Algorithms"],
    duration: "8 weeks",
    problems: "150-200 problems", 
    icon: <Zap className="h-6 w-6 text-purple-500" />
  },
  {
    phase: "Interview Prep (Weeks 21-24)",
    topics: ["System Design Basics", "Mock Interviews", "Company-specific Problems", "Optimization"],
    duration: "4 weeks",
    problems: "100+ problems",
    icon: <Trophy className="h-6 w-6 text-orange-500" />
  }
];

const interviewTips = [
  {
    title: "Problem-Solving Approach",
    description: "Follow a systematic approach to tackle any coding problem",
    tips: [
      "Understand the problem completely",
      "Think of edge cases",
      "Start with brute force",
      "Optimize step by step",
      "Code clean and readable solution"
    ],
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Communication Skills",
    description: "How to effectively communicate during coding interviews",
    tips: [
      "Think out loud",
      "Explain your approach",
      "Ask clarifying questions",
      "Discuss trade-offs",
      "Handle feedback gracefully"
    ],
    icon: <Users className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Time Management",
    description: "Manage your time effectively during interviews",
    tips: [
      "Allocate time for each step",
      "Don't get stuck on optimization",
      "Practice with timer",
      "Know when to move on",
      "Save time for testing"
    ],
    icon: <Clock className="h-6 w-6 text-red-500" />
  }
];

const additionalResources = [
  {
    title: "Books & References",
    items: [
      { name: "Cracking the Coding Interview", type: "Book", url: "#" },
      { name: "Introduction to Algorithms (CLRS)", type: "Book", url: "#" },
      { name: "Algorithm Design Manual", type: "Book", url: "#" },
      { name: "Competitive Programming Handbook", type: "PDF", url: "#" }
    ],
    icon: <FileText className="h-6 w-6 text-indigo-500" />
  },
  {
    title: "YouTube Channels",
    items: [
      { name: "Abdul Bari", type: "Channel", url: "https://youtube.com/@abdul_bari" },
      { name: "Tushar Roy", type: "Channel", url: "https://youtube.com/@tusharroy2525" },
      { name: "Back To Back SWE", type: "Channel", url: "https://youtube.com/@BackToBackSWE" },
      { name: "Errichto", type: "Channel", url: "https://youtube.com/@Errichto" }
    ],
    icon: <Video className="h-6 w-6 text-red-500" />
  },
  {
    title: "Podcasts & Blogs",
    items: [
      { name: "Coding Blocks Podcast", type: "Podcast", url: "#" },
      { name: "Software Engineering Daily", type: "Podcast", url: "#" },
      { name: "Topcoder Blog", type: "Blog", url: "#" },
      { name: "Codeforces Blog", type: "Blog", url: "#" }
    ],
    icon: <Headphones className="h-6 w-6 text-green-500" />
  }
];

export default function DSAMastery() {
  const isMobile = useIsMobile();

  // Handle bottom nav menu click
  const handleBottomNavMenu = () => {
    // For now, we can scroll to top or implement a menu action
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background dsa-mobile-container">
      <Navbar />

      <div className={`container mx-auto px-3 sm:px-4 lg:px-6 py-4 md:py-8 pb-24 sm:pb-20 md:pb-8 ${isMobile ? '' : 'mobile-nav-safe'}`}>
        {/* Header - Back button only on desktop */}
        {!isMobile && (
          <div className="mb-4 md:mb-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2 mb-4 md:mb-6 hover:bg-primary/10 touch-target">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        )}



        {/* DSA Course That Transforms Careers Section */}
        <section className="relative py-8 sm:py-12 md:py-24 bg-gradient-to-br from-background to-muted overflow-hidden mb-6 sm:mb-8 md:mb-16 dsa-mobile-section">
          {/* Background elements - optimized for mobile */}
          <div className="absolute inset-0 opacity-15 sm:opacity-20 md:opacity-30 dark:opacity-10 md:dark:opacity-20">
            <div className="absolute top-5 left-2 sm:top-10 sm:left-5 md:top-20 md:left-20 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
            <div className="absolute bottom-5 right-2 sm:bottom-10 sm:right-5 md:bottom-20 md:right-20 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl"></div>
          </div>

          <div className="relative z-10 px-2 sm:px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-6 sm:mb-8 md:mb-16"
            >
              <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4 md:mb-8">
                <Badge className="glass-card border-primary/30 text-primary px-2 py-1 sm:px-3 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-lg mb-1 sm:mb-2 md:mb-4 dsa-mobile-badge">
                  <Database className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  Data Structures Mastery
                </Badge>
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight px-2 dsa-mobile-title">
                  DSA Course That <span className="text-primary">Transforms</span> Careers
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 dsa-mobile-text">
                Master Data Structures and Algorithms with our battle-tested curriculum designed by industry experts and ICPC champions.
              </p>
            </motion.div>

            {/* Main Course Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-16 dsa-mobile-grid"
            >
              {/* Featured Course */}
              <Card className="lg:col-span-2 group glass-card border-border hover:border-primary/30 transition-all duration-500 dsa-mobile-card">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 md:p-4 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary-foreground" />
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-primary-foreground text-xs sm:text-xs md:text-sm dsa-mobile-badge">
                      MOST POPULAR
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 dsa-mobile-title">
                    Striver's A2Z DSA Course
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs sm:text-sm md:text-base dsa-mobile-text">
                    The ultimate DSA roadmap covering all concepts from beginner to advanced level with 180+ handpicked problems.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        180+ Problems
                      </Badge>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        Video Solutions
                      </Badge>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        Step by Step
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        Free Access
                      </Badge>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        Community Support
                      </Badge>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs dsa-mobile-badge">
                        Interview Ready
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 md:space-y-3 border border-border">
                    <h4 className="font-semibold text-primary flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
                      <Brain className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      Course Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5 md:gap-2 text-muted-foreground">
                      {[
                        "Arrays & Hashing Fundamentals",
                        "Binary Search Mastery",
                        "Dynamic Programming",
                        "Graph Algorithms",
                        "Trees & Binary Trees",
                        "Advanced Data Structures"
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-1.5 sm:gap-2">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1 sm:mt-1.5 md:mt-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-xs md:text-sm dsa-mobile-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground touch-target dsa-mobile-button"
                      onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                    >
                      <ExternalLink className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      Start Course Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-border hover:bg-muted/30 hover:border-primary/50 touch-target dsa-mobile-button"
                    >
                      <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      View Roadmap
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="glass-card bg-gradient-to-br from-card/70 to-muted/70 dark:from-card/50 dark:to-muted/50 border-border dsa-mobile-card">
                <CardContent className="pt-3 sm:pt-4 md:pt-8 p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-3 sm:mb-4 md:mb-8 text-center text-primary dsa-mobile-title">Course Impact</h3>
                  <div className="space-y-3 sm:space-y-4 md:space-y-8">
                    {[
                      { value: "500K+", label: "Students Enrolled", icon: <Database className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" /> },
                      { value: "180+", label: "Curated Problems", icon: <Code className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-400" /> },
                      { value: "95%", label: "Success Rate", icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-400" /> },
                      { value: "FREE", label: "Complete Access", icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400" /> }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="flex justify-center mb-1 sm:mb-1 md:mb-2">{stat.icon}</div>
                        <div className="text-lg sm:text-2xl md:text-4xl font-bold mb-0.5 md:mb-1">{stat.value}</div>
                        <div className="text-muted-foreground text-xs sm:text-xs md:text-sm dsa-mobile-text">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16"
            >
              {[
                {
                  title: "Problem Solving Approach",
                  description: "Learn systematic approach to solve any DSA problem",
                  icon: <Code className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />,
                  items: ["Understand the problem", "Identify patterns", "Optimize solution"],
                  color: "blue"
                },
                {
                  title: "Interview Preparation",
                  description: "Get ready for top tech company interviews",
                  icon: <Target className="h-5 w-5 md:h-6 md:w-6 text-green-400" />,
                  items: ["FAANG-level problems", "Mock interviews", "Time complexity focus"],
                  color: "green"
                },
                {
                  title: "Track Progress",
                  description: "Monitor your learning journey and achievements",
                  icon: <Trophy className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />,
                  items: ["Progress tracking", "Skill assessments", "Achievement badges"],
                  color: "purple"
                }
              ].map((feature, index) => (
                <Card key={index} className="glass-card border-border hover:border-primary/30 transition-all duration-300">
                  <CardHeader className="p-4 md:p-6">
                    <div className={`p-2 md:p-3 bg-${feature.color}-500/10 rounded-lg w-fit mb-2 md:mb-3`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg md:text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm md:text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-1.5 md:space-y-2 text-muted-foreground">
                      {feature.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 bg-${feature.color}-400 rounded-full flex-shrink-0`}></div>
                          <span className="text-xs md:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Motivation Section */}
        <Card className="mb-6 md:mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 hover:shadow-lg transition-all">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-2xl flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
              <Trophy className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
              <span>Why These Courses Will Transform Your Coding Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm md:text-base">
                If you use these structured courses consistently, you can easily crack FANG companies' DSA rounds and remove the fear of Data Structures and Algorithms forever. These curated resources have helped thousands of students land their dream jobs.
              </p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  FANG Ready
                </Badge>
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Interview Focused
                </Badge>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Fear Removal
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Structured Learning
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DSA Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-12 dsa-mobile-grid">
          {dsaCourses.map((course, index) => (
            <Card
              key={course.title}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 dsa-mobile-card"
            >
              <CardHeader className="text-center p-3 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2 md:mb-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs dsa-mobile-badge">
                    Course #{index + 1}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 text-xs dsa-mobile-badge">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg md:text-xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 dsa-mobile-title">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                  <span className="text-center">{course.title}</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm dsa-mobile-text">
                  {course.difficulty}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg border border-primary/20 dsa-mobile-image"
                />

                <p className="text-xs sm:text-xs md:text-sm text-muted-foreground dsa-mobile-text">
                  {course.description}
                </p>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary touch-target dsa-mobile-button"
                    size="sm"
                  >
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Start Learning
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Platforms Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <div className="text-center mb-6 md:mb-12 px-4">
            <Badge className="glass-card border-primary/30 text-primary px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg mb-3 md:mb-4">
              <Globe className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              Practice Platforms
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Best Platforms to Practice DSA
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Master your skills on these top-rated coding platforms used by millions of developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {practicePlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        {platform.icon}
                        <CardTitle className="text-lg md:text-xl">{platform.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs self-start sm:self-center">
                        {platform.price}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground text-sm md:text-base">
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Target className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{platform.difficulty}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary text-sm md:text-base">Key Features:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-2">
                        {platform.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-3 md:mt-4 touch-target"
                      variant="outline"
                      onClick={() => window.open(platform.url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Visit Platform
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* DSA Learning Roadmap Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <div className="text-center mb-6 md:mb-12 px-4">
            <Badge className="glass-card border-primary/30 text-primary px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg mb-3 md:mb-4">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              Learning Roadmap
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              24-Week DSA Mastery Roadmap
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              A structured 6-month journey to master Data Structures and Algorithms from scratch to advanced level
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {dsaRoadmap.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:gap-6">
                      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                        <div className="p-2 md:p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex-shrink-0">
                          {phase.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-primary">{phase.phase}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Timer className="h-3 w-3 md:h-4 md:w-4" />
                              {phase.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Code className="h-3 w-3 md:h-4 md:w-4" />
                              {phase.problems}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm md:text-base">Topics Covered:</h4>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {phase.topics.map((topic, i) => (
                            <Badge key={i} variant="secondary" className="bg-muted text-muted-foreground text-xs">
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

        {/* Interview Tips Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <div className="text-center mb-6 md:mb-12 px-4">
            <Badge className="glass-card border-primary/30 text-primary px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg mb-3 md:mb-4">
              <Award className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              Interview Success
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ace Your Coding Interviews
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Essential tips and strategies to excel in technical interviews at top tech companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {interviewTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      {tip.icon}
                      <CardTitle className="text-lg md:text-xl">{tip.title}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground text-sm md:text-base">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2 md:space-y-3">
                      {tip.tips.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <div className="text-center mb-6 md:mb-12 px-4">
            <Badge className="glass-card border-primary/30 text-primary px-3 py-2 md:px-6 md:py-3 text-sm md:text-lg mb-3 md:mb-4">
              <Bookmark className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
              Additional Resources
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Expand Your Learning Arsenal
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Curated collection of books, channels, and resources to supplement your DSA journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {additionalResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card border-border hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      {resource.icon}
                      <CardTitle className="text-lg md:text-xl">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-2 md:space-y-3">
                      {resource.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 md:p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs md:text-sm truncate">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-shrink-0 ml-2"
                            onClick={() => item.url !== '#' && window.open(item.url, '_blank')}
                            disabled={item.url === '#'}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Progress Tracking Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16"
        >
          <Card className="glass-card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <CardContent className="p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-gradient-to-br from-primary to-secondary rounded-full w-fit mx-auto mb-3 md:mb-4">
                  <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Track Your Progress</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
                  Stay motivated and monitor your DSA learning journey with these essential tracking methods
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {[
                  { title: "Daily Practice", desc: "Solve 2-3 problems daily", icon: <Calendar className="h-4 w-4 md:h-5 md:w-5" /> },
                  { title: "Weekly Goals", desc: "Complete topic-wise targets", icon: <Target className="h-4 w-4 md:h-5 md:w-5" /> },
                  { title: "Mock Interviews", desc: "Practice with peers weekly", icon: <Users className="h-4 w-4 md:h-5 md:w-5" /> },
                  { title: "Progress Review", desc: "Assess monthly progress", icon: <CheckCircle className="h-4 w-4 md:h-5 md:w-5" /> }
                ].map((item, index) => (
                  <div key={index} className="text-center p-3 md:p-4 bg-background/50 rounded-lg border border-border">
                    <div className="p-2 md:p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-2 md:mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card bg-gradient-to-br from-card/50 to-muted/50 dark:from-card/30 dark:to-muted/30 border border-border">
            <CardContent className="py-6 md:py-12 px-4 md:px-6">
              <div className="p-3 md:p-4 bg-gradient-to-br from-primary to-blue-500 rounded-full w-fit mx-auto mb-4 md:mb-6">
                <Database className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Ready to Transform Your Career?</h3>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Join our community of 500K+ students who have mastered DSA and landed their dream tech jobs.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground px-6 md:px-12 touch-target w-full sm:w-auto"
                onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
              >
                <Star className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Start Learning Now
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>



      {/* Bottom Navigation for Mobile */}
      <BottomNav onMenuClick={handleBottomNavMenu} />

      {/* Enhanced UI Components */}
      <FloatingActionButton />
    </div>
  );
}