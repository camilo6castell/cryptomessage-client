import { ElementStyles } from '../enums/ElementStyles.enum';

export interface IButtonProps {
  style: ElementStyles;
  onClick: () => void;
  textButton: string;
}
