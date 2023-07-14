import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import RoomUpdate from "model/hubs/RoomUpdate";

class RoomHub {
  private connection: signalR.HubConnection | undefined;

  async connect(onRoomUpdateReceive: (roomUpdate: RoomUpdate) => void): Promise<void> {
    this.connection = new HubConnectionBuilder()
      .withUrl(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/roomhub`,
        // This disables negotiation step and possible fallback to Server Sent Events or Long Polling.
        // WebSockets must be supported by client, server and any intermediary device like routers for this to work.
        { transport: HttpTransportType.WebSockets, skipNegotiation: true }
      )
      // A reconnection produces a new connection ID, which is not in any group
      .withAutomaticReconnect()
      .build();

    this.connection.onreconnecting(error => {}); // error contains a reason, why the reconnection occurred.
    this.connection.onreconnected(connectionId => {}); // connectionId - new connectionId after reconnection.

    this.connection.on("NotifyRoomUpdate", onRoomUpdateReceive);

    await this.connection.start();
  }

  async disconnect() {
    await this.connection?.stop();
  }

  async updateRoom(roomUpdate: RoomUpdate) {
    await this.connection?.invoke("UpdateRoom", roomUpdate);
  }
}

export default RoomHub;
