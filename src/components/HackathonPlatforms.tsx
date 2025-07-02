
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy, Zap, Code, Users } from "lucide-react";

const platforms = [
  {
    name: "Unstop",
    url: "https://unstop.com/",
    description: "India's largest platform for competitions, hackathons, and hiring challenges",
    features: ["Competitions", "Hackathons", "Hiring Challenges", "Scholarships"],
    color: "from-blue-500 to-purple-600",
    icon: Trophy
  },
  {
    name: "DoraHacks",
    url: "https://dorahacks.io/",
    description: "Global hackathon organizer and developer platform for Web3 and beyond",
    features: ["Web3 Hackathons", "Global Events", "Developer Grants", "Community"],
    color: "from-green-500 to-blue-500",
    icon: Code
  },
  {
    name: "Hack2Skill",
    url: "https://hack2skill.com/",
    description: "Premium hackathon platform with industry partnerships and cash prizes",
    features: ["Industry Partners", "Cash Prizes", "Skill Assessment", "Job Opportunities"],
    color: "from-purple-500 to-pink-500",
    icon: Zap
  },
  {
    name: "Devfolio",
    url: "https://devfolio.co/",
    description: "Developer-focused platform for hackathons, projects, and tech events",
    features: ["Developer Community", "Project Showcase", "Tech Events", "Open Source"],
    color: "from-orange-500 to-red-500",
    icon: Users
  }
];

export const HackathonPlatforms = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Top Hackathon Platforms
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Participate in hackathons, win prizes, and land your dream job through these premier platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <Card key={platform.name} className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${platform.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{platform.name}</CardTitle>
                      <Badge variant="secondary">Platform #{index + 1}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <a 
                      href={platform.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className={`w-full gap-2 bg-gradient-to-r ${platform.color} hover:opacity-90`}>
                        <ExternalLink className="h-4 w-4" />
                        Explore {platform.name}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
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
      </div>
    </section>
  );
};
