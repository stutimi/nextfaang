
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

interface AnalyticsChartsProps {
  data: any;
}

export const AnalyticsCharts = ({ data }: AnalyticsChartsProps) => {
  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Complete a contest analysis to view analytics charts
        </CardContent>
      </Card>
    );
  }

  // Prepare data for charts
  const tagData = data.struggledTags.slice(0, 8).map(([tag, count]: [string, number]) => ({
    tag: tag.replace(/-/g, ' '),
    count,
    name: tag.replace(/-/g, ' ')
  }));

  const solveTimeData = data.problemBreakdown
    .filter((p: any) => p.solved)
    .map((p: any, index: number) => ({
      problem: p.problem.index,
      time: Math.round(p.timeSpent / 60), // Convert to minutes
      attempts: p.attempts
    }))
    .sort((a: any, b: any) => a.time - b.time);

  const performanceData = [
    { name: 'Solved', value: data.solvedProblems, color: '#22c55e' },
    { name: 'Struggled', value: data.struggledProblems.length, color: '#eab308' },
    { name: 'Skipped', value: data.skippedProblems, color: '#ef4444' }
  ];

  const chartConfig = {
    count: {
      label: "Problems",
      color: "#8884d8",
    },
    time: {
      label: "Time (minutes)",
      color: "#82ca9d",
    },
    attempts: {
      label: "Attempts",
      color: "#ffc658",
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Distribution of problem solving outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Struggled Topics Bar Chart */}
      {tagData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Struggled Topics
            </CardTitle>
            <CardDescription>
              Number of problems you struggled with by topic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tagData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <XAxis 
                    dataKey="tag" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Solve Time Analysis */}
      {solveTimeData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Solve Time Analysis
            </CardTitle>
            <CardDescription>
              Time taken to solve each problem (in minutes)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={solveTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="problem" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Attempts vs Problems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Attempts Analysis
          </CardTitle>
          <CardDescription>
            Number of attempts for each problem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data.problemBreakdown.map((p: any) => ({
                  problem: p.problem.index,
                  attempts: p.attempts,
                  solved: p.solved ? 1 : 0
                }))} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="problem" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="attempts" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Key statistics from your contest performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {((data.solvedProblems / data.totalProblems) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Solve Rate</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {(data.problemBreakdown.reduce((sum: number, p: any) => sum + p.attempts, 0) / data.problemBreakdown.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Attempts</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  data.problemBreakdown
                    .filter((p: any) => p.solved)
                    .reduce((sum: number, p: any) => sum + p.timeSpent, 0) / 
                  data.solvedProblems / 60
                )}m
              </div>
              <div className="text-sm text-muted-foreground">Avg Solve Time</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {data.struggledTags.length}
              </div>
              <div className="text-sm text-muted-foreground">Weak Topics</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
