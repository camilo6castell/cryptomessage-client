import { FormEvent, ReactElement, useContext } from 'react';
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

  const { sendMessage } = useSendMessage();
  const { acceptChat } = useAcceptChat();
  const { loadContacts } = useLoadContacts();

  const messages = chat.messages ?? [];

  const isPending = chat.status === ChatStatus.PENDING;

  /**
   * Como el modelo del frontend no expone initiatedBy explícito antes de
   * cargar el chat completo, inferimos el rol:
   * - si yo envié el primer mensaje → soy iniciador
   * - si no → soy receptor
   */
  const iAmInitiator = chat.initiatedBy === myId;
  const iAlreadySent = messages.some((m) => m.senderId === myId);

  const isBlockedByPendingRule = isPending && iAmInitiator && iAlreadySent;
  const isReceiverBlocked = isPending && !iAmInitiator;
  const isInputDisabled = isBlockedByPendingRule || isReceiverBlocked;

  const canSend = form.messageContent.trim().length > 0 && !isInputDisabled;

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!chat.chatId) return;
    if (!canSend) return;

    await sendMessage(chat.chatId, form.messageContent);
    resetForm();
  };

  const handleAccept = async () => {
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
          Si aceptas este chat, este contacto se agregará y podrás responder.
        </div>
      )}

      <div className="input-row">
        <input
          type="text"
          name="messageContent"
          className="chat-input"
          placeholder={
            isReceiverBlocked
              ? 'Acepta el chat para responder...'
              : 'Escribe tu mensaje'
          }
          value={form.messageContent}
          onChange={handleInput}
          disabled={isInputDisabled}
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
    font-size: 0.75rem;
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 0.5rem;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .chat-input {
    flex: 1;
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    padding: 0.65rem 0.9rem;
    color: ${({ theme }) => theme.surface.textPrimary};
    border-radius: 1.25rem;
    outline: none;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.color.highlight};
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
      opacity 0.2s ease,
      transform 0.1s ease;
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
      transform: scale(1.06);
    }
  }

  .accept-button {
    padding: 0 1rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-weight: 700;
    font-size: 0.8rem;
    color: #12121c;
    background-color: ${({ theme }) => theme.color.highlight};
    white-space: nowrap;

    &:hover {
      opacity: 0.9;
    }
  }
`;
