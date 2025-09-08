import { ReactElement } from 'react';
import styled from 'styled-components';
// import LogoPng from '../../../assets/logo.png';
import LogoSvg from '../../../assets/logo-white.svg';

export const Logo = (): ReactElement => {
  return <StyledLogo src={LogoSvg} alt="CryptoMessage logo" />;
};

const StyledLogo = styled.img`
  height: 2rem;

  background-color: rgba(255, 255, 255, 0);
`;
