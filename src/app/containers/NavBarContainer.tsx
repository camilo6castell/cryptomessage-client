import { ReactElement } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../ui/layouts/GenericContainer';
import { MainSectionNavBar } from '../ui/components/navbar/MainSectionNavBar';
import { AuxSectionNavBar } from '../ui/components/navbar/AuxSectionNavBar';

export const NavBarContainer = (): ReactElement => {
  return (
    <StyledNavBar>
      <MainSectionNavBar />
      <AuxSectionNavBar />
    </StyledNavBar>
  );
};

const StyledNavBar = styled(GenericContainer)<{ $isMain?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  height: ${({ theme }) => theme.general.navBarheight};

  /* background-color: #9f9f9f; */
  z-index: 1;

  border: 1px solid #999999;
  border-radius: ${({ theme }) => theme.general.borderRadius}
    ${({ theme }) => theme.general.borderRadius} 0 0;
  box-shadow: 0px 0px 2px 2px var(--aux-background-color);

  transition: all 1s ease-in-out;
`;
