import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ExternalLink, Code, Trophy, Target, Users, MessageCircle, Send, Phone, Twitter, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Competitive Programming Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to master competitive programming and become a coding legend
            </p>
          </div>
        </div>

        {/* Community Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Join the NEXTFANG Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with fellow competitive programmers, get mentorship, and be part of India's journey to create the first LGM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Discord */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="p-3 bg-[#5865F2]/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-[#5865F2]/20 transition-colors">
                  <MessageCircle className="h-8 w-8 text-[#5865F2]" />
                </div>
                <CardTitle className="text-xl">Discord Server</CardTitle>
                <CardDescription>Real-time discussions, voice channels, and study groups</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary">Live Chat</Badge>
                  <Badge variant="secondary">Voice Rooms</Badge>
                  <Badge variant="secondary">Study Groups</Badge>
                </div>
                <div className="text-2xl font-bold text-primary">850+ Members</div>
                <Button 
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                  onClick={() => window.open('https://discord.gg/wNfGqSWD', '_blank')}
                >
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            {/* Telegram */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20">
              <CardHeader className="text-center">
                <div className="p-3 bg-[#0088CC]/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-[#0088CC]/20 transition-colors">
                  <Send className="h-8 w-8 text-[#0088CC]" />
                </div>
                <CardTitle className="text-xl">Telegram Group</CardTitle>
                <CardDescription>Quick updates, contest notifications, and daily discussions</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary">Instant Updates</Badge>
                  <Badge variant="secondary">Contest Alerts</Badge>
                  <Badge variant="secondary">Resources</Badge>
                </div>
                <div className="text-2xl font-bold text-secondary">650+ Members</div>
                <Button 
                  className="w-full bg-[#0088CC] hover:bg-[#006699]"
                  onClick={() => window.open('https://t.me/+ESH0q0W9-1A2Nzdl', '_blank')}
                >
                  Join Telegram
                </Button>
              </CardContent>
            </Card>

            {/* Twitter/X */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center">
                <div className="p-3 bg-black/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-black/20 transition-colors">
                  <Twitter className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl">Twitter/X</CardTitle>
                <CardDescription>Latest updates, CP tips, and community highlights</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary">Updates</Badge>
                  <Badge variant="secondary">Tips</Badge>
                  <Badge variant="secondary">News</Badge>
                </div>
                <div className="text-2xl font-bold text-accent">2.5K+ Followers</div>
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => window.open('https://x.com/Stutimishra9451?t=639oGTHn8YLhLdsKorcNsA&s=09', '_blank')}
                >
                  Follow on X
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
              <CardHeader className="text-center">
                <div className="p-3 bg-[#25D366]/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-[#25D366]/20 transition-colors">
                  <Phone className="h-8 w-8 text-[#25D366]" />
                </div>
                <CardTitle className="text-xl">WhatsApp Group</CardTitle>
                <CardDescription>Personal support and quick doubt resolution</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge variant="secondary">Support</Badge>
                  <Badge variant="secondary">Doubts</Badge>
                  <Badge variant="secondary">Quick Help</Badge>
                </div>
                <div className="text-2xl font-bold text-accent">200+ Members</div>
                <Button 
                  className="w-full bg-[#25D366] hover:bg-[#1DA851]"
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
