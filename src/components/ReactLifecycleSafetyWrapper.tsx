import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useReconcilerSafeRender } from '@/hooks/useReconcilerRecovery';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReconcilerError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasReconcilerError: boolean;
  error: Error | null;
  retryCount: number;
}

// Class component for handling React lifecycle errors
class ReactLifecycleSafetyWrapperClass extends Component<Props, State> {
  private maxRetries = 3;
  private retryTimeout: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasReconcilerError: false,
      error: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Check if this is a reconciler-related error
    if (ReactLifecycleSafetyWrapperClass.isReconcilerError(error)) {
      return {
        hasReconcilerError: true,
        error,
      };
    }
    
    // For other errors, let them bubble up to other error boundaries
    throw error;
  }

  static isReconcilerError(error: Error): boolean {
    const reconcilerIndicators = [
      'completeWork',
      'completeUnitOfWork',
      'beginWork',
      'commitWork',
      'commitRoot',
      'reconciler',
      'fiber',
      'workLoop',
      'workLoopSync',
      'workLoopConcurrent',
      'performWork',
      'performSyncWorkOnRoot',
      'performConcurrentWorkOnRoot',
      'renderRoot',
      'commitMutation',
      'commitLayout',
      'commitPassive',
      'reconcileChildren',
      'updateHostComponent',
      'updateFunctionComponent'
    ];

    const message = error.message || '';
    const stack = error.stack || '';
    
    return reconcilerIndicators.some(indicator => 
      message.includes(indicator) || stack.includes(indicator)
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (ReactLifecycleSafetyWrapperClass.isReconcilerError(error)) {
      console.warn('React lifecycle error caught:', error, errorInfo);
      
      // Call custom error handler if provided
      if (this.props.onReconcilerError) {
        this.props.onReconcilerError(error, errorInfo);
      }

      // Report to global error handler
      if (window.globalErrorHandler) {
        window.globalErrorHandler.reportError(error, {
          type: 'react_lifecycle_error',
          componentStack: errorInfo.componentStack,
          retryCount: this.state.retryCount,
          source: 'ReactLifecycleSafetyWrapper'
        });
      }

      // Attempt automatic recovery
      this.attemptRecovery();
    }
  }

  attemptRecovery = () => {
    const { retryCount } = this.state;
    
    if (retryCount < this.maxRetries) {
      console.log(`Attempting React lifecycle recovery (${retryCount + 1}/${this.maxRetries})`);
      
      // Clear the retry timeout if it exists
      if (this.retryTimeout) {
        clearTimeout(this.retryTimeout);
      }
      
      // Retry after a delay (exponential backoff)
      this.retryTimeout = setTimeout(() => {
        this.setState({
          hasReconcilerError: false,
          error: null,
          retryCount: retryCount + 1,
        });
      }, 1000 * Math.pow(2, retryCount));
    }
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasReconcilerError) {
      // Show fallback UI or default error message
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
          <h3 className="text-sm font-medium text-destructive mb-2">
            React Lifecycle Error
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            A React internal error occurred. Attempting automatic recovery...
          </p>
          <div className="flex gap-2">
            <button
              onClick={this.attemptRecovery}
              className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded"
              disabled={this.state.retryCount >= this.maxRetries}
            >
              Retry ({this.state.retryCount}/{this.maxRetries})
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional component wrapper that uses the reconciler recovery hook
export const ReactLifecycleSafetyWrapper: React.FC<Props> = ({ children, ...props }) => {
  const renderKey = useReconcilerSafeRender();
  
  return (
    <ReactLifecycleSafetyWrapperClass key={`lifecycle-${renderKey}`} {...props}>
      {children}
    </ReactLifecycleSafetyWrapperClass>
  );
};