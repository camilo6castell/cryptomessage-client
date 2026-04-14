import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { fade } from '../../styles/keyframes';
import { toastConfig } from '../../styles/config/Themes';

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
    // iniciar salida
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, toastConfig.WholeAnimationDurationMS - toastConfig.TransitionAnimationDurationMS); // debe coincidir con la duración del fadeOut

    // desmontar después de animación
    const removeTimer = setTimeout(() => {
      onClose();
    }, toastConfig.WholeAnimationDurationMS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <ToastOverlay $visible={visible}>
      <ToastCard $isDanger={isDanger} $visible={visible}>
        {message}
      </ToastCard>
    </ToastOverlay>
  );
};

const ToastOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.665);
  z-index: 9999;

  animation: ${({ $visible }) => ($visible ? fade.fadeIn : fade.fadeOut)}
    ${({ theme }) => theme.toast.TransitionAnimationDurationMS / 1000}s ease
    both;
`;

const ToastCard = styled.div<{ $isDanger: boolean; $visible: boolean }>`
  padding: 2rem 3rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  max-width: 24rem;

  animation: ${({ $visible }) => ($visible ? fade.up : fade.upOut)}
    ${({ theme }) => theme.toast.TransitionAnimationDurationMS / 1000}s ease
    both;

  background: ${({ theme, $isDanger }) =>
    $isDanger
      ? theme.toast.darkGlassEffectDanger.background
      : theme.toast.darkGlassEffectSuccess.background};
`;
