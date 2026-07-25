import { ReactElement, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../core/state/AppContext';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { getKeyFingerprint } from '../../../core/services/crypto.service';
import { CopyToClipboardButton } from '../../elements/CopyToClipboardButton';
import { fade } from '../../styles/keyframes';
import { RiShieldKeyholeLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

export const UserInfoAux = (): ReactElement => {
  const { state } = useContext(AppContext);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (!state.user.publicKey) return;

    getKeyFingerprint(state.user.publicKey)
      .then(setFingerprint)
      .catch((err) => console.error('No se pudo calcular el fingerprint', err));
  }, [state.user.publicKey]);

  return (
    <StyledUserInfoAux>
      <section className="security-card">
        <div className="security-card__icon">
          <RiShieldKeyholeLine size={22} />
        </div>

        <div>
          <h2>Tu identidad criptografica</h2>
          <p>
            Este identificador nace de tu llave publica. Compartelo con un
            contacto por otro canal para confirmar que ambos ven la misma llave
            — asi sabes que nadie se interpuso en el intercambio.
          </p>
        </div>

        <div className="security-card__fingerprint">
          {fingerprint ?? 'Calculando...'}
        </div>
      </section>

      <button
        type="button"
        className="advanced-toggle"
        onClick={() => setShowAdvanced((prev) => !prev)}
      >
        {showAdvanced ? <RiEyeOffLine /> : <RiEyeLine />}
        {showAdvanced ? 'Ocultar detalles avanzados' : 'Ver detalles avanzados'}
      </button>

      {showAdvanced && (
        <section className="advanced-panel">
          <div className="advanced-panel__block">
            <div className="advanced-panel__label-row">
              <h3>Llave publica</h3>
              <CopyToClipboardButton
                textToCopy={state.user.publicKey ?? ''}
                textButton="Copiar"
                variant="secondary"
                isSubmit={false}
              />
            </div>
            <p className="advanced-panel__blob">{state.user.publicKey}</p>
          </div>

          <div className="advanced-panel__block">
            <div className="advanced-panel__label-row">
              <h3>Llave privada (cifrada)</h3>
              <CopyToClipboardButton
                textToCopy={state.user.encryptedPrivateKey ?? ''}
                textButton="Copiar"
                variant="secondary"
                isSubmit={false}
              />
            </div>
            <p className="advanced-panel__hint">
              Nunca sale de tu dispositivo en texto claro: el servidor solo
              guarda esta version cifrada con tu passphrase.
            </p>
            <p className="advanced-panel__blob">
              {state.user.encryptedPrivateKey}
            </p>
          </div>
        </section>
      )}
    </StyledUserInfoAux>
  );
};

const StyledUserInfoAux = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;

  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  padding: 2.5rem;
  overflow-y: auto;

  ${darkGlassEffect}
  border-radius: 0 ${({ theme }) => theme.general.borderRadius}
    ${({ theme }) => theme.general.borderRadius} 0;

  ${mainScrollBar}

  .security-card {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.general.borderRadiusSm};
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

    animation: ${fade.fadeIn} 0.3s ${({ theme }) => theme.animation.easing.out}
      both;
  }

  .security-card__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.color.highlight};
    background-color: ${({ theme }) => theme.color.highlightTint10};
  }

  .security-card h2 {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
    margin: 0 0 0.4rem;
  }

  .security-card p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.surface.textMuted};
    margin: 0;
  }

  .security-card__fingerprint {
    font-family: ${({ theme }) => theme.font.monoFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
    color: ${({ theme }) => theme.color.highlight};
    padding: 0.7rem 0.9rem;
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.color.highlightTint10};
    width: fit-content;
  }

  .advanced-toggle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;

    background: none;
    border: none;
    cursor: pointer;

    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.surface.textMuted};

    transition: color 0.2s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      color: ${({ theme }) => theme.surface.textPrimary};
    }
  }

  .advanced-panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: ${fade.fadeIn} 0.2s ${({ theme }) => theme.animation.easing.out}
      both;
  }

  .advanced-panel__block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .advanced-panel__label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      color: ${({ theme }) => theme.surface.textPrimary};
      margin: 0;
    }

    button {
      padding: 0.3rem 0.75rem;
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
    }
  }

  .advanced-panel__hint {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.surface.textMuted};
    margin: 0;
  }

  .advanced-panel__blob {
    font-family: ${({ theme }) => theme.font.monoFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.surface.textMuted};
    word-break: break-all;

    padding: 0.75rem;
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    max-height: 8rem;
    overflow-y: auto;
    margin: 0;

    ${mainScrollBar}
  }
`;
