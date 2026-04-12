import { css } from 'styled-components';

export const darkGlassEffect = css`
  background: ${({ theme }) => theme.darkGlassEffect.background};
  backdrop-filter: ${({ theme }) => theme.darkGlassEffect.backdropFilter};
  box-shadow: ${({ theme }) => theme.darkGlassEffect.boxShadow};
  border-radius: ${({ theme }): string => theme.general.borderRadius};
`;

// BASE

// export const darkGlassEffect = css`
//   /* background-color: #0a0d1247; */
//   background:
//     radial-gradient(
//       circle at 15% 25%,
//       rgba(255, 120, 170, 0.14) 0%,
//       transparent 40%
//     ),
//     radial-gradient(
//       circle at 85% 15%,
//       rgba(110, 190, 255, 0.11) 0%,
//       transparent 40%
//     ),
//     radial-gradient(
//       circle at 50% 85%,
//       rgba(180, 140, 255, 0.08) 0%,
//       transparent 45%
//     ),
//     linear-gradient(160deg, #0e0e1641 0%, #12121c75 100%);
//   backdrop-filter: blur(3rem);
//   box-shadow:
//     -1px -1px 0px #ffffff3a,
//     1px 1px 2px #69686879;

//   border-radius: 8px;
// `;
