import type {
  WsMessagePayload,
  WsChatPayload,
} from '../app/core/services/ws.service';

type MessageHandler = (payload: WsMessagePayload) => void;
type ChatHandler = (payload: WsChatPayload) => void;
type ConnectionListener = (connected: boolean) => void;

let onMessageCallback: MessageHandler | null = null;
let onChatUpdateCallback: ChatHandler | null = null;
let onConnectionChangeCallback: ConnectionListener | null = null;
let isConnected = false;

let messageInterval: ReturnType<typeof setInterval> | null = null;

const emitMessage = (payload: WsMessagePayload): void => {
  onMessageCallback?.(payload);
};

const emitChatUpdate = (payload: WsChatPayload): void => {
  onChatUpdateCallback?.(payload);
};

export const connectWebSocket = (
  _token: string,
  onMessage: MessageHandler,
  onChatUpdate: ChatHandler,
  onConnectionChange?: ConnectionListener
): void => {
  if (isConnected) return;

  onMessageCallback = onMessage;
  onChatUpdateCallback = onChatUpdate;
  onConnectionChangeCallback = onConnectionChange ?? null;

  setTimeout(() => {
    isConnected = true;
    onConnectionChangeCallback?.(true);
  }, 300);

  messageInterval = setInterval(() => {
    const mockMessage: WsMessagePayload = {
      messageId: Date.now(),
      chatId: 1,
      senderId: 999,
      encryptedContent: `mock-ws-message-${Date.now()}`,
      read: false,
      sentAt: new Date().toISOString(),
    };
    emitMessage(mockMessage);
  }, 15000);
};

export const disconnectWebSocket = (): void => {
  if (messageInterval) {
    clearInterval(messageInterval);
    messageInterval = null;
  }

  isConnected = false;
  onMessageCallback = null;
  onChatUpdateCallback = null;
  onConnectionChangeCallback?.(false);
  onConnectionChangeCallback = null;
};

export const isWebSocketConnected = (): boolean => isConnected;

export const mockSendWsMessage = (payload: WsMessagePayload): void => {
  emitMessage(payload);
};

export const mockSendChatUpdate = (payload: WsChatPayload): void => {
  emitChatUpdate(payload);
};
