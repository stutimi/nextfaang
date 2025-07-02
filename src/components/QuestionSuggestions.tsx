
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Target, BookOpen, TrendingUp } from "lucide-react";

interface QuestionSuggestionsProps {
  weakAreas?: string[];
  userRating?: number;
}

export const QuestionSuggestions = ({ weakAreas = [], userRating = 1200 }: QuestionSuggestionsProps) => {
  const getSuggestedProblems = () => {
    const problems = [
      {
        name: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        rating: 800,
        link: "https://codeforces.com/problemset/problem/1/A",
        reason: "Foundation building for arrays"
      },
      {
        name: "Binary Search",
        difficulty: "Medium",
        tags: ["Binary Search", "Implementation"],
        rating: 1200,
        link: "https://codeforces.com/problemset/problem/778/A",
        reason: "Essential binary search practice"
      },
      {
        name: "DFS Tree Traversal",
        difficulty: "Medium",
        tags: ["Trees", "DFS"],
        rating: 1400,
        link: "https://codeforces.com/problemset/problem/580/C",
        reason: "Tree algorithms foundation"
      },
      {
        name: "Dynamic Programming",
        difficulty: "Hard",
        tags: ["DP", "Mathematics"],
        rating: 1600,
        link: "https://codeforces.com/problemset/problem/706/C",
        reason: "DP pattern recognition"
      }
    ];

    // Filter problems based on weak areas and user rating
    return problems.filter(problem => {
      const hasWeakTag = weakAreas.some(area => 
        problem.tags.some(tag => tag.toLowerCase().includes(area.toLowerCase()))
      );
      const appropriateRating = problem.rating >= userRating - 200 && problem.rating <= userRating + 400;
      return hasWeakTag || appropriateRating;
    }).slice(0, 6);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-yellow-500";
      case "Hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const suggestedProblems = getSuggestedProblems();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Recommended Practice Problems
        </CardTitle>
        <CardDescription>
          Based on your weak areas and current rating level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {suggestedProblems.map((problem, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{problem.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{problem.reason}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getDifficultyColor(problem.difficulty)} text-white`}>
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline">Rating: {problem.rating}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <a 
                  href={problem.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-4"
                >
                  <Button size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Solve
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Practice Strategy</h4>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Start with easier problems to build confidence</li>
            <li>• Focus on your identified weak areas</li>
            <li>• Gradually increase difficulty as you improve</li>
            <li>• Review editorial solutions for unsolved problems</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
