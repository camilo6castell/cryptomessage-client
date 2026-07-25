import { createGlobalStyle } from 'styled-components';

import { Reset } from './reset';
import { Scrollbar } from './variables/scrollbar.tsx';

// Self-hosted fonts — no runtime dependency on a third-party font CDN,
// which fits an app whose whole premise is not phoning home. Latin subset
// only: the UI copy is Spanish/English, no need to ship Cyrillic/Greek/etc.
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/space-grotesk/latin-500.css';
import '@fontsource/space-grotesk/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';

export const GlobalStyle = createGlobalStyle`
  ${Reset}

  :root {
    ${Scrollbar}
  }

  html {
    background-color: ${({ theme }) => theme.surface.canvas};
  }

  /* Visible keyboard focus everywhere — accessibility floor, not optional. */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.highlight};
    outline-offset: 2px;
  }

  /* Skeleton shimmer global */
  .skeleton {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.surface.surfaceRaised} 25%,
      ${({ theme }) => theme.surface.interactiveHover} 50%,
      ${({ theme }) => theme.surface.surfaceRaised} 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
    border-radius: 0.5rem;
  }

  @keyframes skeleton-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
