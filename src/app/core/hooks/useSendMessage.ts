import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import httpService from '../services/general/http.service';
import urls from '../resources/url.resource';
import { Actions } from '../models/enums/Actions.enum';
import { IMessage } from '../models/main/IMessage.model';

export const useSendMessage = (): {
  sendMessage: (chatId: number, messageContent: string) => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const sendMessage = async (
    chatId: number,
    messageContent: string,
  ): Promise<void> => {
    try {
      const response = await httpService.post(`${urls.sendMessage}`, {
        chatId,
        senderId: state.user.userId,
        content: messageContent,
      });
      console.log(response);
      const { status, data } = response;
      if (status === 201 && data) {
        const newMessage = data as IMessage;

        // Dispatch para añadir el mensaje al chat en el estado global
        dispatch({
          type: Actions.AddMessage,
          payload: newMessage,
        });
      } else {
        console.error(`Error al enviar el mensaje: ${status}`);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return { sendMessage };
};
