import { ReactElement } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../../../layouts/GenericContainer';

interface FormInputProps {
  value: string;
  nameShown: string;
  nameInput: string;
  typeInput: string;
  required: boolean;
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const FormInput = ({
  value,
  nameShown,
  nameInput,
  typeInput,
  required,
  handleInput,
}: FormInputProps): ReactElement => {
  return (
    <StyledFormInput>
      <input
        value={value}
        onChange={handleInput}
        type={typeInput}
        className="form__field"
        placeholder={nameInput}
        name={nameInput}
        id={nameInput}
        required={required}
        autoComplete="off"
      />
      <label htmlFor={nameInput} className="form__label">
        {nameShown}
      </label>
    </StyledFormInput>
  );
};

const StyledFormInput = styled(GenericContainer)`
  align-items: flex-start;
  position: relative;
  padding: 1.4rem 0 0;

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 1px solid ${({ theme }): string => theme.surface.borderSubtle};
    border-radius: 0.7rem;
    outline: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.surface.textPrimary};
    padding: 0.8rem 0.85rem;
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'transparent'};
    transition:
      border-color 0.2s ${({ theme }) => theme.animation.easing.default},
      box-shadow 0.2s ${({ theme }) => theme.animation.easing.default};
  }

  .form__field::placeholder {
    color: transparent;
  }

  /* Sin valor y sin foco — label centrado en el input */
  .form__field:placeholder-shown ~ .form__label {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    cursor: text;
    top: 2.3rem;
    padding-left: 0.85rem;
    color: ${({ theme }): string => theme.surface.textMuted};
    font-weight: 400;
  }

  /* Con valor O con foco — label arriba, pequeno */
  .form__field:focus ~ .form__label,
  .form__field:not(:placeholder-shown) ~ .form__label {
    position: absolute;
    top: 0.5rem;
    display: block;
    transition: 0.2s;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    padding-left: 0;
  }

  /* Color del label: en foco, highlight */
  .form__field:focus ~ .form__label {
    color: ${({ theme }): string => theme.color.highlight};
  }
  /* Label Con valor sin foco */
  .form__field:not(:placeholder-shown):not(:focus) ~ .form__label {
    color: ${({ theme }) => theme.mainFontColor};
  }

  .form__field:focus {
    box-shadow: 0 0 0 2px ${({ theme }): string => theme.color.highlightTint20};
    border-color: ${({ theme }): string => theme.surface.borderFocus};
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    color: ${({ theme }) => theme.surface.textMuted};
    pointer-events: none;
  }
`;
