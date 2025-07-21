
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { ContestSearch } from "@/components/ContestSearch";
import { GitHubAnalyzer } from "@/components/GitHubAnalyzer";
import { PerformanceAnalysis } from "@/components/PerformanceAnalysis";
import { PracticeRecommendations } from "@/components/PracticeRecommendations";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { CodingArena } from "@/components/CodingArena";
import { EnhancedPerformanceAnalyzer } from "@/components/EnhancedPerformanceAnalyzer";
import { QuestionSuggestions } from "@/components/QuestionSuggestions";
import { HackathonPlatforms } from "@/components/HackathonPlatforms";
import { Search, TrendingUp, Target, BookOpen, Github, Sword, Trophy } from "lucide-react";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const ContestAnalyzer = () => {
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [githubAnalysisData, setGithubAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!codeforcesHandle.trim() && !githubUsername.trim()) return;
    
    setIsLoading(true);
    try {
      console.log("Analyzing handles:", { codeforcesHandle, githubUsername });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CP Performance Analyzer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analyze your coding performance, get personalized suggestions, and compete in hackathons
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Codeforces Handle
              </CardTitle>
              <CardDescription>
                Enter your Codeforces username to analyze contest performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g., tourist, Benq, jiangly"
                  value={codeforcesHandle}
                  onChange={(e) => setCodeforcesHandle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                GitHub Username
              </CardTitle>
              <CardDescription>
                Enter your GitHub username to analyze coding activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g., torvalds, gaearon, sindresorhus"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button 
            onClick={handleAnalyze}
            disabled={isLoading || (!codeforcesHandle.trim() && !githubUsername.trim())}
            className="bg-gradient-to-r from-primary to-secondary"
            size="lg"
          >
            {isLoading ? "Analyzing..." : "Analyze Profiles"}
          </Button>
        </div>

        {/* Analysis Results */}
        {(codeforcesHandle || githubUsername) && (
          <Tabs defaultValue="codeforces" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="codeforces" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Codeforces
              </TabsTrigger>
              <TabsTrigger value="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="arena" className="flex items-center gap-2">
                <Sword className="h-4 w-4" />
                1v1 Arena
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Practice
              </TabsTrigger>
              <TabsTrigger value="hackathons" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Hackathons
              </TabsTrigger>
            </TabsList>

            <TabsContent value="codeforces" className="mt-6">
              {codeforcesHandle ? (
                <EnhancedPerformanceAnalyzer />
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Enter a Codeforces handle to analyze contest performance</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="github" className="mt-6">
              {githubUsername ? (
                <GitHubAnalyzer 
                  username={githubUsername} 
                  onAnalysisComplete={setGithubAnalysisData}
                />
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Enter a GitHub username to analyze coding activity</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="suggestions" className="mt-6">
              <QuestionSuggestions 
                weakAreas={analysisData?.struggledTags?.map(([tag]: [string, number]) => tag) || []}
                userRating={1200}
              />
            </TabsContent>

            <TabsContent value="arena" className="mt-6">
              <CodingArena />
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <PerformanceAnalysis data={analysisData || githubAnalysisData} />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <PracticeRecommendations data={analysisData || githubAnalysisData} />
            </TabsContent>

            <TabsContent value="hackathons" className="mt-6">
              <HackathonPlatforms />
            </TabsContent>
          </Tabs>
        )}

        {/* Feature Overview for new users */}
        {!codeforcesHandle && !githubUsername && (
          <div className="mt-12">
            <HackathonPlatforms />
          </div>
        )}
      </div>

      {/* Enhanced UI Components */}
      <FloatingActionButton />
    </div>
  );
};

export default ContestAnalyzer;
