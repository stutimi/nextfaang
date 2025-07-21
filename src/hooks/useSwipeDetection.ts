import { useState, useEffect, useCallback, useRef } from 'react';

interface SwipeOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const useSwipeDetection = (ref: React.RefObject<HTMLElement>, options: SwipeOptions = {}) => {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
  } = options;

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  // Use refs to store the latest callback functions to avoid stale closures
  const callbacksRef = useRef({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown });

  // Update callbacks ref when they change
  useEffect(() => {
    callbacksRef.current = { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  // Reset if the user releases touch
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (distanceX > threshold && callbacksRef.current.onSwipeLeft) {
        callbacksRef.current.onSwipeLeft();
      } else if (distanceX < -threshold && callbacksRef.current.onSwipeRight) {
        callbacksRef.current.onSwipeRight();
      }
    } else {
      if (distanceY > threshold && callbacksRef.current.onSwipeUp) {
        callbacksRef.current.onSwipeUp();
      } else if (distanceY < -threshold && callbacksRef.current.onSwipeDown) {
        callbacksRef.current.onSwipeDown();
      }
    }

    setTouchEnd(null);
    setTouchStart(null);
  }, [touchStart, touchEnd, threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Prevent default to avoid conflicts with other touch handlers
      e.preventDefault();
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    // Use passive listeners for better performance
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, handleTouchEnd, touchStart]);

  return {
    touchStart,
    touchEnd
  };
};