import { ReactElement, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../core/state/AppContext';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { getKeyFingerprint } from '../../../core/services/crypto.service';
import { CopyToClipboardButton } from '../../elements/CopyToClipboardButton';
import { ConfirmDialog } from '../general/ConfirmDialog';
import { useLogout } from '../../../core/hooks/useLogout';
import { fade } from '../../styles/keyframes';
import { useMediaQuery } from '../../../core/hooks/useMediaQuery';
import { breakpoints } from '../../styles/maps/breakpoints';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import {
  RiShieldKeyholeLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowLeftSLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

export const UserInfoAux = (): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isMobile = useMediaQuery(breakpoints.mobile);
  const logout = useLogout();

  useEffect(() => {
    if (!state.user.publicKey) return;

    getKeyFingerprint(state.user.publicKey)
      .then(setFingerprint)
      .catch((err) => console.error('No se pudo calcular el fingerprint', err));
  }, [state.user.publicKey]);

  const handleBack = (): void => {
    dispatch({
      type: Actions.SetMainState,
      payload: MainComponentsEnum.ChatList,
    });
  };

  return (
    <StyledUserInfoAux>
      {isMobile && (
        <div className="user-aux__mobile-header">
          <button
            type="button"
            className="user-aux__back"
            onClick={handleBack}
            aria-label="Back"
          >
            <RiArrowLeftSLine size={22} />
          </button>
          <span className="user-aux__mobile-title">Profile</span>
        </div>
      )}

      <section className="security-card">
        <div className="security-card__icon">
          <RiShieldKeyholeLine size={22} />
        </div>

        <div>
          <h2>Your cryptographic identity</h2>
          <p>
            This identifier is derived from your public key. Share it with a
            contact over another channel to confirm you both see the same key —
            that way you know no one intercepted the exchange.
          </p>
        </div>

        <div className="security-card__fingerprint">
          {fingerprint ?? 'Calculating...'}
        </div>
      </section>

      <button
        type="button"
        className="advanced-toggle"
        onClick={() => setShowAdvanced((prev) => !prev)}
      >
        {showAdvanced ? <RiEyeOffLine /> : <RiEyeLine />}
        {showAdvanced ? 'Hide advanced details' : 'Show advanced details'}
      </button>

      {showAdvanced && (
        <section className="advanced-panel">
          <div className="advanced-panel__block">
            <div className="advanced-panel__label-row">
              <h3>Public key</h3>
              <CopyToClipboardButton
                textToCopy={state.user.publicKey ?? ''}
                textButton="Copy"
                variant="secondary"
                isSubmit={false}
              />
            </div>
            <p className="advanced-panel__blob">{state.user.publicKey}</p>
          </div>

          <div className="advanced-panel__block">
            <div className="advanced-panel__label-row">
              <h3>Private key (encrypted)</h3>
              <CopyToClipboardButton
                textToCopy={state.user.encryptedPrivateKey ?? ''}
                textButton="Copy"
                variant="secondary"
                isSubmit={false}
              />
            </div>
            <p className="advanced-panel__hint">
              Never leaves your device in plaintext: the server only stores this
              encrypted version protected by your passphrase.
            </p>
            <p className="advanced-panel__blob">
              {state.user.encryptedPrivateKey}
            </p>
          </div>
        </section>
      )}

      {isMobile && (
        <button
          type="button"
          className="logout-button"
          onClick={() => setShowConfirm(true)}
        >
          <RiLogoutBoxRLine size={18} />
          Sign out
        </button>
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Sign out"
          message="Your session will end and you'll need your passphrase to sign in again. Your private key will be unloaded from memory."
          confirmLabel="Sign out"
          cancelLabel="Cancel"
          isDanger={true}
          onConfirm={() => {
            setShowConfirm(false);
            logout();
          }}
          onCancel={() => setShowConfirm(false)}
        />
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

  @media (${breakpoints.mobile}) {
    width: 100%;
    border-radius: 0;
    padding: 1.5rem 1.25rem;
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  }

  .user-aux__mobile-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 0.25rem;
  }

  .user-aux__back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 0.65rem;
    background-color: transparent;
    color: ${({ theme }) => theme.surface.textMuted};
    cursor: pointer;
    flex-shrink: 0;
    margin-left: -0.4rem;
    transition:
      background-color 0.15s ${({ theme }) => theme.animation.easing.default},
      color 0.15s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      background-color: ${({ theme }) => theme.surface.interactiveHover};
      color: ${({ theme }) => theme.surface.textPrimary};
    }
  }

  .user-aux__mobile-title {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
  }

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

  .logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.dangerTint12};
    border-radius: ${({ theme }) => theme.general.borderRadiusSm};
    background-color: ${({ theme }) => theme.color.dangerTint12};
    color: ${({ theme }) => theme.color.danger};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    font-family: ${({ theme }) => theme.font.mainFontFamily};
    cursor: pointer;

    transition:
      background-color 0.15s ${({ theme }) => theme.animation.easing.default},
      filter 0.15s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      background-color: ${({ theme }) => theme.color.danger};
      color: #ffffff;
    }

    &:active {
      filter: brightness(0.9);
    }
  }
`;
