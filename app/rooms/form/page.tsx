"use client";

import { Button, Input } from "@mui/joy";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NameForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [roomId, setRoomId] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const id = searchParams.get("roomId");

    if (id === null) {
      throw Error("Id is null.");
    }

    setRoomId(+id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={() => {
        router.push(`/rooms/${roomId}`);
      }}>
      <Input
        placeholder="Type in here..."
        required
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
      />
      <Button type="submit" />
    </form>
  );
};

export default NameForm;
