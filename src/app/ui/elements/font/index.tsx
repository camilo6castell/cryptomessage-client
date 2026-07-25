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
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const H2 = styled(baseFont)`
  font-family: ${({ theme }) => theme.font.displayFontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const P1 = styled(baseFont)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.surface.textMuted};
`;

export const P2 = styled(baseFont)`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.surface.textMuted};
`;

export const H3 = styled(baseFont)`
  font-family: ${({ theme }) => theme.font.displayFontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const Link1 = styled.a`
  color: ${({ theme }) => theme.color.highlight};
`;
