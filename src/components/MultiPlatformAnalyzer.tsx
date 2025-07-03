import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Code, Trophy, Target, TrendingUp, Award, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlatformData {
  codeforces?: {
    handle: string;
    rating: number;
    rank: string;
    maxRating: number;
    contribution: number;
    contestsParticipated: number;
    problemsSolved: number;
  };
  leetcode?: {
    username: string;
    ranking: number;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    contestRanking: number;
  };
  codechef?: {
    username: string;
    rating: number;
    stars: string;
    globalRank: number;
    countryRank: number;
    problemsSolved: number;
  };
  gfg?: {
    username: string;
    instituteRank: number;
    score: number;
    problemsSolved: number;
    codingStreak: number;
  };
}

export const MultiPlatformAnalyzer = () => {
  const [handles, setHandles] = useState({
    codeforces: '',
    leetcode: '',
    codechef: '',
    gfg: ''
  });
  const [data, setData] = useState<PlatformData>({});
  const [loading, setLoading] = useState('');
  const { toast } = useToast();

  const fetchCodeforcesData = async (handle: string) => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      const result = await response.json();
      
      if (result.status === 'OK') {
        const user = result.result[0];
        return {
          handle: user.handle,
          rating: user.rating || 0,
          rank: user.rank || 'Unrated',
          maxRating: user.maxRating || 0,
          contribution: user.contribution || 0,
          contestsParticipated: 0, // Would need separate API call
          problemsSolved: 0 // Would need separate API call
        };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(`Codeforces: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const fetchLeetCodeData = async (username: string) => {
    // LeetCode doesn't have official API, using mock data for demo
    // In real implementation, you'd use GraphQL queries or scraping
    return {
      username,
      ranking: Math.floor(Math.random() * 100000) + 1000,
      totalSolved: Math.floor(Math.random() * 2000) + 100,
      easySolved: Math.floor(Math.random() * 500) + 50,
      mediumSolved: Math.floor(Math.random() * 800) + 40,
      hardSolved: Math.floor(Math.random() * 300) + 10,
      acceptanceRate: Math.floor(Math.random() * 30) + 50,
      contestRanking: Math.floor(Math.random() * 50000) + 1000
    };
  };

  const fetchCodeChefData = async (username: string) => {
    // CodeChef API is limited, using mock data for demo
    return {
      username,
      rating: Math.floor(Math.random() * 1000) + 1200,
      stars: `${Math.floor(Math.random() * 6) + 1}⭐`,
      globalRank: Math.floor(Math.random() * 100000) + 1000,
      countryRank: Math.floor(Math.random() * 10000) + 100,
      problemsSolved: Math.floor(Math.random() * 500) + 50
    };
  };

  const fetchGFGData = async (username: string) => {
    // GFG doesn't have public API, using mock data for demo
    return {
      username,
      instituteRank: Math.floor(Math.random() * 1000) + 1,
      score: Math.floor(Math.random() * 1000) + 100,
      problemsSolved: Math.floor(Math.random() * 300) + 50,
      codingStreak: Math.floor(Math.random() * 100) + 1
    };
  };

  const analyzePlatform = async (platform: string) => {
    const handle = handles[platform as keyof typeof handles];
    if (!handle.trim()) {
      toast({
        title: "Missing Handle",
        description: `Please enter your ${platform} username`,
        variant: "destructive"
      });
      return;
    }

    setLoading(platform);
    try {
      let platformData;
      
      switch (platform) {
        case 'codeforces':
          platformData = await fetchCodeforcesData(handle);
          break;
        case 'leetcode':
          platformData = await fetchLeetCodeData(handle);
          break;
        case 'codechef':
          platformData = await fetchCodeChefData(handle);
          break;
        case 'gfg':
          platformData = await fetchGFGData(handle);
          break;
        default:
          throw new Error('Unknown platform');
      }

      setData(prev => ({
        ...prev,
        [platform]: platformData
      }));

      toast({
        title: "Analysis Complete",
        description: `Successfully fetched ${platform} data for ${handle}`
      });
    } catch (error) {
      console.error(`${platform} analysis error:`, error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : `Failed to fetch ${platform} data`,
        variant: "destructive"
      });
    } finally {
      setLoading('');
    }
  };

  const generateComparisonData = () => {
    const platforms = [];
    if (data.codeforces) platforms.push({ name: 'Codeforces', rating: data.codeforces.rating, problems: data.codeforces.problemsSolved });
    if (data.leetcode) platforms.push({ name: 'LeetCode', rating: Math.floor(data.leetcode.ranking / 100), problems: data.leetcode.totalSolved });
    if (data.codechef) platforms.push({ name: 'CodeChef', rating: data.codechef.rating, problems: data.codechef.problemsSolved });
    if (data.gfg) platforms.push({ name: 'GFG', rating: Math.floor(data.gfg.score / 10), problems: data.gfg.problemsSolved });
    return platforms;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Multi-Platform Performance Analyzer
          </CardTitle>
          <CardDescription>
            Analyze your competitive programming performance across multiple platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input Handles</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Codeforces */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-blue-500" />
                      Codeforces
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cf-handle">Handle</Label>
                      <Input
                        id="cf-handle"
                        placeholder="tourist"
                        value={handles.codeforces}
                        onChange={(e) => setHandles(prev => ({ ...prev, codeforces: e.target.value }))}
                      />
                    </div>
                    <Button 
                      onClick={() => analyzePlatform('codeforces')}
                      disabled={loading === 'codeforces'}
                      className="w-full"
                    >
                      {loading === 'codeforces' ? 'Analyzing...' : 'Analyze Codeforces'}
                    </Button>
                  </CardContent>
                </Card>

                {/* LeetCode */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-500" />
                      LeetCode
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="lc-handle">Username</Label>
                      <Input
                        id="lc-handle"
                        placeholder="username"
                        value={handles.leetcode}
                        onChange={(e) => setHandles(prev => ({ ...prev, leetcode: e.target.value }))}
                      />
                    </div>
                    <Button 
                      onClick={() => analyzePlatform('leetcode')}
                      disabled={loading === 'leetcode'}
                      className="w-full"
                    >
                      {loading === 'leetcode' ? 'Analyzing...' : 'Analyze LeetCode'}
                    </Button>
                  </CardContent>
                </Card>

                {/* CodeChef */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5 text-brown-500" />
                      CodeChef
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cc-handle">Username</Label>
                      <Input
                        id="cc-handle"
                        placeholder="username"
                        value={handles.codechef}
                        onChange={(e) => setHandles(prev => ({ ...prev, codechef: e.target.value }))}
                      />
                    </div>
                    <Button 
                      onClick={() => analyzePlatform('codechef')}
                      disabled={loading === 'codechef'}
                      className="w-full"
                    >
                      {loading === 'codechef' ? 'Analyzing...' : 'Analyze CodeChef'}
                    </Button>
                  </CardContent>
                </Card>

                {/* GeeksforGeeks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      GeeksforGeeks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="gfg-handle">Username</Label>
                      <Input
                        id="gfg-handle"
                        placeholder="username"
                        value={handles.gfg}
                        onChange={(e) => setHandles(prev => ({ ...prev, gfg: e.target.value }))}
                      />
                    </div>
                    <Button 
                      onClick={() => analyzePlatform('gfg')}
                      disabled={loading === 'gfg'}
                      className="w-full"
                    >
                      {loading === 'gfg' ? 'Analyzing...' : 'Analyze GFG'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {Object.keys(data).length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No data yet. Please analyze some platforms first.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Platform-specific data */}
                  {data.codeforces && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-blue-500" />
                          Codeforces Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{data.codeforces.rating}</div>
                            <div className="text-sm text-muted-foreground">Current Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{data.codeforces.maxRating}</div>
                            <div className="text-sm text-muted-foreground">Max Rating</div>
                          </div>
                          <div className="text-center">
                            <Badge variant="secondary">{data.codeforces.rank}</Badge>
                            <div className="text-sm text-muted-foreground mt-1">Rank</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{data.codeforces.contribution}</div>
                            <div className="text-sm text-muted-foreground">Contribution</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {data.leetcode && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-orange-500" />
                          LeetCode Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{data.leetcode.totalSolved}</div>
                            <div className="text-sm text-muted-foreground">Total Solved</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{data.leetcode.ranking}</div>
                            <div className="text-sm text-muted-foreground">Global Ranking</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{data.leetcode.acceptanceRate}%</div>
                            <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{data.leetcode.contestRanking}</div>
                            <div className="text-sm text-muted-foreground">Contest Ranking</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Easy Problems</span>
                            <span className="text-sm text-green-600">{data.leetcode.easySolved}</span>
                          </div>
                          <Progress value={(data.leetcode.easySolved / 500) * 100} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Medium Problems</span>
                            <span className="text-sm text-yellow-600">{data.leetcode.mediumSolved}</span>
                          </div>
                          <Progress value={(data.leetcode.mediumSolved / 800) * 100} className="h-2" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Hard Problems</span>
                            <span className="text-sm text-red-600">{data.leetcode.hardSolved}</span>
                          </div>
                          <Progress value={(data.leetcode.hardSolved / 300) * 100} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Comparison Chart */}
                  {generateComparisonData().length > 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={generateComparisonData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="problems" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};