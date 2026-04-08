import { ReactElement } from 'react';
import styled from 'styled-components';

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

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem 0 0;
  width: 20rem;

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 1px solid #9b9b9b;
    border-radius: 0.5rem;
    outline: 0;
    font-size: 17px;
    color: #fff;
    padding: 0.5rem;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  .form__field:placeholder-shown ~ .form__label {
    /* font-size: 17px; */
    font-size: 1rem;
    cursor: text;
    /* top: 20px; */
    top: 2.7rem;
    padding-left: 0.7rem;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  }

  .form__field:focus {
    box-shadow: 0 0 1px 2px var(--primary-color);
    border: none;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0.8rem;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: var(--primary-color);
    font-weight: 700;
  }
`;
