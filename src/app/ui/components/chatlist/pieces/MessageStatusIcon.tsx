import { ReactElement } from 'react';
import styled from 'styled-components';
import { RiCheckLine, RiCheckDoubleLine } from 'react-icons/ri';

export const MessageStatusIcon = ({
  isSent,
  isRead,
}: {
  isSent: boolean;
  isRead: boolean;
}): ReactElement | null => {
  if (!isSent) return null;

  return (
    <StyledMessageStatus $isRead={isRead}>
      {isRead ? <RiCheckDoubleLine size={13} /> : <RiCheckLine size={13} />}
    </StyledMessageStatus>
  );
};

const StyledMessageStatus = styled.span<{ $isRead: boolean }>`
  display: inline-flex;
  align-items: center;
  color: ${({ $isRead, theme }) =>
    $isRead ? theme.color.highlight : 'inherit'};
  opacity: 0.7;
  transition: color 0.3s ${({ theme }) => theme.animation.easing.default};
`;
