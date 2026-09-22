import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type ThemeMode = 'day' | 'night';

interface TimeAtmosphere {
  greeting: string;
  timeSubtitle: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
}

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  atmosphere: TimeAtmosphere;
}

const THEME_STORAGE_KEY = 'pind-da-dhaba-theme-mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial theme from localStorage or default to 'night' (luxury haveli dining default)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'day' || saved === 'night') {
      return saved;
    }
    // Default: night atmosphere for candle-lit luxury haveli ambiance
    return 'night';
  });

  // 2. Synchronize theme class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'day') {
      root.classList.add('theme-day');
      root.classList.remove('theme-night');
    } else {
      root.classList.add('theme-night');
      root.classList.remove('theme-day');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  // 3. Time-aware restaurant greeting based on visitor's browser clock
  const atmosphere = useMemo<TimeAtmosphere>(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: "GOOD MORNING",
        timeSubtitle: "Pehli Chai & Crisp Amritsari Kulchas",
        period: 'morning',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        greeting: "GOOD AFTERNOON",
        timeSubtitle: "The Afternoon Hearth is Fired",
        period: 'afternoon',
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        greeting: "THE EVENING BEGINS",
        timeSubtitle: "Smoky Tandoors & Slow-Simmered Gravies",
        period: 'evening',
      };
    } else {
      return {
        greeting: "THE NIGHT TABLE AWAITS",
        timeSubtitle: "Warm Spices & Charcoal Hearth Fire",
        period: 'night',
      };
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, atmosphere }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
