import { ReactElement, useContext } from 'react';
import { UserInfo } from '../ui/components/userinfo/UserInfo';
import { AppContext } from '../core/state/AppContext';

export const UserInfoContainer = (): ReactElement => {
  const { state } = useContext(AppContext);
  return <UserInfo username={state.user.username!} />;
};
