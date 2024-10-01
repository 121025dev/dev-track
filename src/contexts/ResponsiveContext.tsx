import { createContext, useContext, useEffect, useState } from "react";

type ResponsiveContextType = {
  width: number
};

const ResponsiveContext = createContext<ResponsiveContextType>({
  width: window.innerWidth
});

export function ResponsiveContextProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ width }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export const useResponsive = () => {
  const { width } = useContext(ResponsiveContext);
  return {
    width,
    isMobile: width <= 480,
    isTablet: width > 480 && width <= 1024,
    isDesktop: width > 1024,
    isWideScreen: width > 1600
  };
};

export type ResponsiveProps = {
  $isMobile: boolean
};