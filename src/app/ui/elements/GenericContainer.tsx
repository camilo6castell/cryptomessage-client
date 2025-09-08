import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

export const GenericContainer = ({
  children,
  containerHeight,
}: {
  children: ReactNode;
  containerHeight: number;
}): ReactElement => {
  return (
    <StyledGenericContainer $containerHeight={containerHeight}>
      {children}
    </StyledGenericContainer>
  );
};

const StyledGenericContainer = styled.div<{ $containerHeight: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${({ $containerHeight }): number => $containerHeight}%;
`;
