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
      <NavBarContainer />
      <StyledOulet>
        <Outlet />
      </StyledOulet>
      <ConnectionIndicator
        $isConnected={isConnected}
        title={isConnected ? 'Conectado en tiempo real' : 'Reconectando...'}
      />
    </StyledMainLayout>
  );
};

export const StyledMainLayout = styled(GenericContainer)`
  z-index: 1;
  padding: 3rem;
  position: relative;
`;

const StyledOulet = styled(GenericContainer)`
  flex-direction: row;
`;

const ConnectionIndicator = styled.div<{ $isConnected: boolean }>`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  z-index: 2;

  background-color: ${({ $isConnected }) =>
    $isConnected ? '#3ddc84' : '#f2a33c'};

  box-shadow: 0 0 6px ${({ $isConnected }) =>
    $isConnected ? '#3ddc84' : '#f2a33c'};

  transition: background-color 0.4s ease;
`;
