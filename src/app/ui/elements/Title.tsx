import { ReactElement } from 'react';
import styled from 'styled-components';

import { useDynamicHeightFontSize } from '../../core/hooks/useDynamicHeightFontSize';

export const Title = ({
  textTitle,
  heightTitle,
}: {
  textTitle: string;
  heightTitle: number;
}): ReactElement => {
  const [titleRef, fontSize] = useDynamicHeightFontSize(0.25);

  return (
    <StyledTitle ref={titleRef} $heightTitle={heightTitle} $fontSize={fontSize}>
      <h1 className="myTitle">{textTitle}</h1>
    </StyledTitle>
  );
};

const StyledTitle = styled.div<{
  $heightTitle: number;
  $fontSize: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $heightTitle }): number => $heightTitle}%;
  width: 100%;

  .myTitle {
    font-size: ${({ $fontSize }): number =>
      $fontSize < 35 ? 35 : $fontSize}px;
    margin: 0;
    text-align: center;
  }
`;
