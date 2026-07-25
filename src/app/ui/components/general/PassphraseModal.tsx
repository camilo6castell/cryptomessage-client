import { FormEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { fade, scaleIn } from '../../styles/keyframes';
import { RiLockPasswordLine } from 'react-icons/ri';

/**
 * Shown once per browser session: the private key only ever lives in memory
 * (never in localStorage), so a page reload needs the passphrase again to
 * decrypt it. This replaces a native window.prompt()/alert() pair, which
 * can't be styled and briefly makes the app look broken.
 */
export const PassphraseModal = ({
  username,
  error,
  isVerifying,
  onSubmit,
  onCancel,
}: {
  username: string;
  error: string | null;
  isVerifying: boolean;
  onSubmit: (passphrase: string) => void | Promise<void>;
  onCancel: () => void;
}): ReactElement => {
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!passphrase || isVerifying) return;
    void onSubmit(passphrase);
  };

  return (
    <Backdrop>
      <ModalCard onSubmit={handleSubmit}>
        <div className="modal__icon">
          <RiLockPasswordLine size={22} />
        </div>

        <h1>Desbloquea tu sesion</h1>
        <p>
          Tu llave privada solo vive en la memoria de este navegador — nunca se
          guarda. Ingresa tu passphrase para descifrarla de nuevo,{' '}
          <strong>{username}</strong>.
        </p>

        <input
          type="password"
          autoFocus
          placeholder="Tu passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          disabled={isVerifying}
        />

        {error && <span className="modal__error">{error}</span>}

        <div className="modal__actions">
          <button
            type="button"
            className="modal__cancel"
            onClick={onCancel}
            disabled={isVerifying}
          >
            Cerrar sesion
          </button>
          <button
            type="submit"
            className="modal__submit"
            disabled={!passphrase || isVerifying}
          >
            {isVerifying ? 'Verificando...' : 'Desbloquear'}
          </button>
        </div>
      </ModalCard>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.surface.overlay};
  backdrop-filter: blur(6px);
  animation: ${fade.fadeIn} 0.15s ${({ theme }) => theme.animation.easing.out}
    both;
`;

const ModalCard = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;

  width: 90%;
  max-width: 24rem;
  padding: 2rem;

  ${darkGlassEffect}

  animation: ${scaleIn} 0.2s ${({ theme }) => theme.animation.easing.spring} both;

  .modal__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.9rem;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.color.highlight};
    background-color: ${({ theme }) => theme.color.highlightTint10};
  }

  h1 {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
    margin: 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.surface.textMuted};
    margin: 0 0 0.5rem;

    strong {
      color: ${({ theme }) => theme.surface.textPrimary};
    }
  }

  input {
    width: 100%;
    padding: 0.7rem 0.9rem;
    border-radius: 0.7rem;
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    background-color: ${({ theme }) => theme.surface.surfaceInput};
    color: ${({ theme }) => theme.surface.textPrimary};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    outline: none;
    text-align: center;
    transition:
      border-color 0.2s ${({ theme }) => theme.animation.easing.default},
      box-shadow 0.2s ${({ theme }) => theme.animation.easing.default};

    &:focus {
      border-color: ${({ theme }) => theme.surface.borderFocus};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.color.highlightTint20};
    }
  }

  .modal__error {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.error.color};
  }

  .modal__actions {
    display: flex;
    gap: 0.6rem;
    width: 100%;
    margin-top: 0.75rem;
  }

  .modal__cancel,
  .modal__submit {
    flex: 1;
    padding: 0.65rem 1rem;
    border: none;
    border-radius: 1rem;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
    transition:
      filter 0.2s ${({ theme }) => theme.animation.easing.default},
      opacity 0.2s ${({ theme }) => theme.animation.easing.default},
      transform 0.1s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .modal__cancel {
    color: ${({ theme }) => theme.surface.textPrimary};
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.surface.interactiveHover};
    }
  }

  .modal__submit {
    color: #15121c;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.color.highlight} 0%,
      ${({ theme }) => theme.color.highlightDeep} 100%
    );

    &:hover:not(:disabled) {
      filter: brightness(1.05);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }
`;
