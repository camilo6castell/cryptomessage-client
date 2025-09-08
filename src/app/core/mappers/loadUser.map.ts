import { IUser } from '../models/main/IUser.model';
import { ILoginFormDataResponse } from '../models/ui/IGatewayForm.model';

export default {
  // toApi: (contact: Contact) => {
  //   return {
  //     username: contact.username,
  //     publicKey: contact.publicKey,
  //   };
  // },
  toModel: (payload: ILoginFormDataResponse): IUser => {
    return {
      userId: payload.userId,
      username: payload.username,
      publicKey: payload.publicKey,
      privateKey: payload.privateKey,
      contacts: [],
      chats:
        payload.chats.length === 0
          ? []
          : payload.chats.map((chat) => {
              // Ordenar los mensajes por 'sentAt' y luego por 'messageId' en caso de empate
              const sortedMessages = [...chat.messages].sort((a, b) => {
                if (a.sentAt !== b.sentAt) {
                  return (
                    new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
                  );
                }
                return a.messageId - b.messageId;
              });

              // Asignar el último mensaje después de ordenar
              const lastMessage = sortedMessages[sortedMessages.length - 1];

              return {
                chatId: chat.chatId,
                participants: chat.participants,
                messages: sortedMessages,
                lastMessage,
                createdAt: chat.createdAt,
              };
            }),
    };
  },
};
