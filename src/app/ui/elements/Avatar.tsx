import { ReactElement } from 'react';
import jdenticon from 'jdenticon/standalone';
import styled from 'styled-components';

interface AvatarProps {
  username: string;
  size: number;
  cssSide: string;
}

export const Avatar = ({
  username,
  size,
  cssSide,
}: AvatarProps): ReactElement => {
  const svgString = jdenticon.toSvg(username, size);
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return (
    <StyledAvatar $background={svgBase64} $cssSide={cssSide} $size={size} />
  );
};

const StyledAvatar = styled.div<{
  $background: string;
  $cssSide: string;
  $size: number;
}>`
  display: inline;
  padding: auto;
  width: ${({ $size }): number => $size}px;
  height: ${({ $size }): number => $size}px;

  aspect-ratio: 1/1;

  border: ${({ $size }): number => $size / 50}px solid #000000;
  border-radius: 50%;

  background-image: url(${({ $background }): string => $background});
  background-size: cover;
  background-position: center;

  background-color: white;

  /* -webkit-box-shadow: 0px 0px 24px 7px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 24px 7px rgba(255, 255, 255, 1); */
  box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    /* -webkit-box-shadow: 0px 0px 24px 7px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 24px 7px rgba(255, 255, 255, 1); */
    box-shadow: 0px 0px 1px 1px #fef6ae;
  }
`;
