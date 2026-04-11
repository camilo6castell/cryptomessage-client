import { createGlobalStyle } from 'styled-components';

import { Reset } from './reset';
import { Buttons } from './variables/buttons.tsx';
import { Scrollbar } from './variables/scrollbar.tsx';
import { font } from './variables/fonts.tsx';

export const GlobalStyle = createGlobalStyle`
  ${Reset}   

  :root {
    /* SECTIONS WIDTH SIZES */
    /* --main-section-width: 35dvw;
    --aux-section-width: 65dvw; */
    --main-section-width: 50dvw;
    --aux-section-width: 50dvw;
    
    /* MAINBAR */
    --flex-on-main-bar: 1;
    --height-mainbar: 10%;

    --flex-under-main-bar: 3;
    --section-under-mainbar: 90%;

    /* COLORS */
    --main-background-color: ${({ theme }) => theme.mainBackgroundColor};

    --element-background-color: #000000;
    --component-background-color: #000000;

    --primary-color: rgb(42, 156, 185);
    --disable-color: rgb(157, 157, 157);
    --success-color: rgb(0, 255, 0);
    --danger-color: rgb(255, 0, 0);
    --warning-color: rgb(255, 255, 0);

    /* --primary-gradient: linear-gradient(to right, var(--button-primary-background-color), var(--primary-color)); */

    /* BREAKPOINTS ----- NO FUNCIONA */
    --md-breakpoint: 900px;
    ${font}
    ${Scrollbar}
    ${Buttons} 
    
    a {
      transition-delay: 0.5s !important;
    }
  }  
`;
