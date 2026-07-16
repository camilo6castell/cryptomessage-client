import 'styled-components';
import { Theme } from './src/app/ui/styles/config/Themes.tsx';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
