import { createGlobalStyle } from 'styled-components';

import { Reset } from './reset';
import { Buttons } from './variables/buttons.tsx';
import { Scrollbar } from './variables/scrollbar.tsx';

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

    --element-background-color: #ff0000;
    --component-background-color: #ff0000;
    /* --primary-gradient: linear-gradient(to right, var(--button-primary-background-color), var(--primary-color)); */

    /* BREAKPOINTS ----- NO FUNCIONA */
    --md-breakpoint: 900px;
    ${Scrollbar}
    ${Buttons} 
  }  
`;
