import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  primary: '#0066FF',
  secondary: '#10B981',
  accent: '#8B5CF6',
  warning: '#FF6B35',
  success: '#10B981',
  error: '#EF4444',
  border: '#E5E7EB',
  inputBackground: '#F9FAFB',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradientStart: '#0066FF',
  gradientEnd: '#0052CC',
};

const darkColors = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textTertiary: '#6B7280',
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#A78BFA',
  warning: '#FB923C',
  success: '#10B981',
  error: '#EF4444',
  border: '#2A2A2A',
  inputBackground: '#262626',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradientStart: '#3B82F6',
  gradientEnd: '#2563EB',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const systemTheme = useColorScheme();
  const resolvedSystemTheme: Theme = systemTheme === 'dark' ? 'dark' : 'light';
  const [theme, setTheme] = useState<Theme>(resolvedSystemTheme);

  useEffect(() => {
    if (systemTheme === 'light' || systemTheme === 'dark') {
      setTheme(systemTheme);
    }
  }, [systemTheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
