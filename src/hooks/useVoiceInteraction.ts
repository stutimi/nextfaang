import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

/**
 * Custom hook for voice interaction functionality
 * @returns Speech recognition utilities and state
 */
export const useVoiceInteraction = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  // Text-to-speech functionality
  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    speak,
    browserSupportsSpeechRecognition
  };
};