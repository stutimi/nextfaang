import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, ExternalLink } from "lucide-react";

export function ExtensionsSection() {
  return (
    <Card className="mb-8 card-3d border-2 border-secondary/20">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Target className="h-6 w-6 text-secondary" />
          Extensions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Extensions can help you analyze your performance, track your progress and much more.
        </p>
        <p className="mb-4">Here are the best CP extensions on the market:</p>
        <a
          href="https://codeforces.com/blog/entry/82884"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Extensions Guide
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}