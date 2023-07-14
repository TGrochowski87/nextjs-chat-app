import RoomDto from "model/dto/RoomDto";
import RoomList from "./RoomList";

async function getRooms(): Promise<ReadonlyArray<RoomDto>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rooms`, { next: { revalidate: 0 } });

  if (!response.ok) {
    throw new Error("Failed to fetch room list");
  }

  return response.json();
}

const Rooms = async () => {
  const rooms = await getRooms();

  return <RoomList roomList={rooms} />;
};

export default Rooms;

