
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, Star, History, Users, Award, ExternalLink, BookOpen } from "lucide-react";

const cpLegends = [
  {
    name: "Gennady \"tourist\" Korotkevich",
    country: "Belarus",
    flag: "🇧🇾",
    article: "https://codeforces.com/blog/entry/73894",
    rank: 1,
    title: "GOAT",
    description: "Youngest-ever IOI gold medalist (2012); 5× Codeforces World Champion; multiple ACM ICPC finals and Topcoder Open champion. Leads algorithm research at Google Research.",
    gradient: "from-primary/20 to-accent/20",
    borderColor: "border-primary/40",
    image: "https://i.postimg.cc/Sx3FTRv5/Screenshot-2025-06-10-150038.png"
  },
  {
    name: "Petr Mitrichev",
    country: "Russia", 
    flag: "🇷🇺",
    article: "https://codeforces.com/blog/entry/16517",
    rank: 2,
    title: "Legend",
    description: "Multiple Topcoder Open victories; winner at IOI and numerous Codeforces marathons. Senior Algorithm Engineer at Google.",
    gradient: "from-muted/20 to-secondary/20",
    borderColor: "border-muted/40",
    image: "https://i.postimg.cc/k41DhYjJ/Screenshot-2025-06-10-150353.png"
  },
  {
    name: "Benq (Benjamin Qi)",
    country: "Japan",
    flag: "🇯🇵", 
    article: "https://codeforces.com/blog/entry/15547",
    rank: 3,
    title: "Master",
    description: "Dominant on platforms like Codeforces and AtCoder; frequent GYM victor. Software engineer at a top-tier tech firm.",
    gradient: "from-accent/20 to-primary/20",
    borderColor: "border-accent/40",
    image: "https://i.postimg.cc/9Qw7v2TD/883337-vertical-japanese-flag-wallpapers-1920x1200.jpg"
  },
  {
    name: "ecnerwala (Brian Dean)",
    country: "USA",
    flag: "🇺🇸",
    article: "https://codeforces.com/blog/entry/16004",
    rank: 4,
    title: "Icon",
    description: "Consistently ranked top across Codeforces, AtCoder, Topcoder. Researcher in formal verification / proof assistants.",
    gradient: "from-primary/20 to-secondary/20",
    borderColor: "border-primary/40",
    image: "https://i.postimg.cc/Vk9D3XXr/unnamed.jpg"
  },
  {
    name: "rng_58 (Petr Evdakov)",
    country: "Japan",
    flag: "🇯🇵",
    article: "https://codeforces.com/blog/entry/15683", 
    rank: 5,
    title: "Genius",
    description: "High-ranking coder on Codeforces and AtCoder. Engineer role at a leading company. Active in algorithmic research.",
    gradient: "from-secondary/20 to-accent/20",
    borderColor: "border-secondary/40",
    image: "https://i.postimg.cc/6qh4wVfq/flag-japan-527804-853.avif"
  }
];

const evolutionTimeline = [
  {
    period: "1970s-1980s",
    title: "The Birth",
    description: "ACM ICPC (1970) started at Texas A&M, grew international by 1980s using Pascal, Fortran, and C",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    period: "1990s", 
    title: "Academic Growth",
    description: "ICPC became prestigious, top universities started training teams, early Online Judges appeared (PKU, UVa)",
    gradient: "from-accent/20 to-secondary/20"
  },
  {
    period: "2000s",
    title: "Online Revolution", 
    description: "TopCoder (2001), Codeforces (2009), CodeChef (2009) revolutionized CP with online contests and rating systems",
    gradient: "from-secondary/20 to-muted/20"
  },
  {
    period: "2010s-2020s",
    title: "Globalization",
    description: "Google Code Jam, Facebook Hacker Cup, educational content, and global participation explosion",
    gradient: "from-muted/20 to-primary/20"
  }
];

