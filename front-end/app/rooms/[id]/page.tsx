import RoomDto from "model/dto/RoomDto";
import ChatWindow from "./ChatWindow";

export async function generateStaticParams() {
  const rooms: RoomDto[] = await fetch(`${process.env.API_BASE_URL}/rooms`).then(response => response.json());

  return rooms.map(r => ({
    id: r.id.toString(),
  }));
}

interface Props {
  id: number;
}

const Room = ({ id }: Props) => {
  return <ChatWindow roomId={id} />;
};

export default Room;
