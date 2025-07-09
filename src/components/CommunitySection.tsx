import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Send, Phone, Mail, Heart, Twitter, Github, Star } from "lucide-react";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the NEXTFANG Community</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow competitive programmers, get mentorship, and be part of India's journey to create the first LGM
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Discord */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#5865F2]/20">
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
            <div className="text-2xl font-bold text-[#5865F2]">850+ Members</div>
            <Button 
              className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
              onClick={() => window.open('https://discord.gg/wNfGqSWD', '_blank')}
            >
              Join Discord
            </Button>
          </CardContent>
        </Card>

        {/* Telegram */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#0088CC]/20">
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
            <div className="text-2xl font-bold text-[#0088CC]">650+ Members</div>
            <Button 
              className="w-full bg-[#0088CC] hover:bg-[#006699]"
              onClick={() => window.open('https://t.me/+ESH0q0W9-1A2Nzdl', '_blank')}
            >
              Join Telegram
            </Button>
          </CardContent>
        </Card>

        {/* Twitter/X */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-400/20">
          <CardHeader className="text-center">
            <div className="p-3 bg-blue-400/10 rounded-full w-fit mx-auto mb-3 group-hover:bg-blue-400/20 transition-colors">
              <Twitter className="h-8 w-8 text-blue-400" />
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
            <div className="text-2xl font-bold text-blue-400">2.5K+ Followers</div>
            <Button 
              className="w-full bg-blue-400 hover:bg-blue-500 text-white"
              onClick={() => window.open('https://x.com/Stutimishra9451?t=639oGTHn8YLhLdsKorcNsA&s=09', '_blank')}
            >
              Follow on X
            </Button>
          </CardContent>
        </Card>

        {/* WhatsApp */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#25D366]/20">
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
            <div className="text-2xl font-bold text-[#25D366]">200+ Members</div>
            <Button 
              className="w-full bg-[#25D366] hover:bg-[#1DA851]"
              onClick={() => window.open('https://chat.whatsapp.com/E9ijb3svQ9PC75ugH03dGN', '_blank')}
            >
              Join WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Section */}
      <Card className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="p-3 bg-gray-700 rounded-full w-fit mb-3">
              <Github className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-white">Open Source Project</CardTitle>
          <CardDescription className="text-gray-300">
            NEXTFANG is built by the community, for the community
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="gap-2 bg-white text-gray-900 hover:bg-gray-200"
              onClick={() => window.open('https://github.com/stutimi/nextfaang', '_blank')}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            <Button 
              className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => window.open('https://github.com/stutimi/nextfaang', '_blank')}
            >
              <Star className="h-4 w-4" />
              Star the Repo
            </Button>
          </div>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Help us improve NEXTFANG by contributing to our open-source repository. 
            Star the project to show your support and consider contributing to help 
            India create its first Legendary Grandmaster in competitive programming.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};