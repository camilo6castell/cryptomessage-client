import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GenericContainer } from '../GenericContainer';
import { breakpoints } from '../../styles/maps/breakpoints';

export const StartLayout = (): ReactElement => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const Layout = styled(GenericContainer)`
  flex-direction: row;
  gap: 4rem;

  @media (${breakpoints.mobile}) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
    padding-top: calc(2rem + env(safe-area-inset-top, 0px));
    overflow-y: auto;
  }
`;
