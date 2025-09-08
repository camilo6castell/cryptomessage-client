import { ReactElement } from 'react';

import { RegisterContainer } from '../containers/RegisterContainer';
import { MainSection } from '../ui/elements/sections/MainSection';
import { AuxSection } from '../ui/elements/sections/AuxSection';
import { RegisterContainerAux } from '../containers/RegisterContainerAux';

export const RegisterPage = (): ReactElement => {
  return (
    <>
      <MainSection>
        <RegisterContainer />
      </MainSection>
      <AuxSection>
        <RegisterContainerAux />
      </AuxSection>
    </>
  );
};
