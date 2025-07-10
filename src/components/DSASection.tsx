import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, BookOpen, Code, Target, ArrowRight, ExternalLink, Star, Trophy, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const DSASection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden" id="dsa">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
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
            <Badge className="glass-card border-primary/30 text-primary px-6 py-3 text-lg mb-4">
              <Database className="h-5 w-5 mr-2" />
              Data Structures Mastery
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              DSA Course That <span className="text-primary">Transforms</span> Careers
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master Data Structures and Algorithms with our battle-tested curriculum designed by industry experts and ICPC champions.
          </p>
        </motion.div>

        {/* Main Course Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Featured Course */}
          <Card className="lg:col-span-2 group glass-card border-gray-800 hover:border-primary/30 transition-all duration-500">
            <CardHeader>
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-primary to-blue-500 rounded-xl shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  MOST POPULAR
                </Badge>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
                Striver's A2Z DSA Course
              </CardTitle>
              <CardDescription className="text-gray-300">
                The ultimate DSA roadmap covering all concepts from beginner to advanced level with 180+ handpicked problems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    180+ Problems
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    Video Solutions
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    Step by Step
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    Free Access
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    Community Support
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-200">
                    Interview Ready
                  </Badge>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 border border-gray-800">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Course Highlights:
                </h4>
                <div className="grid md:grid-cols-2 gap-2 text-gray-300">
                  {[
                    "Arrays & Hashing Fundamentals",
                    "Binary Search Mastery",
                    "Dynamic Programming",
                    "Graph Algorithms",
                    "Trees & Binary Trees",
                    "Advanced Data Structures"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white"
                  onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Start Course Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800/30 hover:border-primary/50"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="glass-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-800">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-8 text-center text-primary">Course Impact</h3>
              <div className="space-y-8">
                {[
                  { value: "500K+", label: "Students Enrolled", icon: <Database className="h-6 w-6 text-primary" /> },
                  { value: "180+", label: "Curated Problems", icon: <Code className="h-6 w-6 text-blue-400" /> },
                  { value: "95%", label: "Success Rate", icon: <Target className="h-6 w-6 text-green-400" /> },
                  { value: "FREE", label: "Complete Access", icon: <Star className="h-6 w-6 text-yellow-400" /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-gray-300">{stat.label}</div>
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
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              title: "Problem Solving Approach",
              description: "Learn systematic approach to solve any DSA problem",
              icon: <Code className="h-6 w-6 text-blue-400" />,
              items: ["Understand the problem", "Identify patterns", "Optimize solution"],
              color: "blue"
            },
            {
              title: "Interview Preparation",
              description: "Get ready for top tech company interviews",
              icon: <Target className="h-6 w-6 text-green-400" />,
              items: ["FAANG-level problems", "Mock interviews", "Time complexity focus"],
              color: "green"
            },
            {
              title: "Track Progress",
              description: "Monitor your learning journey and achievements",
              icon: <Trophy className="h-6 w-6 text-purple-400" />,
              items: ["Progress tracking", "Skill assessments", "Achievement badges"],
              color: "purple"
            }
          ].map((feature, index) => (
            <Card key={index} className="glass-card border-gray-800 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className={`p-3 bg-${feature.color}-500/10 rounded-lg w-fit mb-3`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-300">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  {feature.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 bg-${feature.color}-400 rounded-full`}></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800">
            <CardContent className="py-12">
              <div className="p-4 bg-gradient-to-br from-primary to-blue-500 rounded-full w-fit mx-auto mb-6">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our community of 500K+ students who have mastered DSA and landed their dream tech jobs.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white px-12"
                onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
              >
                <Star className="mr-2 h-5 w-5" />
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};