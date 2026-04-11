import { css } from 'styled-components';

export const font = css`
  /* FONTS */
  /* --main-font: 'Roboto', sans-serif; */
  --main-font: 'Montserrat', sans-serif;
  --main-font-weight: 450;
  --main-font-color: ${({ theme }) => theme.mainFontColor};
`;
