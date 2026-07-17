import { ReactElement } from 'react';
import jdenticon from 'jdenticon/standalone';
import styled from 'styled-components';

interface AvatarProps {
  username: string;
  size: number;
  cssSide: string;
}

// Keep every generated identicon inside the app's own hue family instead of
// jdenticon's default rainbow — small touch, but it keeps every avatar
// feeling like it belongs to the same product.
jdenticon.configure({
  hues: [280, 300, 320],
  lightness: {
    color: [0.42, 0.62],
    grayscale: [0.35, 0.55],
  },
  saturation: {
    color: 0.45,
    grayscale: 0.35,
  },
  backColor: '#00000000',
});

export const Avatar = ({
  username,
  size,
  cssSide,
}: AvatarProps): ReactElement => {
  const svgString = jdenticon.toSvg(username, size);
  const svgBase64 = `data:image/svg+xml;base64,${btoa(
    unescape(encodeURIComponent(svgString))
  )}`;

  return <StyledAvatar $background={svgBase64} $cssSide={cssSide} />;
};

const StyledAvatar = styled.div<{
  $background: string;
  $cssSide: string;
}>`
  flex-shrink: 0;
  width: ${({ $cssSide }) => $cssSide};
  height: ${({ $cssSide }) => $cssSide};

  border-radius: 50%;

  background-image: url(${({ $background }): string => $background});
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.surface.surfaceRaised};

  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  box-shadow: 0 0 0 2px rgba(244, 190, 243, 0.12);
  transition: box-shadow 0.2s ease;
`;
