
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Github, Star, GitFork, Calendar, Code, RefreshCw, TrendingUp } from "lucide-react";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  location: string;
  company: string;
  blog: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  html_url: string;
}

interface GitHubAnalyzerProps {
  username: string;
  onAnalysisComplete: (data: any) => void;
}

export const GitHubAnalyzer = ({ username, onAnalysisComplete }: GitHubAnalyzerProps) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (username) {
      fetchGitHubProfile();
    }
  }, [username]);

  const makeGitHubRequest = async (endpoint: string) => {
    const url = `https://api.github.com/${endpoint}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('GitHub API request failed:', error);
      throw error;
    }
  };

  const fetchGitHubProfile = async () => {
    setIsLoading(true);
    try {
      // Fetch user profile
      const userData = await makeGitHubRequest(`users/${username}`);
      setUser(userData);

      // Fetch repositories
      const reposData = await makeGitHubRequest(`users/${username}/repos?sort=updated&per_page=30`);
      setRepositories(reposData);

      // Analyze the data
      const analysis = analyzeGitHubData(userData, reposData);
      setAnalysisResults(analysis);
      onAnalysisComplete(analysis);

      toast({
        title: "Analysis Complete!",
        description: `Analyzed ${userData.public_repos} repositories for ${userData.name || username}`,
      });
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch GitHub profile",
        variant: "destructive",
      });
      setUser(null);
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeGitHubData = (userData: GitHubUser, repos: Repository[]) => {
    const languages = new Map<string, number>();
    const topics = new Map<string, number>();
    let totalStars = 0;
    let totalForks = 0;
    let recentActivity = 0;

    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

    repos.forEach(repo => {
      // Count languages
      if (repo.language) {
        languages.set(repo.language, (languages.get(repo.language) || 0) + 1);
      }

      // Count topics
      repo.topics.forEach(topic => {
        topics.set(topic, (topics.get(topic) || 0) + 1);
      });

      // Sum stars and forks
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      // Check recent activity
      if (new Date(repo.updated_at) > sixMonthsAgo) {
        recentActivity++;
      }
    });

    const sortedLanguages = Array.from(languages.entries()).sort((a, b) => b[1] - a[1]);
    const sortedTopics = Array.from(topics.entries()).sort((a, b) => b[1] - a[1]);
    const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);

    return {
      user: userData,
      totalRepositories: repos.length,
      totalStars,
      totalForks,
      recentActivity,
      topLanguages: sortedLanguages.slice(0, 5),
      topTopics: sortedTopics.slice(0, 8),
      topRepositories: topRepos,
      accountAge: Math.floor((now.getTime() - new Date(userData.created_at).getTime()) / (365 * 24 * 60 * 60 * 1000)),
      repositories: repos
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C++": "bg-blue-700",
      C: "bg-gray-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
      PHP: "bg-purple-500",
      Ruby: "bg-red-600",
      Swift: "bg-orange-400",
      Kotlin: "bg-purple-700",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* GitHub Profile Overview */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <img 
                src={user.avatar_url} 
                alt={user.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  {user.name || user.login}
                </div>
                <p className="text-sm text-muted-foreground">@{user.login}</p>
              </div>
            </CardTitle>
            {user.bio && (
              <CardDescription>{user.bio}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.public_repos}</div>
                <div className="text-sm text-blue-700">Repositories</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.followers}</div>
                <div className="text-sm text-green-700">Followers</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{user.following}</div>
                <div className="text-sm text-purple-700">Following</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {analysisResults?.accountAge || 0}
                </div>
                <div className="text-sm text-orange-700">Years Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResults && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Language Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Top Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.topLanguages.map(([language, count]: [string, number]) => (
                  <div key={language} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`} />
                      <span className="font-medium">{language}</span>
                    </div>
                    <Badge variant="secondary">{count} repos</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Activity Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Total Stars
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {analysisResults.totalStars}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <GitFork className="h-4 w-4" />
                    Total Forks
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {analysisResults.totalForks}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Recent Activity (6m)
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    {analysisResults.recentActivity} repos
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Repositories */}
      {analysisResults && analysisResults.topRepositories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Repositories</CardTitle>
            <CardDescription>Most starred repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Stars</TableHead>
                  <TableHead>Forks</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analysisResults.topRepositories.map((repo: Repository) => (
                  <TableRow key={repo.id}>
                    <TableCell>
                      <div>
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {repo.name}
                        </a>
                        {repo.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {repo.description.slice(0, 60)}
                            {repo.description.length > 60 ? "..." : ""}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {repo.language && (
                        <Badge 
                          className={`text-white ${getLanguageColor(repo.language)}`}
                        >
                          {repo.language}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(repo.updated_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Topics */}
      {analysisResults && analysisResults.topTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
            <CardDescription>Most used repository topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysisResults.topTopics.map(([topic, count]: [string, number]) => (
                <Badge key={topic} variant="outline" className="text-sm">
                  {topic} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="text-center py-8 flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Analyzing GitHub profile...
          </CardContent>
        </Card>
      )}
    </div>
  );
};
