import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { GenericContainer } from '../GenericContainer';

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
`;
