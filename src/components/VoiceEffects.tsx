import React, { createContext, useContext, useState } from 'react';

// Create a context for voice effects
interface VoiceEffectsContextType {
  speak: (text: string) => void;
  speakPreset: (preset: 'success' | 'error' | 'warning' | 'matchStart' | 'matchWin' | 'matchLose' | 'welcome' | 'tournamentStart') => void;
}

const VoiceEffectsContext = createContext<VoiceEffectsContextType>({
  speak: () => {},
  speakPreset: () => {},
});

// Hook to use voice effects
export const useVoiceEffects = () => useContext(VoiceEffectsContext);

// Voice effects provider component
export const VoiceEffectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Function to speak text
  const speak = (text: string) => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to speak preset messages
  const speakPreset = (preset: 'success' | 'error' | 'warning' | 'matchStart' | 'matchWin' | 'matchLose' | 'welcome' | 'tournamentStart') => {
    const presetMessages: Record<string, string> = {
      success: "Operation completed successfully!",
      error: "An error occurred. Please try again.",
      warning: "Warning! Please check your input.",
      matchStart: "Match starting! Prepare for battle!",
      matchWin: "Victory! You have won the match!",
      matchLose: "Defeat. Better luck next time!",
      welcome: "Welcome to NextFang CP Arena! Let me guide you through this platform.",
      tournamentStart: "The tournament begins! May the best coder win!"
    };
    
    speak(presetMessages[preset]);
  };

  return (
    <VoiceEffectsContext.Provider value={{ speak, speakPreset }}>
      {children}
    </VoiceEffectsContext.Provider>
  );
};

// Component to render in the app
export const VoiceEffects: React.FC = () => {
  // This component doesn't render anything visible
  // It's just a placeholder for the voice effects functionality
  return null;
};

export default VoiceEffects;