import { ReactElement, ReactNode, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../core/state/AppContext';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { useThemeContext } from '../../../core/hooks/useThemeContext';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import {
  RiChat3Line,
  RiChat3Fill,
  RiContactsBookLine,
  RiContactsBookFill,
  RiUserLine,
  RiUserFill,
  RiSunLine,
  RiMoonLine,
} from 'react-icons/ri';

export const SideRail = ({
  isConnected,
}: {
  isConnected: boolean;
}): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const { theme, toggleTheme } = useThemeContext();

  const goTo = (section: MainComponentsEnum) => {
    dispatch({ type: Actions.SetMainState, payload: section });
  };

  const isActive = (section: MainComponentsEnum) =>
    state.app.mainState === section;

  return (
    <StyledSideRail>
      <div className="rail__brand" title="CryptoMessage">
        <span className="rail__brand-mark">CM</span>
      </div>

      <nav className="rail__nav">
        <RailButton
          label="Chats"
          isActive={isActive(MainComponentsEnum.ChatList)}
          onClick={() => goTo(MainComponentsEnum.ChatList)}
        >
          {isActive(MainComponentsEnum.ChatList) ? (
            <RiChat3Fill />
          ) : (
            <RiChat3Line />
          )}
        </RailButton>

        <RailButton
          label="Contactos"
          isActive={isActive(MainComponentsEnum.ContactList)}
          onClick={() => goTo(MainComponentsEnum.ContactList)}
        >
          {isActive(MainComponentsEnum.ContactList) ? (
            <RiContactsBookFill />
          ) : (
            <RiContactsBookLine />
          )}
        </RailButton>

        <RailButton
          label="Perfil"
          isActive={isActive(MainComponentsEnum.UserInfo)}
          onClick={() => goTo(MainComponentsEnum.UserInfo)}
        >
          {isActive(MainComponentsEnum.UserInfo) ? (
            <RiUserFill />
          ) : (
            <RiUserLine />
          )}
        </RailButton>
      </nav>

      <div className="rail__footer">
        <RailButton
          label={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
          isActive={false}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
        </RailButton>

        <div
          className="rail__status"
          title={isConnected ? 'Conectado en tiempo real' : 'Reconectando...'}
        >
          <span className={`rail__status-dot ${isConnected ? 'on' : 'off'}`} />
        </div>
      </div>
    </StyledSideRail>
  );
};

const RailButton = ({
  children,
  label,
  isActive,
  onClick,
}: {
  children: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}): ReactElement => {
  return (
    <StyledRailButton
      type="button"
      onClick={onClick}
      className={isActive ? 'active' : ''}
      aria-label={label}
      title={label}
    >
      {children}
    </StyledRailButton>
  );
};

const StyledSideRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  width: ${({ theme }) => theme.general.railWidth};
  height: 100%;
  padding: 1.1rem 0;
  flex-shrink: 0;

  ${darkGlassEffect}
  border-radius: ${({ theme }) => theme.general.borderRadius} 0 0
    ${({ theme }) => theme.general.borderRadius};

  .rail__brand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.75rem;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.color.highlight} 0%,
      ${({ theme }) => theme.color.highlightDeep} 100%
    );
  }

  .rail__brand-mark {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.02em;
    color: #12121c;
  }

  .rail__nav {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .rail__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
  }

  .rail__status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
  }

  .rail__status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.4s ease;
  }

  .rail__status-dot.on {
    background-color: ${({ theme }) => theme.color.success};
    box-shadow: 0 0 6px ${({ theme }) => theme.color.success};
  }

  .rail__status-dot.off {
    background-color: ${({ theme }) => theme.color.warning};
    box-shadow: 0 0 6px ${({ theme }) => theme.color.warning};
  }
`;

const StyledRailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.6rem;
  height: 2.6rem;
  border: none;
  border-radius: 0.85rem;
  background-color: transparent;
  color: ${({ theme }) => theme.surface.textMuted};

  font-size: 1.3rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface.borderSubtle};
    color: ${({ theme }) => theme.surface.textPrimary};
  }

  &.active {
    background-color: rgba(244, 190, 243, 0.14);
    color: ${({ theme }) => theme.color.highlight};
  }
`;
