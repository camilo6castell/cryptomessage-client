import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { FrontPage } from './pieces/FrontPage';
import { AppContext } from '../../../core/state/AppContext';

export const Presentation = ({
  isLogin,
}: {
  isLogin: boolean;
}): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <StyledPresentation>
      <FrontPage
        frontPageContent={
          isLogin
            ? state.app.frontPageContent.login
            : state.app.frontPageContent.register
        }
      />
    </StyledPresentation>
  );
};

const StyledPresentation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;

  width: 100%;
  padding: 10%;
  /* margin: 0.5rem; */

  overflow-y: scroll;

  /* background-color: #0a0d1247; */
  border-radius: 2rem 0 0 2rem;

  z-index: 1;

  ${mainScrollBar}
`;
