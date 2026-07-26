import { ReactElement, ReactNode, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../core/state/AppContext';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { useThemeContext } from '../../../core/hooks/useThemeContext';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { LogoIcon } from './pieces/LogoIcon';
import { useMediaQuery } from '../../../core/hooks/useMediaQuery';
import { breakpoints } from '../../styles/maps/breakpoints';
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
  const isMobile = useMediaQuery(breakpoints.mobile);

  const unreadCount = useMemo(() => {
    return state.user.chats.reduce((count, chat) => {
      if (
        chat.lastMessage &&
        chat.lastMessage.senderId !== state.user.userId &&
        !chat.lastMessage.isRead
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  }, [state.user.chats, state.user.userId]);

  const goTo = (section: MainComponentsEnum): void => {
    dispatch({ type: Actions.SetMainState, payload: section });
  };

  const isActive = (section: MainComponentsEnum): boolean =>
    state.app.mainState === section;

  if (isMobile) {
    return (
      <StyledBottomBar>
        <BottomBarButton
          label="Chats"
          isActive={isActive(MainComponentsEnum.ChatList)}
          onClick={() => goTo(MainComponentsEnum.ChatList)}
          badge={unreadCount > 0 ? unreadCount : undefined}
        >
          {isActive(MainComponentsEnum.ChatList) ? (
            <RiChat3Fill />
          ) : (
            <RiChat3Line />
          )}
        </BottomBarButton>

        <BottomBarButton
          label="Contacts"
          isActive={isActive(MainComponentsEnum.ContactList)}
          onClick={() => goTo(MainComponentsEnum.ContactList)}
        >
          {isActive(MainComponentsEnum.ContactList) ? (
            <RiContactsBookFill />
          ) : (
            <RiContactsBookLine />
          )}
        </BottomBarButton>

        <BottomBarButton
          label="Profile"
          isActive={isActive(MainComponentsEnum.UserInfo)}
          onClick={() => goTo(MainComponentsEnum.UserInfo)}
        >
          {isActive(MainComponentsEnum.UserInfo) ? (
            <RiUserFill />
          ) : (
            <RiUserLine />
          )}
        </BottomBarButton>

        <BottomBarDivider />

        <BottomBarButton
          label={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          isActive={false}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
        </BottomBarButton>

        <div
          className="bottom-bar__status"
          title={isConnected ? 'Connected in real time' : 'Reconnecting...'}
        >
          <span
            className={`bottom-bar__status-dot ${isConnected ? 'on' : 'off'}`}
          />
        </div>
      </StyledBottomBar>
    );
  }

  return (
    <StyledSideRail>
      <a
        className="rail__brand"
        href="https://github.com/camilo6castell"
        target="_blank"
        rel="noopener noreferrer"
        title="CryptoMessage"
      >
        <LogoIcon className="rail__brand-icon" />
      </a>

      <nav className="rail__nav">
        <RailButton
          label="Chats"
          isActive={isActive(MainComponentsEnum.ChatList)}
          onClick={() => goTo(MainComponentsEnum.ChatList)}
          badge={unreadCount > 0 ? unreadCount : undefined}
        >
          {isActive(MainComponentsEnum.ChatList) ? (
            <RiChat3Fill />
          ) : (
            <RiChat3Line />
          )}
        </RailButton>

        <RailButton
          label="Contacts"
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
          label="Profile"
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
          label={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          isActive={false}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
        </RailButton>

        <div
          className="rail__status"
          title={isConnected ? 'Connected in real time' : 'Reconnecting...'}
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
  badge,
}: {
  children: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
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
      {badge !== undefined && badge > 0 && (
        <span className="rail__badge">{badge > 99 ? '99+' : badge}</span>
      )}
    </StyledRailButton>
  );
};

const BottomBarButton = ({
  children,
  label,
  isActive,
  onClick,
  badge,
}: {
  children: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}): ReactElement => {
  return (
    <StyledBottomBarButton
      type="button"
      onClick={onClick}
      className={isActive ? 'active' : ''}
      aria-label={label}
      title={label}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className="bar__badge">{badge > 99 ? '99+' : badge}</span>
      )}
    </StyledBottomBarButton>
  );
};

const BottomBarDivider = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.surface.borderSubtle};
  margin: 0 0.25rem;
`;

const StyledBottomBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  padding: 0.5rem 1rem;
  padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0px));

  background: ${({ theme }) => theme.darkGlassEffect.background};
  backdrop-filter: ${({ theme }) => theme.darkGlassEffect.backdropFilter};
  border-top: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  box-shadow: ${({ theme }) => theme.darkGlassEffect.boxShadow};
`;

const StyledBottomBarButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.75rem;
  background-color: transparent;
  color: ${({ theme }) => theme.surface.textMuted};

  font-size: 1.25rem;
  cursor: pointer;
  transition:
    background-color 0.2s ${({ theme }) => theme.animation.easing.default},
    color 0.2s ${({ theme }) => theme.animation.easing.default},
    transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface.interactiveHover};
    color: ${({ theme }) => theme.surface.textPrimary};
  }

  &:active {
    transform: scale(0.92);
  }

  &.active {
    background-color: ${({ theme }) => theme.color.highlightTint14};
    color: ${({ theme }) => theme.color.highlight};
  }

  .bar__badge {
    position: absolute;
    top: -2px;
    right: -2px;
    min-width: 1rem;
    height: 1rem;
    padding: 0 0.3rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.color.danger};
    color: #ffffff;
    font-size: 0.6rem;
    font-weight: 700;
    line-height: 1rem;
    text-align: center;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.surface.surface};
  }
`;

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
    background: transparent;
    color: ${({ theme }) => theme.surface.textPrimary};
    text-decoration: none;
    transition: transform 0.6s ${({ theme }) => theme.animation.easing.default};
    padding: 0.3rem;

    /* &:hover {
      transform: scale(1.01);
    } */
  }

  .rail__brand-icon {
    width: 2rem;
    height: 2rem;
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
    transition: background-color 0.4s
      ${({ theme }) => theme.animation.easing.default};
  }

  .rail__status-dot.on {
    background-color: ${({ theme }) => theme.color.success};
    box-shadow: 0 0 8px ${({ theme }) => theme.color.success};
  }

  .rail__status-dot.off {
    background-color: ${({ theme }) => theme.color.warning};
    box-shadow: 0 0 8px ${({ theme }) => theme.color.warning};
  }
`;

const StyledRailButton = styled.button`
  position: relative;
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
    background-color 0.2s ${({ theme }) => theme.animation.easing.default},
    color 0.2s ${({ theme }) => theme.animation.easing.default},
    transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface.interactiveHover};
    color: ${({ theme }) => theme.surface.textPrimary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background-color: ${({ theme }) => theme.color.highlightTint14};
    color: ${({ theme }) => theme.color.highlight};
  }

  .rail__badge {
    position: absolute;
    top: -2px;
    right: -2px;
    min-width: 1rem;
    height: 1rem;
    padding: 0 0.3rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.color.danger};
    color: #ffffff;
    font-size: 0.6rem;
    font-weight: 700;
    line-height: 1rem;
    text-align: center;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.surface.surface};
  }
`;
