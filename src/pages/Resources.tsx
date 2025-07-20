import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ExternalLink, Code, Trophy, Target, Users, MessageCircle, Send, Phone, Twitter, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "@/components/Navbar";
import { EnhancedSearch } from "@/components/EnhancedSearch";
import { ToolsDropdown } from "@/components/ToolsDropdown";

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

        {/* AI-Powered Developer Tools Section */}
        <ToolsDropdown />

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

        {/* Competitive Programming Legends Section */}
        <section className="mb-20 relative overflow-hidden">
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>
          
          <div className="text-center mb-20 relative z-10">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/15 to-secondary/15 border-2 border-primary/30 rounded-full mb-8 backdrop-blur-sm">
              <Trophy className="h-6 w-6 text-primary animate-pulse" />
              <span className="font-bold text-primary text-lg">Hall of Fame</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Competitive Programming
              <span className="block bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Legends
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed mb-8">
              Learn from the greatest minds in competitive programming history and discover what makes them legendary
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                <Trophy className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-bold text-purple-500">50+ World Championships</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                <Target className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-bold text-blue-500">1M+ Problems Solved</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 rounded-full border border-emerald-500/20 backdrop-blur-sm">
                <Users className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-500">10M+ Students Inspired</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Tourist */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-purple-500/40 bg-gradient-to-br from-card/95 to-purple-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src="https://i.postimg.cc/Sx3FTRv5/Screenshot-2025-06-10-150038.png" 
                    alt="Gennady Korotkevich"
                    className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                    👑
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-xs font-bold">#1</div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  Gennady "tourist" Korotkevich
                </CardTitle>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl">🇧🇾</span>
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-3 py-1">
                    GOAT 🐐
                  </Badge>
                </div>

                {/* Achievement stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-purple-400">3800+</div>
                    <div className="text-xs text-muted-foreground">CF Rating</div>
                  </div>
                  <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-blue-400">5×</div>
                    <div className="text-xs text-muted-foreground">World Champion</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Youngest-ever IOI gold medalist (2012); 5× Codeforces World Champion; multiple ACM ICPC finals and Topcoder Open champion. Currently leads algorithm research at Google.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 pt-0 relative z-10">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://codeforces.com/blog/entry/73894', '_blank')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Article
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-purple-500/30 hover:bg-purple-500/10"
                    onClick={() => window.open('https://codeforces.com/profile/tourist', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Petr Mitrichev */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-blue-500/40 bg-gradient-to-br from-card/95 to-blue-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src="https://i.postimg.cc/k41DhYjJ/Screenshot-2025-06-10-150353.png" 
                    alt="Petr Mitrichev"
                    className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                    🏆
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-xs font-bold">#2</div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  Petr Mitrichev
                </CardTitle>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl">🇷🇺</span>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-3 py-1">
                    Legend ⭐
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-blue-400">3600+</div>
                    <div className="text-xs text-muted-foreground">Peak Rating</div>
                  </div>
                  <div className="text-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <div className="text-lg font-bold text-cyan-400">10+</div>
                    <div className="text-xs text-muted-foreground">Major Wins</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Multiple Topcoder Open victories; winner at IOI and numerous Codeforces marathons. Senior Algorithm Engineer at Google with groundbreaking contributions.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 pt-0 relative z-10">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://codeforces.com/blog/entry/16517', '_blank')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Article
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-blue-500/30 hover:bg-blue-500/10"
                    onClick={() => window.open('https://codeforces.com/profile/Petr', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benq */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-cyan-500/40 bg-gradient-to-br from-card/95 to-cyan-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src="https://i.postimg.cc/Vk9D3XXr/unnamed.jpg" 
                    alt="Benjamin Qi"
                    className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                    🎯
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full text-white text-xs font-bold">#3</div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  Benq (Benjamin Qi)
                </CardTitle>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl">🇺🇸</span>
                  <Badge className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold px-3 py-1">
                    Master 🚀
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <div className="text-lg font-bold text-cyan-400">3500+</div>
                    <div className="text-xs text-muted-foreground">CF Rating</div>
                  </div>
                  <div className="text-center p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="text-lg font-bold text-emerald-400">USACO</div>
                    <div className="text-xs text-muted-foreground">Guide Creator</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Dominant on platforms like Codeforces and AtCoder; frequent contest victor. Creator of USACO Guide and software engineer at top-tier tech firm.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 pt-0 relative z-10">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://codeforces.com/blog/entry/15547', '_blank')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Article
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-cyan-500/30 hover:bg-cyan-500/10"
                    onClick={() => window.open('https://usaco.guide/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Errichto */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-emerald-500/40 bg-gradient-to-br from-card/95 to-emerald-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src="https://i.postimg.cc/Vk9D3XXr/unnamed.jpg" 
                    alt="Kamil Debowski"
                    className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-emerald-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                    🎓
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full text-white text-xs font-bold">#4</div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                  Errichto (Kamil Debowski)
                </CardTitle>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl">🇵🇱</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-violet-500 text-white font-bold px-3 py-1">
                    Educator 📚
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="text-lg font-bold text-emerald-400">500K+</div>
                    <div className="text-xs text-muted-foreground">YouTube Subs</div>
                  </div>
                  <div className="text-center p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                    <div className="text-lg font-bold text-violet-400">ICPC</div>
                    <div className="text-xs text-muted-foreground">World Finals</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Popular CP educator and YouTuber with 500K+ subscribers; multiple ACM ICPC World Finals participant. Creates world-class educational content.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 pt-0 relative z-10">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-violet-500 hover:to-emerald-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://codeforces.com/blog/entry/15683', '_blank')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Article
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={() => window.open('https://www.youtube.com/channel/UCBr_Fu6q9iHYQCh13jmpbrg', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* rng_58 */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-violet-500/40 bg-gradient-to-br from-card/95 to-violet-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <img 
                    src="https://i.postimg.cc/6qh4wVfq/flag-japan-527804-853.avif" 
                    alt="Petr Evdakov"
                    className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-violet-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-pulse">
                    🧠
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full text-white text-xs font-bold">#5</div>
                </div>
                
                <CardTitle className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                  rng_58 (Petr Evdakov)
                </CardTitle>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl">🇯🇵</span>
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold px-3 py-1">
                    Genius 🧠
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                    <div className="text-lg font-bold text-violet-400">3400+</div>
                    <div className="text-xs text-muted-foreground">AtCoder</div>
                  </div>
                  <div className="text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-bold text-purple-400">Research</div>
                    <div className="text-xs text-muted-foreground">Algorithm</div>
                  </div>
                </div>
                
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  High-ranking coder on Codeforces and AtCoder with exceptional problem-solving skills. Engineer at leading company, active in algorithmic research.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-4 pt-0 relative z-10">
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-purple-500 hover:to-violet-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open('https://codeforces.com/blog/entry/15683', '_blank')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Article
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-violet-500/30 hover:bg-violet-500/10"
                    onClick={() => window.open('https://atcoder.jp/users/rng_58', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center relative">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 border-2 border-primary/30 p-12 max-w-5xl mx-auto backdrop-blur-sm">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-50"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]"></div>
              
              <CardContent className="pt-0 relative z-10">
                <div className="flex justify-center items-center gap-4 mb-8">
                  <Trophy className="h-16 w-16 text-primary animate-bounce" />
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse delay-200"></div>
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-400"></div>
                  </div>
                  <Trophy className="h-16 w-16 text-accent animate-bounce delay-300" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                  Ready to Join the Legends?
                </h3>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Study their techniques, learn from their journey, and start your path to becoming the next competitive programming legend from India! 🇮🇳
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-primary hover:to-secondary text-white font-bold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                    onClick={() => window.open('https://www.tle-eliminators.com/cp-sheet', '_blank')}
                  >
                    <ExternalLink className="h-6 w-6 mr-3" />
                    Start Your CP Journey
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary/30 hover:bg-primary/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                    onClick={() => window.open('https://discord.gg/wNfGqSWD', '_blank')}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Join Community
                  </Button>
                </div>

                {/* Inspirational quote */}
                <div className="border-t border-primary/20 pt-6">
                  <blockquote className="text-lg italic text-muted-foreground">
                    "Every legend was once a beginner. Every pro was once an amateur. Every icon was once an unknown."
                  </blockquote>
                  <p className="text-sm text-primary font-semibold mt-2">- Start your legend today</p>
                </div>
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
