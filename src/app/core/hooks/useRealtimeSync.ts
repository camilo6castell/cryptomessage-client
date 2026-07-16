// src/app/core/hooks/useRealtimeSync.ts
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { IMessage } from '../models/main/IMessage.model';
import { IChat } from '../models/main/IChat.model';
import {
  connectWebSocket,
  disconnectWebSocket,
  WsChatPayload,
  WsMessagePayload,
} from '../services/ws.service';

const toIMessage = (payload: WsMessagePayload): IMessage => ({
  messageId: payload.messageId,
  chatId: payload.chatId,
  senderId: payload.senderId,
  encryptedContent: payload.encryptedContent,
  isRead: payload.read,
  sentAt: payload.sentAt,
});

const toIChat = (payload: WsChatPayload): IChat => ({
  chatId: payload.chatId,
  status: payload.status,
  initiatedBy: payload.initiatedBy,
  participant: {
    userId: payload.participant.userId,
    username: payload.participant.username,
    publicKey: payload.participant.publicKey,
  },
  messages: [],
  lastMessage: null,
  createdAt: payload.createdAt,
});

/**
 * Keeps the chat list and open conversation in sync live, without polling.
 * Mounted once at the authenticated shell (MainLayout).
 */
export const useRealtimeSync = (): { isConnected: boolean } => {
  const { state, dispatch } = useContext(AppContext);
  const [isConnected, setIsConnected] = useState(false);

  const token = state.user.token;

  useEffect(() => {
    if (!token) {
      disconnectWebSocket();
      setIsConnected(false);
      return;
    }

    connectWebSocket(
      token,
      (payload) => {
        dispatch({ type: Actions.AddMessage, payload: toIMessage(payload) });
      },
      (payload) => {
        dispatch({ type: Actions.UpsertChat, payload: toIChat(payload) });
      },
      setIsConnected
    );

    return () => {
      disconnectWebSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch]);

  return { isConnected };
};
