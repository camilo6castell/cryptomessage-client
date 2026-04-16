import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../../layouts/GenericContainer';
import { AppContext } from '../../../core/state/AppContext';

export const AuxSectionNavBar = (): ReactElement => {
  const { state } = useContext(AppContext);

  return <StyledAuxSectionNavBar></StyledAuxSectionNavBar>;
};

const StyledAuxSectionNavBar = styled(GenericContainer)`
  flex-direction: row;
  justify-content: space-around;
  width: ${({ theme }) => theme.general.auxSectionWidth};
  /* border: 1px solid #999999; */
`;
