import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../core/state/AppContext';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';

export const UserInfoAux = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <StyledUserInfoAux>
      <h1>{state.user.username}</h1>
      <h2>PublicKey:</h2>
      <p>{state.user.publicKey}</p>
      <h2>PrivateKey:</h2>
      <p>{state.user.privateKey}</p>
    </StyledUserInfoAux>
  );
};

const StyledUserInfoAux = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;
  height: var(--section-under-mainbar);

  padding: 2rem;

  overflow-y: scroll;

  background-color: var(--aux-background-color);

  border: 1px solid #ffff;
  border-radius: 0 1rem 0 0;
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
    word-break: break-all;
  }

  width: 100%;
  height: var(--section-under-mainbar);

  overflow: scroll;

  ${mainScrollBar}

  @media (width < 900px) {
    display: none;
  }
`;
