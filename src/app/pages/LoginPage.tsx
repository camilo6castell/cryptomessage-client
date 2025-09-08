import { ReactElement } from 'react';
import { LoginContainer } from '../containers/LoginContainer';
import { MainSection } from '../ui/elements/sections/MainSection';
import { AuxSection } from '../ui/elements/sections/AuxSection';
import { LoginContainerAux } from '../containers/LoginContainerAux';

export const LoginPage = (): ReactElement => {
  return (
    <>
      <MainSection>
        <LoginContainer />
      </MainSection>
      <AuxSection>
        <LoginContainerAux />
      </AuxSection>
    </>
  );
};
