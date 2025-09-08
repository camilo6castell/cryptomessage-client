import { ReactElement } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { Subtitle } from '../../../elements/Subtitle';

export const UserCard = ({
  username,
  heightUserCard,
}: {
  username: string;
  heightUserCard: number;
}): ReactElement => {
  return (
    <StyledUserCard $heightUserCard={heightUserCard}>
      <Avatar username={username} size={300} cssSide={'4rem'} />
      <Subtitle textSubtitle={username} heightSubtitle={30} />
    </StyledUserCard>
  );
};

const StyledUserCard = styled.div<{ $heightUserCard: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${({ $heightUserCard }): number => $heightUserCard}%;

  padding: 10%;
`;
