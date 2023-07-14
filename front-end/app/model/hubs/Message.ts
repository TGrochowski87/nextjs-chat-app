import MessageDto from "model/dto/MessageDto";

type Message = Omit<MessageDto, "id" | "senderConnectionId">;
export default Message;
