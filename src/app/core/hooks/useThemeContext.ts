import { useContext } from 'react';
import { ThemeContext } from '../../ui/styles/config/ThemeProvider';
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
  return ctx;
};
