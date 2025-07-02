
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Target, BookOpen, Users, Zap, TrendingUp, Globe, Award, Brain, Code2 } from "lucide-react";

export const CPAwarenessSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Floating spotlight elements for 3D effect */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-24 h-24 bg-cyan-400/25 rounded-full blur-xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-blue-300/20 rounded-full blur-xl opacity-20 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-900/50 border-blue-400/30 text-blue-300 hover:bg-blue-800/60 backdrop-blur-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Critical Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
            Why CP Awareness is Missing in India?
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Understanding the gap and how <strong className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">NEXTFANG</strong> is bridging it
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Problems Section */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30 hover:border-cyan-400/50 shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/50 border border-red-500/30 rounded-xl transform hover:rotate-6 transition-transform duration-300">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-red-300 to-red-200 bg-clip-text text-transparent">Current Problems</CardTitle>
                  <CardDescription className="text-blue-300">Why CP awareness lacks in India</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  icon: <BookOpen className="h-5 w-5 text-cyan-400" />,
                  title: "Educational System Gap",
                  desc: "Traditional curriculum focuses on theory, not competitive programming practice"
                },
                {
                  icon: <Users className="h-5 w-5 text-blue-400" />,
                  title: "Lack of Mentorship",
                  desc: "Limited access to experienced CP practitioners and proper guidance"
                },
                {
                  icon: <Globe className="h-5 w-5 text-cyan-300" />,
                  title: "Resource Fragmentation",
                  desc: "Quality CP resources scattered across platforms without structured learning paths"
                },
                {
                  icon: <Brain className="h-5 w-5 text-blue-300" />,
                  title: "Awareness Deficit",
                  desc: "Students unaware of CP's importance for FANG interviews and career growth"
                }
              ].map((problem, index) => (
                <div key={problem.title} className="flex gap-4 p-4 bg-slate-700/30 border border-slate-600/20 rounded-xl hover:border-blue-400/30 transition-all duration-300 transform hover:translateX-2" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex-shrink-0 p-2 bg-slate-600/50 border border-blue-400/20 rounded-lg shadow-sm transform hover:scale-110 transition-transform duration-300">
                    {problem.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">{problem.title}</h4>
                    <p className="text-sm text-slate-400">{problem.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Solutions Section */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30 hover:border-cyan-400/50 shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/50 border border-blue-400/30 rounded-xl transform hover:rotate-6 transition-transform duration-300">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">NEXTFANG Solutions</CardTitle>
                  <CardDescription className="text-blue-300">How we're bridging the gap</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  icon: <Code2 className="h-5 w-5 text-blue-400" />,
                  title: "Structured Learning Path",
                  desc: "Semester-wise DSA progression from beginner to Legendary Grandmaster"
                },
                {
                  icon: <Users className="h-5 w-5 text-cyan-400" />,
                  title: "Community & Mentorship",
                  desc: "Connect with top CP contributors and get personalized guidance"
                },
                {
                  icon: <TrendingUp className="h-5 w-5 text-blue-300" />,
                  title: "Career-Focused Approach",
                  desc: "Direct mapping of CP skills to FANG interview success and career growth"
                },
                {
                  icon: <Award className="h-5 w-5 text-cyan-300" />,
                  title: "Comprehensive Resources",
                  desc: "One-stop platform for all CP needs - from basics to advanced problem solving"
                }
              ].map((solution, index) => (
                <div key={solution.title} className="flex gap-4 p-4 bg-slate-700/30 border border-slate-600/20 rounded-xl hover:border-blue-400/30 transition-all duration-300 transform hover:translateX-2" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex-shrink-0 p-2 bg-slate-600/50 border border-blue-400/20 rounded-lg shadow-sm transform hover:scale-110 transition-transform duration-300">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">{solution.title}</h4>
                    <p className="text-sm text-slate-400">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/30 p-8 max-w-4xl mx-auto shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300">
            <CardContent className="pt-0">
              <Zap className="h-16 w-16 text-blue-400 mx-auto mb-6 transform hover:rotate-12 hover:scale-110 transition-transform duration-300" />
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Join the Movement
              </h3>
              <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Be part of India's first comprehensive competitive programming ecosystem. 
                Together, we're creating the next generation of world-class programmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button variant="outline" size="lg" className="border-blue-400 text-blue-300 hover:bg-blue-900/50 px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
