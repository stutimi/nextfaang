import React, { useState } from 'react';
import { X, Maximize2, Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onExpand: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, onExpand }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-20 right-4 z-50 w-[calc(100%-2rem)] sm:w-[400px] max-w-md mx-auto sm:mx-0">
      <Card className="overflow-hidden shadow-xl border-0">
        {/* Header */}
        <CardHeader className="p-0">
          <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 p-3 sm:p-4 flex justify-between items-center">
            <div className="flex flex-col text-white">
              <h3 className="font-bold text-base sm:text-lg">NEXTFANG AI Assistant</h3>
              <div className="flex items-center text-xs space-x-2">
                <span>Female Voice • Always Ready to Help</span>
              </div>
              <div className="flex items-center text-xs mt-1">
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-green-400 rounded-full mr-1"></span>
                  Online • Voice Ready
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="text-white hover:bg-white/20"
                onClick={onExpand}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat Content */}
        <CardContent className="p-0">
          <div className="bg-white dark:bg-gray-900 p-3 sm:p-4 h-64 sm:h-80 overflow-y-auto">
            <div className="mb-4">
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                Hello! I'm your NEXTFANG AI assistant.
                <br />I can help with:
              </p>
              <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                <li>• Competitive programming</li>
                <li>• DSA concepts</li>
                <li>• Interview prep</li>
                <li>• Resume tips</li>
              </ul>
              <p className="mt-3 sm:mt-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                Ask me anything!
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 flex items-center">
            <input
              type="text"
              placeholder="Ask me anything about CP..."
              className="flex-1 bg-transparent border border-gray-300 dark:border-gray-600 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              size="icon-sm" 
              variant="ghost" 
              className="ml-1 sm:ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button 
              size="icon-sm" 
              className="ml-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};