import { keyframes } from 'styled-components';

export const colorTextAnimation = (color: string): unknown => keyframes`
    0%, 100% {
      color: ${color};
    }
    50% {
      color: var(--main-font-color);
    }
  `;
