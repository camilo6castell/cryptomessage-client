import { ReactElement } from 'react';
import { Presentation } from '../ui/components/welcome/Presentation';

export const LoginContainerAux = (): ReactElement => {
  return <Presentation isLogin={true} />;
};
