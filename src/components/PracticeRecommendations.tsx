
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Target, BookOpen, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PracticeRecommendationsProps {
  data: any;
}

interface Problem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  rating?: number;
  tags: string[];
}

export const PracticeRecommendations = ({ data }: PracticeRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (data && data.struggledTags.length > 0) {
      fetchRecommendations();
    }
  }, [data]);

  const fetchRecommendations = async () => {
    if (!data) return;
    
    setIsLoading(true);
    try {
      // Get problems from Codeforces problemset
      const response = await fetch("https://codeforces.com/api/problemset.problems");
      const problemsData = await response.json();
      
      if (problemsData.status !== "OK") {
        throw new Error("Failed to fetch problems");
      }

      const allProblems = problemsData.result.problems;
      
      // Filter recommendations based on struggled tags
      const struggledTagsList = data.struggledTags.map(([tag]: [string, number]) => tag);
      const recommendedProblems = [];

      // For each struggled tag, find easier problems
      for (const [tag] of data.struggledTags.slice(0, 3)) {
        const tagProblems = allProblems
          .filter((problem: Problem) => 
            problem.tags.includes(tag) && 
            problem.rating && 
            problem.rating >= 800 && 
            problem.rating <= 1600 // Easier problems
          )
          .sort((a: Problem, b: Problem) => (a.rating || 0) - (b.rating || 0))
          .slice(0, 5);
        
        recommendedProblems.push(...tagProblems);
      }

      // Remove duplicates and limit to 15 problems
      const uniqueProblems = Array.from(
        new Map(recommendedProblems.map(p => [`${p.contestId}-${p.index}`, p])).values()
      ).slice(0, 15);

      setRecommendations(uniqueProblems);
      
      toast({
        title: "Recommendations Generated!",
        description: `Found ${uniqueProblems.length} practice problems for you`,
      });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch practice recommendations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProblemUrl = (problem: Problem) => {
    return `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return "bg-gray-500";
    if (rating < 1200) return "bg-gray-500";
    if (rating < 1400) return "bg-green-500";
    if (rating < 1600) return "bg-cyan-500";
    if (rating < 1900) return "bg-blue-500";
    if (rating < 2100) return "bg-violet-500";
    return "bg-orange-500";
  };

  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Complete a contest analysis to get practice recommendations
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recommendation Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommendation Strategy
          </CardTitle>
          <CardDescription>
            Based on your contest performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {data.struggledTags.slice(0, 5).map(([tag, count]: [string, number]) => (
                  <Badge key={tag} variant="outline" className="text-blue-700 border-blue-300">
                    {tag} ({count} problems)
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Difficulty Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  Start with easier problems (800-1200 rating) in your weak topics to build confidence, 
                  then gradually increase difficulty.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Practice Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Solve 2-3 problems daily from your weak topics. Focus on understanding 
                  the solution approach before implementing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practice Problems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Practice Problems
          </CardTitle>
          <CardDescription>
            Problems selected based on your struggled topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading recommendations...</div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((problem, index) => (
                <div key={`${problem.contestId}-${problem.index}`} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">
                        {problem.index}. {problem.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Contest {problem.contestId}</span>
                        {problem.rating && (
                          <Badge className={`text-white text-xs ${getRatingColor(problem.rating)}`}>
                            {problem.rating}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(getProblemUrl(problem), '_blank')}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Solve
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={data.struggledTags.some(([struggledTag]: [string, number]) => struggledTag === tag) ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => window.open("https://codeforces.com/problemset", '_blank')}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse More Problems
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recommendations available. Complete a contest analysis first.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Read Editorials</p>
                <p className="text-sm text-muted-foreground">
                  After solving or attempting a problem, always read the editorial to learn optimal approaches.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Practice Implementation</p>
                <p className="text-sm text-muted-foreground">
                  Focus on clean, efficient code. Time yourself to improve implementation speed.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium">Learn Patterns</p>
                <p className="text-sm text-muted-foreground">
                  Identify common patterns in your struggled topics and practice similar problems.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
