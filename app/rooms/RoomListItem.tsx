"use client";

import Image from "next/image";
import Person from "common/assets/person.svg";
import RoomDto from "model/dto/RoomDto";
import { useRouter } from "next/router";
import { Route } from "next";

interface Props {
  room: RoomDto;
  onRoomEnter: (roomId: number) => void;
}

const RoomListItem = ({ room, onRoomEnter }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        onRoomEnter(room.id);
        router.push(`/rooms/${room.id}` as Route);
      }}
      className="room-list-item">
      <div className="info-space">
        <h3>{room.name}</h3>
        <div className="head-count">
          <h3>{room.headCount}/2</h3>
          <Image src={Person} alt="People in room" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default RoomListItem;
