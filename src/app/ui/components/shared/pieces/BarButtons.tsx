import { ReactElement, useContext } from 'react';
import styled from 'styled-components';

// ICONS
import { BarButton } from '../pieces/BarButton';
import { IoIosHappy } from 'react-icons/io';
import { TbMessageFilled } from 'react-icons/tb';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { AppContext } from '../../../../core/state/AppContext';
import { StorageService } from '../../../../core/services/general/storage.service';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';
import { Actions } from '../../../../core/models/enums/Actions.enum';

export const BarButtons = (): ReactElement => {
  // CONTEXT
  const { dispatch } = useContext(AppContext);
  // END CONTEXT

  return (
    <StyledBarButtons>
      <BarButton
        isFor={MainComponentsEnum.ContactList}
        cssClass="react-icons contact-list "
        onClick={() => {
          dispatch({
            type: Actions.SetMainState,
            payload: MainComponentsEnum.ContactList,
          });
          const storageService = new StorageService();
          storageService.set<MainComponentsEnum>(
            'CURRENT',
            MainComponentsEnum.ContactList,
          );
        }}
      >
        <RiContactsBook2Fill />
      </BarButton>

      <BarButton
        isFor={MainComponentsEnum.ChatList}
        cssClass="react-icons chat-list "
        onClick={() => {
          dispatch({
            type: Actions.SetMainState,
            payload: MainComponentsEnum.ChatList,
          });
          const storageService = new StorageService();
          storageService.set<MainComponentsEnum>(
            'CURRENT',
            MainComponentsEnum.ChatList,
          );
        }}
      >
        <TbMessageFilled />
      </BarButton>

      <BarButton
        isFor={MainComponentsEnum.UserInfo}
        cssClass="react-icons user-info "
        onClick={() => {
          dispatch({
            type: Actions.SetMainState,
            payload: MainComponentsEnum.UserInfo,
          });
          const storageService = new StorageService();
          storageService.set<MainComponentsEnum>(
            'CURRENT',
            MainComponentsEnum.UserInfo,
          );
        }}
      >
        <IoIosHappy />
      </BarButton>
    </StyledBarButtons>
  );
};

const StyledBarButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 100%;
  width: 100%;
  margin: 0 2.5rem;
`;
