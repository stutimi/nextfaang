
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, AlertTriangle } from "lucide-react";

interface PerformanceAnalysisProps {
  data: any;
}

export const PerformanceAnalysis = ({ data }: PerformanceAnalysisProps) => {
  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Select a contest to view performance analysis
        </CardContent>
      </Card>
    );
  }

  const solveRate = (data.solvedProblems / data.totalProblems) * 100;
  const avgAttempts = data.problemBreakdown.reduce((sum: number, p: any) => sum + p.attempts, 0) / data.problemBreakdown.length;
  const avgSolveTime = data.problemBreakdown
    .filter((p: any) => p.solved)
    .reduce((sum: number, p: any) => sum + p.timeSpent, 0) / data.solvedProblems / 60; // in minutes

  const getPerformanceInsights = () => {
    const insights = [];
    
    if (solveRate >= 80) {
      insights.push({ type: "success", message: "Excellent solve rate! You're performing very well." });
    } else if (solveRate >= 60) {
      insights.push({ type: "warning", message: "Good solve rate, but there's room for improvement." });
    } else {
      insights.push({ type: "error", message: "Low solve rate. Focus on practicing fundamentals." });
    }

    if (avgAttempts > 3) {
      insights.push({ type: "warning", message: "High average attempts per problem. Consider reading problems more carefully." });
    }

    if (avgSolveTime > 45) {
      insights.push({ type: "warning", message: "Long average solve time. Practice implementation speed." });
    }

    if (data.struggledProblems.length > data.solvedProblems * 0.5) {
      insights.push({ type: "error", message: "Many struggled problems. Focus on understanding before coding." });
    }

    return insights;
  };

  const insights = getPerformanceInsights();

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Analysis of your performance in {data.contest.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Solve Rate</span>
                <span className="text-sm text-muted-foreground">{solveRate.toFixed(1)}%</span>
              </div>
              <Progress value={solveRate} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Attempts</span>
                <span className="text-sm text-muted-foreground">{avgAttempts.toFixed(1)}</span>
              </div>
              <Progress value={Math.min((avgAttempts / 5) * 100, 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Solve Time</span>
                <span className="text-sm text-muted-foreground">{avgSolveTime.toFixed(1)}m</span>
              </div>
              <Progress value={Math.min((avgSolveTime / 60) * 100, 100)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === "success"
                    ? "bg-green-50 border-green-500"
                    : insight.type === "warning"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-red-50 border-red-500"
                }`}
              >
                <p className="text-sm">{insight.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Struggled Problems Analysis */}
      {data.struggledProblems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Struggled Problems
            </CardTitle>
            <CardDescription>
              Problems that took multiple attempts or excessive time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.struggledProblems.map((problem: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">
                        {problem.problem.index}. {problem.problem.name}
                      </h3>
                      {problem.problem.rating && (
                        <p className="text-sm text-muted-foreground">
                          Rating: {problem.problem.rating}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {problem.reason}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Attempts: {problem.attempts}</span>
                    <span>Time: {Math.floor(problem.timeSpent / 60)}m</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {problem.problem.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tag Analysis */}
      {data.struggledTags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weak Topics
            </CardTitle>
            <CardDescription>
              Problem categories you struggled with most
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.struggledTags.slice(0, 5).map(([tag, count]: [string, number]) => (
                <div key={tag} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{tag.replace(/-/g, ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(count / Math.max(...data.struggledTags.map(([, c]: [string, number]) => c))) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
