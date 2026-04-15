import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavBarContainer } from '../../../containers/NavBarContainer';
import { GenericContainer } from '../GenericContainer';

export const MainLayout = (): ReactElement => {
  return (
    <StyledMainLayout>
      <NavBarContainer />
      <StyledOulet>
        <Outlet />
      </StyledOulet>
    </StyledMainLayout>
  );
};

export const StyledMainLayout = styled(GenericContainer)`
  z-index: 1;
  padding: 3rem;
`;

const StyledOulet = styled(GenericContainer)`
  flex-direction: row;
`;
