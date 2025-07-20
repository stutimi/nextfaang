
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { ErrorCatcher } from "@/components/ErrorCatcher";
import { ReactLifecycleSafetyWrapper } from "@/components/ReactLifecycleSafetyWrapper";
// Removed problematic hook import
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
import CPArena from "./pages/CPArena";
import CompetitiveProgramming from "./pages/CompetitiveProgramming";
import Community from "./pages/Community";
import About from "./pages/About";
import { SimpleProfilePage } from "./components/SimpleProfilePage";
import { TestDropdown } from "./components/TestDropdown";


const App = () => {
  return (
    <ErrorCatcher>
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
            <Route path="/dsa" element={
              <ErrorBoundary>
                <DSAMastery />
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
            <Route path="/cp-arena" element={
              <ErrorBoundary>
                <CPArena />
              </ErrorBoundary>
            } />
            <Route path="/competitive-programming" element={
              <ErrorBoundary>
                <CompetitiveProgramming />
              </ErrorBoundary>
            } />
            <Route path="/community" element={
              <ErrorBoundary>
                <Community />
              </ErrorBoundary>
            } />
            <Route path="/about" element={
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
            } />
            <Route path="/profile" element={
              <ErrorBoundary>
                <SimpleProfilePage />
              </ErrorBoundary>
            } />
            <Route path="/test-dropdown" element={
              <ErrorBoundary>
                <TestDropdown />
              </ErrorBoundary>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </TooltipProvider>

    </ThemeProvider>
      </ReactLifecycleSafetyWrapper>
    </ErrorCatcher>
  );
};

export default App;
