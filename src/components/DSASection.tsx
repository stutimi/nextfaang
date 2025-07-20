import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, BookOpen, Code, Target, ArrowRight, ExternalLink, Star, Trophy, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const DSASection = () => {
  return (
    <section id="dsa" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Database className="h-4 w-4" />
            Data Structures & Algorithms
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Master <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">DSA</span> for Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete your journey from DSA beginner to expert with our curated courses, practice problems, 
            and structured roadmap designed for technical interview success.
          </p>
        </motion.div>

        {/* Main Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card bg-gradient-to-br from-card/50 to-muted/50 dark:from-card/30 dark:to-muted/30 border border-border">
            <CardContent className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-blue-500 rounded-xl">
                      <Database className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Complete DSA Mastery Program
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-lg">
                    Transform your coding skills with our comprehensive DSA curriculum. 
                    From basic arrays to advanced dynamic programming, master every concept 
                    needed for top tech company interviews.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">500K+</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/dsa">
                      <Button 
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground"
                      >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Explore DSA Courses
                      </Button>
                    </Link>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-border hover:bg-muted/30 hover:border-primary/50"
                      onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Start Free Course
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl p-8 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-background/80 p-4 rounded-xl text-center">
                        <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">Algorithms</div>
                      </div>
                      <div className="bg-background/80 p-4 rounded-xl text-center">
                        <Database className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Data Structures</div>
                      </div>
                      <div className="bg-background/80 p-4 rounded-xl text-center">
                        <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Problem Solving</div>
                      </div>
                      <div className="bg-background/80 p-4 rounded-xl text-center">
                        <Trophy className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Interview Prep</div>
                      </div>
                    </div>
                  </div>
                </div>
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
              title: "Structured Learning Path",
              description: "Follow a proven 24-week roadmap from basics to advanced",
              icon: <Brain className="h-6 w-6 text-blue-400" />,
              items: ["Foundation concepts", "Core algorithms", "Advanced topics"],
              color: "blue"
            },
            {
              title: "Interview Preparation",
              description: "Get ready for top tech company technical interviews",
              icon: <Target className="h-6 w-6 text-green-400" />,
              items: ["FAANG-level problems", "Mock interviews", "Time complexity focus"],
              color: "green"
            },
            {
              title: "Hands-on Practice",
              description: "Solve problems on top coding platforms",
              icon: <Zap className="h-6 w-6 text-purple-400" />,
              items: ["LeetCode integration", "Real-time feedback", "Progress tracking"],
              color: "purple"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-card bg-gradient-to-br from-card/50 to-muted/50 dark:from-card/30 dark:to-muted/30 border border-border hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                  <div className={`p-3 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-xl w-fit`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`h-1.5 w-1.5 bg-${feature.color}-500 rounded-full`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
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
          <Card className="glass-card bg-gradient-to-br from-card/50 to-muted/50 dark:from-card/30 dark:to-muted/30 border border-border">
            <CardContent className="py-12">
              <div className="p-4 bg-gradient-to-br from-primary to-blue-500 rounded-full w-fit mx-auto mb-6">
                <Database className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Career?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community of 500K+ students who have mastered DSA and landed their dream tech jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dsa">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-primary-foreground px-12"
                  >
                    <Star className="mr-2 h-5 w-5" />
                    Start Learning Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Free Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
