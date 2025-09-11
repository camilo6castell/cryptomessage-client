import { ReactElement, ReactNode, useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../../../core/state/AppContext';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';
import { pulse } from '../../../styles/keyframes';

interface IBarButtonProps {
  children: ReactNode;
  isFor: MainComponentsEnum;
  onClick: () => void;
}

export const BarButton = ({
  children,
  isFor,
  onClick,
}: IBarButtonProps): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <StyledBarButton onClick={onClick} className={(state.app.mainState === isFor ? 'active' : '')}>{children}</StyledBarButton>
  );
};

const StyledBarButton = styled.div`
  & {
    margin: 0 0.5rem;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0);

    
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    svg {
      vertical-align: top;
      
    }
  }
  &:hover {
    background-color: #a3a3a35d;
    box-shadow: 0px 0px 2px .6rem #a3a3a382;
  }
  &.active {
    /* animation: ${pulse('#a3a3a3')} .8s infinite; */
    background-color: #a3a3a35d;
    box-shadow: 0px 0px 2px .6rem #a3a3a382;
  }
`;
