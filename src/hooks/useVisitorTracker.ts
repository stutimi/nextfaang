import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Only track once per session
        if (sessionStorage.getItem('visitor-tracked')) {
          return;
        }

        // Get basic visitor info
        const userAgent = navigator.userAgent;
        
        // Try to get approximate location (this is a simple approach)
        let country = null;
        try {
          const response = await fetch('https://api.country.is/');
          const data = await response.json();
          country = data.country;
        } catch (error) {
          console.log('Could not determine country');
        }

        // Insert visitor log
        const { error } = await supabase
          .from('visitor_logs')
          .insert({
            user_agent: userAgent,
            country: country,
          });

        if (!error) {
          sessionStorage.setItem('visitor-tracked', 'true');
        }
      } catch (error) {
        console.log('Visitor tracking error:', error);
      }
    };

    // Track visitor after a short delay to not affect page load
    const timer = setTimeout(trackVisitor, 2000);
    
    return () => clearTimeout(timer);
  }, []);
};