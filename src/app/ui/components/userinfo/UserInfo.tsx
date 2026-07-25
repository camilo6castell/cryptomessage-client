import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { UserCard } from './pieces/UserCard';
import { Button } from '../../elements/Button';
import { ConfirmDialog } from '../general/ConfirmDialog';
import { useLogout } from '../../../core/hooks/useLogout';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';

export const UserInfo = ({ username }: { username: string }): ReactElement => {
  const logout = useLogout();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <StyledUserInfo>
      <header className="user-info__header">
        <h1>Perfil</h1>
      </header>

      <div className="user-info__body">
        <UserCard username={username} />

        <Button
          textButton="Cerrar sesion"
          variant="danger"
          isSubmit={false}
          onClick={() => setShowConfirm(true)}
        />
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Cerrar sesion"
          message="Se cerrara tu sesion y necesitaras tu passphrase para volver a acceder. Tu llave privada se descargara de la memoria."
          confirmLabel="Cerrar sesion"
          cancelLabel="Cancelar"
          isDanger={true}
          onConfirm={() => {
            setShowConfirm(false);
            logout();
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
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
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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
