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

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1rem;
    overflow-y: auto;
  }
`;
