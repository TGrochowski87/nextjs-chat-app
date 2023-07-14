export default interface MessageDto {
  id: number;
  content: string;
  createTime: Date;
  senderConnectionId: string;
}
