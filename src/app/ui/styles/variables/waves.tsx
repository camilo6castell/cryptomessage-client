import { css } from 'styled-components';

export const Waves = css`
  --wave-color-a: ${({ theme }) => theme.waves.a.bg};
  --wave-color-b: ${({ theme }) => theme.waves.b.bg};
  --section-accent: transparent;
  --wave-top-a: ${({ theme }) => theme.waves.a.top};
  --wave-left-a: ${({ theme }) => theme.waves.a.left};
  --wave-width-a: ${({ theme }) => theme.waves.a.width};
  --wave-height-a: ${({ theme }) => theme.waves.a.height};
  --wave-blur-a: ${({ theme }) => theme.waves.a.blur};
  --wave-opacity-a: ${({ theme }) => theme.waves.a.opacity};
  --wave-top-b: ${({ theme }) => theme.waves.b.top};
  --wave-left-b: ${({ theme }) => theme.waves.b.left};
  --wave-width-b: ${({ theme }) => theme.waves.b.width};
  --wave-height-b: ${({ theme }) => theme.waves.b.height};
  --wave-blur-b: ${({ theme }) => theme.waves.b.blur};
  --wave-opacity-b: ${({ theme }) => theme.waves.b.opacity};
`;
