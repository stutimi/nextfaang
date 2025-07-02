
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Code, Users, Clock, Trophy } from 'lucide-react';

export const LiveCodingPreview = () => {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [liveContests, setLiveContests] = useState(3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.8) {
        setLiveContests(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const codeExample = `// Today's Featured Problem: Two Sum
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Time: O(n), Space: O(n)
console.log(twoSum([2,7,11,15], 9)); // [0,1]`;

  const liveStats = [
    { label: 'Active Coders', value: activeUsers, color: 'text-green-400', animate: true },
    { label: 'Problems Solved Today', value: '2,847', color: 'text-blue-400' },
    { label: 'Live Contests', value: liveContests, color: 'text-orange-400', animate: true },
    { label: 'Success Rate', value: '94.2%', color: 'text-purple-400' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-400/30 text-blue-200 hover:bg-blue-800/60 backdrop-blur-sm card-3d white-glow">
            <Code className="h-5 w-5 mr-2 animate-pulse" />
            Live Coding Environment
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-green-300 to-cyan-300 bg-clip-text text-transparent animate-fade-in">
            Code, Compete, Conquer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Code Editor Preview */}
          <div className="space-y-6">
            <Card className="card-3d white-glow border-2 border-blue-400/30 bg-slate-900/90 backdrop-blur-xl">
              <CardHeader className="border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    </div>
                    <CardTitle className="text-blue-200">NEXTFAANG IDE</CardTitle>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600 text-white card-3d hover:scale-105 transition-all duration-300">
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-950 rounded-b-lg">
                  <pre className="text-sm text-green-400 p-6 overflow-x-auto font-mono leading-relaxed">
                    <code>{codeExample}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Live Stats */}
            <div className="grid grid-cols-2 gap-4">
              {liveStats.map((stat, index) => (
                <Card key={stat.label} className="card-3d white-glow border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${stat.color} ${stat.animate ? 'animate-pulse' : ''}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="space-y-6">
              {[
                {
                  icon: Users,
                  title: 'Real-time Collaboration',
                  description: 'Code together with peers, share solutions, and learn from each other in live sessions.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Trophy,
                  title: 'Instant Contests',
                  description: 'Join spontaneous coding battles, compete with friends, and climb the leaderboard.',
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  icon: Clock,
                  title: 'Performance Analytics',
                  description: 'Track your coding speed, accuracy, and improvement over time with detailed insights.',
                  color: 'from-green-500 to-emerald-500'
                }
              ].map((feature, index) => (
                <Card key={feature.title} className="card-3d white-glow border border-slate-700 bg-slate-800/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl card-3d white-glow animate-pulse`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-200 mb-2">{feature.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
