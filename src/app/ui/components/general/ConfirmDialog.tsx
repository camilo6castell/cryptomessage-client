import { ReactElement } from 'react';
import styled from 'styled-components';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { fade, scaleIn } from '../../styles/keyframes';
import { RiQuestionLine } from 'react-icons/ri';

export const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  isDanger = false,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}): ReactElement => {
  return (
    <Backdrop onClick={onCancel}>
      <Card
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div className="dialog__icon">
          <RiQuestionLine size={22} />
        </div>

        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-message">{message}</p>

        <div className="dialog__actions">
          <button type="button" className="dialog__cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`dialog__confirm ${isDanger ? 'is-danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </Card>
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;

  width: 90%;
  max-width: 22rem;
  padding: 2rem;

  ${darkGlassEffect}
  animation: ${scaleIn} 0.2s ${({ theme }) => theme.animation.easing.spring} both;

  .dialog__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.9rem;
    margin-bottom: 0.2rem;
    color: ${({ theme }) => theme.color.highlight};
    background-color: ${({ theme }) => theme.color.highlightTint10};
  }

  h2 {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.surface.textPrimary};
    margin: 0;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.surface.textMuted};
    margin: 0 0 0.5rem;
  }

  .dialog__actions {
    display: flex;
    gap: 0.6rem;
    width: 100%;
    margin-top: 0.5rem;
  }

  .dialog__cancel,
  .dialog__confirm {
    flex: 1;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      filter 0.2s ${({ theme }) => theme.animation.easing.default},
      opacity 0.2s ${({ theme }) => theme.animation.easing.default},
      transform 0.1s ease;
  }

  .dialog__cancel {
    color: ${({ theme }) => theme.surface.textPrimary};
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

    &:hover {
      background-color: ${({ theme }) => theme.surface.interactiveHover};
    }
  }

  .dialog__confirm {
    color: #15121c;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.color.highlight} 0%,
      ${({ theme }) => theme.color.highlightDeep} 100%
    );

    &:hover {
      filter: brightness(1.05);
    }

    &.is-danger {
      color: #ffffff;
      background: ${({ theme }) => theme.color.danger};

      &:hover {
        filter: brightness(1.08);
      }
    }
  }
`;
