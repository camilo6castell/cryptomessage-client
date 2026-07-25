import {
  FormEvent,
  ReactElement,
  useContext,
  useRef,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { useHandleInput } from '../../../../core/hooks/useHandleInput';
import { useSendMessage } from '../../../../core/hooks/useSendMessage';
import { useAcceptChat } from '../../../../core/hooks/useAcceptChat';
import { AppContext } from '../../../../core/state/AppContext';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatStatus } from '../../../../core/models/enums/ChatStatus.enum';
import { useLoadContacts } from '../../../../core/hooks/useLoadContacts';
import { IoSend } from 'react-icons/io5';

export const ChatWindowInput = ({ chat }: { chat: IChat }): ReactElement => {
  const { state } = useContext(AppContext);
  const myId = state.user.userId;

  const { form, handleInput, resetForm } = useHandleInput({
    messageContent: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { sendMessage } = useSendMessage();
  const { acceptChat } = useAcceptChat();
  const { loadContacts } = useLoadContacts();

  const messages = chat.messages ?? [];

  const isPending = chat.status === ChatStatus.PENDING;

  const iAmInitiator = chat.initiatedBy === myId;
  const iAlreadySent = messages.some((m) => m.senderId === myId);

  const isBlockedByPendingRule = isPending && iAmInitiator && iAlreadySent;
  const isReceiverBlocked = isPending && !iAmInitiator;
  const isInputDisabled = isBlockedByPendingRule || isReceiverBlocked;

  const canSend = form.messageContent.trim().length > 0 && !isInputDisabled;

  const autoResize = useCallback(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
  }, []);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!chat.chatId) return;
    if (!canSend) return;

    await sendMessage(chat.chatId, form.messageContent);
    resetForm();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        void handleSubmit(event);
      }
    }
  };

  const handleAccept = async (): Promise<void> => {
    if (!chat.chatId) return;
    await acceptChat(chat.chatId);
    await loadContacts();
  };

  return (
    <StyledChatWindowInput
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      {isPending && iAmInitiator && (
        <div className="chat-warning">
          Solo puedes enviar un mensaje hasta que el contacto acepte la
          solicitud.
        </div>
      )}

      {isPending && !iAmInitiator && (
        <div className="chat-warning">
          Si aceptas este chat, este contacto se agregara y podras responder.
        </div>
      )}

      <div className="input-row">
        <textarea
          ref={textareaRef}
          name="messageContent"
          className="chat-input"
          placeholder={
            isReceiverBlocked
              ? 'Acepta el chat para responder...'
              : 'Escribe tu mensaje'
          }
          value={form.messageContent}
          onChange={(e) => {
            handleInput(e);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
          disabled={isInputDisabled}
          rows={1}
        />

        {isReceiverBlocked ? (
          <button
            type="button"
            className="accept-button"
            onClick={() => {
              void handleAccept();
            }}
          >
            Aceptar chat
          </button>
        ) : (
          <button
            type="submit"
            className="send-button"
            disabled={!canSend}
            aria-label="Enviar mensaje"
          >
            <IoSend size={16} />
          </button>
        )}
      </div>
    </StyledChatWindowInput>
  );
};

const StyledChatWindowInput = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
  padding: 0.85rem 1.25rem 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.surface.borderSubtle};

  .chat-warning {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 0.5rem;
  }

  .input-row {
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
  }

  .chat-input {
    flex: 1;
    background-color: ${({ theme }) => theme.surface.surfaceInput};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    padding: 0.65rem 0.9rem;
    color: ${({ theme }) => theme.surface.textPrimary};
    border-radius: 1.25rem;
    outline: none;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-family: ${({ theme }) => theme.font.mainFontFamily};
    line-height: ${({ theme }) => theme.typography.lineHeight.snug};
    resize: none;
    max-height: 120px;
    transition: border-color 0.2s
      ${({ theme }) => theme.animation.easing.default};

    &::placeholder {
      color: ${({ theme }) => theme.surface.textMuted};
    }

    &:focus {
      border-color: ${({ theme }) => theme.surface.borderFocus};
    }
  }

  .chat-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .send-button,
  .accept-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    border: none;
    cursor: pointer;
    transition:
      opacity 0.2s ${({ theme }) => theme.animation.easing.default},
      transform 0.1s ease,
      box-shadow 0.2s ${({ theme }) => theme.animation.easing.default};
  }

  .send-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    color: #12121c;
    background-color: ${({ theme }) => theme.color.highlight};

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transform: scale(1.08);
      box-shadow: 0 2px 10px ${({ theme }) => theme.color.highlightTint20};
    }

    &:not(:disabled):active {
      transform: scale(0.95);
    }
  }

  .accept-button {
    padding: 0 1rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: #12121c;
    background-color: ${({ theme }) => theme.color.highlight};
    white-space: nowrap;

    &:hover {
      filter: brightness(1.05);
      box-shadow: 0 2px 10px ${({ theme }) => theme.color.highlightTint20};
    }
  }
`;
