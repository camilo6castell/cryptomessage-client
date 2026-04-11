import styled from 'styled-components';
import { ReactElement } from 'react';
import { GenericContainer } from '../../layouts/GenericContainer';
import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model';

export const MainSection = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  return <StyledMainSection>{children}</StyledMainSection>;
};

const StyledMainSection = styled(GenericContainer)`
  width: var(--main-section-width);
  height: 100%;

  min-width: 350px;
  overflow: hidden;

  @media (width < 900px) {
    width: 100%;
    height: 100%;
    min-width: 100%;
  }
`;
