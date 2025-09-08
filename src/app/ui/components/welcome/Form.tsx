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

      <GenericContainer containerHeight={10}>
        {helpText} <Link to={helpLink}>{helpTextLink}</Link>
      </GenericContainer>
    </StyledLoginForm>
  );
};

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: var(--section-under-mainbar);

  flex: 1;
  width: 100%;
  padding: 10% 20% 10% 20%;

  background-color: var(--main-background-color);

  button {
    margin: 2rem 0;
  }
`;
