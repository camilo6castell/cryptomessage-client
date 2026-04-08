import { ReactElement } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { Title } from '../../elements/Title';
import { GenericContainer } from '../../elements/GenericContainer';
import { ResultMessageForm } from './pieces/ResultMessageForm';
import { IGatewayFormProps } from '../../../core/models/ui/IGatewayForm.model';

export const Form = ({
  children,
  handleSubmit,
  messageForm,
  formTitle,
  helpText,
  helpLink,
  helpTextLink,
}: IGatewayFormProps): ReactElement => {
  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <Title textTitle={formTitle} heightTitle={80} />

      {children}

      <GenericContainer containerHeight={10}>
        <ResultMessageForm messageForm={messageForm} />
      </GenericContainer>

      <div className="aux-link-container">
        <span>{helpText}</span> <Link to={helpLink}>{helpTextLink}</Link>
      </div>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: fit-content;
  width: fit-content;
  padding: 5rem 4rem;

  border-radius: 0.5rem;

  background-color: #0a0d1247;
  backdrop-filter: blur(3rem);
  box-shadow:
    -1px -1px 0px #ffffff3a,
    1px 1px 2px #69686879;

  z-index: 1;
  .aux-link-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    padding-right: 1rem;
  }
  a {
    color: var(--primary-color);
    font-weight: 700;
    transition: all 0.3s ease;
    &:hover {
      color: var(--primary-color-hover);
    }
  }
`;
