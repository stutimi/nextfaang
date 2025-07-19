
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorDebugPanel } from "@/components/ErrorDebugPanel";
import { ErrorCatcher } from "@/components/ErrorCatcher";
import { ReactLifecycleSafetyWrapper } from "@/components/ReactLifecycleSafetyWrapper";
import { useReconcilerRecovery } from "@/hooks/useReconcilerRecovery";
import Index from "./pages/Index";

import NotFound from "./pages/NotFound";
import CPContributors from "./pages/CPContributors";
import Resources from "./pages/Resources";
import ResumeTips from "./pages/ResumeTips";
import DSAMastery from "./pages/DSAMastery";
import HackathonGuide from "./pages/HackathonGuide";
import CPDictionary from "./pages/CPDictionary";
import CPTricksAndTips from "./pages/CPTricksAndTips";
import LanguageTranslation from "./pages/LanguageTranslation";
import ContestAnalyzer from "./pages/ContestAnalyzer";

const App = () => {
  // Use reconciler recovery hook to handle React internal errors
  const { recoveryCount } = useReconcilerRecovery();
  
  return (
    <ErrorCatcher key={`app-${recoveryCount}`}>
      <ReactLifecycleSafetyWrapper>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          suppressHydrationWarning={true}
        >
      <TooltipProvider>
        <ErrorBoundary
          fallback={
            <div className="p-4 text-center">
              <p>Failed to load notifications. Please refresh the page.</p>
            </div>
          }
        >
          <Toaster />
          <Sonner />
        </ErrorBoundary>
        
        <ErrorBoundary
          onError={(error, errorInfo) => {
            console.error('Route Error:', error, errorInfo);
          }}
        >
          <Routes>
            <Route path="/" element={
              <ErrorBoundary>
                <Index />
              </ErrorBoundary>
            } />
            <Route path="/cp-contributors" element={
              <ErrorBoundary>
                <CPContributors />
              </ErrorBoundary>
            } />
            <Route path="/resources" element={
              <ErrorBoundary>
                <Resources />
              </ErrorBoundary>
            } />
            <Route path="/resume-tips" element={
              <ErrorBoundary>
                <ResumeTips />
              </ErrorBoundary>
            } />
            <Route path="/dsa-mastery" element={
              <ErrorBoundary>
                <DSAMastery />
              </ErrorBoundary>
            } />
            <Route path="/hackathon-guide" element={
              <ErrorBoundary>
                <HackathonGuide />
              </ErrorBoundary>
            } />
            <Route path="/cp-dictionary" element={
              <ErrorBoundary>
                <CPDictionary />
              </ErrorBoundary>
            } />
            <Route path="/cp-tricks-tips" element={
              <ErrorBoundary>
                <CPTricksAndTips />
              </ErrorBoundary>
            } />
            <Route path="/language-translation" element={
              <ErrorBoundary>
                <LanguageTranslation />
              </ErrorBoundary>
            } />
            <Route path="/contest-analyzer" element={
              <ErrorBoundary>
                <ContestAnalyzer />
              </ErrorBoundary>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </TooltipProvider>
      
      {/* Development-only error debug panel */}
      <ErrorDebugPanel />
    </ThemeProvider>
      </ReactLifecycleSafetyWrapper>
    </ErrorCatcher>
  );
};

export default App;
