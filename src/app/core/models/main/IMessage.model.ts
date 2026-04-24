export interface IMessage {
  chatId: number;
  messageId: number;
  senderId: number;
  encryptedContent: string;
  sentAt: string;
  isRead: boolean;
}
