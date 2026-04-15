import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../../layouts/GenericContainer';
import { AppContext } from '../../../core/state/AppContext';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import { SearchBox } from '../contactlist/pieces/SearchBox';
import { useContactSearch } from '../../../core/hooks/useContactSearch';

export const AuxSectionNavBar = (): ReactElement => {
  const { state } = useContext(AppContext);
  const { form, handleInput, handleSearch } = useContactSearch();
  return (
    <StyledAuxSectionNavBar>
      {state.app.mainState === MainComponentsEnum.ChatList && (
        <span>placeholder</span>
      )}
      {state.app.mainState === MainComponentsEnum.ContactList && (
        <SearchBox
          handleSearchContactSubmit={handleSearch}
          handleInput={handleInput}
          value={form.username}
        />
      )}
      {state.app.mainState === MainComponentsEnum.UserInfo && (
        <span>placeholder</span>
      )}
    </StyledAuxSectionNavBar>
  );
};

const StyledAuxSectionNavBar = styled(GenericContainer)`
  flex-direction: row;
  justify-content: space-around;
  width: ${({ theme }) => theme.general.auxSectionWidth};
  /* border: 1px solid #999999; */
`;
