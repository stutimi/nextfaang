import { LucideLoader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LucideLoader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="text-lg text-muted-foreground">Loading your experience...</p>
      </div>
    </div>
  );
};