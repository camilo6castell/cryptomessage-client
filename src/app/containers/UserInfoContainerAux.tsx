import { ReactElement } from 'react';
import { MainBar } from '../ui/components/shared/MainBar';
import { UserInfoAux } from '../ui/components/userinfo/UserInfoAux';

export const UserInfoContainerAux = (): ReactElement => {
  return (
    <>
      <MainBar>
        <span>test</span>
      </MainBar>
      <UserInfoAux />
    </>
  );
};
