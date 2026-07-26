/* eslint-disable quotes */
import { spacing } from '../tokens/spacing';
import { motion } from '../tokens/motion';
import { typography } from '../tokens/typography';

/**
 * Design tokens — "Quiet Vault" v2
 *
 * A messenger that feels like a calm, low-glare secure room. One signature
 * accent (lilac) carries all emphasis; everything else is a small set of
 * neutral surfaces at different elevations. Ciphertext gets its own monospace
 * voice so it always reads as "encrypted data", never as a rendering glitch.
 */

interface ColorConfig {
  highlight: string;
  highlightDeep: string;
  highlightTint10: string;
  highlightTint14: string;
  highlightTint20: string;
  highlightTint30: string;
  idle: string;
  disable: string;
  success: string;
  successTint12: string;
  danger: string;
  dangerTint12: string;
  warning: string;
  warningTint12: string;
}

interface SurfaceConfig {
  canvas: string;
  surface: string;
  surfaceRaised: string;
  surfaceInput: string;
  borderSubtle: string;
  borderFocus: string;
  textPrimary: string;
  textMuted: string;
  interactiveHover: string;
  interactiveActive: string;
  overlay: string;
  scrim: string;
}

interface GeneralConfig {
  borderRadius: string;
  borderRadiusSm: string;
  borderRadiusLg: string;
  mainBackdropFilter: string;
  navBarheight: string;
  railWidth: string;
  mainSectionWidth: string;
  auxSectionWidth: string;
}

interface ErrorConfig {
  color: string;
}

interface DarkGlassEffect {
  background: string;
}

interface ToastConfig {
  WholeAnimationDurationMS: number;
  TransitionAnimationDurationMS: number;
  darkGlassEffectDanger: DarkGlassEffect;
  darkGlassEffectSuccess: DarkGlassEffect;
}

interface ShadowConfig {
  textHighlighted: string;
  primaryBoxShadow: string;
  sm: string;
  md: string;
  lg: string;
}

interface WavesConfig {
  filterPrimary: string;
  filterSecondary: string;
}

export interface Theme {
  mode: 'dark' | 'light';
  mainBackgroundColor: string;
  mainBackgroundFilter: string;
  mainFontColor: string;
  surface: SurfaceConfig;
  darkGlassEffect: {
    background: string;
    backdropFilter: string;
    boxShadow: string;
  };
  shadow: ShadowConfig;
  waves: WavesConfig;
  toast: ToastConfig;
  general: GeneralConfig;
  color: ColorConfig;
  font: FontConfig;
  animation: typeof motion;
  spacing: typeof spacing;
  typography: typeof typography;
  error: ErrorConfig;
}

interface FontConfig {
  mainFontFamily: string;
  displayFontFamily: string;
  monoFontFamily: string;
  mainFontWeight: number;
}

export const fontConfig: FontConfig = {
  mainFontFamily: "'Inter', sans-serif",
  displayFontFamily: "'Montserrat', sans-serif",
  monoFontFamily: "'JetBrains Mono', monospace",
  mainFontWeight: 450,
};

const generalConfig: GeneralConfig = {
  borderRadius: '20px',
  borderRadiusSm: '12px',
  borderRadiusLg: '24px',
  mainBackdropFilter: 'blur(10px)',
  navBarheight: '10%',
  railWidth: '4.5rem',
  mainSectionWidth: '32%',
  auxSectionWidth: '68%',
};

const errorConfig: ErrorConfig = {
  color: '#ff6b6b',
};

export const toastConfig: ToastConfig = {
  WholeAnimationDurationMS: 3200,
  TransitionAnimationDurationMS: 250,
  darkGlassEffectDanger: {
    background: 'linear-gradient(160deg, #3a1620 0%, #1f1016 100%)',
  },
  darkGlassEffectSuccess: {
    background: 'linear-gradient(160deg, #16241f 0%, #101a1c 100%)',
  },
};