export const CPSection = () => {
  return (
    <section id="cp" className="py-20 relative overflow-hidden">
      {/* Background with 3D elements */}
      <div className="absolute inset-0 virtual-stage opacity-20"></div>
      <div className="absolute top-20 left-10 floating-3d white-glow">
        <div className="w-20 h-20 bg-gradient-to-r from-white/30 to-primary rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-20 right-10 floating-3d white-glow" style={{animationDelay: '2s'}}>
        <div className="w-16 h-16 bg-gradient-to-r from-secondary to-white/30 rounded-full opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 slide-in-3d">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient white-text-shadow">
            Journey to Legendary Grandmaster Starts Here
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed white-text-shadow">
            Complete guide to Competitive Programming - from 0 to LGM, understanding the history, legends, and building the future of Indian CP
          </p>
        </div>

        {/* Origins & Evolution Section with stunning design */}
        <Card className="mb-16 card-3d glass-morphism border-2 border-primary/20 overflow-hidden relative white-glow">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://i.postimg.cc/XYwYDr5q/61cc8a91532d9e30a0f7d49a-the-evolution-of-programming.png" 
              alt="Evolution of Programming"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="relative z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-accent/20 rounded-full -translate-y-16 translate-x-16 white-glow"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-xl pulse-3d white-glow">
                <History className="h-8 w-8 text-background" />
              </div>
              <div>
                <CardTitle className="text-3xl md:text-4xl text-gradient white-text-shadow">
                  🏁 Origins & Evolution of Competitive Programming
                </CardTitle>
                <CardDescription className="text-lg mt-2 white-text-shadow">
                  From 1970s ACM ICPC to modern global CP platforms - understanding how competitive programming shaped the world
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {evolutionTimeline.map((era, index) => (
                <div key={era.period} className="slide-in-3d white-glow" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${era.gradient} border border-white/20 card-3d h-full white-glow`}>
                    <div className="font-bold text-lg text-primary mb-2 white-text-shadow">🧬 {era.period}</div>
                    <div className="font-semibold text-foreground mb-2 white-text-shadow">{era.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed white-text-shadow">
                      {era.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top CP Legends with enhanced design */}
        <Card className="mb-16 card-3d glass-morphism border-2 border-secondary/20 overflow-hidden white-glow">
          <CardHeader className="relative">
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/20 to-accent/20 rounded-full -translate-y-20 -translate-x-20 floating-3d white-glow"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-xl pulse-3d white-glow">
                <Star className="h-8 w-8 text-background" />
              </div>
              <div>
                <CardTitle className="text-3xl md:text-4xl text-gradient white-text-shadow">
                  🌟 Top 5 Competitive Programming Legends
                </CardTitle>
                <CardDescription className="text-lg mt-2 white-text-shadow">
                  The greatest competitive programmers who shaped the sport and inspired millions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cpLegends.map((legend, index) => (
                <div key={legend.name} className="slide-in-3d white-glow" style={{animationDelay: `${index * 0.15}s`}}>
                  <div className={`legend-card p-6 bg-gradient-to-br ${legend.gradient} ${legend.borderColor} border-2 white-glow`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-primary white-glow" />
                        <span className="text-2xl font-bold white-text-shadow">#{legend.rank}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{legend.flag}</span>
                        <Badge className="bg-gradient-to-r from-primary to-accent text-background white-glow">
                          {legend.title}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <img 
                        src={legend.image} 
                        alt={legend.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <h3 className="font-bold text-xl text-foreground white-text-shadow">{legend.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed white-text-shadow">
                        {legend.description}
                      </p>
                      
                      <a 
                        href={legend.article} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="w-full gap-2 button-3d bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-background white-glow">
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why CP Awareness section with enhanced visuals */}
        <Card className="mb-16 card-3d glass-morphism border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 overflow-hidden white-glow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-accent to-primary rounded-xl pulse-3d white-glow">
                <Trophy className="h-8 w-8 text-background" />
              </div>
              <div>
                <CardTitle className="text-3xl md:text-4xl text-gradient white-text-shadow">
                  🎯 Why CP Awareness is Missing in India & How NEXTFANG Bridges It
                </CardTitle>
                <CardDescription className="text-lg mt-2 white-text-shadow">
                  Understanding the gap and our mission to create India's first Legendary Grandmaster
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-bold text-2xl text-red-400 white-text-shadow">🚫 Current Problems:</h3>
                <div className="space-y-4">
                  {[
                    { title: "Lack of Structured Guidance", desc: "No clear roadmap from 0 to LGM for Indian students" },
                    { title: "College Gap", desc: "Limited exposure and resources compared to top institutes" },
                    { title: "Scattered Resources", desc: "Information spread across multiple platforms" },
                    { title: "No Indian LGM Yet", desc: "India hasn't produced a Legendary Grandmaster on Codeforces" }
                  ].map((problem, index) => (
                    <div key={problem.title} className="card-3d p-4 bg-red-500/10 rounded-xl border border-red-500/20 white-glow">
                      <div className="font-medium text-red-400 white-text-shadow">{problem.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 white-text-shadow">{problem.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-bold text-2xl text-green-400 white-text-shadow">✅ NEXTFANG Solutions:</h3>
                <div className="space-y-4">
                  {[
                    { title: "Centralized Learning Hub", desc: "All resources, roadmaps, and tools in one place" },
                    { title: "All College Focus", desc: "Specifically designed for all college students" },
                    { title: "AI-Powered Guidance", desc: "Personalized roadmaps and problem recommendations" },
                    { title: "LGM Mission", desc: "Dedicated mission to create India's first LGM" }
                  ].map((solution, index) => (
                    <div key={solution.title} className="card-3d p-4 bg-green-500/10 rounded-xl border border-green-500/20 white-glow">
                      <div className="font-medium text-green-400 white-text-shadow">{solution.title}</div>
                      <div className="text-sm text-muted-foreground mt-1 white-text-shadow">{solution.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="card-3d glass-morphism border-2 border-primary/20 p-12 white-glow">
            <CardContent className="pt-0">
              <div className="floating-3d mb-6 white-glow">
                <Trophy className="h-16 w-16 text-primary mx-auto" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient white-text-shadow">
                Ready to Become a CP Legend?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed white-text-shadow">
                Join thousands of aspiring competitive programmers on their journey to greatness. Master algorithms, solve challenging problems, and compete with the best!
              </p>
              <a 
                href="https://www.tle-eliminators.com/cp-sheet" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="button-3d bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-background text-lg px-8 py-4 white-glow">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Your CP Journey
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
