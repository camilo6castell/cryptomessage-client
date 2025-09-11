import { keyframes } from 'styled-components';

export const colorTextAnimation = (color: string): unknown => keyframes`
    0%, 100% {
      color: ${color};
    }
    50% {
      color: var(--main-font-color);
    }
  `;

export const pulse = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color}66;
  }
  70% {
    box-shadow: 0 0 0 1rem ${color}00;
  }
  100% {
    box-shadow: 0 0 0 0 ${color}00;
  }
`
