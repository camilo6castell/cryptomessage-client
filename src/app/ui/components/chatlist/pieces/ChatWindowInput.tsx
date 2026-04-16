import { FormEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { useHandleInput } from '../../../../core/hooks/useHandleInput';
import { useSendMessage } from '../../../../core/hooks/useSendMessage';
import { Button } from '../../../elements/Button';

export const ChatWindowInput = ({
  chatId,
}: {
  chatId: number;
}): ReactElement => {
  const { form, handleInput, resetForm } = useHandleInput({
    messageContent: '',
  });
  const { sendMessage } = useSendMessage();

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (form.messageContent.trim()) {
      await sendMessage(chatId, form.messageContent);
      resetForm();
    }
  };
  return (
    <StyledChatWindowInput
      onSubmit={(event) => {
        handleSubmit(event)
          .then(() => {})
          .catch(() => {});
      }}
    >
      <input
        type="text"
        name="messageContent" // Debe coincidir con la clave en el hook
        className="chat-input"
        placeholder="Escribe tu mensaje"
        value={form.messageContent}
        onChange={handleInput}
      />
      <Button textButton="Send" onClick={() => {}} />
    </StyledChatWindowInput>
  );
};

const StyledChatWindowInput = styled.form`
  /* CHAT INPUT  */

  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--element-background-color);
  padding: 10px;
  border-top: 1px solid #3b3b3b;

  .chat-input {
    flex: 1;
    background-color: #1e1e1e;
    border: none;
    padding: 10px;
    color: #e0e0e0;
    font-size: 14px;
    border-radius: 0.5rem;
    outline: none;
    margin-right: 10px;
  }

  .chat-input::placeholder {
    color: #b3b3b3;
  }

  .chat-send-button {
    background-color: #056162;
    border: none;
    color: #e0e0e0;
    padding: 10px;
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;

    aspect-ratio: 1/1;
  }

  .chat-send-button:hover {
    background-color: #048c89;
  }
`;
