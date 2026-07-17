import React from 'react';
import styled from 'styled-components';

export const Button = ({
  textButton,
  onClick,
  disabled = false,
  className,
  isSubmit = true,
}: {
  textButton: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  isSubmit?: boolean;
}): React.ReactElement => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
    >
      {textButton}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  margin: 2rem 0;
  padding: 0.5rem 1rem;

  border: 1px solid #9b9b9b;
  border-radius: 0.5rem;

  color: ${({ theme }): string => theme.mainFontColor};
  background-color: ${({ theme }): string => theme.color.idle};

  text-shadow: 0px 1px 5px black;
  font-weight: 900;

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }): string => theme.color.highlight};
  }

  &:disabled {
    background-color: ${({ theme }): string => theme.color.disable};
    cursor: not-allowed;
    color: #6c6c6c;
    text-shadow: none;
  }

  &:disabled:hover {
    background-color: ${({ theme }): string => theme.color.idle};
  }
`;
