import { styled } from 'styled-components';

const baseFont = styled.span`
  color: var(--text-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

export const H1 = styled(baseFont)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
`;

export const H2 = styled(baseFont)`
  font-size: 1.25rem;
  font-weight: 800;
`;

export const P1 = styled(baseFont)`
  font-size: 1.25rem;
  font-weight: 400;
  text-shadow: 0 2px 5px rgba(255, 255, 255, 0.321);
  letter-spacing: -0.5px;
  line-height: 1.4;
`;
export const P2 = styled(baseFont)`
  font-size: 1rem;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); /* Efecto "grabado" */
  letter-spacing: 0.3px;
`;

export const Link = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
