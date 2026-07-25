import { ReactElement } from 'react';
import styled from 'styled-components';
import { slideUp } from '../../../styles/keyframes';
import { RiArrowDownLine } from 'react-icons/ri';

export const ScrollToBottom = ({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}): ReactElement | null => {
  if (!isVisible) return null;

  return (
    <StyledScrollToBottom
      type="button"
      onClick={onClick}
      aria-label="Ir al último mensaje"
    >
      <RiArrowDownLine size={18} />
    </StyledScrollToBottom>
  );
};

const StyledScrollToBottom = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surface.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.md};
  color: ${({ theme }) => theme.surface.textMuted};

  cursor: pointer;
  transition:
    background-color 0.2s ${({ theme }) => theme.animation.easing.default},
    color 0.2s ${({ theme }) => theme.animation.easing.default},
    transform 0.2s ${({ theme }) => theme.animation.easing.default};

  animation: ${slideUp} 0.2s ${({ theme }) => theme.animation.easing.out} both;

  &:hover {
    background-color: ${({ theme }) => theme.color.highlightTint14};
    color: ${({ theme }) => theme.color.highlight};
    transform: translateX(-50%) scale(1.05);
  }
`;
