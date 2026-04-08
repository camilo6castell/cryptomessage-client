import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const MainLayout = (): ReactElement => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
