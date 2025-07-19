// Hook to handle reconciler recovery events

import { useEffect, useState } from 'react';

export const useReconcilerRecovery = () => {
  const [recoveryCount, setRecoveryCount] = useState(0);

  useEffect(() => {
    const handleReconcilerRecovery = (event: CustomEvent) => {
      console.log('Reconciler recovery triggered:', event.detail);
      setRecoveryCount(prev => prev + 1);
      
      // Force a re-render by updating state
      // This helps recover from reconciler errors
    };

    const handleFiberRecovery = (event: CustomEvent) => {
      console.log('Fiber recovery triggered:', event.detail);
      setRecoveryCount(prev => prev + 1);
      
      // Force a re-render for fiber errors
    };

    const handleWorkLoopRecovery = (event: CustomEvent) => {
      console.log('Work loop recovery triggered:', event.detail);
      setRecoveryCount(prev => prev + 1);
      
      // Force a re-render for work loop errors
    };

    const handleReactForceUpdate = (event: CustomEvent) => {
      console.log('React force update triggered:', event.detail);
      setRecoveryCount(prev => prev + 1);
      
      // Force immediate re-render for critical React errors
    };

    window.addEventListener('reconciler-recovery', handleReconcilerRecovery as EventListener);
    window.addEventListener('fiber-recovery', handleFiberRecovery as EventListener);
    window.addEventListener('work-loop-recovery', handleWorkLoopRecovery as EventListener);
    window.addEventListener('react-force-update', handleReactForceUpdate as EventListener);
    
    return () => {
      window.removeEventListener('reconciler-recovery', handleReconcilerRecovery as EventListener);
      window.removeEventListener('fiber-recovery', handleFiberRecovery as EventListener);
      window.removeEventListener('work-loop-recovery', handleWorkLoopRecovery as EventListener);
      window.removeEventListener('react-force-update', handleReactForceUpdate as EventListener);
    };
  }, []);

  return { recoveryCount };
};

// Hook to force component re-render on reconciler errors
export const useReconcilerSafeRender = () => {
  const [renderKey, setRenderKey] = useState(0);
  
  useEffect(() => {
    const handleReconcilerRecovery = () => {
      // Force re-render by updating key
      setRenderKey(prev => prev + 1);
    };

    window.addEventListener('reconciler-recovery', handleReconcilerRecovery);
    
    return () => {
      window.removeEventListener('reconciler-recovery', handleReconcilerRecovery);
    };
  }, []);

  return renderKey;
};