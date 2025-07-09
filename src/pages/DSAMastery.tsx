import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play, BookOpen, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const dsaCourses = [
  {
    title: "Striver's A2Z DSA Sheet",
    image: "https://i.postimg.cc/zXK8tB9D/Screenshot-2025-06-10-134124.png",
    url: "https://youtu.be/0bHoB32fuj0?si=7uyvYOtUEVVzckRi",
    description: "Complete DSA course covering all topics from basics to advanced",
    difficulty: "Beginner to Advanced",
    rating: "4.9/5"
  },
  {
    title: "Love Babbar Placement Series",
    image: "https://i.postimg.cc/fyMJzd4K/Screenshot-2025-06-10-133619.png",
    url: "https://youtube.com/playlist?list=PL4PCksYQGLJM2mKe1n8LnFgcm3FRLhxZ9&si=ZEj1jN-onTPlSXRP",
    description: "Comprehensive placement preparation course with DSA focus",
    difficulty: "Intermediate",
    rating: "4.8/5"
  },
  {
    title: "Recursion & Backtracking",
    image: "https://i.postimg.cc/NfSBbXNz/Screenshot-2025-06-10-133611.png",
    url: "https://youtu.be/WQoB2z67hvY?si=3n00Hm7zvKQML5BF",
    description: "Master recursion and backtracking with practical examples",
    difficulty: "Intermediate",
    rating: "4.7/5"
  },
  {
    title: "Aditya Verma DP Playlist",
    image: "https://i.postimg.cc/x8WjkNhh/Screenshot-2025-06-10-134523.png",
    url: "https://youtu.be/nqowUJzG-iM?si=gRFcNgcwCtRTjIJz",
    description: "Complete dynamic programming course with pattern-based approach",
    difficulty: "Advanced",
    rating: "4.9/5"
  }
];

export default function DSAMastery() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 mb-6 hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DSA Mastery
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master Data Structures & Algorithms with these structured courses and crack any FANG interview with confidence
            </p>
          </div>
        </div>

        {/* Motivation Section */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              <span>Why These Courses Will Transform Your Coding Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                If you use these structured courses consistently, you can easily crack FANG companies' DSA rounds and remove the fear of Data Structures and Algorithms forever. These curated resources have helped thousands of students land their dream jobs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Star className="h-3 w-3 mr-1" />
                  FANG Ready
                </Badge>
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                  <Star className="h-3 w-3 mr-1" />
                  Interview Focused
                </Badge>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                  <Star className="h-3 w-3 mr-1" />
                  Fear Removal
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Star className="h-3 w-3 mr-1" />
                  Structured Learning
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DSA Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {dsaCourses.map((course, index) => (
            <Card 
              key={course.title} 
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader className="text-center">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white">
                    Course #{index + 1}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </Badge>
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {course.difficulty}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg border border-primary/20"
                />
                
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>
                
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20 p-8 hover:shadow-lg transition-all">
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full w-fit">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Master DSA?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                These courses will transform your problem-solving skills and prepare you for any technical interview. Start your journey to becoming a DSA expert today!
              </p>
              <Link to="/">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-md"
                >
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