export const colorConfig: ColorConfig = {
  highlight: '#f382ef',
  highlightDeep: '#6c4ba6',
  highlightTint10: 'rgba(244, 190, 243, 0.10)',
  highlightTint14: 'rgba(244, 190, 243, 0.14)',
  highlightTint20: 'rgba(244, 190, 243, 0.20)',
  highlightTint30: 'rgba(244, 190, 243, 0.35)',
  idle: 'rgb(59, 51, 59)',
  disable: '#9b9b9b',
  success: '#4cd9a3',
  successTint12: 'rgba(76, 217, 163, 0.12)',
  danger: '#ff6b6b',
  dangerTint12: 'rgba(255, 107, 107, 0.12)',
  warning: '#f2b84b',
  warningTint12: 'rgba(242, 184, 75, 0.12)',
};

export const themes: Record<string, Theme> = {
  dark: {
    mode: 'dark',
    mainBackgroundColor: '#0a0c1041',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#ecebf5',
    surface: {
      canvas: '#0a0c10',
      surface: '#12151c',
      surfaceRaised: '#1b1f2a',
      surfaceInput: '#161a24',
      borderSubtle: 'rgba(255, 255, 255, 0.07)',
      borderFocus: 'rgba(197, 244, 190, 0.5)',
      textPrimary: '#ecebf5',
      textMuted: '#8d8fa3',
      interactiveHover: 'rgba(255, 255, 255, 0.06)',
      interactiveActive: 'rgba(255, 255, 255, 0.09)',
      overlay: 'rgba(5, 6, 10, 0.55)',
      scrim: 'rgba(5, 6, 10, 0.70)',
    },
    darkGlassEffect: {
      background:
        'radial-gradient(circle at 15% 20%, rgba(244, 190, 243, 0.05) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(108, 75, 166, 0.10) 0%, transparent 50%), linear-gradient(160deg, rgba(18, 21, 28, 0.82) 0%, rgba(10, 12, 16, 0.92) 100%)',
      backdropFilter: 'blur(2.5rem)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.35)',
    },
    shadow: {
      textHighlighted: '0 1px 12px rgba(244, 190, 243, 0.45)',
      primaryBoxShadow: '0 8px 30px rgba(0,0,0,0.35)',
      sm: '0 1px 3px rgba(0,0,0,0.25)',
      md: '0 4px 16px rgba(0,0,0,0.30)',
      lg: '0 12px 40px rgba(0,0,0,0.40)',
    },
    waves: {
      filterPrimary: 'brightness(0.9) saturate(1.1) hue-rotate(0deg)',
      filterSecondary: 'brightness(0.15) saturate(1.1) hue-rotate(0deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: motion,
    spacing,
    typography,
    error: errorConfig,
  },

  light: {
    mode: 'light',
    mainBackgroundColor: '#f2f0f78c',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#181420',
    surface: {
      canvas: '#f2f0f7',
      surface: '#ffffff',
      surfaceRaised: '#f7f5fb',
      surfaceInput: '#f0eef5',
      borderSubtle: 'rgba(20, 10, 30, 0.08)',
      borderFocus: 'rgba(108, 75, 166, 0.50)',
      textPrimary: '#181420',
      textMuted: '#6b6478',
      interactiveHover: 'rgba(20, 10, 30, 0.05)',
      interactiveActive: 'rgba(20, 10, 30, 0.08)',
      overlay: 'rgba(20, 10, 30, 0.40)',
      scrim: 'rgba(20, 10, 30, 0.55)',
    },
    darkGlassEffect: {
      background:
        'radial-gradient(circle at 15% 20%, rgba(244, 190, 243, 0.16) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(108, 75, 166, 0.08) 0%, transparent 50%), linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(247,245,251,0.96) 100%)',
      backdropFilter: 'blur(2.5rem)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 30px rgba(24,20,32,0.08)',
    },
    shadow: {
      textHighlighted: '0 1px 12px rgba(108, 75, 166, 0.25)',
      primaryBoxShadow: '0 8px 30px rgba(24,20,32,0.08)',
      sm: '0 1px 3px rgba(24,20,32,0.06)',
      md: '0 4px 16px rgba(24,20,32,0.08)',
      lg: '0 12px 40px rgba(24,20,32,0.10)',
    },
    waves: {
      filterPrimary:
        'brightness(1.05) invert(1) saturate(0.8) hue-rotate(200deg)',
      filterSecondary:
        'brightness(0.6) invert(1) saturate(0.6) hue-rotate(200deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: motion,
    spacing,
    typography,
    error: errorConfig,
  },
};
