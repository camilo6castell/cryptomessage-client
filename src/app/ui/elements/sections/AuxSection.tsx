import { ReactElement } from 'react';
import styled from 'styled-components';
import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model';

export const AuxSection = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  return <StyledAuxSection>{children}</StyledAuxSection>;
};

const StyledAuxSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: var(--aux-section-width);
  height: 100%;

  overflow: hidden;

  @media (width < 900px) {
    display: none;
  }
`;
