
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Trophy, Zap, Code } from "lucide-react";
import { Link } from "react-router-dom";

const hackathonPlatforms = [
  {
    title: "Unstop",
    image: "https://i.postimg.cc/RV7q3XCT/Screenshot-2025-06-10-135210.png",
    url: "https://unstop.com/internship-portal",
    description: "India's largest platform for hackathons, internships, and competitions",
    features: ["PPI Opportunities", "Live Contests", "Skill Assessments"]
  },
  {
    title: "Hack2skill",
    image: "https://i.postimg.cc/TYffsGGr/Screenshot-2025-06-10-135454.png",
    url: "https://hack2skill.com/#flagshipevents",
    description: "Premium hackathon platform with industry partnerships",
    features: ["Industry Partners", "Cash Prizes", "Job Opportunities"]
  },
  {
    title: "Devfolio",
    image: "https://i.postimg.cc/15HvRW5N/devfolio-placeholder.png",
    url: "https://devfolio.co/discover",
    description: "Developer-focused platform for hackathons and tech events",
    features: ["Developer Community", "Open Source", "Tech Focus"]
  }
];

export default function HackathonGuide() {
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
              Hackathon Mastery Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Win hackathons, secure PPIs, and land your dream internships with our comprehensive platform guide
            </p>
          </div>
        </div>

        {/* Why Hackathons Section */}
        <Card className="mb-8 card-3d border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Why Hackathons Are Your Gateway to Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">
              Hackathons are not just coding competitions - they're your direct path to Pre-Placement Interviews (PPIs), internships, and full-time opportunities at top companies. Many students have secured their dream jobs through hackathon wins.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">PPI Opportunities</Badge>
              <Badge variant="secondary">Direct Hiring</Badge>
              <Badge variant="secondary">Skill Building</Badge>
              <Badge variant="secondary">Network Growth</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hackathonPlatforms.map((platform, index) => (
            <Card key={platform.title} className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Platform #{index + 1}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-accent" />
                    <CardTitle className="text-lg">{platform.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={platform.image} 
                    alt={`${platform.title} platform`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <CardDescription className="text-sm">
                    {platform.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
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
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                      <ExternalLink className="h-4 w-4" />
                      Explore Platform
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Tips */}
        <Card className="mb-8 card-3d border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-2xl">How to Stand Out in Hackathons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Before the Hackathon</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Form a diverse team with complementary skills</li>
                  <li>• Research the problem statement thoroughly</li>
                  <li>• Prepare your development environment</li>
                  <li>• Plan your project architecture</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">During the Hackathon</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Focus on a working MVP first</li>
                  <li>• Document your progress and decisions</li>
                  <li>• Practice your pitch presentation</li>
                  <li>• Network with judges and sponsors</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 p-8">
            <CardContent className="pt-0">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Win Your First Hackathon?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of students who have leveraged hackathons to secure PPIs and land their dream jobs. Your next opportunity is just one hackathon away!
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                  Start Your Hackathon Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
