import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIFloatingButtonProps {
  onClick: () => void;
}

export const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-24 sm:bottom-20 right-4 z-40 flex flex-col items-end">
      <Button
        onClick={onClick}
        size="icon-lg"
        className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg h-12 w-12 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </Button>
    </div>
  );
};