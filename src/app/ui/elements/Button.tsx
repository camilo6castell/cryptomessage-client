import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface IButtonProps {
  textButton: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
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
    filter: brightness(1.05);
  }
`;

const secondaryStyles = css`
  color: ${({ theme }) => theme.surface.textPrimary};
  background-color: ${({ theme }) => theme.surface.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.surface.borderSubtle};
  }
`;

const dangerStyles = css`
  color: #ffffff;
  background-color: ${({ theme }) => theme.color.danger};

  &:hover:not(:disabled) {
    filter: brightness(1.08);
  }
`;

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary' | 'danger';
}>`
  padding: 0.65rem 1.4rem;
  border: none;
  border-radius: 1.5rem;

  font-family: ${({ theme }) => theme.font.mainFontFamily};
  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;
  transition:
    filter 0.2s ease,
    background-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.1s ease;

  ${({ $variant }) =>
    $variant === 'primary'
      ? primaryStyles
      : $variant === 'danger'
        ? dangerStyles
        : secondaryStyles}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    filter: none;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
