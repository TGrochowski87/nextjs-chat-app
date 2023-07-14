"use client";

import { CssVarsProvider, Input } from "@mui/joy";
import TitledBlock from "common/components/TitledBlock";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import BrokenFrameButton from "../../common/components/BrokenFrameButton";
import "./form.scss";

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
    <CssVarsProvider defaultMode="dark">
      <TitledBlock className="vertical-center form-space" title="Enter your name">
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            router.push(`/rooms/${roomId}` as Route);
          }}>
          <Input
            placeholder="Type in here..."
            required
            value={input}
            onChange={event => {
              setInput(event.target.value);
            }}
          />
          <BrokenFrameButton>Submit</BrokenFrameButton>
        </form>
      </TitledBlock>
    </CssVarsProvider>
  );
};

export default NameForm;
