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
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 0 0;
  width: 100%;

  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #fff;
    padding: 7px 0;
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
    top: 2rem;
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
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(
      to right,
      var(--button-primary-background-color),
      var(--primary-color)
    );
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #38caef;
    font-weight: 700;
  }

  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }
`;
