// src/app/core/services/ws.service.ts
import { Client, IMessage as StompMessage } from '@stomp/stompjs';
import { API_BASE_URL } from '../config/api.config';
import { ChatStatus } from '../models/enums/ChatStatus.enum';

export interface WsMessagePayload {
  messageId: number;
  chatId: number;
  senderId: number;
  encryptedContent: string;
  read: boolean;
  sentAt: string;
}

export interface WsChatPayload {
  chatId: number;
  initiatedBy: number;
  status: ChatStatus;
  participant: {
    userId: number;
    username: string;
    publicKey: string;
  };
  createdAt: string;
}

type ConnectionListener = (connected: boolean) => void;

let client: Client | null = null;

const toWsUrl = (httpUrl: string): string =>
  httpUrl.replace(/^http/, 'ws').replace(/\/+$/, '') + '/ws';

/**
 * Opens (or reuses) the realtime connection for the current session.
 * The server never sees plaintext here either — every payload relayed
 * over this socket is the same ciphertext the REST API already returns.
 */
export const connectWebSocket = (
  token: string,
  onMessage: (payload: WsMessagePayload) => void,
  onChatUpdate: (payload: WsChatPayload) => void,
  onConnectionChange?: ConnectionListener
): void => {
  if (client?.active) return;

  client = new Client({
    brokerURL: toWsUrl(API_BASE_URL),
    connectHeaders: { Authorization: `Bearer ${token}` },
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    onConnect: () => {
      onConnectionChange?.(true);

      client?.subscribe('/user/queue/messages', (frame: StompMessage) => {
        try {
          onMessage(JSON.parse(frame.body));
        } catch (err) {
          console.error('WS: failed to parse message payload', err);
        }
      });

      client?.subscribe('/user/queue/chats', (frame: StompMessage) => {
        try {
          onChatUpdate(JSON.parse(frame.body));
        } catch (err) {
          console.error('WS: failed to parse chat payload', err);
        }
      });
    },

    onDisconnect: () => onConnectionChange?.(false),
    onWebSocketClose: () => onConnectionChange?.(false),
    onStompError: (frame) => {
      console.error('WS: STOMP error', frame.headers['message'], frame.body);
    },
  });

  client.activate();
};

export const disconnectWebSocket = (): void => {
  client?.deactivate();
  client = null;
};

export const isWebSocketConnected = (): boolean => client?.connected ?? false;
