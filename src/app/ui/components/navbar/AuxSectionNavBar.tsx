import { ReactElement } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../../layouts/GenericContainer';

export const AuxSectionNavBar = (): ReactElement => {
  return <StyledAuxSectionNavBar></StyledAuxSectionNavBar>;
};

const StyledAuxSectionNavBar = styled(GenericContainer)`
  flex-direction: row;
  justify-content: space-around;
  width: ${({ theme }) => theme.general.auxSectionWidth};
  /* border: 1px solid #999999; */
`;
