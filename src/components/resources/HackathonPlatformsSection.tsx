import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, Trophy, Zap, Users } from "lucide-react";

export function HackathonPlatformsSection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Top Hackathon Platforms
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Participate in hackathons, win prizes, and land your dream job through these premier platforms
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Unstop */}
        <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Unstop</CardTitle>
                <Badge variant="secondary">Platform #1</Badge>
              </div>
            </div>
            <CardDescription className="text-base">
              India's largest platform for competitions, hackathons, and hiring challenges
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">Competitions</Badge>
                <Badge variant="outline" className="text-sm">Hackathons</Badge>
                <Badge variant="outline" className="text-sm">Hiring Challenges</Badge>
                <Badge variant="outline" className="text-sm">Scholarships</Badge>
              </div>

              <a
                href="https://unstop.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  Explore Unstop
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* DoraHacks */}
        <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">DoraHacks</CardTitle>
                <Badge variant="secondary">Platform #2</Badge>
              </div>
            </div>
            <CardDescription className="text-base">
              Global hackathon organizer and developer platform for Web3 and beyond
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">Web3 Hackathons</Badge>
                <Badge variant="outline" className="text-sm">Global Events</Badge>
                <Badge variant="outline" className="text-sm">Developer Grants</Badge>
                <Badge variant="outline" className="text-sm">Community</Badge>
              </div>

              <a
                href="https://dorahacks.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  Explore DoraHacks
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Hack2Skill */}
        <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Hack2Skill</CardTitle>
                <Badge variant="secondary">Platform #3</Badge>
              </div>
            </div>
            <CardDescription className="text-base">
              Premium hackathon platform with industry partnerships and cash prizes
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">Industry Partners</Badge>
                <Badge variant="outline" className="text-sm">Cash Prizes</Badge>
                <Badge variant="outline" className="text-sm">Skill Assessment</Badge>
                <Badge variant="outline" className="text-sm">Job Opportunities</Badge>
              </div>

              <a
                href="https://hack2skill.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  Explore Hack2Skill
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Devfolio */}
        <Card className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Devfolio</CardTitle>
                <Badge variant="secondary">Platform #4</Badge>
              </div>
            </div>
            <CardDescription className="text-base">
              Developer-focused platform for hackathons, projects, and tech events
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">Developer Community</Badge>
                <Badge variant="outline" className="text-sm">Project Showcase</Badge>
                <Badge variant="outline" className="text-sm">Tech Events</Badge>
                <Badge variant="outline" className="text-sm">Open Source</Badge>
              </div>

              <a
                href="https://devfolio.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90">
                  <ExternalLink className="h-4 w-4" />
                  Explore Devfolio
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
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
    </section>
  );
}