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
  height: var(--section-under-mainbar);

  padding: 10%;
  margin: 0.5rem;

  overflow-y: scroll;

  background-color: var(--aux-background-color);
  border-radius: 2rem 0 0 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  ${mainScrollBar}
`;
