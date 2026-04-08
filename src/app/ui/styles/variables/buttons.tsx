import { css } from 'styled-components';

export const Buttons = css`
  /* BUTTONS */
  /* PRIMARY */
  --button-primary-color: var(--main-font-color);
  --button-primary-border-color: var(--primary-color);
  --button-primary-background-color: rgb(17, 99, 153);
  --button-primary-hover-background-color: var(--primary-color);

  /* DISABLED */
  --button-disabled-color: var(--main-font-color);
  --button-disabled-border-color: var(rgb(157, 157, 157));
  --button-disabled-background-color: var(rgb(157, 157, 157));
  --button-disabled-hover-background-color: var(rgb(157, 157, 157));

  /* SUCCESS */
  --button-success-color: var(--main-font-color);
  --button-success-border-color: var(--success-color);
  --button-success-background-color: rgb(0, 107, 0);
  --button-success-hover-background-color: var(--success-color);

  /* DANGER */
  --button-danger-color: var(--main-font-color);
  --button-danger-border-color: var(--danger-color);
  --button-danger-background-color: rgb(107, 0, 0);
  --button-danger-hover-background-color: var(--danger-color);

  /* WARNING */
  --button-warning-color: var(--main-font-color);
  --button-warning-border-color: var(--warning-color);
  --button-warning-background-color: rgb(107, 107, 0);
  --button-warning-hover-background-color: var(--warning-color);
`;
