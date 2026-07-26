const size = {
  mobile: '768px',
} as const;

export const breakpoints = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.mobile})`,
} as const;
