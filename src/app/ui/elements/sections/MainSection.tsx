import { ReactElement } from 'react';
import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model';
import styled from 'styled-components';

export const MainSection = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  return <StyledMainSection>{children}</StyledMainSection>;
};

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
