// @ts-nocheck

import { error } from 'console';
import { darkGlassEffect } from '../effects/DarkGlassEffect';

const fontConfig = {
  mainFontFamily: 'Montserrat, sans-serif',
  mainFontWeight: 450,
};

export const animationConfig = {
  general_duration: 0.7,
  general_fade_duration: 0.8,
};

export const colorConfig = {
  highlight: '#f4bef3',
  idle: 'rgb(59, 51, 59)',
  disable: '#9b9b9b',
  success: 'rgb(0, 255, 0)',
  danger: 'rgb(255, 0, 0)',
  warning: 'rgb(255, 255, 0)',
};

const generalConfig = {
  borderRadius: '20px',
  mainBackgroundFilter: 'blur(10px)',
};

const errorConfig = {
  color: 'rgb(255, 0, 0)',
};

export const toastConfig = {
  duration: 4000,
  darkGlassEffectDanger: {
    background:
      ' radial-gradient(circle at 15% 25%, rgba(255, 0, 93, 0.507) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(192, 110, 255, 0.519) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(255, 140, 207, 0.567) 0%, transparent 45%), linear-gradient(160deg, #160e0e7f 0%, #18121c95 100%)',
    backdropFilter: 'blur(3rem)',
    boxShadow: '-1px -1px 0px #ffffff3a, 1px 1px 2px #69686879',
    color: colorConfig.danger,
    fontColor: '#fff',
    borderRadius: '1rem',
    padding: '2rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    textAlign: 'center',
    maxWidth: '24rem',
    animation: 'fadeUp 0.3s ease both',
    zIndex: 9999,
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkGlassEffectSuccess: {
    background:
      ' radial-gradient(circle at 15% 25%, rgba(255, 120, 170, 0.14) 0%, transparent 40%), radial-gradient(circle at 85% 15%, rgba(110, 190, 255, 0.11) 0%, transparent 40%), radial-gradient(circle at 50% 85%, rgba(180, 140, 255, 0.08) 0%, transparent 45%), linear-gradient(160deg, #0e0e1641 0%, #12121c75 100%)',
    backdropFilter: 'blur(3rem)',
    boxShadow: '-1px -1px 0px #ffffff3a, 1px 1px 2px #69686879',
    color: colorConfig.success,
    fontColor: '#fff',
    borderRadius: '1rem',
    padding: '2rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    textAlign: 'center',
    maxWidth: '24rem',
    animation: 'fadeUp 0.3s ease both',
    zIndex: 9999,
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const themes = {
  dark: {
    mainBackgroundColor: '#02071d39',
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
      filter: 'brightness(1) invert(0) grayscale(0) hue-rotate(0deg)',
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
      filter: 'brightness(1) invert(1) grayscale(0) hue-rotate(120deg)',
    },
    toast: toastConfig,
    general: generalConfig,
    color: colorConfig,
    font: fontConfig,
    animation: animationConfig,
    error: errorConfig,
  },
};
