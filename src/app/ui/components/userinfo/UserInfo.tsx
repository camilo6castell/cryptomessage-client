import { ReactElement } from 'react';
import styled from 'styled-components';
import { Title } from '../../elements/Title';
import { UserCard } from './pieces/UserCard';
import { Button } from '../../elements/Button';

import { ElementStyles } from '../../../core/models/enums/ElementStyles.enum';
import { useLogout } from '../../../core/hooks/useLogout';

export const UserInfo = ({ username }: { username: string }): ReactElement => {
  const logout = useLogout();

  return (
    <StyledUserInfo>
      <Title textTitle="User Information" heightTitle={20} />
      <UserCard username={username} heightUserCard={60} />
      <div className="button-container">
        <Button
          textButton="Logout"
          style={ElementStyles.Danger}
          onClick={logout}
        />
      </div>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1rem 0 0 0;
  border: 1px solid #ffffff;

  width: 100%;
  height: var(--section-under-mainbar);

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 20%;
  }
`;
