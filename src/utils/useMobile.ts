import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};

// Reduce particle count on mobile
export const useMobileParticleCount = (desktopCount: number) => {
  const isMobile = useIsMobile();
  return isMobile ? Math.max(2, Math.floor(desktopCount / 4)) : desktopCount;
};
