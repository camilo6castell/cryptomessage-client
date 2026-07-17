import { ReactElement } from 'react';
import styled from 'styled-components';
import { GenericContainer } from '../../../layouts/GenericContainer';

interface FormInputProps {
  value: string;
  nameShown: string;
  nameInput: string;
  typeInput: string;
  required: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  padding: 2rem 0 0;

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 1px solid ${({ theme }): string => theme.color.disable};
    border-radius: 0.5rem;
    outline: 0;
    font-size: 17px;
    color: ${({ theme }) => theme.surface.textPrimary};
    padding: 0.5rem;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  /* Sin valor y sin foco — label centrado en el input */
  .form__field:placeholder-shown ~ .form__label {
    font-size: 1rem;
    cursor: text;
    top: 2.7rem;
    padding-left: 0.7rem;
    color: ${({ theme }): string => theme.color.disable};
    font-weight: 400;
  }

  /* Con valor O con foco — label arriba, pequeño */
  .form__field:focus ~ .form__label,
  .form__field:not(:placeholder-shown) ~ .form__label {
    position: absolute;
    top: 0.8rem;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    font-weight: 700;
    padding-left: 0;
  }

  /* Color del label: en foco, gris con valor */
  .form__field:focus ~ .form__label {
    color: ${({ theme }): string => theme.color.highlight};
  }
  /* Laabel Con valor sin foco */
  .form__field:not(:placeholder-shown):not(:focus) ~ .form__label {
    color: ${({ theme }): string => theme.mainFontColor};
  }

  .form__field:focus {
    box-shadow: 0 0 1px 2px ${({ theme }): string => theme.color.highlight};
    border-color: transparent;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: ${({ theme }) => theme.surface.textMuted};
    pointer-events: none;
  }
`;
