
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play, Star, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const resumeTutorials = [
  {
    title: "Perfect Resume for Tech Jobs",
    url: "https://youtu.be/ZcuziWFfpQY?si=F-a7QiIuiYzJisUE",
    description: "Complete guide to creating ATS-friendly tech resumes"
  },
  {
    title: "Resume Writing Masterclass",
    url: "https://youtu.be/y3R9e2L8I9E?si=8hiMcvwas7ZtRd_a",
    description: "Advanced resume writing techniques for software engineers"
  },
  {
    title: "FANG Resume Secrets",
    url: "https://youtu.be/F4zEkiutI1Q?si=l1rDhRldBIh6DHZY",
    description: "How to craft resumes that get you interviews at top companies"
  },
  {
    title: "Resume Review & Tips",
    url: "https://youtu.be/qhocVNbvNHs?si=bqDr7ieoDtZdbhQs",
    description: "Common resume mistakes and how to avoid them"
  }
];

export default function ResumeTips() {
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
              Diamond Resume Tips
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of resume writing with these comprehensive tutorials and land your dream job at FANG companies
            </p>
          </div>
        </div>

        {/* Resume Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resumeTutorials.map((tutorial, index) => (
            <Card key={tutorial.title} className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Video #{index + 1}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-accent" />
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <CardDescription className="text-sm">
                    {tutorial.description}
                  </CardDescription>
                  
                  <a 
                    href={tutorial.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                      <ExternalLink className="h-4 w-4" />
                      Watch Tutorial
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 p-8">
            <CardContent className="pt-0">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Create Your Perfect Resume?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These tutorials will help you craft ATS-friendly resumes that stand out to recruiters and land you interviews at top tech companies.
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                  Start Building Your Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
