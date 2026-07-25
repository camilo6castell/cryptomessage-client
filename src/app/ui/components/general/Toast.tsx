import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { fade, slideUp } from '../../styles/keyframes';
import { toastConfig } from '../../styles/config/Themes';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';

export interface ToastEntry {
  id: number;
  message: string;
  isDanger: boolean;
}

/**
 * A single, non-blocking notification. No full-screen dimming — the person
 * should never lose their place in the conversation just to read a toast.
 */
export const Toast = ({
  message,
  isDanger,
  onClose,
}: {
  message: string;
  isDanger: boolean;
  onClose: () => void;
}): ReactElement => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = toastConfig.WholeAnimationDurationMS;
    const fadeStart = duration - toastConfig.TransitionAnimationDurationMS;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 50);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, fadeStart);

    const removeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastCard $isDanger={isDanger} $visible={visible} role="status">
      <span className="toast__icon">
        {isDanger ? <RiErrorWarningLine /> : <RiCheckLine />}
      </span>
      <span className="toast__message">{message}</span>
      <div className="toast__progress">
        <div
          className="toast__progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </ToastCard>
  );
};

export const ToastStack = ({
  toasts,
  onDismiss,
}: {
  toasts: ToastEntry[];
  onDismiss: (id: number) => void;
}): ReactElement => {
  return (
    <StyledToastStack>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          isDanger={toast.isDanger}
          onClose={() => onDismiss(toast.id)}
        />
      ))}
    </StyledToastStack>
  );
};

const StyledToastStack = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  max-width: min(22rem, calc(100vw - 2.5rem));
`;

const ToastCard = styled.div<{ $isDanger: boolean; $visible: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.85rem 1.1rem;
  padding-bottom: 1rem;
  border-radius: ${({ theme }) => theme.general.borderRadiusSm};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  color: ${({ theme }) => theme.surface.textPrimary};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.md};

  background: ${({ theme, $isDanger }) =>
    $isDanger
      ? theme.toast.darkGlassEffectDanger.background
      : theme.toast.darkGlassEffectSuccess.background};

  animation: ${({ $visible }) => ($visible ? slideUp : fade.fadeOut)}
    ${({ theme }) => theme.toast.TransitionAnimationDurationMS / 1000}s
    ${({ theme }) => theme.animation.easing.out} both;

  .toast__icon {
    display: flex;
    flex-shrink: 0;
    font-size: 1.2rem;
    color: ${({ theme, $isDanger }) =>
      $isDanger ? theme.color.danger : theme.color.success};
  }

  .toast__message {
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
    flex: 1;
  }

  .toast__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0 0 ${({ theme }) => theme.general.borderRadiusSm}
      ${({ theme }) => theme.general.borderRadiusSm};
    overflow: hidden;
  }

  .toast__progress-bar {
    height: 100%;
    background: ${({ theme, $isDanger }) =>
      $isDanger ? theme.color.danger : theme.color.success};
    opacity: 0.5;
    transition: width 0.05s linear;
    border-radius: 0 0 ${({ theme }) => theme.general.borderRadiusSm}
      ${({ theme }) => theme.general.borderRadiusSm};
  }
`;
