import { ReactElement } from 'react';
import styled from 'styled-components';
import { useDynamicHeightFontSize } from '../../core/hooks/useDynamicHeightFontSize';

export const Subtitle = ({
  textSubtitle,
  heightSubtitle,
}: {
  textSubtitle: string;
  heightSubtitle: number;
}): ReactElement => {
  const [subtitleRef, fontSize] = useDynamicHeightFontSize(0.5);
  return (
    <StyledSubtitle
      ref={subtitleRef}
      $heightSubtitle={heightSubtitle}
      $fontSize={fontSize}
    >
      <h2 className="mySubtitle">{textSubtitle}</h2>
    </StyledSubtitle>
  );
};

const StyledSubtitle = styled.div<{
  $heightSubtitle: number;
  $fontSize: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $heightSubtitle }): number => $heightSubtitle}%;
  width: 100%;

  .mySubtitle {
    font-size: ${({ $fontSize }): number => $fontSize}px;
    margin: 0;
    text-align: center;
  }
`;
