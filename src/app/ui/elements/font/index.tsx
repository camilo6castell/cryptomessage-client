import { styled } from 'styled-components';

const baseFont = styled.span`
  color: ${({ theme }) => theme.surface.textPrimary};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

export const H1 = styled(baseFont)`
  font-family: ${({ theme }) => theme.font.displayFontFamily};
  font-size: 2.2rem;
  font-weight: 700;
`;

export const H2 = styled(baseFont)`
  font-family: ${({ theme }) => theme.font.displayFontFamily};
  font-size: 1.25rem;
  font-weight: 700;
`;

export const P1 = styled(baseFont)`
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 1.5;
  color: ${({ theme }) => theme.surface.textMuted};
`;

export const P2 = styled(baseFont)`
  font-size: 0.9rem;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.surface.textMuted};
`;

export const H3 = styled(baseFont)`
  font-family: ${({ theme }) => theme.font.displayFontFamily};
  font-size: 1rem;
  font-weight: 700;
`;

export const Link1 = styled.a`
  color: ${({ theme }) => theme.color.highlight};
`;
