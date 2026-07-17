// (no styled-components imports needed here — this file is pure config)

/**
 * Design tokens — "Quiet Vault"
 *
 * Direction: a messenger that feels like a calm, low-glare secure room rather
 * than a flashy chat app. One signature accent (lilac) carries all emphasis;
 * everything else is a small set of neutral surfaces at different elevations.
 * The signature interaction of the product — ciphertext that must be
 * deliberately unsealed — gets its own monospace voice so it always reads as
 * "encrypted data", never as a rendering glitch.
 */

interface FontConfig {
  mainFontFamily: string;
  displayFontFamily: string;
  monoFontFamily: string;
  mainFontWeight: number;
}

export const fontConfig: FontConfig = {
  mainFontFamily: "'Inter', sans-serif",
  displayFontFamily: "'Space Grotesk', sans-serif",
  monoFontFamily: "'JetBrains Mono', monospace",
  mainFontWeight: 450,
};

interface AnimationConfig {
  general_duration: number;
  general_fade_duration: number;
}

export const animationConfig: AnimationConfig = {
  general_duration: 0.7,
  general_fade_duration: 0.8,
};

interface ColorConfig {
  highlight: string;
  highlightDeep: string;
  idle: string;
  disable: string;
  success: string;
  danger: string;
  warning: string;
}

export const colorConfig: ColorConfig = {
  highlight: '#f4bef3',
  highlightDeep: '#6c4ba6',
  idle: 'rgb(59, 51, 59)',
  disable: '#9b9b9b',
  success: '#4cd9a3',
  danger: '#ff6b6b',
  warning: '#f2b84b',
};

interface SurfaceConfig {
  canvas: string;
  surface: string;
  surfaceRaised: string;
  borderSubtle: string;
  textPrimary: string;
  textMuted: string;
}

interface GeneralConfig {
  borderRadius: string;
  mainBackdropdFilter: string;
  navBarheight: string;
  railWidth: string;
  mainSectionWidth: string;
  auxSectionWidth: string;
}

const generalConfig: GeneralConfig = {
  borderRadius: '20px',
  mainBackdropdFilter: 'blur(10px)',
  navBarheight: '10%',
  railWidth: '4.5rem',
  mainSectionWidth: '32%',
  auxSectionWidth: '68%',
};

interface ErrorConfig {
  color: string;
}

const errorConfig: ErrorConfig = {
  color: '#ff6b6b',
};

interface DarkGlassEffect {
  background: string;
}

interface ToastConfig {
  WholeAnimationDurationMS: number;
  TransitionAnimationDurationMS: number;
  darkGlassEffectDanger: DarkGlassEffect;
  darkGlassEffectSuccess: DarkGlassEffect;
}

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

interface ShadowConfig {
  textHighlighted: string;
  primaryBoxShadow: string;
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
  animation: AnimationConfig;
  error: ErrorConfig;
}

export const themes: Record<string, Theme> = {
  dark: {
    mode: 'dark',
    mainBackgroundColor: '#0a0c10',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#ecebf5',
    surface: {
      canvas: '#0a0c10',
      surface: '#12151c',
      surfaceRaised: '#1b1f2a',
      borderSubtle: 'rgba(255, 255, 255, 0.07)',
      textPrimary: '#ecebf5',
      textMuted: '#8d8fa3',
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
    },
    waves: {
      filterPrimary: 'brightness(0.9) saturate(1.1) hue-rotate(0deg)',
      filterSecondary: 'brightness(0.15) saturate(1.1) hue-rotate(0deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: animationConfig,
    error: errorConfig,
  },

  light: {
    mode: 'light',
    mainBackgroundColor: '#f2f0f7',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#181420',
    surface: {
      canvas: '#f2f0f7',
      surface: '#ffffff',
      surfaceRaised: '#f7f5fb',
      borderSubtle: 'rgba(20, 10, 30, 0.08)',
      textPrimary: '#181420',
      textMuted: '#6b6478',
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
    animation: animationConfig,
    error: errorConfig,
  },
};
