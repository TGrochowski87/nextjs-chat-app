import RoomList from "./components/RoomList";

const Rooms = () => {
  return (
    /* @ts-expect-error Server Component */
    <RoomList />
  );
};

export default Rooms;

