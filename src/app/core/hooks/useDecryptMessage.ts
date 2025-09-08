import { useState, useEffect, useContext } from 'react';
import httpService from '../../core/services/general/http.service';
import urls from '../../core/resources/url.resource';
import { IMessage } from '../../core/models/main/IMessage.model';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';

export const useDecryptMessage = (
  chatId: number,
  messageId: number,
  senderId: number,
  shouldFetch: boolean,
  setMessageWidth: (width: number) => void,
): { decryptedMessage: string; isLoading: boolean; error: string | null } => {
  const { state, dispatch } = useContext(AppContext);
  const [decryptedMessage, setDecryptedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;

    // Evitar bucles usando una referencia para almacenar el mensaje desencriptado
    let isComponentMounted = true;

    const fetchDecryptedMessage = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await httpService.get(
          `${urls.decryptMessage}/${state.user.userId}/${messageId}`,
        );

        if (response.status === 200 && response.data) {
          const data = response.data as IMessage;

          if (isComponentMounted) {
            setDecryptedMessage(data.content);
            setMessageWidth(data.content.length);

            if (state.user.userId !== senderId) {
              dispatch({
                type: Actions.SetMessageAsRead,
                payload: { chatId, messageId },
              });
            }
          }
        } else {
          throw new Error(
            `Error al desencriptar el mensaje: ${response.status}`,
          );
        }
      } catch (err) {
        if (isComponentMounted) {
          setError('Error fetching decrypted message');
          console.error(err);
        }
      } finally {
        if (isComponentMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDecryptedMessage()
      .then(() => {})
      .catch(() => {});

    // Cleanup para prevenir actualizaciones después de desmontar
    return (): void => {
      isComponentMounted = false;
    };
  }, [
    chatId,
    messageId,
    senderId,
    shouldFetch,
    dispatch,
    setMessageWidth,
    state.user.userId,
  ]);

  return { decryptedMessage, isLoading, error };
};

// export const useDecryptMessage = (
//   chatId: number,
//   messageId: number,
//   senderId: number,
//   shouldFetch: boolean,
//   setMessageWidth: (width: number) => void,
// ): { decryptedMessage: string; isLoading: boolean; error: string | null } => {
//   const { state, dispatch } = useContext(AppContext);
//   const [decryptedMessage, setDecryptedMessage] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!shouldFetch) return;

//     setIsLoading(true);
//     setError(null);

//     httpService
//       .get(`${urls.decryptMessage}/${state.user.userId}/${messageId}`)
//       .then((response) => {
//         const status = response.status;
//         const data = response.data as IMessage;
//         if (status === 200 && data) {
//           setDecryptedMessage(data.content);
//           setMessageWidth(decryptedMessage.length);
//           if (state.user.userId != senderId) {
//             dispatch({
//               type: Actions.SetMessageAsRead,
//               payload: { chatId, messageId },
//             });
//           } else {
//             setError(`Error al desencriptar el mensaje: ${status}`);
//           }
//         }
//       })
//       .catch((err) => {
//         setError('Error fetching decrypted message');
//         console.error(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [
//     chatId,
//     decryptedMessage.length,
//     dispatch,
//     messageId,
//     senderId,
//     setMessageWidth,
//     shouldFetch,
//     state.user.chats,
//     state.user.userId,
//   ]);

//   return { decryptedMessage, isLoading, error };
// };

//V1
// export const useDecryptMessage = (
//   chatId: number,
//   messageId: number,
//   shouldFetch: boolean,
//   setMessageWidth: (width: number) => void,
// ): { decryptedMessage: string; isLoading: boolean; error: string | null } => {
//   const { state, dispatch } = useContext(AppContext);

//   // Estados locales
//   const [decryptedMessage, setDecryptedMessage] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Memorizar el chat actual
//   const chat = useMemo(
//     () => state.user.chats.find((c) => c.chatId === chatId),
//     [state.user.chats, chatId],
//   );

//   // Memorizar el mensaje actual
//   const message = useMemo(
//     () => chat?.messages.find((m) => m.messageId === messageId),
//     [chat, messageId],
//   );

//   // Efecto para desencriptar el mensaje y marcarlo como leído
//   useEffect(() => {
//     if (!shouldFetch || !chat || !message) return;

//     setIsLoading(true);
//     setError(null);

//     httpService
//       .get(`${urls.decryptMessage}/${state.user.userId}/${messageId}`)
//       .then((response) => {
//         const status = response.status;
//         const data = response.data as IMessage;

//         if (status === 200 && data) {
//           setDecryptedMessage(data.content);
//           setMessageWidth(data.content.length + 3); // Ajustar el ancho basado en la longitud
//         } else {
//           setError(`Error al desencriptar el mensaje: ${status}`);
//         }

//         // Si el mensaje no está marcado como leído, despachar acción
//         if (
//           !message.isRead &&
//           state.user.userId === chat.participants[1]?.contactId
//         ) {
//           dispatch({
//             type: Actions.SetMessageAsRead,
//             payload: { chatId, messageId },
//           });
//         }
//       })
//       .catch((err) => {
//         setError('Error fetching decrypted message');
//         console.error(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, [
//     chat,
//     message,
//     chatId,
//     messageId,
//     dispatch,
//     shouldFetch,
//     setMessageWidth,
//     state.user.userId,
//   ]);

//   return { decryptedMessage, isLoading, error };
// };

// V0
// export const useDecryptMessage = (
//   chatId: number,
//   messageId: number,
//   shouldFetch: boolean,
//   setMessageWidth: (width: number) => void,
// ): { decryptedMessage: string; isLoading: boolean; error: string | null } => {
//   const { state, dispatch } = useContext(AppContext);
//   const [decryptedMessage, setDecryptedMessage] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!shouldFetch) return;

//     setIsLoading(true);
//     setError(null);

//     httpService
//       .get(`${urls.decryptMessage}/${state.user.userId}/${messageId}`)
//       .then((response) => {
//         const status = response.status;
//         const data = response.data as IMessage;
//         if (status === 200 && data) {
//           setDecryptedMessage(data.content);
//           setMessageWidth(decryptedMessage.length);
//         } else {
//           setError(`Error al desencriptar el mensaje: ${status}`);
//         }
//       })
//       .catch((err) => {
//         setError('Error fetching decrypted message');
//         console.error(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [
//     chatId,
//     decryptedMessage.length,
//     dispatch,
//     messageId,
//     setMessageWidth,
//     shouldFetch,
//     state.user.chats,
//     state.user.userId,
//   ]);

//   return { decryptedMessage, isLoading, error };
// };
