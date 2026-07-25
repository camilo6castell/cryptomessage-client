import { css } from 'styled-components';

/**
 * The app's signature surface treatment: a quiet, low-contrast glass panel.
 * Every panel (sidebar, chat, cards, modals) derives from this single mixin
 * so elevation reads consistently across the whole app.
 */
export const darkGlassEffect = css`
  background: ${({ theme }) => theme.darkGlassEffect.background};
  backdrop-filter: ${({ theme }) => theme.darkGlassEffect.backdropFilter};
  box-shadow: ${({ theme }) => theme.darkGlassEffect.boxShadow};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  border-radius: ${({ theme }): string => theme.general.borderRadius};
`;

/**
 * Elevated panel variant — slightly stronger shadow for cards and modals
 * that float above the glass surface.
 */
export const elevatedGlassEffect = css`
  ${darkGlassEffect}
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

/**
 * Input surface — flat, no glass effect, used for text fields and search boxes.
 */
export const inputSurface = css`
  background-color: ${({ theme }) => theme.surface.surfaceInput};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  border-radius: 1.5rem;
  transition: border-color 0.2s ${({ theme }) => theme.animation.easing.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.surface.borderFocus};
  }
`;
