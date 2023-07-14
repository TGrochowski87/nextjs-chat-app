import signalR from "@microsoft/signalr";
import Message from "model/hubs/Message";

class MessageHub {
  private connection: signalR.HubConnection | undefined;

  async connect(url: string, onMessageReceive: (message: Message) => void): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(
        url,
        // This disables negotiation step and possible fallback to Server Sent Events or Long Polling.
        // WebSockets must be supported by client, server and any intermediary device like routers for this to work.
        { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true }
      )
      // A reconnection produces a new connection ID, which is not in any group
      .withAutomaticReconnect()
      .build();

    this.connection.onreconnecting(error => {}); // error contains a reason, why the reconnection occurred.
    this.connection.onreconnected(connectionId => {}); // connectionId - new connectionId after reconnection.

    this.connection.on("ReceiveMessage", (receivedMessage: Message) => {
      onMessageReceive(receivedMessage);
    });

    await this.connection.start();
  }

  async disconnect(): Promise<void> {
    return await this.connection?.stop();
  }

  forwardMessage(roomId: number, newMessageContent: string) {
    const newMessage: Message = {
      content: newMessageContent,
      createTime: new Date(),
    };

    //this.connection?.invoke("ForwardMessage", roomId, message);
  }
}

export default MessageHub;
