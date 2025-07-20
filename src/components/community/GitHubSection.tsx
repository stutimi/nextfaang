import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";

export const GitHubSection = () => {
  return (
    <Card className="mt-12 glass-card border-border">
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <div className="p-3 bg-muted rounded-full w-fit mb-3">
            <Github className="h-8 w-8 text-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl text-foreground">Open Source Project</CardTitle>
        <CardDescription className="text-muted-foreground">
          NEXTFANG is built by the community, for the community
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="gap-2 bg-background text-foreground hover:bg-muted border border-border"
            onClick={() => window.open('https://github.com/stutimi/nextfaang', '_blank')}
          >
            <Github className="h-4 w-4" />
            View Origin
          </Button>
          <Button 
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-primary-foreground"
            onClick={() => window.open('https://github.com/Xenonesis/nextfaang', '_blank')}
          >
            <Github className="h-4 w-4" />
            View Fork
          </Button>
          <Button 
            className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-primary-foreground"
            onClick={() => window.open('https://github.com/stutimi/nextfaang', '_blank')}
          >
            <Star className="h-4 w-4" />
            Star the Repo
          </Button>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Help us improve NEXTFANG by contributing to our open-source repository. 
          Star the project to show your support and consider contributing to help 
          India create its first Legendary Grandmaster in competitive programming.
        </p>
      </CardContent>
    </Card>
  );
};