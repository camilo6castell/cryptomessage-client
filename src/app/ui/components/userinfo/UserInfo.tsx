import { ReactElement } from 'react';
import styled from 'styled-components';
import { UserCard } from './pieces/UserCard';
import { Button } from '../../elements/Button';
import { useLogout } from '../../../core/hooks/useLogout';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';

export const UserInfo = ({ username }: { username: string }): ReactElement => {
  const logout = useLogout();

  return (
    <StyledUserInfo>
      <header className="user-info__header">
        <h1>Perfil</h1>
      </header>

      <div className="user-info__body">
        <UserCard username={username} />

        <Button
          textButton="Cerrar sesión"
          variant="danger"
          isSubmit={false}
          onClick={logout}
        />
      </div>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled(GenericContainer)`
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.mainSectionWidth};
  height: 100%;

  ${darkGlassEffect}
  border-radius: 0;
  border-left: none;

  .user-info__header {
    width: 100%;
    padding: 1.1rem 1.1rem 0.8rem;
    flex-shrink: 0;

    h1 {
      font-family: ${({ theme }) => theme.font.displayFontFamily};
      font-size: 1.35rem;
      font-weight: 700;
      color: ${({ theme }) => theme.surface.textPrimary};
      margin: 0;
    }
  }

  .user-info__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex: 1;
    width: 100%;
    padding: 1rem;
  }
`;
