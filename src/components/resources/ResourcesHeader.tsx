import { BookOpen, Trophy, Users, Target } from "lucide-react";
import { EnhancedSearch } from "@/components/EnhancedSearch";

export function ResourcesHeader() {
  return (
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
  );
}