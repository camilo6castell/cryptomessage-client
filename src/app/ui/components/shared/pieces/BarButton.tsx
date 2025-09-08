import { ReactElement, ReactNode, useContext } from 'react';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

import { AppContext } from '../../../../core/state/AppContext';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';

interface IBarButtonProps {
  children: ReactNode;
  cssClass: string;
  isFor: MainComponentsEnum;
  onClick: () => void;
}

export const BarButton = ({
  children,
  cssClass,
  isFor,
  onClick,
}: IBarButtonProps): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <IconContext.Provider
      value={{
        className: cssClass + (state.app.mainState === isFor ? 'active' : ''),
      }}
    >
      <StyledBarButton onClick={onClick}>{children}</StyledBarButton>
    </IconContext.Provider>
  );
};

const StyledBarButton = styled.div`
  .react-icons {
    margin: 0 0.5rem;
    color: #ffffffc1;
    background-color: rgba(255, 255, 255, 0);

    vertical-align: middle;
    font-size: 2rem;

    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
  }

  .contact-list:hover,
  .chat-list:hover,
  .user-info:hover,
  .active {
    transform: scale(1.2);
    color: #ffffff;
  }
`;
