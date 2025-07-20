import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const NextFaangHeader: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="ml-2 font-bold text-xl">NextFAANG</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex justify-center">
          <Badge className="bg-blue-100/80 text-blue-800 border border-blue-300 rounded-full px-6 py-2 flex items-center">
            <span className="text-blue-600 mr-2">★</span>
            India's First LGM Platform
          </Badge>
        </div>
      </div>
    </header>
  );
};