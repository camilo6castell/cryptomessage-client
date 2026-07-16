// import { error } from 'console';
// import { darkGlassEffect } from '../effects/DarkGlassEffect';

interface FontConfig {
  mainFontFamily: string;
  mainFontWeight: number;
}

export const fontConfig: FontConfig = {
  mainFontFamily: 'Montserrat, sans-serif',
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
  idle: string;
  disable: string;
  success: string;
  danger: string;
  warning: string;
}

export const colorConfig: ColorConfig = {
  highlight: '#f4bef3',
  idle: 'rgb(59, 51, 59)',
  disable: '#9b9b9b',
  success: 'rgb(0, 255, 0)',
  danger: 'rgb(255, 0, 0)',
  warning: 'rgb(255, 255, 0)',
};

interface GeneralConfig {
  borderRadius: string;
  mainBackdropdFilter: string;
  navBarheight: string;
  mainSectionWidth: string;
  auxSectionWidth: string;
}

const generalConfig: GeneralConfig = {
  borderRadius: '20px',
  mainBackdropdFilter: 'blur(10px)',
  navBarheight: '10%',
  mainSectionWidth: '30%',
  auxSectionWidth: '70%',
};

interface ErrorConfig {
  color: string;
}

const errorConfig: ErrorConfig = {
  color: 'rgb(255, 0, 0)',
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
  WholeAnimationDurationMS: 2000,
  TransitionAnimationDurationMS: 200,
  darkGlassEffectDanger: {
    background:
      ' radial-gradient(circle at 15% 25%, rgba(255, 0, 93, 0.507) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(192, 110, 255, 0.519) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(255, 140, 207, 0.567) 0%, transparent 45%), linear-gradient(160deg, #160e0e7f 0%, #18121c95 100%)',
  },
  darkGlassEffectSuccess: {
    background:
      ' radial-gradient(circle at 15% 25%, rgba(255, 120, 170, 0.14) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(110, 190, 255, 0.11) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(180, 140, 255, 0.08) 0%, transparent 45%), linear-gradient(160deg, #0e0e1641 0%, #12121c75 100%)',
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
  mainBackgroundColor: string;
  mainBackgroundFilter: string;
  mainFontColor: string;
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
    mainBackgroundColor: 'transparent',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#d9faff',
    darkGlassEffect: {
      background:
        ' radial-gradient(circle at 15% 25%, rgba(255, 120, 170, 0.14) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(110, 190, 255, 0.11) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(180, 140, 255, 0.08) 0%, transparent 45%), linear-gradient(160deg, #0e0e1641 0%, #12121c75 100%)',
      backdropFilter: 'blur(3rem)',
      boxShadow: '-1px -1px 0px #ffffff3a, 1px 1px 2px #69686879',
    },
    shadow: {
      textHighlighted: '0 1px 5px #ffffff7d',
      primaryBoxShadow: '-1px -1px 0px #ffffff3a, 1px 1px 2px #69686879',
    },
    waves: {
      filterPrimary: 'brightness(1) invert(0) grayscale(0) hue-rotate(0deg)',
      filterSecondary:
        'brightness(0.2) invert(0) grayscale(0) hue-rotate(0deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: animationConfig,
    error: errorConfig,
  },

  light: {
    mainBackgroundColor: '#f8fafc',
    mainBackgroundFilter: 'blur(10px)',
    mainFontColor: '#07103a',
    darkGlassEffect: {
      background:
        ' radial-gradient(circle at 15% 25%, rgba(255, 120, 170, 0.14) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(110, 190, 255, 0.11) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(180, 140, 255, 0.08) 0%, transparent 45%), linear-gradient(160deg, #0e0e1641 0%, #12121c75 100%)',
      backdropFilter: 'blur(3rem)',
      boxShadow: '-1px -1px 0px #ffffff3a, 1px 1px 2px #69686879',
    },
    shadow: {
      textHighlighted: '0 1px 5px #0000007d',
      primaryBoxShadow: '-1px -1px 0px #0000003a, 1px 1px 2px #69686879',
    },
    waves: {
      filterPrimary: 'brightness(1) invert(1) grayscale(0) hue-rotate(120deg)',
      filterSecondary:
        'brightness(0.5) invert(1) grayscale(0) hue-rotate(120deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: animationConfig,
    error: errorConfig,
  },
};
