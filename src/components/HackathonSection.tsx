import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, ExternalLink, Star, Zap } from "lucide-react";

export const HackathonSection = () => {
  const hackathons = [
    {
      title: "Smart India Hackathon 2024",
      description: "India's biggest hackathon for students with government problem statements",
      platform: "MyGov",
      prizeMoney: "₹1,00,000",
      participants: "10,000+",
      deadline: "March 2024",
      status: "Open",
      link: "https://sih.gov.in/"
    },
    {
      title: "HackWithInfy 2024", 
      description: "Infosys global hackathon for innovative tech solutions",
      platform: "Infosys",
      prizeMoney: "₹8,00,000",
      participants: "50,000+", 
      deadline: "April 2024",
      status: "Open",
      link: "https://www.hackerearth.com/challenges/competitive/infosys-hackwithinfy/"
    },
    {
      title: "Google Solution Challenge",
      description: "Build solutions for UN Sustainable Development Goals using Google technologies",
      platform: "Google",
      prizeMoney: "$3,000",
      participants: "Global",
      deadline: "March 2024",
      status: "Open", 
      link: "https://developers.google.com/community/gdsc-solution-challenge"
    }
  ];

  return (
    <section id="hackathons" className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              🚀 Hackathon Hub
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and participate in the best hackathons. Build, compete, and win amazing prizes while solving real-world problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {hackathons.map((hackathon, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-200 dark:hover:border-orange-800">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={`${hackathon.status === 'Open' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {hackathon.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                  {hackathon.title}
                </CardTitle>
                <CardDescription>
                  {hackathon.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold">{hackathon.prizeMoney}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{hackathon.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span>{hackathon.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span>{hackathon.platform}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  onClick={() => window.open(hackathon.link, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hackathon Tips */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-6 text-center">💡 Hackathon Tips</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span>Start with problem understanding - read requirements carefully</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span>Form diverse teams with complementary skills</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span>Focus on MVP first, then add features</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                  <span>Prepare a compelling demo and presentation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 dark:border-orange-800">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-6 text-center">🏆 Past Winners</h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="font-semibold">EcoTrack - SIH 2023 Winner</div>
                  <div className="text-muted-foreground">Environment monitoring solution</div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="font-semibold">HealthAI - Google Solution Challenge</div>
                  <div className="text-muted-foreground">AI-powered health diagnosis</div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="font-semibold">CropSense - HackWithInfy</div>
                  <div className="text-muted-foreground">Smart agriculture platform</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};