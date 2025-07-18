import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Users, Code, Star, Sparkles, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import platformBg1 from '@/assets/platform-bg-1.png';
import platformBg2 from '@/assets/platform-bg-2.png';

interface SignupRequiredProps {
  onSignupComplete: () => void;
}

export const SignupRequired = ({ onSignupComplete }: SignupRequiredProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const { toast } = useToast();

  // Create sparkle effects
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkles = Array.from({length: 3}, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100
        }));
        return [...prev.slice(-5), ...newSparkles];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const countries = [
    'United States', 'India', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'China', 'Brazil', 'Russia', 
    'South Korea', 'Netherlands', 'Sweden', 'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store signup data in localStorage
      localStorage.setItem('user_signup', JSON.stringify(formData));
      
      toast({
        title: "Welcome to NextFang!",
        description: "You can now explore the platform"
      });
      
      onSignupComplete();
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${platformBg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({length: 50}).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-floating-3d"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <Sparkles
          key={sparkle.id}
          className="absolute w-4 h-4 text-yellow-400 animate-ping"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: '2s'
          }}
        />
      ))}

      <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20 card-3d backdrop-blur-xl bg-background/90 dark:bg-background/10 form-animate-glow">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl pulse-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
              <Rocket className="h-10 w-10 text-white relative z-10" />
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gradient animate-pulse">
              Welcome to NextFang
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-white/80">
              🚀 Elite Platform for Competitive Programming Mastery
            </CardDescription>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary mx-auto" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">1000+</div>
                <div className="text-muted-foreground">Users</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Code className="h-5 w-5 text-secondary mx-auto" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">500+</div>
                <div className="text-muted-foreground">Matches</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Star className="h-5 w-5 text-accent mx-auto" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">4.8/5</div>
                <div className="text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 form-input-animate">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="form-input-glow"
              />
            </div>

            <div className="space-y-2 form-input-animate">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input-glow"
              />
            </div>

            <div className="space-y-2 form-input-animate">
              <Label htmlFor="country" className="text-foreground">Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="form-input-glow">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 hover:from-blue-300 hover:via-blue-500 hover:to-blue-700 text-white transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl button-3d form-button-glow"
              disabled={isLoading}
            >
              <Rocket className="w-5 h-5 mr-2" />
              {isLoading ? 'Launching...' : 'Launch Into NextFang 🚀'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            By joining, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
