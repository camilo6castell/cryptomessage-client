import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, P2 } from '../../elements/font';
import { Logo } from '../../elements/Logo';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';

import { fade } from '../../styles/keyframes';
import { AppContext } from '../../../core/state/AppContext';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';

export const Form = ({
  children,
  handleSubmit,
  formTitle,
  formText,
  helpText,
  helpLink,
  helpTextLink,
  $visible,
}: {
  children: React.ReactNode;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  formTitle: string;
  formText: string;
  helpText: string;
  helpLink: string;
  helpTextLink: string;
  $visible: boolean;
}): ReactElement => {
  const { dispatch, state } = useContext(AppContext);
  return (
    <StyledLoginForm
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      $visible={$visible}
    >
      <LogoWrap>
        <Logo />
      </LogoWrap>
      <P2Form>{formText}</P2Form>
      <H1Form>{formTitle}</H1Form>

      {children}

      <div className="aux-link-container">
        <span>{helpText}</span>{' '}
        <Link
          to={helpLink}
          onClick={() =>
            state.app.mainState === MainComponentsEnum.Login
              ? dispatch({
                  type: Actions.SetMainState,
                  payload: MainComponentsEnum.Register,
                })
              : dispatch({
                  type: Actions.SetMainState,
                  payload: MainComponentsEnum.Login,
                })
          }
        >
          {helpTextLink}
        </Link>
      </div>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: fit-content;
  width: fit-content;
  max-width: 30rem;
  padding: 4rem;

  ${darkGlassEffect}

  animation: ${({ $visible }) => ($visible ? fade.fadeIn : fade.fadeOut)}
    ${({ theme }) => theme.animation.duration.slower}
    ${({ theme }) => theme.animation.easing.default} both;

  z-index: 1;
  .aux-link-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    padding-right: 1rem;
  }
  a {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.color.highlight};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    transition: all 0.3s ${({ theme }) => theme.animation.easing.default};
    &:hover {
      color: ${({ theme }) => theme.mainFontColor};
      text-shadow: ${({ theme }) => theme.shadow.textHighlighted};
    }
  }
`;

const H1Form = styled(H1)`
  margin-bottom: 1rem;
`;

const LogoWrap = styled.div`
  margin-bottom: 1.5rem;

  img {
    height: 1.5rem;
    opacity: 0.9;
  }
`;

const P2Form = styled(P2)`
  padding-bottom: 0.5rem;
`;
