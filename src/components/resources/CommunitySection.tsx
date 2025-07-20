import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Send, Phone, Twitter, Heart } from "lucide-react";

export function CommunitySection() {
  return (
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
                <span className="text-sm">Career guidance and tips</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}