import { ReactElement } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { H1, P2 } from '../../elements/font';
import { GenericContainer } from '../../layouts/GenericContainer';
import { ResultMessageForm } from './pieces/ResultMessageForm';
import { IGatewayFormProps } from '../../../core/models/ui/IGatewayForm.model';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';

import { fade } from '../../../../../src/app/ui/styles/keyframes';

export const Form = ({
  children,
  handleSubmit,
  messageForm,
  formTitle,
  formText,
  helpText,
  helpLink,
  helpTextLink,
}: IGatewayFormProps): ReactElement => {
  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <P2Form>{formText}</P2Form>
      <H1Form>{formTitle}</H1Form>

      {children}

      <GenericContainer>
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
  max-width: 30rem;
  padding: 4rem;

  ${darkGlassEffect}

  animation: ${fade.fadeIn} .5s ease both;

  .fade-out {
    animation: ${fade.fadeOut} 0.5s both;
  }

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
    font-size: 1.1rem;
    color: ${({ theme }) => theme.color.highlight};
    font-weight: 700;
    transition: all 0.3s ease;
    &:hover {
      color: ${({ theme }) => theme.mainFontColor};
      text-shadow: ${({ theme }) => theme.shadow.textHighlighted};
    }
  }
`;

const H1Form = styled(H1)`
  margin-bottom: 1rem;
`;

const P2Form = styled(P2)`
  padding-bottom: 0.5rem;
`;
