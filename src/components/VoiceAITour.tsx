import React from 'react';

interface VoiceAITourProps {
  onClose: () => void;
}

export const VoiceAITour: React.FC<VoiceAITourProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to NEXTFAANG!</h2>
        <p className="mb-4">
          Discover our platform with AI-powered features to help you master competitive programming.
        </p>
        <button
          onClick={onClose}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};