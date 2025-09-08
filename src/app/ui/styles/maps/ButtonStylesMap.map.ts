import { ElementStyles } from '../../../core/models/enums/ElementStyles.enum';

export const ButtonStylesMap = {
  [ElementStyles.Primary]: {
    color: 'var(--button-primary-color)',
    border: 'var(--button-primary-border-color)',
    backgroundColor: 'var(--button-primary-background-color)',
    backgroundColorHover: 'var(--button-primary-hover-background-color)',
  },
  [ElementStyles.Disabled]: {
    color: 'var(--button-disabled-color)',
    border: 'var(--button-disabled-border-color)',
    backgroundColor: 'var(--button-disabled-background-color)',
    backgroundColorHover: 'var(--button-disabled-hover-background-color)',
  },
  [ElementStyles.Success]: {
    color: 'var(--button-success-color)',
    border: 'var(--button-success-border-color)',
    backgroundColor: 'var(--button-success-background-color)',
    backgroundColorHover: 'var(--button-success-hover-background-color)',
  },
  [ElementStyles.Danger]: {
    color: 'var(--button-danger-color)',
    border: 'var(--button-danger-border-color)',
    backgroundColor: 'var(--button-danger-background-color)',
    backgroundColorHover: 'var(--button-danger-hover-background-color)',
  },
  [ElementStyles.Warning]: {
    color: 'var(--button-warning-color)',
    border: 'var(--button-warning-border-color)',
    backgroundColor: 'var(--button-warning-background-color)',
    backgroundColorHover: 'var(--button-warning-hover-background-color)',
  },
};
