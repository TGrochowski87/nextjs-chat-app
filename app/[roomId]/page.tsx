import RoomDto from "model/dto/RoomDto";

export async function generateStaticParams() {
  const rooms: RoomDto[] = await fetch(`${process.env.API_BASE_URL}/rooms`).then(response => response.json());

  return rooms.map(r => ({
    id: r.id,
  }));
}

interface Props {
  id: number;
}

const Room = ({ id }: Props) => {
  return (
    <div>
      <h1>XD</h1>
      <h1>XD</h1>
    </div>
  );
};

export default Room;
