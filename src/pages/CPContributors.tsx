
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const contributors = [
  {
    name: "Dominater069",
    profile: "https://codeforces.com/profile/Dominater069",
    image: "https://i.postimg.cc/tRzYJsmZ/Screenshot-2025-06-10-123051.png",
    description: "Expert competitive programmer with strong problem-solving skills"
  },
  {
    name: "Qingyu",
    profile: "https://codeforces.com/profile/Qingyu",
    image: "https://i.postimg.cc/ZqDx1f6m/Screenshot-2025-06-10-122923.png",
    description: "Legendary Grandmaster with exceptional algorithmic knowledge"
  },
  {
    name: "adamant",
    profile: "https://codeforces.com/profile/adamant",
    image: "https://i.postimg.cc/SKtny3ZZ/Screenshot-2025-06-10-122544.png",
    description: "International Grandmaster and tutorial writer"
  },
  {
    name: "cry",
    profile: "https://codeforces.com/profile/cry",
    image: "https://i.postimg.cc/sxM9j59W/Screenshot-2025-06-10-122747.png",
    description: "Grandmaster with consistent high-level performance"
  },
  {
    name: "-is-this-fft-",
    profile: "https://codeforces.com/profile/-is-this-fft-",
    image: "https://i.postimg.cc/25jWj4C5/Screenshot-2025-06-10-122431.png",
    description: "International Grandmaster known for advanced techniques"
  },
  {
    name: "atcoder_official",
    profile: "https://codeforces.com/profile/atcoder_official",
    image: "https://i.postimg.cc/CKJKcXTh/Screenshot-2025-06-10-122241.png",
    description: "Official AtCoder account providing quality contests"
  },
  {
    name: "luogu_official",
    profile: "https://codeforces.com/profile/luogu_official",
    image: "https://i.postimg.cc/25x1P3vf/Screenshot-2025-06-10-122117.png",
    description: "Official Luogu platform account"
  },
  {
    name: "errorgorn",
    profile: "https://codeforces.com/profile/errorgorn",
    image: "https://i.postimg.cc/Kjj37F1h/Screenshot-2025-06-10-121930.png",
    description: "Legendary Grandmaster and contest setter"
  },
  {
    name: "djm03178",
    profile: "https://codeforces.com/profile/djm03178",
    image: "https://i.postimg.cc/65BmXmDJ/Screenshot-2025-06-10-121759.png",
    description: "International Grandmaster with strong contest record"
  },
  {
    name: "chromate00",
    profile: "https://codeforces.com/profile/chromate00",
    image: "https://i.postimg.cc/HnbDh8cw/Screenshot-2025-06-10-121219.png",
    description: "Master-level competitive programmer"
  }
];

export default function CPContributors() {
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
            <img 
              src="https://i.postimg.cc/cJcWsnXX/Screenshot-2025-06-10-103552.png" 
              alt="Top Contributors" 
              className="mx-auto rounded-lg shadow-lg mb-6 max-w-full h-auto"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Top 10 Codeforces Contributors
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the legendary programmers who are shaping the competitive programming community
            </p>
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((contributor, index) => (
            <Card key={contributor.name} className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    #{index + 1}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <CardTitle className="text-lg">{contributor.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={contributor.image} 
                    alt={`${contributor.name} profile`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <CardDescription className="text-sm">
                    {contributor.description}
                  </CardDescription>
                  
                  <a 
                    href={contributor.profile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                      <ExternalLink className="h-4 w-4" />
                      View Profile
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 p-8">
            <CardContent className="pt-0">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Join the Elite?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These contributors show what's possible with dedication and practice. Start your competitive programming journey today and become the next Indian legend!
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                  Start Your Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
