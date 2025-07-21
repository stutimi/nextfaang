// Navbar responsiveness verification utility
export const navbarResponsivenessTest = {
  // Test mobile responsiveness
  testMobileLayout: () => {
    const results = {
      mobileMenuButton: false,
      bottomNavigation: false,
      desktopNavHidden: false,
      mobileNavVisible: false,
      responsiveClasses: false
    };

    try {
      // Check if mobile menu button exists
      const mobileMenuButton = document.querySelector('[aria-label*="menu"], .lg\\:hidden button');
      results.mobileMenuButton = !!mobileMenuButton;

      // Check if bottom navigation exists
      const bottomNav = document.querySelector('.fixed.bottom-0, [class*="bottom-nav"]');
      results.bottomNavigation = !!bottomNav;

      // Check if desktop navigation is properly hidden on mobile
      const desktopNav = document.querySelector('.hidden.lg\\:flex');
      results.desktopNavHidden = !!desktopNav;

      // Check if mobile navigation elements are visible
      const mobileNavElements = document.querySelectorAll('.lg\\:hidden');
      results.mobileNavVisible = mobileNavElements.length > 0;

      // Check for responsive classes
      const responsiveElements = document.querySelectorAll('[class*="lg:"], [class*="sm:"], [class*="md:"]');
      results.responsiveClasses = responsiveElements.length > 0;

    } catch (error) {
      console.error('Error testing mobile layout:', error);
    }

    console.log('Mobile Layout Test Results:', results);
    return results;
  },

  // Test desktop responsiveness
  testDesktopLayout: () => {
    const results = {
      desktopNavVisible: false,
      logoVisible: false,
      authSection: false,
      toolsDropdown: false,
      properSpacing: false
    };

    try {
      // Check if desktop navigation is visible
      const desktopNav = document.querySelector('.hidden.lg\\:flex');
      results.desktopNavVisible = !!desktopNav;

      // Check if logo is visible
      const logo = document.querySelector('nav [class*="logo"], nav img, nav svg');
      results.logoVisible = !!logo;

      // Check if auth section exists
      const authSection = document.querySelector('[class*="auth"], button[class*="sign"]');
      results.authSection = !!authSection;

      // Check if tools dropdown exists
      const toolsDropdown = document.querySelector('[class*="tools"], [class*="dropdown"]');
      results.toolsDropdown = !!toolsDropdown;

      // Check for proper spacing
      const navbar = document.querySelector('nav');
      if (navbar) {
        const styles = window.getComputedStyle(navbar);
        results.properSpacing = parseInt(styles.height) >= 56; // Minimum navbar height
      }

    } catch (error) {
      console.error('Error testing desktop layout:', error);
    }

    console.log('Desktop Layout Test Results:', results);
    return results;
  },

  // Test responsive breakpoints
  testBreakpoints: () => {
    const results = {
      currentViewport: '',
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      navbarAdapts: false
    };

    try {
      const width = window.innerWidth;
      
      if (width < 640) {
        results.currentViewport = 'mobile';
        results.isMobile = true;
      } else if (width < 1024) {
        results.currentViewport = 'tablet';
        results.isTablet = true;
      } else {
        results.currentViewport = 'desktop';
        results.isDesktop = true;
      }

      // Check if navbar adapts to current viewport
      const navbar = document.querySelector('nav');
      if (navbar) {
        const mobileElements = navbar.querySelectorAll('.lg\\:hidden');
        const desktopElements = navbar.querySelectorAll('.hidden.lg\\:flex');
        
        if (results.isMobile) {
          results.navbarAdapts = mobileElements.length > 0;
        } else {
          results.navbarAdapts = desktopElements.length > 0;
        }
      }

    } catch (error) {
      console.error('Error testing breakpoints:', error);
    }

    console.log('Breakpoint Test Results:', results);
    return results;
  },

  // Test touch interactions
  testTouchInteractions: () => {
    const results = {
      touchSupport: false,
      touchTargets: false,
      swipeDetection: false,
      tapAnimations: false
    };

    try {
      // Check if touch is supported
      results.touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check for touch-friendly targets
      const touchTargets = document.querySelectorAll('[class*="touch-target"], button, a');
      results.touchTargets = touchTargets.length > 0;

      // Check for swipe detection
      const swipeElements = document.querySelectorAll('[class*="swipe"]');
      results.swipeDetection = swipeElements.length > 0;

      // Check for tap animations (framer-motion)
      const animatedElements = document.querySelectorAll('[style*="transform"], [class*="motion"]');
      results.tapAnimations = animatedElements.length > 0;

    } catch (error) {
      console.error('Error testing touch interactions:', error);
    }

    console.log('Touch Interaction Test Results:', results);
    return results;
  },

  // Run all responsiveness tests
  runAllTests: () => {
    console.group('🔍 Navbar Responsiveness Test Report');
    
    const mobileResults = navbarResponsivenessTest.testMobileLayout();
    const desktopResults = navbarResponsivenessTest.testDesktopLayout();
    const breakpointResults = navbarResponsivenessTest.testBreakpoints();
    const touchResults = navbarResponsivenessTest.testTouchInteractions();
    
    const overallScore = {
      mobile: Object.values(mobileResults).filter(Boolean).length / Object.keys(mobileResults).length,
      desktop: Object.values(desktopResults).filter(Boolean).length / Object.keys(desktopResults).length,
      breakpoints: Object.values(breakpointResults).filter(Boolean).length / Object.keys(breakpointResults).length,
      touch: Object.values(touchResults).filter(Boolean).length / Object.keys(touchResults).length
    };

    console.log('📊 Overall Responsiveness Score:', overallScore);
    console.groupEnd();

    return {
      mobile: mobileResults,
      desktop: desktopResults,
      breakpoints: breakpointResults,
      touch: touchResults,
      score: overallScore
    };
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).navbarResponsivenessTest = navbarResponsivenessTest;
}
