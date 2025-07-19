import React from 'react';
import { VoiceControl } from '../components/VoiceControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { AlertTriangle } from 'lucide-react';

const VoiceDemoPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Voice Interaction Demo</h1>
      
      <Card className="mb-6 border-yellow-500">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <CardTitle>Voice Features Temporarily Disabled</CardTitle>
          </div>
          <CardDescription>
            Voice features have been temporarily disabled for compatibility reasons. This demo page shows the UI only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>We're working on implementing voice features using more compatible technologies. The interface below is for demonstration purposes only.</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Control</CardTitle>
            <CardDescription>
              UI demonstration of voice control features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VoiceControl 
              demoText="Welcome to NEXTFAANG voice control. You can navigate the platform using voice commands."
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Voice Commands</CardTitle>
            <CardDescription>
              Examples of planned voice commands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>"Go to home" - Navigate to homepage</li>
              <li>"Open contest analyzer" - Open the contest analyzer tool</li>
              <li>"Show coding arena" - Navigate to the coding arena</li>
              <li>"Search for [topic]" - Search for a specific topic</li>
              <li>"Explain [algorithm]" - Get an explanation of an algorithm</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceDemoPage;