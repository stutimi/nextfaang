
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Search, TrendingUp, Target, AlertTriangle, RefreshCw } from "lucide-react";

interface Submission {
  id: number;
  contestId: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    tags: string[];
    rating?: number;
  };
  verdict: string;
  programmingLanguage: string;
  creationTimeSeconds: number;
}

interface AnalysisResult {
  handle: string;
  totalSubmissions: number;
  acceptedSubmissions: number;
  accuracy: number;
  tagAnalysis: Array<{ tag: string; total: number; accepted: number; accuracy: number }>;
  verdictAnalysis: Array<{ verdict: string; count: number }>;
  ratingAnalysis: Array<{ rating: string; total: number; accepted: number }>;
  languageAnalysis: Array<{ language: string; count: number }>;
  recentActivity: Array<{ date: string; submissions: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const EnhancedPerformanceAnalyzer = () => {
  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzePerformance = async () => {
    if (!handle.trim()) return;

    setIsLoading(true);
    try {
      // Fetch user submissions from Codeforces API
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
      const data = await response.json();

      if (data.status !== "OK") {
        throw new Error(data.comment || "Failed to fetch user data");
      }

      const submissions: Submission[] = data.result;
      const analysis = processSubmissions(submissions, handle);
      setAnalysisResult(analysis);

      toast({
        title: "Analysis Complete!",
        description: `Analyzed ${submissions.length} submissions for ${handle}`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze performance",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processSubmissions = (submissions: Submission[], handle: string): AnalysisResult => {
    const tagMap = new Map<string, { total: number; accepted: number }>();
    const verdictMap = new Map<string, number>();
    const ratingMap = new Map<string, { total: number; accepted: number }>();
    const languageMap = new Map<string, number>();
    const activityMap = new Map<string, number>();

    let acceptedCount = 0;

    submissions.forEach(submission => {
      // Verdict analysis
      const verdict = submission.verdict;
      verdictMap.set(verdict, (verdictMap.get(verdict) || 0) + 1);
      
      if (verdict === "OK") {
        acceptedCount++;
      }

      // Tag analysis
      submission.problem.tags.forEach(tag => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { total: 0, accepted: 0 });
        }
        const tagData = tagMap.get(tag)!;
        tagData.total++;
        if (verdict === "OK") {
          tagData.accepted++;
        }
      });

      // Rating analysis
      if (submission.problem.rating) {
        const ratingRange = getRatingRange(submission.problem.rating);
        if (!ratingMap.has(ratingRange)) {
          ratingMap.set(ratingRange, { total: 0, accepted: 0 });
        }
        const ratingData = ratingMap.get(ratingRange)!;
        ratingData.total++;
        if (verdict === "OK") {
          ratingData.accepted++;
        }
      }

      // Language analysis
      const lang = submission.programmingLanguage;
      languageMap.set(lang, (languageMap.get(lang) || 0) + 1);

      // Activity analysis
      const date = new Date(submission.creationTimeSeconds * 1000).toISOString().split('T')[0];
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    });

    // Convert maps to arrays and sort
    const tagAnalysis = Array.from(tagMap.entries())
      .map(([tag, data]) => ({
        tag,
        total: data.total,
        accepted: data.accepted,
        accuracy: data.total > 0 ? (data.accepted / data.total) * 100 : 0
      }))
      .sort((a, b) => b.total - a.total);

    const verdictAnalysis = Array.from(verdictMap.entries())
      .map(([verdict, count]) => ({ verdict, count }))
      .sort((a, b) => b.count - a.count);

    const ratingAnalysis = Array.from(ratingMap.entries())
      .map(([rating, data]) => ({
        rating,
        total: data.total,
        accepted: data.accepted
      }))
      .sort((a, b) => parseInt(a.rating.split('-')[0]) - parseInt(b.rating.split('-')[0]));

    const languageAnalysis = Array.from(languageMap.entries())
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    const recentActivity = Array.from(activityMap.entries())
      .map(([date, submissions]) => ({ date, submissions }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-30); // Last 30 days

    return {
      handle,
      totalSubmissions: submissions.length,
      acceptedSubmissions: acceptedCount,
      accuracy: submissions.length > 0 ? (acceptedCount / submissions.length) * 100 : 0,
      tagAnalysis,
      verdictAnalysis,
      ratingAnalysis,
      languageAnalysis,
      recentActivity
    };
  };

  const getRatingRange = (rating: number): string => {
    if (rating < 1000) return "800-999";
    if (rating < 1200) return "1000-1199";
    if (rating < 1400) return "1200-1399";
    if (rating < 1600) return "1400-1599";
    if (rating < 1800) return "1600-1799";
    if (rating < 2000) return "1800-1999";
    if (rating < 2200) return "2000-2199";
    if (rating < 2400) return "2200-2399";
    return "2400+";
  };

  const getWeakAreas = () => {
    if (!analysisResult) return [];
    return analysisResult.tagAnalysis
      .filter(tag => tag.total >= 5 && tag.accuracy < 50)
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Codeforces Performance Analyzer
          </CardTitle>
          <CardDescription>
            Analyze your Codeforces performance with detailed insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter Codeforces handle (e.g., tourist)"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzePerformance()}
              className="flex-1"
            />
            <Button 
              onClick={analyzePerformance}
              disabled={isLoading || !handle.trim()}
              className="gap-2"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {analysisResult && (
        <>
          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{analysisResult.totalSubmissions}</div>
                <div className="text-sm text-muted-foreground">Total Submissions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{analysisResult.acceptedSubmissions}</div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{analysisResult.accuracy.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{analysisResult.tagAnalysis.length}</div>
                <div className="text-sm text-muted-foreground">Topics Attempted</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tag Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Accuracy by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysisResult.tagAnalysis.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tag" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Accuracy']} />
                    <Bar dataKey="accuracy" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Verdict Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Verdict Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysisResult.verdictAnalysis.slice(0, 6)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ verdict, percent }) => `${verdict} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analysisResult.verdictAnalysis.slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Rating Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysisResult.ratingAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" name="Total" />
                    <Bar dataKey="accepted" fill="#82ca9d" name="Accepted" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysisResult.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weak Areas */}
          {getWeakAreas().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>
                  Topics where you have low accuracy ({"<50%"}) with significant attempts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getWeakAreas().map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium">{area.tag}</div>
                        <div className="text-sm text-muted-foreground">
                          {area.accepted}/{area.total} solved ({area.accuracy.toFixed(1)}% accuracy)
                        </div>
                      </div>
                      <Badge variant="destructive">Needs Work</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
