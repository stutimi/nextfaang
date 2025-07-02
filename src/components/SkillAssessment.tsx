
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Code, Brain, Target, Star, Zap } from 'lucide-react';

export const SkillAssessment = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  const skills = [
    {
      name: 'Data Structures',
      icon: Code,
      level: 78,
      color: 'from-blue-500 to-blue-600',
      problems: 245,
      strength: 'Arrays, Linked Lists',
      weakness: 'Segment Trees'
    },
    {
      name: 'Algorithms',
      icon: Brain,
      level: 82,
      color: 'from-green-500 to-green-600',
      problems: 189,
      strength: 'Dynamic Programming',
      weakness: 'Graph Theory'
    },
    {
      name: 'Problem Solving',
      icon: Target,
      level: 91,
      color: 'from-purple-500 to-purple-600',
      problems: 356,
      strength: 'Pattern Recognition',
      weakness: 'Time Complexity'
    },
    {
      name: 'Contest Performance',
      icon: Trophy,
      level: 67,
      color: 'from-orange-500 to-orange-600',
      problems: 89,
      strength: 'Speed Coding',
      weakness: 'Stress Management'
    }
  ];

  const achievements = [
    { name: 'Speed Demon', icon: Zap, description: 'Solved 50 problems in under 10 minutes' },
    { name: 'Consistency King', icon: Star, description: '30 day coding streak' },
    { name: 'Algorithm Master', icon: Brain, description: 'Mastered 5 algorithm categories' },
    { name: 'Contest Warrior', icon: Trophy, description: 'Participated in 20+ contests' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-400/30 text-purple-200 hover:bg-purple-800/60 backdrop-blur-sm card-3d white-glow">
            <Target className="h-5 w-5 mr-2 animate-pulse" />
            Real-Time Assessment
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-fade-in">
            Your CP Journey Analytics
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            AI-powered insights into your competitive programming progress
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className={`card-3d white-glow cursor-pointer transition-all duration-500 border-2 border-slate-700 hover:border-purple-400/60 ${
                selectedSkill === skill.name ? 'scale-105 border-purple-400 bg-purple-900/20' : ''
              } animate-fade-in`}
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-r ${skill.color} rounded-xl card-3d white-glow`}>
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-200">{skill.name}</CardTitle>
                    <p className="text-sm text-purple-300">{skill.problems} problems solved</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-purple-200">Mastery Level</span>
                      <span className="text-sm font-bold text-purple-100">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                  
                  {selectedSkill === skill.name && (
                    <div className="space-y-3 animate-fade-in">
                      <div>
                        <Badge variant="secondary" className="mb-2 bg-green-100 text-green-800">Strength</Badge>
                        <p className="text-sm text-purple-200">{skill.strength}</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2 bg-orange-100 text-orange-800">Focus Area</Badge>
                        <p className="text-sm text-purple-200">{skill.weakness}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-gradient">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.name}
                className="card-3d white-glow border-2 border-yellow-400/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 hover:scale-105 transition-all duration-500 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-fit mx-auto mb-4 card-3d white-glow">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-yellow-200 mb-2">{achievement.name}</h4>
                  <p className="text-sm text-yellow-300">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold card-3d white-glow hover:scale-110 transition-all duration-500">
            <Zap className="h-6 w-6 mr-3 animate-pulse" />
            Start Your Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};
