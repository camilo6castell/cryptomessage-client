import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { fade } from '../../styles/keyframes';
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

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, toastConfig.WholeAnimationDurationMS - toastConfig.TransitionAnimationDurationMS);

    const removeTimer = setTimeout(() => {
      onClose();
    }, toastConfig.WholeAnimationDurationMS);

    return () => {
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
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.85rem 1.1rem;
  border-radius: 0.85rem;
  font-size: 0.9rem;
  font-weight: 500;

  color: ${({ theme }) => theme.surface.textPrimary};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.primaryBoxShadow};

  background: ${({ theme, $isDanger }) =>
    $isDanger
      ? theme.toast.darkGlassEffectDanger.background
      : theme.toast.darkGlassEffectSuccess.background};

  animation: ${({ $visible }) => ($visible ? fade.left : fade.fadeOut)}
    ${({ theme }) => theme.toast.TransitionAnimationDurationMS / 1000}s ease
    both;

  .toast__icon {
    display: flex;
    flex-shrink: 0;
    font-size: 1.2rem;
    color: ${({ theme, $isDanger }) =>
      $isDanger ? theme.color.danger : theme.color.success};
  }

  .toast__message {
    line-height: 1.35;
  }
`;
