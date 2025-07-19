import { useState, useCallback } from 'react';

/**
 * Simplified hook for voice interaction functionality
 * This version doesn't use any actual speech recognition to avoid browser compatibility issues
 */
export const useVoiceInteraction = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  
  // Stub functions that don't actually use speech recognition
  const startListening = useCallback(() => {
    setListening(true);
    // In a real implementation, this would start speech recognition
  }, []);
  
  const stopListening = useCallback(() => {
    setListening(false);
    // In a real implementation, this would stop speech recognition
  }, []);
  
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  // Stub function for text-to-speech
  const speak = useCallback((text: string) => {
    console.log('Text-to-speech (disabled):', text);
    // In a real implementation, this would use the Web Speech API
  }, []);

  return {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    speak,
    browserSupportsSpeechRecognition: true // Always return true since we're not actually using it
  };
};