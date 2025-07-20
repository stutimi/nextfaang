import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Users, ExternalLink } from "lucide-react";

export function CPLegendsSection() {
  return (
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

          <CardContent className="pt-0 relative z-10">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30">IOI Gold</Badge>
                <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30">5× World Champion</Badge>
                <Badge variant="outline" className="text-xs bg-emerald-500/10 border-emerald-500/30">Google</Badge>
              </div>
              
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://codeforces.com/profile/tourist', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add more legends here - keeping it minimal for now */}
        <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-700 border-2 hover:border-red-500/40 bg-gradient-to-br from-card/95 to-red-500/10 hover:scale-[1.02] hover:-translate-y-3 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 relative z-10">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-red-500/40 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                🏆
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-xs font-bold">#2</div>
            </div>
            
            <CardTitle className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
              More Legends Coming Soon
            </CardTitle>
            
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              We're adding more competitive programming legends to inspire your journey. Stay tuned!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}