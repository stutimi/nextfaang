import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bug, Trash2, Download, Eye, EyeOff } from 'lucide-react';
import { errorReporter } from '@/utils/errorReporting';

// Development-only error debugging panel
export const ErrorDebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [selectedError, setSelectedError] = useState<any>(null);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  useEffect(() => {
    const updateErrors = () => {
      setErrors(errorReporter.getStoredErrors());
    };

    updateErrors();
    
    // Update errors every 5 seconds
    const interval = setInterval(updateErrors, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClearErrors = () => {
    errorReporter.clearStoredErrors();
    setErrors([]);
    setSelectedError(null);
  };

  const handleDownloadErrors = () => {
    const dataStr = JSON.stringify(errors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-report-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm border-destructive/20"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug Panel ({errors.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96">
      <Card className="bg-background/95 backdrop-blur-sm border-destructive/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              <CardTitle className="text-sm">Error Debug Panel</CardTitle>
              <Badge variant="destructive" className="text-xs">
                {errors.length}
              </Badge>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <EyeOff className="h-3 w-3" />
            </Button>
          </div>
          <CardDescription className="text-xs">
            Development error tracking and debugging
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex gap-2 mb-3">
            <Button
              onClick={handleClearErrors}
              variant="outline"
              size="sm"
              className="text-xs flex-1"
              disabled={errors.length === 0}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
            <Button
              onClick={handleDownloadErrors}
              variant="outline"
              size="sm"
              className="text-xs flex-1"
              disabled={errors.length === 0}
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>

          <ScrollArea className="h-64">
            {errors.length === 0 ? (
              <div className="text-center text-muted-foreground text-xs py-8">
                No errors recorded
              </div>
            ) : (
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedError === error
                        ? 'border-destructive bg-destructive/5'
                        : 'border-border hover:border-destructive/50'
                    }`}
                    onClick={() => setSelectedError(selectedError === error ? null : error)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate">
                        {error.error?.message || 'Unknown Error'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {new Date(error.timestamp).toLocaleTimeString()}
                      </Badge>
                    </div>
                    
                    {selectedError === error && (
                      <div className="mt-2 space-y-2">
                        <Separator />
                        <div>
                          <h5 className="text-xs font-medium mb-1">Stack Trace:</h5>
                          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">
                            {error.error?.stack}
                          </pre>
                        </div>
                        {error.errorInfo?.componentStack && (
                          <div>
                            <h5 className="text-xs font-medium mb-1">Component Stack:</h5>
                            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-20">
                              {error.errorInfo.componentStack}
                            </pre>
                          </div>
                        )}
                        <div>
                          <h5 className="text-xs font-medium mb-1">Context:</h5>
                          <div className="text-xs space-y-1">
                            <div>URL: {error.url}</div>
                            <div>Session: {error.sessionId}</div>
                            {error.additionalContext && (
                              <div>Additional: {JSON.stringify(error.additionalContext)}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};