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
    <>
      <BackgroundWaves />
      <StyledApp>
        <ThemeProvider>
          <GlobalStyle />
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </ThemeProvider>
      </StyledApp>
    </>
  );
};

export const StyledApp = styled.div`
  width: 100dvw;
  height: 100dvh;
  font-family: var(--main-font);
  font-weight: var(--main-font-weight);
  color: var(--main-font-color);

  background-color: var(--main-background-color);
  /* backdrop-filter: blur(3rem); */

  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.456);
  -webkit-font-smoothing: antialiased;
`;
