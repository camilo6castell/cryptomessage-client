export const typography = {
  fontSize: {
    xs: '0.65rem',
    sm: '0.75rem',
    base: '0.85rem',
    md: '0.9rem',
    lg: '0.95rem',
    xl: '1.1rem',
    '2xl': '1.25rem',
    '3xl': '1.4rem',
    '4xl': '2.2rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.6,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
    wider: '0.05em',
  },
} as const;

export type TypographyToken = typeof typography;
