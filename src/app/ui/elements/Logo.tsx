import { ReactElement } from 'react';
import styled from 'styled-components';
import LogoSvg from '../../../assets/logo-white.svg';

export const Logo = ({
  $variant,
}: { $variant?: 'default' | 'form' } = {}): ReactElement => {
  return (
    <StyledLogo src={LogoSvg} alt="CryptoMessage logo" $variant={$variant} />
  );
};

const StyledLogo = styled.img<{ $variant?: string }>`
  height: ${({ $variant }): string => ($variant === 'form' ? '2rem' : '1.5rem')};
  filter: ${({ theme }): string =>
    theme.mode === 'light' ? 'invert(1)' : 'none'};
`;
