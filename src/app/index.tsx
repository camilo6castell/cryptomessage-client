import { ReactElement } from 'react';
// import styled from 'styled-components';

import { GlobalStyle } from './ui/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import styled from 'styled-components';
import { AppContextProvider } from './core/state/AppContext';

export const App = (): ReactElement => {
  return (
    <StyledApp>
      <GlobalStyle />
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </StyledApp>
  );
};

export const StyledApp = styled.div`
  width: 100%;
  height: 100%;

  background-color: var(--main-background-color);

  font-family: var(--main-font);
  font-weight: var(--main-font-weight);
  color: var(--main-font-color);
`;
