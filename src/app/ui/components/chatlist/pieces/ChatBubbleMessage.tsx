import { ReactElement, useContext, useState } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { IMessage } from '../../../../core/models/main/IMessage.model';
import { AppContext } from '../../../../core/state/AppContext';
import { decryptMessage } from '../../../../core/services/crypto.manager';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { useFriendlyDateFormat } from '../../../../core/hooks/useFriendlyDateFormat';
import { MessageStatusIcon } from './MessageStatusIcon';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { slideUp } from '../../../styles/keyframes';
import { RiLockLine, RiLockUnlockLine } from 'react-icons/ri';

export const ChatBubbleMessage = ({
  message,
}: {
  message: IMessage;
}): ReactElement => {
  const { state, dispatch } = useContext(AppContext);

  const [isShown, setIsShown] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentAt = useFriendlyDateFormat(message.sentAt);
  const isSent = message.senderId === state.user.userId;

  const handleDecrypt = async (): Promise<void> => {
    if (isShown) {
      setIsShown(false);
      return;
    }

    if (decryptedMessage) {
      setIsShown(true);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const decrypted = await decryptMessage(message.encryptedContent);

      setDecryptedMessage(decrypted);
      setIsShown(true);

      if (!isSent) {
        dispatch({
          type: Actions.SetMessageAsRead,
          payload: { chatId: message.chatId, messageId: message.messageId },
        });
      }
    } catch (err) {
      console.error(err);
      setError('Error al desencriptar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledChatBubbleMessage $isSent={isSent}>
      <button
        type="button"
        className="bubble-message__reveal"
        onClick={() => {
          void handleDecrypt();
        }}
        aria-label={isShown ? 'Hide message' : 'Reveal message'}
      >
        {isShown ? <RiLockUnlockLine /> : <RiLockLine />}
        <span>{isShown ? 'Hide' : 'Reveal'}</span>
      </button>

      <p className={`message-text ${isShown ? '' : 'is-ciphertext'}`}>
        {isShown
          ? isLoading
            ? 'Decrypting...'
            : (error ?? decryptedMessage)
          : message.encryptedContent}
      </p>

      <span className="message-meta">
        <span className="message-time">{sentAt}</span>
        <MessageStatusIcon isSent={isSent} isRead={message.isRead} />
      </span>
    </StyledChatBubbleMessage>
  );
};

const ChatBubbleMessageSent = css`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.highlight} 0%,
    ${({ theme }) => theme.color.highlightDeep} 100%
  );
  align-self: flex-end;
  border-radius: 1.1rem;
  border-bottom-right-radius: 0.25rem;
`;
const ChatBubbleMessageReceived = css`
  background-color: ${({ theme }) => theme.surface.surfaceRaised};
  align-self: flex-start;
  border-radius: 1.1rem;
  border-bottom-left-radius: 0.25rem;
`;

const StyledChatBubbleMessage = styled.div<{ $isSent: boolean }>`
  ${({ $isSent }): RuleSet<object> =>
    $isSent ? ChatBubbleMessageSent : ChatBubbleMessageReceived}

  display: flex;
  flex-direction: column;

  max-width: 70%;
  min-width: 8rem;
  width: fit-content;

  margin-bottom: 0.7rem;
  padding: 0.6rem 0.75rem;

  color: ${({ theme, $isSent }) =>
    $isSent ? '#15121c' : theme.surface.textPrimary};
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};

  animation: ${slideUp} 0.2s ${({ theme }) => theme.animation.easing.out} both;

  .bubble-message__reveal {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    align-self: ${({ $isSent }) => ($isSent ? 'flex-end' : 'flex-start')};

    margin-bottom: 0.35rem;
    padding: 0;
    border: none;
    background: none;

    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme, $isSent }) =>
      $isSent ? '#3a2f4d' : theme.color.highlight};
    cursor: pointer;
    opacity: 0.85;
    transition: opacity 0.15s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      opacity: 1;
    }
  }

  .message-text {
    display: block;

    max-height: 12rem;
    margin: 0;
    padding: 0;

    overflow-y: auto;

    font-size: ${({ theme }) => theme.typography.fontSize.md};
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
    text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-text.is-ciphertext {
    font-family: ${({ theme }) => theme.font.monoFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
    color: ${({ theme, $isSent }) =>
      $isSent ? 'rgba(21, 18, 28, 0.6)' : theme.surface.textMuted};
    word-break: break-all;
    opacity: 0.85;
    transition: opacity 0.3s ${({ theme }) => theme.animation.easing.default};
  }

  .message-meta {
    display: flex;
    align-items: center;
    justify-content: ${({ $isSent }): string =>
      $isSent ? 'flex-end' : 'flex-start'};
    gap: 0.3rem;
    margin-top: 0.4rem;
  }

  .message-time {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme, $isSent }) =>
      $isSent ? 'rgba(21, 18, 28, 0.55)' : theme.surface.textMuted};
  }

  ${mainScrollBar}
`;
