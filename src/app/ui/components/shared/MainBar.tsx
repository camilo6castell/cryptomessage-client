import { ReactElement } from 'react';
import styled from 'styled-components';
import { IReactElementChildrenProps } from '../../../core/models/reactElementChildren.model.ts';

interface MainBarProps extends IReactElementChildrenProps {
  isMain?: boolean;
}

export const MainBar = ({ children, isMain }: MainBarProps): ReactElement => {
  return <StyledMainBar $isMain={isMain}>{children}</StyledMainBar>;
};

const StyledMainBar = styled.div<{ $isMain?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: var(--height-mainbar);

  padding: 0.5rem 1rem;

  background-color: var(--main-background-color);
  z-index: 1;

  border: 1px solid #ffff;
  border-radius: ${(props) => (props.$isMain ? '0 0 0 1rem' : '0 0 1rem 0')};
  box-shadow: 0px 0px 2px 2px var(--aux-background-color);

  transition: all 1s ease-in-out;
`;
