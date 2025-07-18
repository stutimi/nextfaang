import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle in top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center card-3d">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Oops! Page not found
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <a href="/">
              <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
