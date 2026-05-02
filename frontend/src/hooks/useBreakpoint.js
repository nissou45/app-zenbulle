import { useState, useEffect } from 'react';

export const useBreakpoint = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return {
    isMobile:  width < 480,
    isTablet:  width >= 480 && width < 768,
    isDesktop: width >= 768,
    width,
  };
};
