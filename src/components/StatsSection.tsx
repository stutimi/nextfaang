
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BookOpen, Users, Trophy } from "lucide-react";

export const StatsSection = () => {
  return (
    <section className="py-12 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">CP Blogs</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto mb-3">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">1000+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">2,547</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Resume Tips</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
