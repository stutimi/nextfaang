import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";

export function WhatIsCPSection() {
  return (
    <Card className="mb-8 card-3d border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          What is Competitive Programming?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-6">
          Competitive Programming is a sport where programmers solve algorithmic problems within a time limit using a programming language of their choice. It's a test of problem-solving skills, knowledge of algorithms, and ability to write efficient code.
        </p>

        <h4 className="text-lg font-semibold mb-4">Few good websites for CP:</h4>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant="secondary">CodeForces</Badge>
          <Badge variant="secondary">CodeChef</Badge>
          <Badge variant="secondary">AtCoder</Badge>
        </div>
      </CardContent>
    </Card>
  );
}