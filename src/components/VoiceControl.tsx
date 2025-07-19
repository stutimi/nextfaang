import React from 'react';
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';
import { Button } from './ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControlProps {
  onTranscriptChange?: (transcript: string) => void;
  demoText?: string;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({
  onTranscriptChange,
  demoText = "Welcome to NEXTFAANG, India's first LGM platform for competitive programming."
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    speak,
    browserSupportsSpeechRecognition
  } = useVoiceInteraction();

  React.useEffect(() => {
    if (onTranscriptChange && transcript) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
        Your browser doesn't support speech recognition.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={listening ? "destructive" : "default"}
          size="sm"
          onClick={listening ? stopListening : startListening}
        >
          {listening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {listening ? 'Stop Listening' : 'Start Listening'}
        </Button>
        
        <Button variant="outline" size="sm" onClick={resetTranscript} disabled={!transcript}>
          Reset
        </Button>
        
        <Button variant="secondary" size="sm" onClick={() => speak(demoText)}>
          <Volume2 className="mr-2 h-4 w-4" />
          Demo TTS
        </Button>
      </div>
      
      {transcript && (
        <div className="p-4 border border-border bg-muted rounded-md">
          <p className="font-medium">Transcript:</p>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};