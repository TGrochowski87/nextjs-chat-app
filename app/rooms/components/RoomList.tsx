import RoomDto from "model/dto/RoomDto";
import "./room-list.scss";
import RoomListItem from "./RoomListItem";

async function getRooms(): Promise<ReadonlyArray<RoomDto>> {
  const response = await fetch(`${process.env.API_BASE_URL}/rooms`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

async function RoomList() {
  const rooms = await getRooms();

  return (
    <section className="room-list-space block">
      <div className="top-bar">
        <h3>Chat Rooms</h3>
      </div>
      <div className="room-list">
        {rooms.map(r => (
          /* @ts-expect-error Server Component */
          <RoomListItem key={r.id} id={r.id} name={r.name} />
        ))}
      </div>
    </section>
  );
}

export default RoomList;
