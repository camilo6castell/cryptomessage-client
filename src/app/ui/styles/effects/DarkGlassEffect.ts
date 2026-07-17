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
