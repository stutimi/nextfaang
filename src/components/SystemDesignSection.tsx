import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Network, Server, Globe, Video, BookOpen, ArrowRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

export const SystemDesignSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden" id="system-design">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
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
            <Badge className="glass-card border-indigo-500/30 text-indigo-400 px-6 py-3 text-lg mb-4">
              <Layers className="h-5 w-5 mr-2" />
              System Design Mastery
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Architect <span className="text-indigo-400">Scalable Systems</span> Like FAANG
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete system design roadmap with videos for Software Development Engineers. Build scalable systems like tech giants.
          </p>
        </motion.div>

        {/* Main Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {/* System Design Roadmap */}
          <Card className="glass-card border-gray-800 hover:border-indigo-500/30 transition-all duration-500 group">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl w-fit mb-4">
                <Network className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-indigo-400 transition-colors">
                Complete System Design Roadmap
              </CardTitle>
              <CardDescription className="text-gray-300">
                Comprehensive roadmap with videos covering all aspects of system design for SDE interviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-500/10 text-indigo-400">Scalability</Badge>
                <Badge className="bg-purple-500/10 text-purple-400">Architecture</Badge>
                <Badge className="bg-pink-500/10 text-pink-400">Video Tutorials</Badge>
                <Badge className="bg-indigo-500/10 text-indigo-400">SDE Focused</Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
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
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                onClick={() => window.open('https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes', '_blank')}
              >
                <Video className="mr-2 h-4 w-4" />
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* DBMS Interview Questions */}
          <Card className="glass-card border-gray-800 hover:border-purple-500/30 transition-all duration-500 group">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                DBMS Interview Questions
              </CardTitle>
              <CardDescription className="text-gray-300">
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
              <div className="space-y-2 text-sm text-gray-300">
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => window.open('https://takeuforward.org/dbms/most-asked-dbms-interview-questions', '_blank')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Practice Questions
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Interview Preparation */}
          <Card className="glass-card border-gray-800 hover:border-pink-500/30 transition-all duration-500 group">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl w-fit mb-4">
                <Server className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-pink-400 transition-colors">
                Interview Preparation Platform
              </CardTitle>
              <CardDescription className="text-gray-300">
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
              <div className="space-y-2 text-sm text-gray-300">
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
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                onClick={() => window.open('https://takeuforward.org/interview', '_blank')}
              >
                <Globe className="mr-2 h-4 w-4" />
                Start Preparation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800">
            <CardContent className="py-12">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full w-fit mx-auto mb-6">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Why Master System Design?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                {[
                  {
                    icon: <Network className="h-8 w-8 text-indigo-400" />,
                    title: "Build Scalable Systems",
                    description: "Design systems that handle millions of users"
                  },
                  {
                    icon: <Server className="h-8 w-8 text-purple-400" />,
                    title: "Ace Technical Interviews",
                    description: "Master system design interviews at top companies"
                  },
                  {
                    icon: <Database className="h-8 w-8 text-pink-400" />,
                    title: "Database Excellence",
                    description: "Optimize queries and design efficient schemas"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="p-4 bg-gray-800/50 rounded-full w-fit mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};