
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Trophy, AlertTriangle, RefreshCw } from "lucide-react";

interface Contest {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
}

interface Submission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    type: string;
    points?: number;
    rating?: number;
    tags: string[];
  };
  author: {
    contestId: number;
    members: Array<{ handle: string }>;
    participantType: string;
    ghost: boolean;
    startTimeSeconds?: number;
  };
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

interface ContestSearchProps {
  handle: string;
  onAnalysisComplete: (data: any) => void;
}

export const ContestSearch = ({ handle, onAnalysisComplete }: ContestSearchProps) => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (handle) {
      fetchUserContests();
    }
  }, [handle]);

  const makeCodeforcesRequest = async (endpoint: string) => {
    // Using a CORS proxy to access Codeforces API
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const codeforcesUrl = `https://codeforces.com/api/${endpoint}`;
    const fullUrl = proxyUrl + encodeURIComponent(codeforcesUrl);
    
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const fetchUserContests = async () => {
    setIsLoading(true);
    try {
      // First, verify the user exists
      const userInfoData = await makeCodeforcesRequest(`user.info?handles=${handle}`);
      
      if (userInfoData.status !== "OK") {
        throw new Error(userInfoData.comment || "User not found");
      }

      // Get user's rating changes (contest history)
      const ratingData = await makeCodeforcesRequest(`user.rating?handle=${handle}`);
      
      if (ratingData.status !== "OK") {
        throw new Error(ratingData.comment || "Failed to fetch contest history");
      }

      // Get recent contests (last 15)
      const recentContests = ratingData.result.slice(-15).reverse();
      
      // Format contests for display
      const formattedContests = recentContests.map((rating: any) => ({
        id: rating.contestId,
        name: rating.contestName,
        type: "Rated",
        phase: "FINISHED",
        frozen: false,
        durationSeconds: 7200, // Default 2 hours
        startTimeSeconds: rating.ratingUpdateTimeSeconds,
        relativeTimeSeconds: 0,
        rank: rating.rank,
        oldRating: rating.oldRating,
        newRating: rating.newRating
      }));

      setContests(formattedContests);

      toast({
        title: "Success!",
        description: `Found ${formattedContests.length} recent contests for ${handle}`,
      });
    } catch (error) {
      console.error("Error fetching contests:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch contest data. Please check if the handle is correct.",
        variant: "destructive",
      });
      setContests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeContest = async (contest: Contest) => {
    setSelectedContest(contest);
    setIsLoading(true);
    
    try {
      // Fetch submissions for the specific contest
      const submissionsData = await makeCodeforcesRequest(`contest.status?contestId=${contest.id}&handle=${handle}`);
      
      if (submissionsData.status !== "OK") {
        throw new Error(submissionsData.comment || "Failed to fetch submissions");
      }

      const contestSubmissions = submissionsData.result || [];
      setSubmissions(contestSubmissions);

      // Analyze the submissions
      const analysis = analyzeSubmissions(contestSubmissions, contest);
      setAnalysisResults(analysis);
      onAnalysisComplete(analysis);

      toast({
        title: "Analysis Complete!",
        description: `Analyzed ${contestSubmissions.length} submissions from ${contest.name}`,
      });
    } catch (error) {
      console.error("Error analyzing contest:", error);
      toast({
        title: "Analysis Error",
        description: error instanceof Error ? error.message : "Failed to analyze contest. The contest might be too old or have no submissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeSubmissions = (submissions: Submission[], contest: Contest) => {
    const problemMap = new Map();
    const solvedProblems = new Set();
    const struggledProblems = [];
    
    // Group submissions by problem
    submissions.forEach(submission => {
      const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
      
      if (!problemMap.has(problemKey)) {
        problemMap.set(problemKey, {
          problem: submission.problem,
          submissions: [],
          solved: false,
          timeSpent: 0,
          attempts: 0
        });
      }
      
      const problemData = problemMap.get(problemKey);
      problemData.submissions.push(submission);
      problemData.attempts++;
      
      if (submission.verdict === "OK") {
        problemData.solved = true;
        problemData.timeSpent = submission.relativeTimeSeconds;
        solvedProblems.add(problemKey);
      }
    });

    // Identify struggled problems (many attempts or long time)
    problemMap.forEach((data, key) => {
      if (data.solved && (data.attempts > 3 || data.timeSpent > 3600)) { // 1 hour
        struggledProblems.push({
          ...data,
          reason: data.attempts > 3 ? "Multiple attempts" : "Long solve time"
        });
      }
    });

    // Get problem tags for recommendations
    const allTags = new Set();
    const struggledTags = new Map();
    
    submissions.forEach(submission => {
      submission.problem.tags.forEach(tag => {
        allTags.add(tag);
        
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
        const problemData = problemMap.get(problemKey);
        
        if (problemData && struggledProblems.some(p => p.problem.index === submission.problem.index)) {
          struggledTags.set(tag, (struggledTags.get(tag) || 0) + 1);
        }
      });
    });

    return {
      contest,
      totalProblems: problemMap.size,
      solvedProblems: solvedProblems.size,
      struggledProblems,
      skippedProblems: problemMap.size - solvedProblems.size,
      allTags: Array.from(allTags),
      struggledTags: Array.from(struggledTags.entries()).sort((a, b) => b[1] - a[1]),
      submissions: submissions.length,
      problemBreakdown: Array.from(problemMap.values())
    };
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "OK": return "bg-green-500";
      case "WRONG_ANSWER": return "bg-red-500";
      case "TIME_LIMIT_EXCEEDED": return "bg-yellow-500";
      case "RUNTIME_ERROR": return "bg-orange-500";
      case "COMPILATION_ERROR": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getRatingChange = (contest: any) => {
    if (contest.newRating && contest.oldRating) {
      const change = contest.newRating - contest.oldRating;
      return change > 0 ? `+${change}` : `${change}`;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Contest List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Recent Contests for {handle}
          </CardTitle>
          <CardDescription>
            Click on a contest to analyze your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && !selectedContest ? (
            <div className="text-center py-8 flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Loading contests...
            </div>
          ) : contests.length > 0 ? (
            <div className="grid gap-3">
              {contests.map((contest: any) => (
                <div
                  key={contest.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => analyzeContest(contest)}
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{contest.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}
                      </span>
                      <Badge variant="outline">Contest #{contest.id}</Badge>
                      {contest.rank && (
                        <Badge variant="secondary">Rank: {contest.rank}</Badge>
                      )}
                      {getRatingChange(contest) && (
                        <Badge 
                          className={`${contest.newRating > contest.oldRating ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {getRatingChange(contest)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {isLoading && selectedContest?.id === contest.id ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      "Analyze"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {handle ? "No recent contests found for this handle" : "Enter a handle to view contests"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Contest Analysis: {analysisResults.contest.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {analysisResults.solvedProblems}
                </div>
                <div className="text-sm text-green-700">Problems Solved</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {analysisResults.struggledProblems.length}
                </div>
                <div className="text-sm text-yellow-700">Struggled With</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {analysisResults.skippedProblems}
                </div>
                <div className="text-sm text-red-700">Skipped</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analysisResults.submissions}
                </div>
                <div className="text-sm text-blue-700">Total Submissions</div>
              </div>
            </div>

            {/* Problem Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Problem Breakdown</h3>
              {analysisResults.problemBreakdown.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Problem</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisResults.problemBreakdown.map((problem: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {problem.problem.index}. {problem.problem.name}
                            </div>
                            {problem.problem.rating && (
                              <div className="text-sm text-muted-foreground">
                                Rating: {problem.problem.rating}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {problem.problem.tags.slice(0, 3).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {problem.problem.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{problem.problem.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{problem.attempts}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`text-white ${problem.solved ? 'bg-green-500' : 'bg-red-500'}`}
                          >
                            {problem.solved ? 'Solved' : 'Unsolved'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {problem.solved ? formatTime(problem.timeSpent) : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No submissions found for this contest
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
