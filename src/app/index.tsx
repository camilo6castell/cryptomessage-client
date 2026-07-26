import { ReactElement } from 'react';
import { ThemeProvider } from './ui/styles/config/ThemeProvider';
import { GlobalStyle } from './ui/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import styled from 'styled-components';
import { AppContextProvider } from './core/state/AppContextProvider';
import { ToastContextProvider } from './core/state/ToastContextProvider';
import BackgroundWaves from './ui/components/general/WavesBackground';

export const App = (): ReactElement => {
  return (
    <ThemeProvider>
      <BackgroundWaves />
      <StyledApp>
        <GlobalStyle />
        <ToastContextProvider>
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </ToastContextProvider>
      </StyledApp>
    </ThemeProvider>
  );
};

export const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;

  font-family: ${({ theme }) => theme.font.mainFontFamily};
  font-weight: ${({ theme }) => theme.font.mainFontWeight};
  color: ${({ theme }) => theme.mainFontColor};

  background-color: ${({ theme }) => theme.mainBackgroundColor};
  backdrop-filter: ${({ theme }) => theme.general.mainBackdropFilter};

  transition: ${({ theme }) =>
    `
      background-color ${theme.animation.duration.slower} ${theme.animation.easing.default},
      color ${theme.animation.duration.slower} ${theme.animation.easing.default}
    `};
`;
