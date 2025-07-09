import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Play, Code, Users, GitBranch, Star, BookOpen, Video, GitPullRequest } from "lucide-react";
import { motion } from "framer-motion";

export const OpenSourceSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden" id="opensource">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
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
            <Badge className="glass-card border-emerald-500/30 text-emerald-400 px-6 py-3 text-lg mb-4">
              <Github className="h-5 w-5 mr-2" />
              Open Source Ecosystem
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Contribute to the <span className="text-emerald-400">Global Developer</span> Community
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start your open source journey and build your developer profile while helping projects used by millions.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Video Tutorial Card */}
          <Card className="glass-card border-gray-800 hover:border-emerald-500/30 transition-all duration-500 group">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Video className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="h-3 w-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold mb-4">Complete Open Source Guide</CardTitle>
              <CardDescription className="text-gray-300">
                Master Git, GitHub, and make your first contribution with this comprehensive tutorial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-emerald-500/10 text-emerald-400">Git Basics</Badge>
                <Badge className="bg-green-500/10 text-green-400">GitHub</Badge>
                <Badge className="bg-teal-500/10 text-teal-400">Pull Requests</Badge>
                <Badge className="bg-emerald-500/10 text-emerald-400">Best Practices</Badge>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-4 space-y-3 border border-gray-800">
                <h4 className="font-semibold text-emerald-400 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  What You'll Learn:
                </h4>
                <div className="space-y-2 text-gray-300">
                  {[
                    "Git fundamentals and version control",
                    "How to find beginner-friendly projects",
                    "Making your first pull request",
                    "Open source etiquette and best practices"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                onClick={() => window.open('https://youtu.be/fSmLiOMp2qI?si=jD7PtH5repNUcpYp', '_blank')}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Tutorial (Free)
              </Button>
            </CardContent>
          </Card>

          {/* Benefits and Stats */}
          <div className="space-y-8">
            <Card className="glass-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-800">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold mb-8 text-center text-emerald-400">Open Source Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "10M+", label: "Active Developers", icon: <Users className="h-6 w-6 text-emerald-400" /> },
                    { value: "200M+", label: "Repositories", icon: <GitBranch className="h-6 w-6 text-green-400" /> },
                    { value: "85%", label: "Companies Use OSS", icon: <Code className="h-6 w-6 text-teal-400" /> },
                    { value: "70%", label: "Recruiters Check GitHub", icon: <Star className="h-6 w-6 text-yellow-400" /> }
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
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits Cards */}
            <div className="grid gap-6">
              {[
                {
                  title: "Build Real-World Experience",
                  description: "Work on projects used by thousands of developers worldwide",
                  icon: <Code className="h-6 w-6 text-emerald-400" />,
                  color: "emerald"
                },
                {
                  title: "Network with Developers",
                  description: "Connect with maintainers and contributors globally",
                  icon: <Users className="h-6 w-6 text-green-400" />,
                  color: "green"
                },
                {
                  title: "Improve Your GitHub Profile",
                  description: "Showcase your contributions to potential employers",
                  icon: <GitPullRequest className="h-6 w-6 text-teal-400" />,
                  color: "teal"
                },
                {
                  title: "Learn New Technologies",
                  description: "Explore different codebases and learn best practices",
                  icon: <Star className="h-6 w-6 text-yellow-400" />,
                  color: "yellow"
                }
              ].map((benefit, index) => (
                <Card 
                  key={index} 
                  className="glass-card border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-${benefit.color}-500/10 rounded-lg`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-sm text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full w-fit mx-auto mb-6">
                <Github className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make Your First Contribution?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join millions of developers shaping the future of software through open source.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-12"
                  onClick={() => window.open('https://youtu.be/fSmLiOMp2qI?si=jD7PtH5repNUcpYp', '_blank')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Tutorial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800/30 hover:border-emerald-500/50"
                  onClick={() => window.open('https://github.com/explore', '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  Explore Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};