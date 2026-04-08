import React from 'react';
import styled from 'styled-components';
import { IBotonStylesMap } from '../../core/models/ui/IBotonStylesMap.model';
import { IButtonProps } from '../../core/models/ui/IBotonProps.model';
import { ButtonStylesMap } from '../styles/maps/ButtonStylesMap.map';

export const Button = ({
  textButton,
  style,
  onClick,
}: IButtonProps): React.ReactElement => {
  const styles = ButtonStylesMap[style];
  return (
    <StyledButton onClick={onClick} $styles={styles} type="submit">
      {textButton}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $styles: IBotonStylesMap }>`
  width: 20rem;
  margin: 2rem 0;
  padding: 0.5rem 1rem;

  border: 1px solid #9b9b9b;
  border-radius: 0.5rem;

  color: ${({ $styles }): string => $styles.color};
  background-color: #181a1b;

  text-shadow: 0px 1px 5px black;
  font-weight: 900;

  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $styles }): string => $styles.backgroundColorHover};
  }
`;
