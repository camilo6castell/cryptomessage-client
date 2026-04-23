import { FormEvent, ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { useHandleInput } from '../../../../core/hooks/useHandleInput';
import { useSendMessage } from '../../../../core/hooks/useSendMessage';
import { useAcceptChat } from '../../../../core/hooks/useAcceptChat';
import { Button } from '../../../elements/Button';
import { AppContext } from '../../../../core/state/AppContext';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatStatus } from '../../../../core/models/enums/ChatStatus.enum';
import { useLoadContacts } from '../../../../core/hooks/useLoadContacts';

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
   * 🔥 IMPORTANTE:
   * Como tu modelo no tiene initiatedBy explícito en frontend,
   * inferimos:
   *
   * - si yo envié el primer mensaje → soy initiator
   * - si no → soy receptor
   */

  const iAmInitiator = chat.initiatedBy === myId;

  const iAlreadySent = messages.some((m) => m.senderId === myId);

  /**
   * 🔒 REGLAS DE NEGOCIO
   */

  // initiator ya envió su único mensaje
  const isBlockedByPendingRule = isPending && iAmInitiator && iAlreadySent;

  // receptor aún no acepta
  const isReceiverBlocked = isPending && !iAmInitiator;

  const isInputDisabled = isBlockedByPendingRule || isReceiverBlocked;

  console.log('DEBUG CHAT INPUT:', {
    myId,
    initiatedBy: chat.initiatedBy,
    isPending,
    iAmInitiator,
    isReceiverBlocked,
  });

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!chat.chatId) return;
    if (isInputDisabled) return;
    if (!form.messageContent.trim()) return;

    await sendMessage(chat.chatId, form.messageContent);
    resetForm();
  };

  const handleAccept = async () => {
    if (!chat.chatId) return;
    await acceptChat(chat.chatId);
    await loadContacts();
  };

  return (
    <StyledChatWindowInput onSubmit={handleSubmit}>
      {/* 🔥 UX MENSAJES */}

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

      {/* 🔥 INPUT */}
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

      {/* 🔥 ACCIONES */}
      <div className="actions">
        {isReceiverBlocked && (
          <Button
            textButton="Aceptar chat"
            isSubmit={false}
            onClick={handleAccept}
          />
        )}

        <Button
          textButton="Enviar"
          disabled={isInputDisabled}
          onClick={() => {}}
        />
      </div>
    </StyledChatWindowInput>
  );
};

const StyledChatWindowInput = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--element-background-color);
  padding: 10px;
  border-top: 1px solid #3b3b3b;

  .chat-warning {
    font-size: 0.75rem;
    color: #ffb347;
    margin-bottom: 6px;
  }

  .chat-input {
    background-color: #1e1e1e;
    border: none;
    padding: 10px;
    color: #e0e0e0;
    border-radius: 0.5rem;
    outline: none;
    margin-bottom: 8px;
  }

  .chat-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
`;
