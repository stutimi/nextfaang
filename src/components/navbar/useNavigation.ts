import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    try {
      // If we're not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } else {
        // We're already on the home page, just scroll
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    } catch (error) {
      console.warn('Error in scrollToSection:', error);
    }
  }, [location.pathname, navigate]);

  return { navigate, location, scrollToSection };
};