import { ReactElement, useContext } from 'react';
import { MainBar } from '../ui/components/shared/MainBar';
import { Logo } from '../ui/elements/Logo';
import { BarButtons } from '../ui/components/shared/pieces/BarButtons';
import { UserInfo } from '../ui/components/userinfo/UserInfo';
import { AppContext } from '../core/state/AppContext';

export const UserInfoContainer = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <>
      <MainBar>
        <Logo />
        <BarButtons />
      </MainBar>
      <UserInfo username={state.user.username!} />
    </>
  );
};
