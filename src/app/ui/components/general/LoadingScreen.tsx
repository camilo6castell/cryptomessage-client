import { ReactElement } from 'react';
import styled from 'styled-components';
import { pulse } from '../../styles/keyframes';

export const LoadingScreen = (): ReactElement => {
  return (
    <StyledLoadingScreen>
      <span className="loading-screen__dot" />
      <p>Loading...</p>
    </StyledLoadingScreen>
  );
};

const StyledLoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;

  width: 100dvw;
  height: 100dvh;

  color: ${({ theme }) => theme.surface.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  .loading-screen__dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.highlight};
    animation: ${({ theme }) => pulse(theme.color.highlight)} 1.2s ease-in-out
      infinite;
  }
`;
