import { ReactElement } from 'react';
import { styled } from 'styled-components';
import { GenericContainer } from '../../layouts/GenericContainer';
import { BarButtons } from './pieces/BarButtons';
import { Logo } from '../../elements/Logo';

export const MainSectionNavBar = (): ReactElement => {
  return (
    <StyledMainSectionNavBar>
      <Logo />
      <BarButtons />
    </StyledMainSectionNavBar>
  );
};

const StyledMainSectionNavBar = styled(GenericContainer)`
  flex-direction: row;
  justify-content: space-around;
  width: ${({ theme }) => theme.general.mainSectionWidth};
`;
