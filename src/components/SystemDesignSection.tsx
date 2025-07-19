
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Network, Server, Globe, Video, BookOpen, ArrowRight, Layers } from "lucide-react";

export const SystemDesignSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Master System Design
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete system design roadmap with videos for Software Development Engineers. Build scalable systems like tech giants.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* System Design Roadmap */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl w-fit mb-4">
                <Network className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                Complete System Design Roadmap
              </CardTitle>
              <CardDescription>
                Comprehensive roadmap with videos covering all aspects of system design for SDE interviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Scalability</Badge>
                <Badge variant="secondary">Architecture</Badge>
                <Badge variant="secondary">Video Tutorials</Badge>
                <Badge variant="secondary">SDE Focused</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Fundamentals of System Design</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Scalability and Load Balancing</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Database Design and Optimization</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2"></div>
                  <span>Microservices Architecture</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                onClick={() => window.open('https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes', '_blank')}
              >
                <Video className="mr-2 h-4 w-4" />
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* DBMS Interview Questions */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl w-fit mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                DBMS Interview Questions
              </CardTitle>
              <CardDescription>
                Most asked Database Management System interview questions for tech companies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">SQL</Badge>
                <Badge variant="secondary">NoSQL</Badge>
                <Badge variant="secondary">Transactions</Badge>
                <Badge variant="secondary">Indexing</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>SQL vs NoSQL Databases</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>ACID Properties & Transactions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>Database Normalization</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span>Indexing and Query Optimization</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => window.open('https://takeuforward.org/dbms/most-asked-dbms-interview-questions', '_blank')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Practice Questions
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Interview Preparation */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
            <CardHeader>
              <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl w-fit mb-4">
                <Server className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-pink-600 transition-colors">
                Interview Preparation Platform
              </CardTitle>
              <CardDescription>
                Complete interview preparation with system design, coding, and behavioral questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Mock Interviews</Badge>
                <Badge variant="secondary">Behavioral</Badge>
                <Badge variant="secondary">Technical</Badge>
                <Badge variant="secondary">System Design</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                  <span>Mock Interview Sessions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                  <span>Behavioral Question Bank</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                  <span>Technical Rounds Practice</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                  <span>Company-specific Preparation</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                onClick={() => window.open('https://takeuforward.org/interview', '_blank')}
              >
                <Globe className="mr-2 h-4 w-4" />
                Start Preparation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-100">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Why Master System Design?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                    <Network className="h-8 w-8 text-indigo-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Build Scalable Systems</h4>
                  <p className="text-sm text-muted-foreground">Design systems that handle millions of users</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                    <Server className="h-8 w-8 text-purple-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Ace Technical Interviews</h4>
                  <p className="text-sm text-muted-foreground">Master system design interviews at top companies</p>
                </div>
                <div className="text-center">
                  <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-md">
                    <Database className="h-8 w-8 text-pink-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Database Excellence</h4>
                  <p className="text-sm text-muted-foreground">Optimize queries and design efficient schemas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
