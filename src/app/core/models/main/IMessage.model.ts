export interface IMessage {
  chatId: number;
  messageId: number;
  senderId: number;
  content: string;
  sentAt: string;
  isRead: boolean;
}
