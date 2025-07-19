import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ExternalLink, Code, Trophy, Target, Users, MessageCircle, Send, Phone, Twitter, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "@/components/Navbar";
import { EnhancedSearch } from "@/components/EnhancedSearch";

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="text-center mb-12 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Learning Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Competitive Programming
              <span className="block">Resources</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Everything you need to master competitive programming and become a coding legend
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">500+ Resources</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
                <Users className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">10K+ Students</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border/50">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Expert Curated</span>
              </div>
            </div>
            
            {/* Enhanced Search */}
            <div className="mt-12">
              <EnhancedSearch 
                placeholder="Search resources, tutorials, problems..."
                results={[
                  {
                    id: "1",
                    title: "CodeForces Problem Set",
                    description: "Comprehensive collection of competitive programming problems",
                    category: "Problems",
                    url: "https://codeforces.com/problemset"
                  },
                  {
                    id: "2", 
                    title: "CP Algorithms",
                    description: "Detailed explanations of algorithms used in competitive programming",
                    category: "Algorithms",
                    url: "https://cp-algorithms.com/"
                  },
                  {
                    id: "3",
                    title: "AtCoder Beginner Contest",
                    description: "Weekly contests perfect for beginners to intermediate level",
                    category: "Contests",
                    url: "https://atcoder.jp/contests/"
                  }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Community Section */}
        <section className="mb-20 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full mb-6">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">Community Hub</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Join the NEXTFANG
              <span className="block">Community</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Connect with fellow competitive programmers, get mentorship, and be part of India's journey to create the first LGM
            </p>
            
            {/* Community stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">2.5K+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Daily Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Enhanced Discord Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-[#5865F2]/30 bg-gradient-to-br from-card/90 to-[#5865F2]/5 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <div className="p-4 bg-gradient-to-br from-[#5865F2]/20 to-[#5865F2]/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 border border-[#5865F2]/20">
                    <MessageCircle className="h-10 w-10 text-[#5865F2]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse" />
                </div>
                <CardTitle className="text-xl font-bold">Discord Server</CardTitle>
                <CardDescription className="text-sm leading-relaxed">Real-time discussions, voice channels, and study groups</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs px-2 py-1">Live Chat</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Voice Rooms</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Study Groups</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#5865F2]">850+</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Members</div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#5865F2] text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://discord.gg/wNfGqSWD', '_blank')}
                >
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Telegram Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-[#0088CC]/30 bg-gradient-to-br from-card/90 to-[#0088CC]/5 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <div className="p-4 bg-gradient-to-br from-[#0088CC]/20 to-[#0088CC]/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 border border-[#0088CC]/20">
                    <Send className="h-10 w-10 text-[#0088CC]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-card animate-pulse" />
                </div>
                <CardTitle className="text-xl font-bold">Telegram Group</CardTitle>
                <CardDescription className="text-sm leading-relaxed">Quick updates, contest notifications, and daily discussions</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs px-2 py-1">Instant Updates</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Contest Alerts</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Resources</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#0088CC]">650+</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Members</div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#0088CC] to-[#006699] hover:from-[#006699] hover:to-[#0088CC] text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://t.me/+ESH0q0W9-1A2Nzdl', '_blank')}
                >
                  Join Telegram
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Twitter/X Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-gray-800/30 bg-gradient-to-br from-card/90 to-gray-900/5 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <div className="p-4 bg-gradient-to-br from-gray-900/20 to-gray-800/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 border border-gray-800/20">
                    <Twitter className="h-10 w-10 text-gray-900 dark:text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 rounded-full border-2 border-card animate-pulse" />
                </div>
                <CardTitle className="text-xl font-bold">Twitter/X</CardTitle>
                <CardDescription className="text-sm leading-relaxed">Latest updates, CP tips, and community highlights</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs px-2 py-1">Updates</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Tips</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">News</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">2.5K+</div>
                  <div className="text-sm text-muted-foreground font-medium">Followers</div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://x.com/Stutimishra9451?t=639oGTHn8YLhLdsKorcNsA&s=09', '_blank')}
                >
                  Follow on X
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced WhatsApp Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-[#25D366]/30 bg-gradient-to-br from-card/90 to-[#25D366]/5 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="relative mb-4">
                  <div className="p-4 bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/10 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 border border-[#25D366]/20">
                    <Phone className="h-10 w-10 text-[#25D366]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse" />
                </div>
                <CardTitle className="text-xl font-bold">WhatsApp Group</CardTitle>
                <CardDescription className="text-sm leading-relaxed">Personal support and quick doubt resolution</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 pt-0">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs px-2 py-1">Support</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Doubts</Badge>
                  <Badge variant="secondary" className="text-xs px-2 py-1">Quick Help</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-[#25D366]">200+</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Members</div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#25D366] text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://chat.whatsapp.com/E9ijb3svQ9PC75ugH03dGN', '_blank')}
                >
                  Join WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Community Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Peer Mentoring Program</CardTitle>
                </div>
                <CardDescription>Connect with seniors and help juniors in your CP journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">1-on-1 mentorship matching</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Weekly progress check-ins</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Resume and interview guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-secondary/5 to-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-secondary" />
                  <CardTitle>Weekly Q&A Sessions</CardTitle>
                </div>
                <CardDescription>Live doubt solving and strategy sessions with experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Live problem solving sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Contest strategy discussions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Career guidance for FANG</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Hackathons Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Top Hackathon Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Participate in hackathons, win prizes, and land your dream job through these premier platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Unstop */}
            <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Unstop</CardTitle>
                    <Badge variant="secondary">Platform #1</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  India's largest platform for competitions, hackathons, and hiring challenges
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Competitions</Badge>
                    <Badge variant="outline" className="text-sm">Hackathons</Badge>
                    <Badge variant="outline" className="text-sm">Hiring Challenges</Badge>
                    <Badge variant="outline" className="text-sm">Scholarships</Badge>
                  </div>

                  <a
                    href="https://unstop.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                      <ExternalLink className="h-4 w-4" />
                      Explore Unstop
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* DoraHacks */}
            <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">DoraHacks</CardTitle>
                    <Badge variant="secondary">Platform #2</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Global hackathon organizer and developer platform for Web3 and beyond
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Web3 Hackathons</Badge>
                    <Badge variant="outline" className="text-sm">Global Events</Badge>
                    <Badge variant="outline" className="text-sm">Developer Grants</Badge>
                    <Badge variant="outline" className="text-sm">Community</Badge>
                  </div>

                  <a
                    href="https://dorahacks.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90">
                      <ExternalLink className="h-4 w-4" />
                      Explore DoraHacks
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Hack2Skill */}
            <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Hack2Skill</CardTitle>
                    <Badge variant="secondary">Platform #3</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Premium hackathon platform with industry partnerships and cash prizes
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Industry Partners</Badge>
                    <Badge variant="outline" className="text-sm">Cash Prizes</Badge>
                    <Badge variant="outline" className="text-sm">Skill Assessment</Badge>
                    <Badge variant="outline" className="text-sm">Job Opportunities</Badge>
                  </div>

                  <a
                    href="https://hack2skill.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                      <ExternalLink className="h-4 w-4" />
                      Explore Hack2Skill
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Devfolio */}
            <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Devfolio</CardTitle>
                    <Badge variant="secondary">Platform #4</Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  Developer-focused platform for hackathons, projects, and tech events
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Developer Community</Badge>
                    <Badge variant="outline" className="text-sm">Project Showcase</Badge>
                    <Badge variant="outline" className="text-sm">Tech Events</Badge>
                    <Badge variant="outline" className="text-sm">Open Source</Badge>
                  </div>

                  <a
                    href="https://devfolio.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90">
                      <ExternalLink className="h-4 w-4" />
                      Explore Devfolio
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 p-8 max-w-4xl mx-auto">
              <CardContent className="pt-0">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ready to Win Your First Hackathon?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of developers who have leveraged hackathons to secure PPIs, win prizes, and land their dream jobs. Your next opportunity is just one hackathon away!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What is CP Section */}
        <Card className="mb-8 card-3d border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              What is Competitive Programming?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              Competitive Programming is a sport where programmers solve algorithmic problems within a time limit using a programming language of their choice. It's a test of problem-solving skills, knowledge of algorithms, and ability to write efficient code.
            </p>

            <h4 className="text-lg font-semibold mb-4">Few good websites for CP:</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="secondary">CodeForces</Badge>
              <Badge variant="secondary">CodeChef</Badge>
              <Badge variant="secondary">AtCoder</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Extensions Section */}
        <Card className="mb-8 card-3d border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-secondary" />
              Extensions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Extensions can help you analyze your performance, track your progress and much more.
            </p>
            <p className="mb-4">Here are the best CP extensions on the market:</p>
            <a
              href="https://codeforces.com/blog/entry/82884"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Extensions Guide
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* ACM ICPC Resources */}
        <div className="mb-16" id="acm-icpc-resources">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Resources for ACM ICPC
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive roadmap from beginner to advanced level for ACM ICPC preparation
            </p>
          </div>

          {/* Beginners Level */}
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Code className="h-6 w-6" />
                Beginners Level (C++/Java)
              </CardTitle>
              <CardDescription>Foundation building with essential programming concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Practice Section */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-secondary">Practice</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 border border-muted hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">HackerRank 30 days of code</h5>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Daily coding challenges to build programming fundamentals</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open('https://www.hackerrank.com/domains/tutorials/30-days-of-code', '_blank')}
                    >
                      Start Practice
                    </Button>
                  </Card>
                  <Card className="p-4 border border-muted hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">HackerRank Language Proficiency</h5>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Master programming language fundamentals</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open('https://www.hackerrank.com/dashboard', '_blank')}
                    >
                      Visit Dashboard
                    </Button>
                  </Card>
                </div>
              </div>

              {/* Courses Section */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-secondary">Courses</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "CodeWithHarry C++ course (Hindi)",
                      desc: "Comprehensive C++ tutorial series in Hindi",
                      url: "https://www.youtube.com/watch?v=j8nAHeVKL08&list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL"
                    },
                    {
                      title: "Pointers course by mycodeschool",
                      desc: "In-depth understanding of pointers and memory management",
                      url: "https://www.youtube.com/watch?v=h-HBipu_1P0&list=PL2_aWCzGMAwLZp6LMUKI3cc7pgGsasm2_"
                    },
                    {
                      title: "Harvard CS50",
                      desc: "Introduction to Computer Science from Harvard",
                      url: "https://www.youtube.com/user/cs50tv"
                    },
                    {
                      title: "Saurab Shukla C++ course (Hindi)",
                      desc: "Complete C++ programming course in Hindi",
                      url: "https://www.youtube.com/watch?v=Iuo9PpGE04Y&list=PLLYz8uHU480j37APNXBdPz7YzAi4XlQUF"
                    },
                    {
                      title: "FreeCodeCamp",
                      desc: "Free programming tutorials and courses",
                      url: "https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ"
                    }
                  ].map((course, idx) => (
                    <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-sm">{course.title}</h5>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{course.desc}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => window.open(course.url, '_blank')}
                      >
                        Watch Course
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Extras Section */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-secondary">Extras</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Ted-ed riddles",
                      desc: "Logic puzzles to enhance problem-solving skills",
                      url: "https://www.youtube.com/watch?v=N5vJSNXPEwA&list=PLJicmE8fK0EiFRt1Hm5a_7SJFaikIFW30"
                    },
                    {
                      title: "Numberphile",
                      desc: "Mathematical concepts and number theory",
                      url: "https://www.youtube.com/results?search_query=numberphile"
                    },
                    {
                      title: "Computerphile",
                      desc: "Computer science concepts and algorithms",
                      url: "https://www.youtube.com/user/Computerphile"
                    }
                  ].map((extra, idx) => (
                    <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold">{extra.title}</h5>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{extra.desc}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(extra.url, '_blank')}
                      >
                        Explore
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intermediate Level I */}
          <Card className="mb-8 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-secondary flex items-center gap-2">
                <Target className="h-6 w-6" />
                Intermediate Level - I (Searching, Sorting & Basic DS/Algorithms)
              </CardTitle>
              <CardDescription>Building core algorithmic knowledge and data structures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "CLRS Algorithms",
                    desc: "Classic algorithms textbook with comprehensive coverage"
                  },
                  {
                    title: "mycodeschool DSA Course",
                    desc: "Complete data structures and algorithms tutorial series",
                    url: "https://www.youtube.com/user/mycodeschool"
                  },
                  {
                    title: "HackerRank Data Structures",
                    desc: "Practice problems for data structures implementation",
                    url: "https://www.hackerrank.com/domains/data-structures"
                  },
                  {
                    title: "Back to Back SWE",
                    desc: "Interview-focused algorithm explanations",
                    url: "https://www.youtube.com/channel/UCmJz2DV1a3yfgrR7GqRtUUA"
                  },
                  {
                    title: "GeeksforGeeks Interview Problems",
                    desc: "Curated interview questions from top companies",
                    url: "https://practice.geeksforgeeks.org/explore/?company%5B%5D=Amazon&problemType=functional&page=1&sortBy=submissions"
                  },
                  {
                    title: "STL from GeeksforGeeks",
                    desc: "Standard Template Library comprehensive guide",
                    url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/"
                  }
                ].map((resource, idx) => (
                  <Card key={idx} className="p-4 border border-muted hover:border-secondary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-sm">{resource.title}</h5>
                      {resource.url && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                    {resource.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Learn Now
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
              <Badge variant="secondary" className="w-fit">
                📚 Also study Mathematics up to class 12th (P&C, Probability, Matrices, etc.)
              </Badge>
            </CardContent>
          </Card>

          {/* Intermediate Level II */}
          <Card className="mb-8 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl text-accent flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Intermediate Level - II (Advanced DS, Algorithms & Paradigms)
              </CardTitle>
              <CardDescription>Mastering advanced concepts and problem-solving paradigms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "MIT 6.006",
                    desc: "Introduction to Algorithms from MIT",
                    url: "https://www.youtube.com/watch?v=HtSuA80QTyo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb"
                  },
                  {
                    title: "William Fiset Graph Theory",
                    desc: "Comprehensive graph algorithms course",
                    url: "https://www.youtube.com/watch?v=DgXR2OWQnLc&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P"
                  },
                  {
                    title: "AtCoder DP Educational",
                    desc: "Dynamic programming contest problems",
                    url: "https://atcoder.jp/contests/dp"
                  },
                  {
                    title: "CodeNcode",
                    desc: "Advanced algorithm tutorials and explanations",
                    url: "https://www.youtube.com/channel/UC0zvY3yIBQTrSutsV-4yscQ"
                  },
                  {
                    title: "Tushar Roy",
                    desc: "Algorithm implementations and explanations",
                    url: "https://www.youtube.com/user/tusharroy2525"
                  },
                  {
                    title: "3Blue1Brown Math",
                    desc: "Mathematical concepts with visual explanations",
                    url: "https://youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw"
                  },
                  {
                    title: "Tim Roughgarden Stanford",
                    desc: "Stanford algorithms specialization course",
                    url: "https://www.coursera.org/specializations/algorithms"
                  },
                  {
                    title: "CodeChef DSA Learning",
                    desc: "Structured DSA learning series",
                    url: "https://www.codechef.com/LEARNDSA"
                  },
                  {
                    title: "Rachit Jain DP",
                    desc: "Dynamic programming from zero to hero",
                    url: "https://www.youtube.com/watch?v=tb_14w_-mNw&list=PLfBJlB6T2eOtMXgK3FLUTawHjzpIEySHF"
                  }
                ].map((resource, idx) => (
                  <Card key={idx} className="p-4 border border-muted hover:border-accent/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-sm">{resource.title}</h5>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Study Now
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">📖 Codeforces blogs for additional topics</Badge>
                <Badge variant="secondary">🔗 Mathologer for advanced mathematics</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Level */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Advanced Level
              </CardTitle>
              <CardDescription>Master-level resources for competitive programming excellence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Codeforces Blogs Collection",
                    desc: "Advanced topics and problem-solving techniques",
                    url: "https://codeforces.com/blog/entry/57282"
                  },
                  {
                    title: "Gaurav Sen DSA",
                    desc: "System design and advanced data structures",
                    url: "https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw"
                  },
                  {
                    title: "Princeton Algorithms",
                    desc: "Robert Sedgewick's comprehensive algorithms course",
                    url: "https://www.coursera.org/learn/algorithms-part1"
                  },
                  {
                    title: "SecondThread",
                    desc: "Competitive programming tutorials and live streams",
                    url: "https://www.youtube.com/channel/UCXbCohpE9IoVQUD2Ifg1d1g"
                  },
                  {
                    title: "Errichto",
                    desc: "Advanced competitive programming content",
                    url: "https://www.youtube.com/channel/UCBr_Fu6q9iHYQCh13jmpbrg"
                  },
                  {
                    title: "Number Theory by David M. Burton",
                    desc: "Advanced mathematical concepts for competitive programming"
                  }
                ].map((resource, idx) => (
                  <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-sm">{resource.title}</h5>
                      {resource.url && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                    {resource.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        Master Now
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">📚 Introduction to Algorithms (CLRS)</Badge>
                <Badge variant="secondary">🎯 Computational Matters (for reference)</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Resources */}
        <Card className="mb-8 card-3d border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-accent" />
              Where to learn?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Following links are useful for learning CP topics:</p>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">TLE Course Work</h4>
                <p className="text-sm text-muted-foreground">Obviously the best structured course</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">CodeForces Catalog</h4>
                <a href="https://codeforces.com/catalog" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  https://codeforces.com/catalog
                </a>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">CP Algorithms</h4>
                <a href="https://cp-algorithms.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  https://cp-algorithms.com/
                </a>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">USACO Guide</h4>
                <a href="https://usaco.guide/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  https://usaco.guide/
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Practice Resources */}
        <Card className="mb-8 card-3d border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Where to practice?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Following links are useful for practicing CP:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Rating Wise Practice</h4>
                <div className="space-y-3">
                  <a href="https://www.tle-eliminators.com/cp-sheet" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-4 w-4" />
                      TLE Eliminators CP Sheet
                    </Button>
                  </a>
                  <a href="https://codeforces.com/problemset" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Codeforces Problemset
                    </Button>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Topic Wise Practice</h4>
                <div className="space-y-3">
                  <a href="https://codeforces.com/edu/courses" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Codeforces EDU
                    </Button>
                  </a>
                  <a href="https://cses.fi/problemset/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-4 w-4" />
                      CSES Problem Set
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Practice */}
        <Card className="mb-8 card-3d border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Where to practice more? (Advanced)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="https://projecteuler.net/archives" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Project Euler
                </Button>
              </a>
              <a href="https://open.kattis.com/problems" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Kattis Problems
                </Button>
              </a>
              <a href="https://acm.timus.ru/problemset.aspx" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Timus Online Judge
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="mb-8 card-3d border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl">Track Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">These sites help to see all of your accounts at the same place:</p>

            <div className="space-y-3">
              <a href="https://clist.by/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  CLIST
                </Button>
              </a>
              <a href="https://progvar.fun/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  ProgVar
                </Button>
              </a>
              <a href="https://codeclock.in/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Codeclock (Mobile App)
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
