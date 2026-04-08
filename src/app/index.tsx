import { ReactElement } from 'react';
import { ThemeProvider } from './ui/styles/config/ThemeProvider';
import { GlobalStyle } from './ui/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import styled from 'styled-components';
import { AppContextProvider } from './core/state/AppContext';
import BackgroundWaves from './ui/components/general/WavesBackground';

export const App = (): ReactElement => {
  return (
    <StyledApp>
      <ThemeProvider>
        <GlobalStyle />
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
        <BackgroundWaves />
      </ThemeProvider>
    </StyledApp>
  );
};

export const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;
`;
