import Image from "next/image";
import Person from "assets/person.svg";
import EnterButton from "./EnterButton";
import RoomDto from "model/dto/RoomDto";

async function getHeadCount(id: number): Promise<RoomDto> {
  const response = await fetch(`${process.env.API_BASE_URL}/rooms/${id}`, { next: { revalidate: 10 } });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

interface Props {
  id: number;
  name: string;
}

const RoomListItem = async ({ id, name }: Props) => {
  const room = await getHeadCount(id);
  const headCount = room.headCount;

  return (
    <div className="room-list-item">
      <div className="info-space">
        <h3>{name}</h3>
        <div>
          <h3>{headCount}</h3>
          <Image src={Person} alt="People in room" width={24} height={24} />
        </div>
      </div>
      <EnterButton roomId={id} />
    </div>
  );
};

export default RoomListItem;
