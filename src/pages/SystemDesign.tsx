import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { AIAssistant } from '@/components/AIAssistant';
import { AIFloatingButton } from '@/components/AIFloatingButton';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { MobileNavigation } from '@/components/MobileNavigation';
import { NextFaangHeader } from '@/components/NextFaangHeader';
import {
  Database,
  Network,
  Server,
  Layers,
  ArrowRight,
  BookOpen,
  Video,
  Code,
  FileText,
  Cpu,
  Globe,
  CheckCircle,
  Zap,
  Cloud
} from 'lucide-react';

const SystemDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>System Design Mastery | Learn to Build Scalable Systems</title>
        <meta name="description" content="Complete system design roadmap with videos for Software Development Engineers. Build scalable systems like tech giants." />
      </Helmet>

      <ScrollProgress />
      <NextFaangHeader />
      <InteractiveBackground />

      {/* AI Assistant */}
      <AIFloatingButton onClick={() => setIsAIAssistantOpen(true)} />
      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onExpand={() => console.log('Expand assistant')}
      />

      {/* Enhanced UI Components */}
      <FloatingActionButton />

      {/* Mobile Navigation */}
      <MobileNavigation />

      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
        {/* Hero Section */}
        <section className="relative py-6 sm:py-10 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-2 sm:px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white text-center">
                  Welcome to
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent text-center">
                  NEXTFAANG
                </h2>
              </div>
              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 text-center">
                Your complete platform for competitive programming, DSA, and interview preparation.
              </p>
            </motion.div>

            {/* Topic Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 sm:mb-12"
            >
              <Tabs
                defaultValue="roadmap"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-muted/50 backdrop-blur-sm p-1 rounded-full flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <TabsTrigger
                      value="roadmap"
                      className="rounded-full px-3 sm:px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                    >
                      <Network className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Roadmap</span>
                      <span className="sm:hidden">Road</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="database"
                      className="rounded-full px-3 sm:px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                    >
                      <Database className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Database</span>
                      <span className="sm:hidden">DB</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="interview"
                      className="rounded-full px-3 sm:px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
                    >
                      <Server className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Interview</span>
                      <span className="sm:hidden">Int</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="rounded-full px-3 sm:px-6 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                    >
                      <BookOpen className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Resources</span>
                      <span className="sm:hidden">Res</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Tab Contents */}
                <TabsContent value="roadmap" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16"
                  >
                    {/* System Design Roadmap */}
                    <Card className="border-border hover:border-indigo-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-fit mb-3 sm:mb-4">
                          <Network className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-indigo-400 transition-colors">
                          Complete System Design Roadmap
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-muted-foreground">
                          Comprehensive roadmap with videos covering all aspects of system design for SDE interviews
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-indigo-500/10 text-indigo-400 text-xs sm:text-sm px-1 sm:px-2">Scalability</Badge>
                          <Badge className="bg-purple-500/10 text-purple-400 text-xs sm:text-sm px-1 sm:px-2">Architecture</Badge>
                          <Badge className="bg-pink-500/10 text-pink-400 text-xs sm:text-sm px-1 sm:px-2">Video Tutorials</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400 text-xs sm:text-sm px-1 sm:px-2">SDE Focused</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Fundamentals of System Design",
                            "Scalability and Load Balancing",
                            "Database Design and Optimization",
                            "Microservices Architecture"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-primary-foreground"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* DBMS Interview Questions */}
                    <Card className="border-border hover:border-purple-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mb-4">
                          <Database className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                          DBMS Interview Questions
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Most asked Database Management System interview questions for tech companies
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-500/10 text-purple-400">SQL</Badge>
                          <Badge className="bg-pink-500/10 text-pink-400">NoSQL</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">Transactions</Badge>
                          <Badge className="bg-purple-500/10 text-purple-400">Indexing</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "SQL vs NoSQL Databases",
                            "ACID Properties & Transactions",
                            "Database Normalization",
                            "Indexing and Query Optimization"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-primary-foreground"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Practice Questions
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Interview Preparation */}
                    <Card className="border-border hover:border-pink-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl w-fit mb-4">
                          <Server className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-pink-400 transition-colors">
                          Interview Preparation Platform
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Complete interview preparation with system design, coding, and behavioral questions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-pink-500/10 text-pink-400">Mock Interviews</Badge>
                          <Badge className="bg-rose-500/10 text-rose-400">Behavioral</Badge>
                          <Badge className="bg-purple-500/10 text-purple-400">Technical</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">System Design</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Mock Interview Sessions",
                            "Behavioral Question Bank",
                            "Technical Rounds Practice",
                            "Company-specific Preparation"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-primary-foreground"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Start Preparation
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="database" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16"
                  >
                    {/* SQL Mastery */}
                    <Card className="border-border hover:border-purple-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mb-4">
                          <Database className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                          SQL Mastery
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Master SQL for efficient data management and complex queries
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-500/10 text-purple-400">Joins</Badge>
                          <Badge className="bg-pink-500/10 text-pink-400">Indexing</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">Optimization</Badge>
                          <Badge className="bg-purple-500/10 text-purple-400">Advanced Queries</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Advanced JOIN Operations",
                            "Query Optimization Techniques",
                            "Indexing Strategies",
                            "Transaction Management"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-primary-foreground"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Learn SQL
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* NoSQL Systems */}
                    <Card className="border-border hover:border-blue-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl w-fit mb-4">
                          <Cloud className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                          NoSQL Database Systems
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Learn when and how to use different NoSQL database technologies
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-500/10 text-blue-400">MongoDB</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">Cassandra</Badge>
                          <Badge className="bg-cyan-500/10 text-cyan-400">Redis</Badge>
                          <Badge className="bg-blue-500/10 text-blue-400">DynamoDB</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Document vs. Key-Value Stores",
                            "Horizontal Scaling Patterns",
                            "CAP Theorem Applications",
                            "Data Modeling for NoSQL"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-primary-foreground"
                        >
                          <Cloud className="mr-2 h-4 w-4" />
                          Explore NoSQL
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Database Design */}
                    <Card className="border-border hover:border-green-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl w-fit mb-4">
                          <Cpu className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-green-400 transition-colors">
                          Database Design Patterns
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Learn optimal database design patterns for different use cases
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-500/10 text-green-400">Normalization</Badge>
                          <Badge className="bg-emerald-500/10 text-emerald-400">Sharding</Badge>
                          <Badge className="bg-teal-500/10 text-teal-400">Replication</Badge>
                          <Badge className="bg-green-500/10 text-green-400">Partitioning</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Database Normalization Forms",
                            "Horizontal & Vertical Partitioning",
                            "Replication Strategies",
                            "Data Consistency Models"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-primary-foreground"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Master Design Patterns
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="interview" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-16"
                  >
                    {/* System Design Interview */}
                    <Card className="border-border hover:border-pink-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl w-fit mb-4">
                          <Server className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-pink-400 transition-colors">
                          System Design Interview Prep
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Comprehensive preparation for system design interviews at top tech companies
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-pink-500/10 text-pink-400">FAANG</Badge>
                          <Badge className="bg-rose-500/10 text-rose-400">Senior SDE</Badge>
                          <Badge className="bg-purple-500/10 text-purple-400">Staff Engineer</Badge>
                          <Badge className="bg-pink-500/10 text-pink-400">Tech Lead</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Interview Framework & Approach",
                            "Common System Design Questions",
                            "Scalability & Performance Analysis",
                            "Real-world Case Studies"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-primary-foreground"
                        >
                          <Zap className="mr-2 h-4 w-4" />
                          Start Preparation
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Mock Interviews */}
                    <Card className="border-border hover:border-indigo-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl w-fit mb-4">
                          <Video className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-indigo-400 transition-colors">
                          Mock Interview Sessions
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Practice with realistic mock interviews and expert feedback
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-indigo-500/10 text-indigo-400">1:1 Sessions</Badge>
                          <Badge className="bg-blue-500/10 text-blue-400">Expert Feedback</Badge>
                          <Badge className="bg-violet-500/10 text-violet-400">Recorded</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">Personalized</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Live 1:1 Interview Practice",
                            "Detailed Performance Analysis",
                            "Personalized Improvement Plan",
                            "Industry Expert Feedback"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-primary-foreground"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Book Session
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Company-Specific Prep */}
                    <Card className="border-border hover:border-amber-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl w-fit mb-4">
                          <Globe className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-amber-400 transition-colors">
                          Company-Specific Preparation
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Targeted preparation for specific companies and their interview patterns
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-amber-500/10 text-amber-400">Google</Badge>
                          <Badge className="bg-orange-500/10 text-orange-400">Amazon</Badge>
                          <Badge className="bg-blue-500/10 text-blue-400">Meta</Badge>
                          <Badge className="bg-red-500/10 text-red-400">Netflix</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Company-Specific Interview Patterns",
                            "Culture & Values Alignment",
                            "Past Interview Questions",
                            "Success Stories & Strategies"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-primary-foreground"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Select Company
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="resources" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                  >
                    {/* Books & Publications */}
                    <Card className="border-border hover:border-blue-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl w-fit mb-4">
                          <BookOpen className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                          Essential Books & Publications
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Curated collection of must-read books for system design mastery
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-500/10 text-blue-400">Books</Badge>
                          <Badge className="bg-indigo-500/10 text-indigo-400">Papers</Badge>
                          <Badge className="bg-violet-500/10 text-violet-400">Articles</Badge>
                          <Badge className="bg-blue-500/10 text-blue-400">Research</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Designing Data-Intensive Applications",
                            "System Design Interview by Alex Xu",
                            "Clean Architecture by Robert Martin",
                            "Building Microservices by Sam Newman"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-primary-foreground"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Reading List
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Video Courses */}
                    <Card className="border-border hover:border-red-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl w-fit mb-4">
                          <Video className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-red-400 transition-colors">
                          Video Courses & Tutorials
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Comprehensive video courses from industry experts
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-red-500/10 text-red-400">Courses</Badge>
                          <Badge className="bg-orange-500/10 text-orange-400">Tutorials</Badge>
                          <Badge className="bg-amber-500/10 text-amber-400">Workshops</Badge>
                          <Badge className="bg-red-500/10 text-red-400">Live Sessions</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "System Design Fundamentals Course",
                            "Microservices Architecture Masterclass",
                            "Database Design & Optimization",
                            "Scalability Patterns Workshop"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-primary-foreground"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Browse Courses
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Practice Resources */}
                    <Card className="border-border hover:border-green-500/30 transition-all duration-500 group">
                      <CardHeader>
                        <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl w-fit mb-4">
                          <Code className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-green-400 transition-colors">
                          Practice Resources & Tools
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Interactive tools and resources for hands-on practice
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-500/10 text-green-400">Interactive</Badge>
                          <Badge className="bg-emerald-500/10 text-emerald-400">Exercises</Badge>
                          <Badge className="bg-teal-500/10 text-teal-400">Projects</Badge>
                          <Badge className="bg-green-500/10 text-green-400">Challenges</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "System Design Practice Problems",
                            "Architecture Diagramming Tools",
                            "Performance Testing Frameworks",
                            "Distributed Systems Simulators"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-primary-foreground"
                        >
                          <Code className="mr-2 h-4 w-4" />
                          Start Practicing
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Why Master System Design Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <Card className="bg-gradient-to-br from-card/50 to-muted/50 dark:from-card/30 dark:to-muted/30 border border-border overflow-hidden">
                <CardContent className="py-12 relative">
                  {/* Background Elements */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-fit mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                      <Layers className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Why Master System Design?
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                      System design skills are crucial for building robust, scalable applications and advancing your career in software engineering
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                      {[
                        {
                          icon: <Network className="h-8 w-8 text-white" />,
                          bgGradient: "from-indigo-500 to-blue-500",
                          title: "Build Scalable Systems",
                          description: "Design systems that handle millions of users with efficient resource utilization",
                          benefits: ["Horizontal Scaling", "Load Balancing", "Caching Strategies"]
                        },
                        {
                          icon: <Server className="h-8 w-8 text-white" />,
                          bgGradient: "from-purple-500 to-indigo-500",
                          title: "Ace Technical Interviews",
                          description: "Master system design interviews at top tech companies worldwide",
                          benefits: ["FAANG Interview Prep", "Architecture Questions", "Performance Analysis"]
                        },
                        {
                          icon: <Database className="h-8 w-8 text-white" />,
                          bgGradient: "from-pink-500 to-purple-500",
                          title: "Database Excellence",
                          description: "Optimize queries and design efficient database schemas for performance",
                          benefits: ["Query Optimization", "Schema Design", "Data Partitioning"]
                        }
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 * index * 0.1 }}
                          className="group"
                        >
                          <div className="bg-card/50 dark:bg-card/30 border border-border/50 rounded-xl p-6 h-full hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                            <div className={`p-4 bg-gradient-to-br ${feature.bgGradient} rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              {feature.icon}
                            </div>
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                            <div className="space-y-1">
                              {feature.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center text-xs text-muted-foreground">
                                  <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-br ${feature.bgGradient}`}></div>
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-blue-500/10 border-blue-500/30 text-blue-400 px-4 py-2 text-sm mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Learning Resources
              </Badge>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Advanced System Design Resources
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Deepen your understanding with these comprehensive resources on system design principles and patterns.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: "Design Patterns",
                  description: "Learn essential design patterns for scalable systems",
                  color: "from-blue-500 to-indigo-500",
                  badge: "Popular"
                },
                {
                  icon: <Cpu className="h-6 w-6" />,
                  title: "Distributed Systems",
                  description: "Master the principles of distributed computing",
                  color: "from-indigo-500 to-purple-500",
                  badge: "Advanced"
                },
                {
                  icon: <Code className="h-6 w-6" />,
                  title: "API Design",
                  description: "Best practices for designing robust APIs",
                  color: "from-purple-500 to-pink-500",
                  badge: "Essential"
                },
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Data Modeling",
                  description: "Techniques for efficient data modeling",
                  color: "from-pink-500 to-rose-500",
                  badge: "Core"
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                    <CardContent className="pt-6 relative">
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${resource.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 bg-gradient-to-br ${resource.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(resource.icon, { className: "text-white" })}
                        </div>
                        {resource.badge && (
                          <Badge className={`bg-${resource.color.split('-')[1]}-500/10 text-${resource.color.split('-')[1]}-400`}>
                            {resource.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Information */}
        <section className="py-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="bg-indigo-500/10 border-indigo-500/30 text-indigo-400 px-4 py-2 text-sm mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Course Catalog
              </Badge>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                System Design Course Information
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive curriculum designed to take you from beginner to expert in system design concepts
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-border overflow-hidden shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl">Course Catalog</CardTitle>
                      <CardDescription>
                        Select the right course for your skill level
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 px-3 py-1">
                      Enrollment Open
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="py-3 px-4 text-left font-medium">Course</th>
                          <th className="py-3 px-4 text-left font-medium">Level</th>
                          <th className="py-3 px-4 text-left font-medium">Duration</th>
                          <th className="py-3 px-4 text-left font-medium">Completion Rate</th>
                          <th className="py-3 px-4 text-center font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-medium">System Design Fundamentals</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-blue-500/10 text-blue-400">Beginner</Badge>
                          </td>
                          <td className="py-4 px-4">4 weeks</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                              </div>
                              <span className="text-sm">95%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Button size="sm" variant="outline" className="text-xs">Enroll Now</Button>
                          </td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-medium">Distributed Systems Design</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-purple-500/10 text-purple-400">Intermediate</Badge>
                          </td>
                          <td className="py-4 px-4">6 weeks</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '87%' }}></div>
                              </div>
                              <span className="text-sm">87%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Button size="sm" variant="outline" className="text-xs">Enroll Now</Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/20 transition-colors">
                          <td className="py-4 px-4 font-medium">System Design Mastery</td>
                          <td className="py-4 px-4">
                            <Badge className="bg-amber-500/10 text-amber-400">Advanced</Badge>
                          </td>
                          <td className="py-4 px-4">12 weeks</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '82%' }}></div>
                              </div>
                              <span className="text-sm">82%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Button size="sm" variant="outline" className="text-xs">Enroll Now</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {/* SVG background with plus symbols removed */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="bg-indigo-500/10 border-indigo-500/30 text-indigo-400 px-4 py-2 text-sm mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Start Your Journey
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Master System Design?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of engineers who have transformed their careers through our comprehensive system design courses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                  <Video className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-indigo-500/30 hover:bg-indigo-500/10">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Course Catalog
                </Button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8">
                {[
                  { count: "10K", label: "Students Enrolled" },
                  { count: "200", label: "Video Lessons" },
                  { count: "95%", label: "Success Rate" },
                  { count: "24/7", label: "Expert Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.count}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SystemDesign;