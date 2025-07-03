import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Users, Code, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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
      // Log visitor data
      await supabase.from('visitor_logs').insert({
        ip_address: null,
        user_agent: navigator.userAgent,
        country: formData.country
      });

      // Store signup data in localStorage for now
      localStorage.setItem('user_signup', JSON.stringify(formData));
      
      toast({
        title: "Welcome to Coding Arena!",
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to Coding Arena
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Join thousands of programmers in 1v1 coding duels
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
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger>
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
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Coding Arena'}
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