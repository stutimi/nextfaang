import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Target, Trophy, Zap, ExternalLink, BookOpen } from "lucide-react";

export function ACMICPCResourcesSection() {
  return (
    <div className="mb-16" id="acm-icpc-resources">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Resources for ACM ICPC
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive roadmap from beginner to advanced level for ACM ICPC preparation
        </p>
      </div>

      {/* Beginners Level */}
      <Card className="mb-8 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <Code className="h-6 w-6" />
            Beginners Level (C++/Java)
          </CardTitle>
          <CardDescription>Foundation building with essential programming concepts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Practice Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary">Practice</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 border border-muted hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold">HackerRank 30 days of code</h5>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">Daily coding challenges to build programming fundamentals</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open('https://www.hackerrank.com/domains/tutorials/30-days-of-code', '_blank')}
                >
                  Start Practice
                </Button>
              </Card>
              <Card className="p-4 border border-muted hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold">HackerRank Language Proficiency</h5>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">Master programming language fundamentals</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open('https://www.hackerrank.com/dashboard', '_blank')}
                >
                  Visit Dashboard
                </Button>
              </Card>
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary">Courses</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "CodeWithHarry C++ course (Hindi)",
                  desc: "Comprehensive C++ tutorial series in Hindi",
                  url: "https://www.youtube.com/watch?v=j8nAHeVKL08&list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL"
                },
                {
                  title: "Pointers course by mycodeschool",
                  desc: "In-depth understanding of pointers and memory management",
                  url: "https://www.youtube.com/watch?v=h-HBipu_1P0&list=PL2_aWCzGMAwLZp6LMUKI3cc7pgGsasm2_"
                },
                {
                  title: "Harvard CS50",
                  desc: "Introduction to Computer Science from Harvard",
                  url: "https://www.youtube.com/user/cs50tv"
                },
                {
                  title: "Saurab Shukla C++ course (Hindi)",
                  desc: "Complete C++ programming course in Hindi",
                  url: "https://www.youtube.com/watch?v=Iuo9PpGE04Y&list=PLLYz8uHU480j37APNXBdPz7YzAi4XlQUF"
                },
                {
                  title: "FreeCodeCamp",
                  desc: "Free programming tutorials and courses",
                  url: "https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ"
                }
              ].map((course, idx) => (
                <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-sm">{course.title}</h5>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{course.desc}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => window.open(course.url, '_blank')}
                  >
                    Watch Course
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Extras Section */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-secondary">Extras</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Ted-ed riddles",
                  desc: "Logic puzzles to enhance problem-solving skills",
                  url: "https://www.youtube.com/watch?v=N5vJSNXPEwA&list=PLJicmE8fK0EiFRt1Hm5a_7SJFaikIFW30"
                },
                {
                  title: "Numberphile",
                  desc: "Mathematical concepts and number theory",
                  url: "https://www.youtube.com/results?search_query=numberphile"
                },
                {
                  title: "Computerphile",
                  desc: "Computer science concepts and algorithms",
                  url: "https://www.youtube.com/user/Computerphile"
                }
              ].map((extra, idx) => (
                <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold">{extra.title}</h5>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{extra.desc}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(extra.url, '_blank')}
                  >
                    Explore
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intermediate Level I */}
      <Card className="mb-8 border-secondary/20">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary flex items-center gap-2">
            <Target className="h-6 w-6" />
            Intermediate Level - I (Searching, Sorting & Basic DS/Algorithms)
          </CardTitle>
          <CardDescription>Building core algorithmic knowledge and data structures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "CLRS Algorithms",
                desc: "Classic algorithms textbook with comprehensive coverage"
              },
              {
                title: "mycodeschool DSA Course",
                desc: "Complete data structures and algorithms tutorial series",
                url: "https://www.youtube.com/user/mycodeschool"
              },
              {
                title: "HackerRank Data Structures",
                desc: "Practice problems for data structures implementation",
                url: "https://www.hackerrank.com/domains/data-structures"
              },
              {
                title: "Back to Back SWE",
                desc: "Interview-focused algorithm explanations",
                url: "https://www.youtube.com/channel/UCmJz2DV1a3yfgrR7GqRtUUA"
              },
              {
                title: "GeeksforGeeks Interview Problems",
                desc: "Curated interview questions from top companies",
                url: "https://practice.geeksforgeeks.org/explore/?company%5B%5D=Amazon&problemType=functional&page=1&sortBy=submissions"
              },
              {
                title: "STL from GeeksforGeeks",
                desc: "Standard Template Library comprehensive guide",
                url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/"
              }
            ].map((resource, idx) => (
              <Card key={idx} className="p-4 border border-muted hover:border-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-sm">{resource.title}</h5>
                  {resource.url && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                {resource.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    Learn Now
                  </Button>
                )}
              </Card>
            ))}
          </div>
          <Badge variant="secondary" className="w-fit">
            📚 Also study Mathematics up to class 12th (P&C, Probability, Matrices, etc.)
          </Badge>
        </CardContent>
      </Card>

      {/* Intermediate Level II */}
      <Card className="mb-8 border-accent/20">
        <CardHeader>
          <CardTitle className="text-2xl text-accent flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Intermediate Level - II (Advanced DS, Algorithms & Paradigms)
          </CardTitle>
          <CardDescription>Mastering advanced concepts and problem-solving paradigms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "MIT 6.006",
                desc: "Introduction to Algorithms from MIT",
                url: "https://www.youtube.com/watch?v=HtSuA80QTyo&list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb"
              },
              {
                title: "William Fiset Graph Theory",
                desc: "Comprehensive graph algorithms course",
                url: "https://www.youtube.com/watch?v=DgXR2OWQnLc&list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P"
              },
              {
                title: "AtCoder DP Educational",
                desc: "Dynamic programming contest problems",
                url: "https://atcoder.jp/contests/dp"
              },
              {
                title: "CodeNcode",
                desc: "Advanced algorithm tutorials and explanations",
                url: "https://www.youtube.com/channel/UC0zvY3yIBQTrSutsV-4yscQ"
              },
              {
                title: "Tushar Roy",
                desc: "Algorithm implementations and explanations",
                url: "https://www.youtube.com/user/tusharroy2525"
              },
              {
                title: "3Blue1Brown Math",
                desc: "Mathematical concepts with visual explanations",
                url: "https://youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw"
              },
              {
                title: "Tim Roughgarden Stanford",
                desc: "Stanford algorithms specialization course",
                url: "https://www.coursera.org/specializations/algorithms"
              },
              {
                title: "CodeChef DSA Learning",
                desc: "Structured DSA learning series",
                url: "https://www.codechef.com/LEARNDSA"
              },
              {
                title: "Rachit Jain DP",
                desc: "Dynamic programming from zero to hero",
                url: "https://www.youtube.com/watch?v=tb_14w_-mNw&list=PLfBJlB6T2eOtMXgK3FLUTawHjzpIEySHF"
              }
            ].map((resource, idx) => (
              <Card key={idx} className="p-4 border border-muted hover:border-accent/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-sm">{resource.title}</h5>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  Study Now
                </Button>
              </Card>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">📖 Codeforces blogs for additional topics</Badge>
            <Badge variant="secondary">🔗 Mathologer for advanced mathematics</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Level */}
      <Card className="border-primary/20 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Advanced Level
          </CardTitle>
          <CardDescription>Master-level resources for competitive programming excellence</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Codeforces Blogs Collection",
                desc: "Advanced topics and problem-solving techniques",
                url: "https://codeforces.com/blog/entry/57282"
              },
              {
                title: "Gaurav Sen DSA",
                desc: "System design and advanced data structures",
                url: "https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw"
              },
              {
                title: "Princeton Algorithms",
                desc: "Robert Sedgewick's comprehensive algorithms course",
                url: "https://www.coursera.org/learn/algorithms-part1"
              },
              {
                title: "SecondThread",
                desc: "Competitive programming tutorials and live streams",
                url: "https://www.youtube.com/channel/UCXbCohpE9IoVQUD2Ifg1d1g"
              },
              {
                title: "Errichto",
                desc: "Advanced competitive programming content",
                url: "https://www.youtube.com/channel/UCBr_Fu6q9iHYQCh13jmpbrg"
              },
              {
                title: "Number Theory by David M. Burton",
                desc: "Advanced mathematical concepts for competitive programming"
              }
            ].map((resource, idx) => (
              <Card key={idx} className="p-4 border border-muted hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-sm">{resource.title}</h5>
                  {resource.url && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{resource.desc}</p>
                {resource.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    Master Now
                  </Button>
                )}
              </Card>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">📚 Introduction to Algorithms (CLRS)</Badge>
            <Badge variant="secondary">🎯 Computational Matters (for reference)</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}