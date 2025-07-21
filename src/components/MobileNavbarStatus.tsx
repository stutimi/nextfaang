import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const MobileNavbarStatus = () => {
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [navbarElement, setNavbarElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const findNavbar = () => {
      const navbar = document.querySelector('nav') as HTMLElement;
      setNavbarElement(navbar);
    };

    window.addEventListener('scroll', handleScroll);
    findNavbar();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile) return null;

  const navbarStyles = navbarElement ? window.getComputedStyle(navbarElement) : null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-[60] max-w-xs">
      <div className="space-y-1">
        <div>📱 Mobile Mode: {isMobile ? 'ON' : 'OFF'}</div>
        <div>📜 Scroll Y: {scrollY}px</div>
        <div>🧭 Navbar Found: {navbarElement ? 'YES' : 'NO'}</div>
        {navbarStyles && (
          <>
            <div>📍 Position: {navbarStyles.position}</div>
            <div>👁️ Visibility: {navbarStyles.visibility}</div>
            <div>🎭 Opacity: {navbarStyles.opacity}</div>
            <div>🔄 Transform: {navbarStyles.transform === 'none' ? 'none' : 'has transform'}</div>
            <div>📏 Top: {navbarStyles.top}</div>
          </>
        )}
      </div>
    </div>
  );
};
