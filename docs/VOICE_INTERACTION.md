# Voice Interaction Documentation

## Overview

This document explains the voice interaction functionality in NEXTFAANG, which has been updated to use the native Web Speech API instead of external libraries for better compatibility with React 18.3.1.

## Features

- **Speech-to-Text**: Convert spoken words to text using browser's speech recognition API
- **Text-to-Speech**: Convert text to speech using browser's speech synthesis API
- **Voice Commands**: Process voice input to trigger actions in the application

## Usage

### Basic Implementation

```tsx
import { useVoiceInteraction } from '../hooks/useVoiceInteraction';

const MyComponent = () => {
  const {
    transcript,      // The current speech transcript
    listening,       // Boolean indicating if listening is active
    resetTranscript, // Function to reset the transcript
    startListening,  // Function to start listening
    stopListening,   // Function to stop listening
    speak,           // Function to speak text
    browserSupportsSpeechRecognition // Boolean indicating browser support
  } = useVoiceInteraction();

  // Example usage
  const handleCommand = () => {
    if (transcript.toLowerCase().includes('search for')) {
      const searchTerm = transcript.toLowerCase().replace('search for', '').trim();
      // Perform search with searchTerm
    }
  };

  // Check for browser support
  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser doesn't support speech recognition.</div>;
  }

  return (
    <div>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? 'Stop' : 'Start'} Listening
      </button>
      <button onClick={() => speak('Hello, welcome to NEXTFAANG!')}>
        Speak Welcome
      </button>
      <div>Transcript: {transcript}</div>
    </div>
  );
};
```

### Using the VoiceControl Component

We've created a reusable `VoiceControl` component that you can use directly:

```tsx
import { VoiceControl } from '../components/VoiceControl';

const MyPage = () => {
  const handleTranscriptChange = (transcript) => {
    // Process the transcript
    console.log('New transcript:', transcript);
  };

  return (
    <div>
      <h1>Voice Control Demo</h1>
      <VoiceControl 
        onTranscriptChange={handleTranscriptChange}
        demoText="This is a custom text to speak"
      />
    </div>
  );
};
```

## Browser Support

Speech recognition is supported in most modern browsers, but implementation may vary. The `browserSupportsSpeechRecognition` flag will indicate if the current browser supports this feature.

## Permissions

Users will need to grant microphone permissions to use speech recognition features. The browser will prompt for this permission when `startListening` is called for the first time.

## Best Practices

1. Always check for browser support before using speech features
2. Provide visual feedback when listening is active
3. Include alternative interaction methods for accessibility
4. Keep voice commands simple and distinct
5. Provide clear instructions for users on how to use voice features

## Troubleshooting

If you encounter issues with voice recognition:

1. Ensure the user has granted microphone permissions
2. Check that the browser supports the Web Speech API
3. Test in different browsers if issues persist
4. Consider network connectivity issues that might affect recognition services