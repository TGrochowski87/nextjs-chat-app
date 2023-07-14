"use client";

import { Button, Input } from "@mui/joy";
import TitledBlock from "common/components/TitledBlock";
import Message from "model/hubs/Message";
import { FormEvent, useEffect, useRef, useState } from "react";
import MessageHub from "./MessageHub";

interface Props {
  roomId: number;
}

const ChatWindow = ({ roomId }: Props) => {
  const messageHub = useRef<MessageHub>(new MessageHub());
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState<string>("");

  useEffect(() => {
    messageHub.current.connect(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messagehub`, handleMessageReceived);

    return () => {
      messageHub.current.disconnect();
    };
  }, []);

  function handleMessageReceived(message: Message): void {
    setMessageHistory(prevState => [...prevState, message]);
  }

  return (
    <>
      <TitledBlock>
        {messageHistory.map(m => (
          <div key={crypto.randomUUID()}>
            <h4>{m.content}</h4>
            <p>{m.createTime.toString()}</p>
          </div>
        ))}
        <hr />
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            messageHub.current.forwardMessage(roomId, newMessageContent);
          }}>
          <Input
            placeholder="Type in here..."
            required
            value={newMessageContent}
            onChange={event => {
              setNewMessageContent(event.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </TitledBlock>
    </>
  );
};

export default ChatWindow;
