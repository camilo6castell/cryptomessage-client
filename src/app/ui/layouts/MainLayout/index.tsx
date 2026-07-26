import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavBarContainer } from '../../../containers/NavBarContainer';
import { GenericContainer } from '../GenericContainer';
import { useRealtimeSync } from '../../../core/hooks/useRealtimeSync';
import { useMediaQuery } from '../../../core/hooks/useMediaQuery';
import { breakpoints } from '../../styles/maps/breakpoints';

export const MainLayout = (): ReactElement => {
  const { isConnected } = useRealtimeSync();
  const isMobile = useMediaQuery(breakpoints.mobile);

  return (
    <StyledMainLayout $isMobile={isMobile}>
      {!isMobile && <NavBarContainer isConnected={isConnected} />}
      <StyledOutlet $isMobile={isMobile}>
        <Outlet />
      </StyledOutlet>
      {isMobile && <NavBarContainer isConnected={isConnected} />}
    </StyledMainLayout>
  );
};

export const StyledMainLayout = styled(GenericContainer)<{
  $isMobile: boolean;
}>`
  z-index: 1;
  flex-direction: ${({ $isMobile }): string => ($isMobile ? 'column' : 'row')};
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;

  ${({ $isMobile }): string => ($isMobile ? 'padding: 0;' : 'padding: 2rem;')}
`;

const StyledOutlet = styled(GenericContainer)<{ $isMobile: boolean }>`
  flex: 1;
  min-width: 0;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;

  ${({ $isMobile }): string =>
    $isMobile
      ? 'padding-bottom: 4.5rem; padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px));'
      : ''}
`;
