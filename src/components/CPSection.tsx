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
    <section id="cp" className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 overflow-hidden">
      {/* Background elements matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
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
            <span className="block text-gray-100">Journey to</span>
            <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Legendary Grandmaster
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
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
          <Card className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-primary to-blue-500 rounded-lg">
                  <History className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-gray-100">
                    Origins & Evolution of Competitive Programming
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    From 1970s ACM ICPC to modern global CP platforms
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {evolutionTimeline.map((era, index) => (
                  <motion.div
                    key={era.period}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${era.gradient} border border-gray-800 h-full`}>
                      <div className="font-bold text-lg text-primary mb-2">🧬 {era.period}</div>
                      <div className="font-semibold text-gray-100 mb-2">{era.title}</div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {era.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top CP Legends Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Star className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-gray-100">
                    Top Competitive Programming Legends
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    The greatest competitive programmers who shaped the sport
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cpLegends.map((legend, index) => (
                  <motion.div
                    key={legend.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`p-6 rounded-xl bg-gradient-to-br ${legend.gradient} border border-gray-800 h-full`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-400" />
                          <span className="text-xl font-bold text-gray-100">#{legend.rank}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{legend.flag}</span>
                          <Badge className="bg-gradient-to-r from-primary to-blue-500 text-gray-900">
                            {legend.title}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <img 
                          src={legend.image} 
                          alt={legend.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3 className="font-bold text-xl text-gray-100">{legend.name}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {legend.description}
                        </p>
                        
                        <a href={legend.article} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-gray-900">
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

        {/* Why CP Awareness section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg">
                  <Award className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <CardTitle className="text-2xl md:text-3xl text-gray-100">
                    Why CP Awareness is Missing in India
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Understanding the gap and our mission to create India's first LGM
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-red-400">Current Problems:</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Lack of Structured Guidance", desc: "No clear roadmap from 0 to LGM for Indian students" },
                      { title: "College Gap", desc: "Limited exposure and resources compared to top institutes" },
                      { title: "Scattered Resources", desc: "Information spread across multiple platforms" },
                      { title: "No Indian LGM Yet", desc: "India hasn't produced a Legendary Grandmaster on Codeforces" }
                    ].map((problem, index) => (
                      <div key={problem.title} className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="font-medium text-red-400">{problem.title}</div>
                        <div className="text-sm text-gray-400 mt-1">{problem.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-green-400">NEXTFANG Solutions:</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Centralized Learning Hub", desc: "All resources, roadmaps, and tools in one place" },
                      { title: "All College Focus", desc: "Specifically designed for all college students" },
                      { title: "AI-Powered Guidance", desc: "Personalized roadmaps and problem recommendations" },
                      { title: "LGM Mission", desc: "Dedicated mission to create India's first LGM" }
                    ].map((solution, index) => (
                      <div key={solution.title} className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="font-medium text-green-400">{solution.title}</div>
                        <div className="text-sm text-gray-400 mt-1">{solution.desc}</div>
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
          <Card className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
            <CardContent>
              <div className="mb-6">
                <Trophy className="h-12 w-12 text-primary mx-auto" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                Ready to Become a CP Legend?
              </h3>
              <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of aspiring competitive programmers on their journey to greatness. Master algorithms, solve challenging problems, and compete with the best!
              </p>
              <a href="https://www.tle-eliminators.com/cp-sheet" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-gray-900 px-8 py-4">
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