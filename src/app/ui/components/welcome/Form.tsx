import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import { H1, P2 } from '../../elements/font';
import { Logo } from '../../elements/Logo';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';

import { fade } from '../../styles/keyframes';
import { breakpoints } from '../../styles/maps/breakpoints';
import { AppContext } from '../../../core/state/AppContext';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import { useThemeContext } from '../../../core/hooks/useThemeContext';

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
  const { theme, toggleTheme } = useThemeContext();
  return (
    <StyledLoginForm
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      $visible={$visible}
    >
      <ThemeToggleButton
        type="button"
        onClick={toggleTheme}
        aria-label={
          theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
        }
      >
        {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
      </ThemeToggleButton>
      <LogoWrap>
        <Logo $variant="form" />
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
  align-items: stretch;

  height: fit-content;
  width: 22rem;
  padding: 2.5rem 2.5rem 2rem;

  ${darkGlassEffect}

  animation: ${({ $visible }) => ($visible ? fade.fadeIn : fade.fadeOut)}
    ${({ theme }) => theme.animation.duration.slower}
    ${({ theme }) => theme.animation.easing.default} both;

  position: relative;
  z-index: 1;

  @media (${breakpoints.mobile}) {
    width: 100%;
    max-width: 100%;
    padding: 2rem 1.5rem;
    border-radius: ${({ theme }) => theme.general.borderRadius};
  }

  button[type='submit'] {
    margin-top: 0.75rem;
    width: 100%;
  }

  .aux-link-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  }
  span {
    color: ${({ theme }) => theme.surface.textMuted};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
  a {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.color.highlight};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-left: 0.25rem;
    transition:
      color 0.3s ${({ theme }) => theme.animation.easing.default},
      text-shadow 0.3s ${({ theme }) => theme.animation.easing.default};
    &:hover {
      color: ${({ theme }) => theme.mainFontColor};
      text-shadow: ${({ theme }) => theme.shadow.textHighlighted};
    }
  }
`;

const H1Form = styled(H1)`
  margin-bottom: 0.5rem;
  font-size: ${({ theme }): string => theme.typography.fontSize['2xl']};
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const P2Form = styled(P2)`
  color: ${({ theme }) => theme.surface.textMuted};
  margin-bottom: 0.25rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

const ThemeToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.general.borderRadiusSm};
  background: ${({ theme }) => theme.surface.interactiveHover};
  color: ${({ theme }) => theme.surface.textMuted};
  cursor: pointer;
  font-size: 1.1rem;
  transition:
    background 0.2s ${({ theme }) => theme.animation.easing.default},
    color 0.2s ${({ theme }) => theme.animation.easing.default};

  &:hover {
    background: ${({ theme }) => theme.surface.interactiveActive};
    color: ${({ theme }) => theme.mainFontColor};
  }
`;
