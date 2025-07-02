
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Play, Code, Users, GitBranch, Star, BookOpen, Video } from "lucide-react";

export const OpenSourceSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Github className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Open Source Contribution
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your open source journey and contribute to the global developer community. Build your profile while helping others.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Tutorial Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Video className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="h-3 w-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl mb-4">Complete Open Source Guide</CardTitle>
              <CardDescription className="text-base">
                Watch this comprehensive tutorial to understand Git, GitHub, and how to make your first open source contribution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge className="bg-green-100 text-green-800">Git Basics</Badge>
                <Badge className="bg-emerald-100 text-emerald-800">GitHub</Badge>
                <Badge className="bg-teal-100 text-teal-800">Pull Requests</Badge>
                <Badge className="bg-green-100 text-green-800">Best Practices</Badge>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-green-800 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  What You'll Learn:
                </h4>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <span>Git fundamentals and version control</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <span>How to find beginner-friendly projects</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <span>Making your first pull request</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <span>Open source etiquette and best practices</span>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                onClick={() => window.open('https://youtu.be/fSmLiOMp2qI?si=jD7PtH5repNUcpYp', '_blank')}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Tutorial (Free)
              </Button>
            </CardContent>
          </Card>

          {/* Benefits and Stats */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Why Contribute to Open Source?</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10M+</div>
                    <div className="text-sm opacity-90">Active Developers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">200M+</div>
                    <div className="text-sm opacity-90">Open Repositories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">85%</div>
                    <div className="text-sm opacity-90">Companies Use OSS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">70%</div>
                    <div className="text-sm opacity-90">Recruiters Check GitHub</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Code className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Build Real-World Experience</h4>
                      <p className="text-sm text-muted-foreground">Work on projects used by thousands of developers worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Network with Developers</h4>
                      <p className="text-sm text-muted-foreground">Connect with maintainers and contributors globally</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <GitBranch className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Improve Your GitHub Profile</h4>
                      <p className="text-sm text-muted-foreground">Showcase your contributions to potential employers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Learn New Technologies</h4>
                      <p className="text-sm text-muted-foreground">Explore different codebases and learn best practices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100">
            <CardContent className="pt-8">
              <Github className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Start Contributing?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join millions of developers contributing to open source. Start with small contributions and build your way up to major projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  onClick={() => window.open('https://youtu.be/fSmLiOMp2qI?si=jD7PtH5repNUcpYp', '_blank')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Tutorial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-green-300 hover:bg-green-50"
                  onClick={() => window.open('https://github.com/explore', '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Explore Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
