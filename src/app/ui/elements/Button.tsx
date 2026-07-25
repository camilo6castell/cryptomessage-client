import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface IButtonProps {
  textButton: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  isSubmit?: boolean;
}

export const Button = ({
  textButton,
  onClick,
  disabled = false,
  variant = 'primary',
  className,
  isSubmit = true,
}: IButtonProps): ReactElement => {
  return (
    <StyledButton
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      className={className}
    >
      {textButton}
    </StyledButton>
  );
};

const primaryStyles = css`
  color: #15121c;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.highlight} 0%,
    ${({ theme }) => theme.color.highlightDeep} 100%
  );

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    box-shadow: 0 2px 12px ${({ theme }) => theme.color.highlightTint20};
  }

  &:active:not(:disabled) {
    filter: brightness(0.95);
    transform: scale(0.98);
  }
`;

const secondaryStyles = css`
  color: ${({ theme }) => theme.surface.textPrimary};
  background-color: ${({ theme }) => theme.surface.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.surface.interactiveHover};
    border-color: rgba(255, 255, 255, 0.12);
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.surface.interactiveActive};
    transform: scale(0.98);
  }
`;

const dangerStyles = css`
  color: #ffffff;
  background-color: ${({ theme }) => theme.color.danger};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => lighten(0.05, theme.color.danger)};
    box-shadow: 0 2px 12px ${({ theme }) => theme.color.dangerTint12};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => darken(0.05, theme.color.danger)};
    transform: scale(0.98);
  }
`;

const ghostStyles = css`
  color: ${({ theme }) => theme.surface.textMuted};
  background-color: transparent;
  border: 1px solid transparent;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.surface.textPrimary};
    background-color: ${({ theme }) => theme.surface.interactiveHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.surface.interactiveActive};
    transform: scale(0.98);
  }
`;

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}>`
  padding: 0.75rem 1.6rem;
  border: none;
  border-radius: 1rem;

  font-family: ${({ theme }) => theme.font.mainFontFamily};
  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;
  transition:
    filter 0.2s ${({ theme }) => theme.animation.easing.default},
    background-color 0.2s ${({ theme }) => theme.animation.easing.default},
    border-color 0.2s ${({ theme }) => theme.animation.easing.default},
    box-shadow 0.2s ${({ theme }) => theme.animation.easing.default},
    opacity 0.2s ${({ theme }) => theme.animation.easing.default},
    transform 0.1s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? primaryStyles
      : $variant === 'danger'
        ? dangerStyles
        : $variant === 'ghost'
          ? ghostStyles
          : secondaryStyles}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    filter: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.highlight};
    outline-offset: 2px;
  }
`;
