import { ReactElement, useContext, useState } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { IMessage } from '../../../../core/models/main/IMessage.model';
import { AppContext } from '../../../../core/state/AppContext';
import { decryptMessage } from '../../../../core/services/crypto.manager';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { useFirendlyDateFormat } from '../../../../core/hooks/useFirendlyDateFormat';
import { Actions } from '../../../../core/models/enums/Actions.enum';
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

  const sentAt = useFirendlyDateFormat(message.sentAt);
  const isSent = message.senderId === state.user.userId;

  const handleDecrypt = async () => {
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
        onClick={handleDecrypt}
        aria-label={isShown ? 'Ocultar mensaje' : 'Revelar mensaje'}
      >
        {isShown ? <RiLockUnlockLine /> : <RiLockLine />}
        <span>{isShown ? 'Ocultar' : 'Revelar'}</span>
      </button>

      <p className={`message-text ${isShown ? '' : 'is-ciphertext'}`}>
        {isShown
          ? isLoading
            ? 'Desencriptando...'
            : (error ?? decryptedMessage)
          : message.encryptedContent}
      </p>

      <span className="message-time">{sentAt}</span>
    </StyledChatBubbleMessage>
  );
};

const ChatBubbleMessageSent = css`
  background: linear-gradient(
    135deg,
    rgba(244, 190, 243, 0.18) 0%,
    rgba(5, 97, 98, 0.55) 100%
  );
  align-self: flex-end;
  border-radius: 1rem;
  border-bottom-right-radius: 0.2rem;
`;
const ChatBubbleMessageReceived = css`
  background-color: rgba(255, 255, 255, 0.06);
  align-self: flex-start;
  border-radius: 1rem;
  border-bottom-left-radius: 0.2rem;
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

  color: #e0e0e0;
  border: 1px solid rgba(255, 255, 255, 0.06);

  .bubble-message__reveal {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    align-self: ${({ $isSent }) => ($isSent ? 'flex-end' : 'flex-start')};

    margin-bottom: 0.35rem;
    padding: 0;
    border: none;
    background: none;

    font-size: 0.7rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.highlight};
    cursor: pointer;
    opacity: 0.85;
    transition: opacity 0.15s ease;

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

    font-size: 0.95rem;
    line-height: 1.4;
    text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-text.is-ciphertext {
    font-family: 'Courier New', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.02em;
    color: #8f8f8f;
    word-break: break-all;
    opacity: 0.75;
  }

  .message-time {
    display: block;
    font-size: 0.65rem;
    color: #b3b3b3;
    text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
    margin-top: 0.4rem;
  }

  ${mainScrollBar}
`;
