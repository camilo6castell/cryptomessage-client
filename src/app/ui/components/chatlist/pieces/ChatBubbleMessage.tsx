import { ReactElement, useContext, useState } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { IMessage } from '../../../../core/models/main/IMessage.model';
import { AppContext } from '../../../../core/state/AppContext';
import { decryptMessage } from '../../../../core/services/crypto.manager';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { useFirendlyDateFormat } from '../../../../core/hooks/useFirendlyDateFormat';
import { Actions } from '../../../../core/models/enums/Actions.enum';

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

  const handleDecrypt = async () => {
    if (isShown) {
      setIsShown(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const decrypted = await decryptMessage(message.encryptedContent);

      setDecryptedMessage(decrypted);
      setIsShown(true);

      // marcar como leído si no soy yo
      if (state.user.userId !== message.senderId) {
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
    <StyledChatBubbleMessage
      $isSent={message.senderId === state.user.userId}
      $isShown={isShown}
      $messageWidth={decryptedMessage.length}
    >
      <span className="bubble-message_buttons-container">
        <span className="decrypt-button" onClick={handleDecrypt}>
          {isShown ? 'Ocultar' : 'Revelar'}
        </span>
      </span>

      <p className="message-text">
        {isShown
          ? isLoading
            ? 'Loading...'
            : error
              ? error
              : decryptedMessage
          : message.encryptedContent}
      </p>

      <span className="message-time">{sentAt}</span>
    </StyledChatBubbleMessage>
  );
};

const ChatBubbleMessageSent = css`
  background-color: #056162;
  align-self: flex-end;
  border-radius: 10px;
  border-bottom-right-radius: 0;
`;
const ChatBubbleMessageReceived = css`
  background-color: #262d31;
  align-self: flex-start;
  border-radius: 10px;
  border-bottom-left-radius: 0;
`;

const StyledChatBubbleMessage = styled.div<{
  $isSent: boolean;
  $isShown: boolean;
  $messageWidth: number;
}>`
  ${({ $isSent }): RuleSet<object> =>
    $isSent ? ChatBubbleMessageSent : ChatBubbleMessageReceived}

  display: flex;
  flex-direction: column;

  max-width: 75%;
  min-width: 25%;

  height: ${({ $isShown }): string => ($isShown ? '7rem' : '11rem')};
  width: ${({ $isShown, $messageWidth }): string =>
    $isShown ? $messageWidth.toString() + 'ch' : '75%'};

  margin-bottom: 10px;
  padding: 10px;

  color: #e0e0e0;

  transition: all 1s ease;

  .bubble-message_buttons-container {
    .decrypt-button {
      display: block;
      margin: 0.5rem 0.5rem 1rem;

      text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
      font-weight: 750;
      color: #b3b3b3;
      cursor: pointer;
    }
  }

  .message-text {
    display: block;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;

    padding: 0 0.5rem;
    margin: 0;

    overflow: scroll;
    overflow-x: hidden;

    font-size: 1rem;
    line-height: 1.4;
    text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
    word-break: break-all;

    transition: all 1s ease;
  }

  .message-text::-webkit-scrollbar {
    width: var(--scroll-bar-size);
  }

  .message-text::-webkit-scrollbar-track {
    background: var(--scroll-bar-track-color);
    border-radius: var(--scroll-bar-radius);
  }

  .message-text::-webkit-scrollbar-thumb {
    background: var(--scroll-bar-color);
    border-radius: var(--scroll-bar-radius);
  }

  .message-time {
    display: block;
    font-size: 10px;
    color: #b3b3b3;
    text-align: ${({ $isSent }): string => ($isSent ? 'right' : 'left')};
    margin-top: 5px;
  }

  ${mainScrollBar}
`;

// ${({ $isHover }): false | RuleSet<object> =>
//   $isHover &&
//   css`
//     background-color: #7a0000; /* Cambiar el color en hover */
//     cursor: pointer;

//     height: fit-content;
//   `}
