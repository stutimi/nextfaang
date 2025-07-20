// Navigation functionality verification utility
export const navigationFunctionalityTest = {
  // Test all navigation links
  testNavigationLinks: () => {
    const results = {
      mainNavLinks: [],
      toolsLinks: [],
      bottomNavLinks: [],
      brokenLinks: [],
      workingLinks: [],
      totalLinks: 0
    };

    try {
      // Test main navigation links
      const mainNavLinks = document.querySelectorAll('nav a[href]');
      mainNavLinks.forEach((link: Element) => {
        const href = (link as HTMLAnchorElement).href;
        const text = link.textContent?.trim() || '';
        results.mainNavLinks.push({ href, text });
        results.totalLinks++;
      });

      // Test tools dropdown links
      const toolsLinks = document.querySelectorAll('[class*="tools"] a[href], [class*="dropdown"] a[href]');
      toolsLinks.forEach((link: Element) => {
        const href = (link as HTMLAnchorElement).href;
        const text = link.textContent?.trim() || '';
        results.toolsLinks.push({ href, text });
        results.totalLinks++;
      });

      // Test bottom navigation links
      const bottomNavLinks = document.querySelectorAll('.fixed.bottom-0 a[href]');
      bottomNavLinks.forEach((link: Element) => {
        const href = (link as HTMLAnchorElement).href;
        const text = link.textContent?.trim() || '';
        results.bottomNavLinks.push({ href, text });
        results.totalLinks++;
      });

      // Validate links (basic check for proper format)
      const allLinks = [...results.mainNavLinks, ...results.toolsLinks, ...results.bottomNavLinks];
      allLinks.forEach(link => {
        if (link.href && (link.href.startsWith('http') || link.href.startsWith('/'))) {
          results.workingLinks.push(link);
        } else {
          results.brokenLinks.push(link);
        }
      });

    } catch (error) {
      console.error('Error testing navigation links:', error);
    }

    console.log('Navigation Links Test Results:', results);
    return results;
  },

  // Test navigation consistency across pages
  testNavigationConsistency: () => {
    const results = {
      navbarPresent: false,
      logoPresent: false,
      mainNavItems: 0,
      authSectionPresent: false,
      themeTogglePresent: false,
      mobileMenuPresent: false,
      consistentStyling: false
    };

    try {
      // Check if navbar is present
      const navbar = document.querySelector('nav');
      results.navbarPresent = !!navbar;

      // Check if logo is present
      const logo = document.querySelector('nav [class*="logo"], nav img, nav svg');
      results.logoPresent = !!logo;

      // Count main navigation items
      const navItems = document.querySelectorAll('nav a[href], nav button');
      results.mainNavItems = navItems.length;

      // Check if auth section is present
      const authSection = document.querySelector('[class*="auth"], button[class*="sign"]');
      results.authSectionPresent = !!authSection;

      // Check if theme toggle is present
      const themeToggle = document.querySelector('[class*="theme"], [aria-label*="theme"]');
      results.themeTogglePresent = !!themeToggle;

      // Check if mobile menu is present
      const mobileMenu = document.querySelector('[aria-label*="menu"], .lg\\:hidden button');
      results.mobileMenuPresent = !!mobileMenu;

      // Check for consistent styling
      if (navbar) {
        const styles = window.getComputedStyle(navbar);
        results.consistentStyling = styles.position === 'sticky' || styles.position === 'fixed';
      }

    } catch (error) {
      console.error('Error testing navigation consistency:', error);
    }

    console.log('Navigation Consistency Test Results:', results);
    return results;
  },

  // Test navigation behavior
  testNavigationBehavior: () => {
    const results = {
      stickyNavbar: false,
      scrollBehavior: false,
      mobileMenuToggle: false,
      routeChanges: false,
      activeStates: false
    };

    try {
      // Check if navbar is sticky
      const navbar = document.querySelector('nav');
      if (navbar) {
        const styles = window.getComputedStyle(navbar);
        results.stickyNavbar = styles.position === 'sticky' || styles.position === 'fixed';
      }

      // Check for scroll behavior
      const scrollElements = document.querySelectorAll('[class*="scroll"]');
      results.scrollBehavior = scrollElements.length > 0;

      // Check mobile menu toggle functionality
      const mobileMenuButton = document.querySelector('[aria-label*="menu"]');
      if (mobileMenuButton) {
        results.mobileMenuToggle = true;
      }

      // Check for route change handling
      const routerLinks = document.querySelectorAll('a[href^="/"]');
      results.routeChanges = routerLinks.length > 0;

      // Check for active states
      const activeElements = document.querySelectorAll('[class*="active"], [aria-current]');
      results.activeStates = activeElements.length > 0;

    } catch (error) {
      console.error('Error testing navigation behavior:', error);
    }

    console.log('Navigation Behavior Test Results:', results);
    return results;
  },

  // Test specific navigation routes
  testNavigationRoutes: () => {
    const expectedRoutes = [
      '/',
      '/dsa',
      '/system-design',
      '/competitive-programming',
      '/resources',
      '/community',
      '/about',
      '/cp-arena',
      '/contest-analyzer',
      '/cp-dictionary',
      '/language-translation',
      '/cp-tricks-tips'
    ];

    const results = {
      expectedRoutes: expectedRoutes.length,
      foundRoutes: [],
      missingRoutes: [],
      extraRoutes: []
    };

    try {
      // Find all navigation links
      const navLinks = document.querySelectorAll('nav a[href], [class*="nav"] a[href]');
      const foundHrefs = new Set();

      navLinks.forEach((link: Element) => {
        const href = (link as HTMLAnchorElement).getAttribute('href');
        if (href && href.startsWith('/')) {
          foundHrefs.add(href);
          results.foundRoutes.push(href);
        }
      });

      // Check for missing routes
      expectedRoutes.forEach(route => {
        if (!foundHrefs.has(route)) {
          results.missingRoutes.push(route);
        }
      });

      // Check for extra routes
      foundHrefs.forEach(href => {
        if (!expectedRoutes.includes(href as string)) {
          results.extraRoutes.push(href);
        }
      });

    } catch (error) {
      console.error('Error testing navigation routes:', error);
    }

    console.log('Navigation Routes Test Results:', results);
    return results;
  },

  // Test accessibility
  testNavigationAccessibility: () => {
    const results = {
      ariaLabels: 0,
      keyboardNavigation: false,
      focusManagement: false,
      semanticMarkup: false,
      screenReaderSupport: false
    };

    try {
      // Check for aria labels
      const ariaElements = document.querySelectorAll('nav [aria-label], nav [aria-current]');
      results.ariaLabels = ariaElements.length;

      // Check for keyboard navigation support
      const focusableElements = document.querySelectorAll('nav button, nav a, nav [tabindex]');
      results.keyboardNavigation = focusableElements.length > 0;

      // Check for focus management
      const focusElements = document.querySelectorAll('nav [class*="focus"], nav :focus-visible');
      results.focusManagement = focusElements.length > 0;

      // Check for semantic markup
      const semanticElements = document.querySelectorAll('nav, header, main');
      results.semanticMarkup = semanticElements.length >= 2;

      // Check for screen reader support
      const srElements = document.querySelectorAll('[class*="sr-only"], [aria-hidden]');
      results.screenReaderSupport = srElements.length > 0;

    } catch (error) {
      console.error('Error testing navigation accessibility:', error);
    }

    console.log('Navigation Accessibility Test Results:', results);
    return results;
  },

  // Run all navigation tests
  runAllTests: () => {
    console.group('🔍 Navigation Functionality Test Report');
    
    const linksResults = navigationFunctionalityTest.testNavigationLinks();
    const consistencyResults = navigationFunctionalityTest.testNavigationConsistency();
    const behaviorResults = navigationFunctionalityTest.testNavigationBehavior();
    const routesResults = navigationFunctionalityTest.testNavigationRoutes();
    const accessibilityResults = navigationFunctionalityTest.testNavigationAccessibility();
    
    const overallScore = {
      links: linksResults.workingLinks.length / Math.max(linksResults.totalLinks, 1),
      consistency: Object.values(consistencyResults).filter(v => typeof v === 'boolean' ? v : v > 0).length / Object.keys(consistencyResults).length,
      behavior: Object.values(behaviorResults).filter(Boolean).length / Object.keys(behaviorResults).length,
      routes: (routesResults.expectedRoutes - routesResults.missingRoutes.length) / routesResults.expectedRoutes,
      accessibility: Object.values(accessibilityResults).filter(v => typeof v === 'boolean' ? v : v > 0).length / Object.keys(accessibilityResults).length
    };

    console.log('📊 Overall Navigation Score:', overallScore);
    console.groupEnd();

    return {
      links: linksResults,
      consistency: consistencyResults,
      behavior: behaviorResults,
      routes: routesResults,
      accessibility: accessibilityResults,
      score: overallScore
    };
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).navigationFunctionalityTest = navigationFunctionalityTest;
}
