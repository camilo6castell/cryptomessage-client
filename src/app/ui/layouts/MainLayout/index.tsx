import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavBarContainer } from '../../../containers/NavBarContainer';
import { GenericContainer } from '../GenericContainer';
import { useRealtimeSync } from '../../../core/hooks/useRealtimeSync';

export const MainLayout = (): ReactElement => {
  const { isConnected } = useRealtimeSync();

  return (
    <StyledMainLayout>
      <NavBarContainer isConnected={isConnected} />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </StyledMainLayout>
  );
};

export const StyledMainLayout = styled(GenericContainer)`
  z-index: 1;
  padding: 2rem;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
`;

const StyledOutlet = styled(GenericContainer)`
  flex: 1;
  min-width: 0;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
`;
