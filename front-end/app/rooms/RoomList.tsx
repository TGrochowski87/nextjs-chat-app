"use client";

import RoomDto from "model/dto/RoomDto";
import RoomListItem from "./RoomListItem";
import "./rooms.scss";
import TitledBlock from "common/components/TitledBlock";
import { useEffect, useRef, useState } from "react";
import RoomHub from "./RoomHub";
import RoomUpdate from "model/hubs/RoomUpdate";
import { incrementRoomHeadCount } from "common/api";

interface Props {
  roomList: ReadonlyArray<RoomDto>;
}

const RoomList = ({ roomList }: Props) => {
  const roomHub = useRef<RoomHub>(new RoomHub());
  const [rooms, setRooms] = useState<ReadonlyArray<RoomDto>>([]);
  const [roomUpdateBuffer, setRoomUpdateBuffer] = useState<RoomUpdate>();

  useEffect(() => {
    const setupConnection = async () => {
      await roomHub.current.connect(receiveRoomUpdate);
    };
    const dropConnection = async () => {
      await roomHub.current.disconnect();
    };

    setRooms(roomList);
    setupConnection();

    return () => {
      dropConnection();
    };
  }, []);

  useEffect(() => {
    if (roomUpdateBuffer !== undefined) {
      handleRoomUpdateReceive(roomUpdateBuffer);
      setRoomUpdateBuffer(undefined);
    }
  }, [roomUpdateBuffer]);

  const receiveRoomUpdate = (roomUpdate: RoomUpdate) => {
    setRoomUpdateBuffer(roomUpdate);
  };

  const handleRoomUpdateReceive = (roomUpdate: RoomUpdate) => {
    const getNewRoomHeadCount = (room: RoomDto): number => {
      switch (roomUpdate.eventType) {
        case "Increment":
          return room.headCount + 1;
        case "Decrement":
          return room.headCount - 1;
        default:
          throw new Error("Unreachable code. Method: getNewRoomHeadCount().");
      }
    };

    var newRooms: ReadonlyArray<RoomDto> = rooms.map(r =>
      r.id === roomUpdate.id ? { ...r, headCount: getNewRoomHeadCount(r) } : r
    );
    setRooms(newRooms);
  };

  const sendNotificationOnRoomEnter = async (roomId: number) => {
    await roomHub.current.updateRoom({ id: roomId, eventType: "Increment" });
    await incrementRoomHeadCount(roomId);
  };

  return (
    <TitledBlock className="room-list-space vertical-center" title="Chat Rooms">
      {rooms.map(r => (
        <RoomListItem key={r.id} room={r} onRoomEnter={sendNotificationOnRoomEnter} />
      ))}
    </TitledBlock>
  );
};

export default RoomList;
