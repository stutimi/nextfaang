
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play, BookOpen, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const dsaCourses = [
  {
    title: "Striver's A2Z DSA Sheet",
    image: "https://i.postimg.cc/zXK8tB9D/Screenshot-2025-06-10-134124.png",
    url: "https://youtu.be/0bHoB32fuj0?si=7uyvYOtUEVVzckRi",
    description: "Complete DSA course covering all topics from basics to advanced",
    difficulty: "Beginner to Advanced"
  },
  {
    title: "Love Babbar Placement Series",
    image: "https://i.postimg.cc/fyMJzd4K/Screenshot-2025-06-10-133619.png",
    url: "https://youtube.com/playlist?list=PL4PCksYQGLJM2mKe1n8LnFgcm3FRLhxZ9&si=ZEj1jN-onTPlSXRP",
    description: "Comprehensive placement preparation course with DSA focus",
    difficulty: "Intermediate"
  },
  {
    title: "Recursion & Backtracking",
    image: "https://i.postimg.cc/NfSBbXNz/Screenshot-2025-06-10-133611.png",
    url: "https://youtu.be/WQoB2z67hvY?si=3n00Hm7zvKQML5BF",
    description: "Master recursion and backtracking with practical examples",
    difficulty: "Intermediate"
  },
  {
    title: "Aditya Verma DP Playlist",
    image: "https://i.postimg.cc/x8WjkNhh/Screenshot-2025-06-10-134523.png",
    url: "https://youtu.be/nqowUJzG-iM?si=gRFcNgcwCtRTjIJz",
    description: "Complete dynamic programming course with pattern-based approach",
    difficulty: "Advanced"
  }
];

export default function DSAMastery() {
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
              DSA Mastery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master Data Structures & Algorithms with these structured courses and crack any FANG interview with confidence
            </p>
          </div>
        </div>

        {/* Motivation Section */}
        <Card className="mb-8 card-3d border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Why These Courses Will Transform Your Coding Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">
              If you use these structured courses consistently, you can easily crack FANG companies' DSA rounds and remove the fear of Data Structures and Algorithms forever. These curated resources have helped thousands of students land their dream jobs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">FANG Ready</Badge>
              <Badge variant="secondary">Interview Focused</Badge>
              <Badge variant="secondary">Fear Removal</Badge>
              <Badge variant="secondary">Structured Learning</Badge>
            </div>
          </CardContent>
        </Card>

        {/* DSA Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {dsaCourses.map((course, index) => (
            <Card key={course.title} className="card-3d hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Course #{index + 1}
                  </Badge>
                  <Badge variant="outline">{course.difficulty}</Badge>
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  {course.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                  
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                      <Play className="h-4 w-4" />
                      Start Learning
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
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Master DSA?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These courses will transform your problem-solving skills and prepare you for any technical interview. Start your journey to becoming a DSA expert today!
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent">
                  Begin Your DSA Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
