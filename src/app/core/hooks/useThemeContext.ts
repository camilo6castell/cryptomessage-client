import { useContext } from 'react';
import {
  ThemeContext,
  ThemeContextType,
} from '../../ui/styles/config/ThemeContext';

export const useThemeContext = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider');
  return ctx;
};
