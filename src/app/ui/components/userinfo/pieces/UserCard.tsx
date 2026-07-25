import { ReactElement } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';

export const UserCard = ({ username }: { username: string }): ReactElement => {
  return (
    <StyledUserCard>
      <Avatar username={username} size={300} cssSide="6.5rem" />
      <span className="user-card__name">{username}</span>
    </StyledUserCard>
  );
};

const StyledUserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.9rem;

  .user-card__name {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
  }
`;
