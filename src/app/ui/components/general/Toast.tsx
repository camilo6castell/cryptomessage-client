import { ReactElement } from 'react';
import styled from 'styled-components';
import { fade } from '../../styles/keyframes';

export const Toast = ({
  message,
  isDanger,
}: {
  message: string;
  isDanger: boolean;
}): ReactElement | null => {
  return (
    <ToastOverlay>
      <ToastCard $isDanger={isDanger}>{message}</ToastCard>
    </ToastOverlay>
  );
};

const ToastOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.665);
  z-index: 9999;
  animation: ${fade.fadeIn} 0.3s ease both;
`;

const ToastCard = styled.div<{ $isDanger: boolean }>`
  padding: 2rem 3rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  max-width: 24rem;
  animation: ${fade.up} 0.3s ease both;
  background: ${({ theme, $isDanger }) =>
    $isDanger
      ? theme.toast.darkGlassEffectDanger.background
      : theme.toast.darkGlassEffectSuccess.background};
`;
