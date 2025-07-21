// Navbar debugging utilities
export const navbarDebug = {
  // Check if navbar elements exist
  checkElements: () => {
    const results = {
      navbar: !!document.querySelector('nav'),
      mobileMenuButton: !!document.querySelector('[aria-label*="menu"]'),
      bottomNav: !!document.querySelector('.fixed.bottom-0'),
      navLinks: document.querySelectorAll('a[href*="/"]').length,
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
    
    console.log('Navbar Debug - Elements Check:', results);
    return results;
  },

  // Monitor touch events
  monitorTouchEvents: (duration = 10000) => {
    const events: string[] = [];
    
    const logEvent = (eventType: string) => {
      events.push(`${new Date().toISOString()}: ${eventType}`);
    };

    const handlers = {
      touchstart: () => logEvent('touchstart'),
      touchmove: () => logEvent('touchmove'),
      touchend: () => logEvent('touchend'),
      click: () => logEvent('click')
    };

    // Add event listeners
    Object.entries(handlers).forEach(([event, handler]) => {
      document.addEventListener(event, handler, { passive: true });
    });

    // Remove listeners after duration
    setTimeout(() => {
      Object.entries(handlers).forEach(([event, handler]) => {
        document.removeEventListener(event, handler);
      });
      console.log('Touch Events Log:', events);
    }, duration);

    console.log(`Monitoring touch events for ${duration}ms...`);
    return events;
  },

  // Check React component state
  checkReactState: () => {
    try {
      // This is a basic check - in a real app you'd use React DevTools API
      const reactRoot = document.querySelector('#root');
      const hasReactFiber = reactRoot && (reactRoot as any)._reactInternalFiber;
      
      console.log('React State Check:', {
        reactRoot: !!reactRoot,
        hasReactFiber: !!hasReactFiber,
        reactVersion: (window as any).React?.version || 'Unknown'
      });
    } catch (error) {
      console.warn('Error checking React state:', error);
    }
  },

  // Test navigation functionality
  testNavigation: () => {
    const results = {
      canNavigate: false,
      routerPresent: false,
      historyAPI: false
    };

    try {
      // Check if React Router is present
      results.routerPresent = !!(window as any).history?.pushState;
      results.historyAPI = !!(window as any).history;
      
      // Test if we can trigger navigation (without actually navigating)
      const testLink = document.querySelector('a[href]') as HTMLAnchorElement;
      if (testLink) {
        results.canNavigate = true;
      }
    } catch (error) {
      console.warn('Error testing navigation:', error);
    }

    console.log('Navigation Test:', results);
    return results;
  },

  // Check for CSS conflicts
  checkCSS: () => {
    const navbar = document.querySelector('nav');
    if (!navbar) {
      console.warn('Navbar not found for CSS check');
      return;
    }

    const styles = window.getComputedStyle(navbar);
    const results = {
      position: styles.position,
      zIndex: styles.zIndex,
      display: styles.display,
      visibility: styles.visibility,
      pointerEvents: styles.pointerEvents,
      touchAction: styles.touchAction
    };

    console.log('Navbar CSS Check:', results);
    return results;
  },

  // Run all checks
  runAllChecks: () => {
    console.group('🔍 Navbar Debug Report');
    
    navbarDebug.checkElements();
    navbarDebug.checkReactState();
    navbarDebug.testNavigation();
    navbarDebug.checkCSS();
    
    console.groupEnd();
  },

  // Add to window for easy access in browser console
  attachToWindow: () => {
    (window as any).navbarDebug = navbarDebug;
    console.log('🔧 Navbar debug tools attached to window.navbarDebug');
  }
};

// Auto-attach in development
if (process.env.NODE_ENV === 'development') {
  navbarDebug.attachToWindow();
}
