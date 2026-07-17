import React, { useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes } from './Themes';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Restaurar desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Selección del objeto de styled-components
  const currentTheme = theme === 'dark' ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
