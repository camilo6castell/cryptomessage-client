import 'styled-components';
import { Theme } from './src/app/ui/styles/config/Themes.tsx';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- required shape for declaration merging with styled-components' DefaultTheme
  export interface DefaultTheme extends Theme {}
}
