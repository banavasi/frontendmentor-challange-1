import { useEffect, useState } from "react";

export const useThemeDetector = (): boolean => {
    const getCurrentTheme = (): boolean => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getCurrentTheme());
    const mqListener = ((e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
    });
    
    useEffect(() => {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      darkThemeMq.addEventListener("change", mqListener);
      return () => darkThemeMq.removeEventListener("change",mqListener);
    }, []);
    return isDarkTheme;
}