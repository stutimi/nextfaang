import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Globe, Star, History, Users, Award, ExternalLink, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const cpLegends = [
  {
    name: "Gennady \"tourist\" Korotkevich",
    country: "Belarus",
    flag: "🇧🇾",
    article: "https://codeforces.com/blog/entry/73894",
    rank: 1,
    title: "GOAT",
    description: "Youngest-ever IOI gold medalist (2012); 5× Codeforces World Champion; multiple ACM ICPC finals and Topcoder Open champion. Leads algorithm research at Google Research.",
    gradient: "from-purple-500/20 to-blue-500/20",
    borderColor: "border-purple-500/40",
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
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/40",
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
    gradient: "from-cyan-500/20 to-emerald-500/20",
    borderColor: "border-cyan-500/40",
    image: "https://i.postimg.cc/Vk9D3XXr/unnamed.jpg"
  },
  {
    name: "Errichto (Kamil Debowski)",
    country: "Poland",
    flag: "🇵🇱",
    article: "https://codeforces.com/blog/entry/15683",
    rank: 4,
    title: "Educator",
    description: "Popular CP educator and YouTuber; multiple ACM ICPC World Finals participant. Creates educational content for competitive programming.",
    gradient: "from-emerald-500/20 to-violet-500/20",
    borderColor: "border-emerald-500/40",
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
    gradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/40",
    image: "https://i.postimg.cc/6qh4wVfq/flag-japan-527804-853.avif"
  }
];

const evolutionTimeline = [
  {
    period: "1970s-1980s",
    title: "The Birth",
    description: "ACM ICPC (1970) started at Texas A&M, grew international by 1980s using Pascal, Fortran, and C",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    period: "1990s", 
    title: "Academic Growth",
    description: "ICPC became prestigious, top universities started training teams, early Online Judges appeared (PKU, UVa)",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    period: "2000s",
    title: "Online Revolution", 
    description: "TopCoder (2001), Codeforces (2009), CodeChef (2009) revolutionized CP with online contests and rating systems",
    gradient: "from-cyan-500/20 to-emerald-500/20"
  },
  {
    period: "2010s-2020s",
    title: "Globalization",
    description: "Google Code Jam, Facebook Hacker Cup, educational content, and global participation explosion",
    gradient: "from-emerald-500/20 to-violet-500/20"
  }
];

export const CPSection = () => {
  return (
    <section id="cp" className="relative bg-gradient-to-b from-background to-muted py-24 overflow-hidden">
      {/* Background elements matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-15 dark:opacity-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="px-4 py-2 border-primary/30 bg-primary/5 text-primary mb-6">
            <Trophy className="h-4 w-4 mr-2" />
            Competitive Programming
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">Journey to</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Legendary Grandmaster
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Complete guide to Competitive Programming - from 0 to LGM, understanding the history, legends, and building the future of Indian CP
          </p>
        </motion.div>

        {/* Origins & Evolution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card border-border rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-primary to-blue-500 rounded-lg">
                  <History className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-foreground">
                    Origins & Evolution of Competitive Programming
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    From 1970s ACM ICPC to modern global CP platforms
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {evolutionTimeline.map((era, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${era.gradient} border border-border h-full`}>
                      <div className="font-bold text-lg text-primary mb-2">🧬 {era.period}</div>
                      <div className="font-semibold text-foreground mb-2">{era.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {era.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CP Legends Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card border-border rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-foreground">
                    Competitive Programming Legends
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Learn from the greatest minds in competitive programming
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cpLegends.map((legend, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${legend.gradient} border border-border h-full`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-400" />
                          <span className="text-xl font-bold text-foreground">#{legend.rank}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{legend.flag}</span>
                          <Badge className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground">
                            {legend.title}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <img 
                          src={legend.image} 
                          alt={legend.name}
                          className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-primary/30"
                        />
                        <h3 className="font-bold text-xl text-foreground">{legend.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {legend.description}
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <a href={legend.article} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-primary-foreground">
                            <BookOpen className="h-4 w-4" />
                            Read Article
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current State & Future Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card border-border rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-foreground">
                    Indian CP: Current State & Future Vision
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Building India's first Legendary Grandmaster with NEXTFANG
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl text-destructive">Current Problems:</h3>
                  <div className="space-y-3 mt-4">
                    {[
                      { title: "Lack of Structured Learning", desc: "No clear roadmap from beginner to advanced levels" },
                      { title: "Limited Quality Resources", desc: "Scattered tutorials and inconsistent teaching methods" },
                      { title: "No Community Support", desc: "Students struggle alone without proper mentorship" },
                      { title: "Outdated Teaching Methods", desc: "Traditional approaches don't match modern CP requirements" }
                    ].map((problem, index) => (
                      <div key={problem.title} className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                        <div className="font-medium text-destructive">{problem.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{problem.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-green-400">NEXTFANG Solutions:</h3>
                  <div className="space-y-3 mt-4">
                    {[
                      { title: "Complete A2Z Roadmap", desc: "Structured learning path from basics to LGM level" },
                      { title: "Expert-Curated Content", desc: "High-quality resources created by CP champions" },
                      { title: "Active Community", desc: "24/7 support through Discord, Telegram, and mentorship" },
                      { title: "Modern AI-Powered Tools", desc: "Personalized learning with AI assistance and analytics" }
                    ].map((solution, index) => (
                      <div key={solution.title} className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="font-medium text-green-400">{solution.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{solution.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-card border-border rounded-xl p-8 backdrop-blur-sm">
            <CardContent>
              <div className="mb-6">
                <Trophy className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Ready to Become a CP Legend?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of aspiring competitive programmers on their journey to greatness. Master algorithms, solve challenging problems, and compete with the best!
              </p>
              <a href="https://www.tle-eliminators.com/cp-sheet" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-primary-foreground px-8 py-4">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Your CP Journey
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};