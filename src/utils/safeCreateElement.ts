import React from 'react';

// Safe createElement wrapper that handles errors gracefully
export const safeCreateElement = (
  component: any,
  props?: any,
  ...children: React.ReactNode[]
): React.ReactElement | null => {
  try {
    // Validate component
    if (!component) {
      console.warn('safeCreateElement: Component is null or undefined');
      return null;
    }

    // Validate component is a valid React component
    if (typeof component !== 'function' && typeof component !== 'string') {
      console.warn('safeCreateElement: Invalid component type:', typeof component);
      return null;
    }

    // Create element safely
    return React.createElement(component, props, ...children);
  } catch (error) {
    console.error('safeCreateElement: Failed to create element:', error);
    console.error('Component:', component);
    console.error('Props:', props);
    console.error('Children:', children);
    return null;
  }
};

// Hook for safe component rendering
export const useSafeComponent = (component: any, props?: any, fallback?: React.ReactNode) => {
  const [safeComponent, setSafeComponent] = React.useState<React.ReactElement | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    try {
      if (component) {
        const element = safeCreateElement(component, props);
        setSafeComponent(element);
        setError(null);
      } else {
        setSafeComponent(null);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      setSafeComponent(null);
    }
  }, [component, props]);

  if (error && fallback) {
    return fallback;
  }

  return safeComponent;
};