
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, BookOpen, Code, Target, ArrowRight, ExternalLink, Star, Trophy, Brain } from "lucide-react";

export const DSASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Master DSA, Crack Any Interview
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete your Data Structures and Algorithms journey with Striver's comprehensive A2Z DSA Course. From basics to advanced concepts.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Striver's A2Z DSA Course - Featured */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                  FEATURED
                </Badge>
              </div>
              <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                Striver's A2Z DSA Course Sheet
              </CardTitle>
              <CardDescription className="text-base">
                The most comprehensive DSA course designed by Striver. Master every concept from A to Z with structured learning path.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">180+ Problems</Badge>
                  <Badge variant="secondary">Video Solutions</Badge>
                  <Badge variant="secondary">Step by Step</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Free Access</Badge>
                  <Badge variant="secondary">Community Support</Badge>
                  <Badge variant="secondary">Interview Ready</Badge>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  What's Included:
                </h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Arrays & Hashing Fundamentals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Binary Search Mastery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Dynamic Programming</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Graph Algorithms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Trees & Binary Trees</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                    <span>Advanced Data Structures</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg"
                  onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Start A2Z Course
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-purple-300 hover:bg-purple-50"
                  onClick={() => window.open('/dsa-mastery', '_blank')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Course Impact</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">500K+</div>
                  <div className="text-sm opacity-90">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">180+</div>
                  <div className="text-sm opacity-90">Curated Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">FREE</div>
                  <div className="text-sm opacity-90">Complete Access</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-3">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Problem Solving Approach</CardTitle>
              <CardDescription>Learn systematic approach to solve any DSA problem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Understand the problem</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Identify patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Optimize solution</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Interview Preparation</CardTitle>
              <CardDescription>Get ready for top tech company interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>FAANG-level problems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Mock interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Time complexity focus</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-3">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Track Progress</CardTitle>
              <CardDescription>Monitor your learning journey and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Skill assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Achievement badges</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-100">
            <CardContent className="pt-8">
              <Database className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Master DSA?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join hundreds of thousands of students who have successfully completed Striver's A2Z DSA Course and landed their dream jobs.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                onClick={() => window.open('https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', '_blank')}
              >
                <Star className="mr-2 h-4 w-4" />
                Start Your DSA Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
