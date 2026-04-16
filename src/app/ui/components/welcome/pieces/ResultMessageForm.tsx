import { ReactElement } from 'react';
import styled from 'styled-components';
import { colorTextAnimation } from '../../../styles/keyframes';
import { IMessageForm } from '../../../../core/models/ui/IMessageForm.model';

export const ResultMessageForm = ({
  messageForm,
}: {
  messageForm: IMessageForm;
}): ReactElement => {
  if (!messageForm.isDanger) {
    return <></>;
  } else {
    const color = 'rgb(255, 0, 0)';
    return <StyledSpan color={color}>{messageForm.message}</StyledSpan>;
  }
};

const StyledSpan = styled.span<{ color: string }>`
  position: fixed;
  font-size: 1rem;
  padding: 0 0 2rem;
  text-align: center;

  line-height: 1rem;

  animation: ${({ color }): string => colorTextAnimation(color) as string} 2s
    ease-in-out infinite;
`;
