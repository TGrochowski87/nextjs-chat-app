import RoomList from "./components/RoomList";

export default function Home() {
  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <RoomList />
    </main>
  );
}

