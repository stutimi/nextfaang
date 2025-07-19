import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface SafeComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}

// Higher-order component for wrapping components with error boundaries
export const SafeComponent: React.FC<SafeComponentProps> = ({ 
  children, 
  fallback,
  componentName = 'Component'
}) => {
  const defaultFallback = (
    <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
      <p className="text-sm text-muted-foreground">
        Failed to load {componentName}. Please try refreshing the page.
      </p>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={fallback || defaultFallback}
      onError={(error, errorInfo) => {
        console.error(`${componentName} Error:`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

// Hook for safe async operations
export const useSafeAsync = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const execute = React.useCallback(async (asyncFunction: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Async operation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, error, loading, setError };
};