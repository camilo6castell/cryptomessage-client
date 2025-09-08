import { ReactElement } from 'react';
// import { MainBar } from '../ui/components/shared/MainBar';
import { Presentation } from '../ui/components/welcome/Presentation';

export const RegisterContainerAux = (): ReactElement => {
  return (
    <>
      {/* <MainBar>
        <h1> </h1>
      </MainBar> */}
      <Presentation isLogin={false} />
    </>
  );
};
