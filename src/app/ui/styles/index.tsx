import { createGlobalStyle } from 'styled-components';

import { Reset } from './reset';
// import { themeConfig } from "./config/ThemeConfig.tsx";
import { Waves } from './variables/waves.tsx';
import { Buttons } from './variables/buttons.tsx';
import { Scrollbar } from './variables/scrollbar.tsx';
import { themeConfig } from './config/ThemeConfig.tsx';

export const GlobalStyle = createGlobalStyle`
  ${Reset}   

  :root {
    /* SECTIONS WIDTH SIZES */
    /* --main-section-width: 35dvw;
    --aux-section-width: 65dvw; */
    --main-section-width: 50dvw;
    --aux-section-width: 50dvw;
    
    /* FONTS */
    /* --main-font: 'Roboto', sans-serif; */
    --main-font: 'Montserrat', sans-serif;
    --main-font-weight: 450;
    --main-font-color: ${({ theme }) => theme.mainFontColor};

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
    ${Scrollbar}
    ${Buttons}  
    ${Waves}
    /* COLOR-TESTER */
    /* color: #404040; */
  }

  body {
    font-family: var(--main-font);
    font-weight: var(--main-font-weight);
    color: var(--main-font-color);
    
    background-color: var(--main-background-color);

    transition: all ${themeConfig.animation.general_duration}s ease-in-out;      
    
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.456);
    -webkit-font-smoothing: antialiased;
  }
`;
