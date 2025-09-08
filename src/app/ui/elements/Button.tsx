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
  color: ${({ $styles }): string => $styles.color};
  text-shadow: 0px 1px 5px black;
  font-weight: 900;

  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ $styles }): string => $styles.backgroundColor};
  border: 1px solid ${({ $styles }): string => $styles.border};
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $styles }): string => $styles.backgroundColorHover};
  }
`;
