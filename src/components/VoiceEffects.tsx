import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VoiceEffectsProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

// Simplified component that just shows a UI placeholder without actual voice functionality
export const VoiceEffects = ({ enabled = true, onToggle }: VoiceEffectsProps) => {
  const toggleVoice = () => {
    onToggle?.(!enabled);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="cp-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-xs futuristic-button"
            >
              Voice Feature Disabled
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Stub implementation that does nothing
export const useVoiceEffects = () => {
  const speak = () => {};
  const speakPreset = () => {};
  return { speak, speakPreset };
};