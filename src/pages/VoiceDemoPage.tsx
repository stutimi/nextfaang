import React from 'react';
import { VoiceControl } from '../components/VoiceControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const VoiceDemoPage: React.FC = () => {
  const [command, setCommand] = React.useState<string>('');
  
  const handleTranscriptChange = (transcript: string) => {
    setCommand(transcript);
    
    // Simple voice command processing
    const lowerTranscript = transcript.toLowerCase();
    
    if (lowerTranscript.includes('go to home')) {
      window.location.href = '/';
    } else if (lowerTranscript.includes('open contest analyzer')) {
      window.location.href = '/contest-analyzer';
    } else if (lowerTranscript.includes('show coding arena')) {
      window.location.href = '/coding-arena';
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Voice Interaction Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Control</CardTitle>
            <CardDescription>
              Try speaking commands like "Go to home", "Open contest analyzer", or "Show coding arena"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VoiceControl 
              onTranscriptChange={handleTranscriptChange}
              demoText="Welcome to NEXTFAANG voice control. You can navigate the platform using voice commands."
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Voice Commands</CardTitle>
            <CardDescription>
              List of available voice commands
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
      
      {command && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Command</CardTitle>
            <CardDescription>
              The system is processing this voice input
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{command}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceDemoPage;