"use client";

import { useRouter } from "next/navigation";
import useScoreStore from "@/store/score";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function settingPage() {
  const router = useRouter();
  const { players } = useScoreStore((state) => state.data);
  const { addPlayer, setDidSetting } = useScoreStore((state) => state.actions);
  const [userInput, setUserInput] = useState("");

  const handleAddPlayer = () => {
    console.log("handleAddPlayer");
    addPlayer(userInput);
    setUserInput("");
  };

  const handleClickStart = () => {
    router.push("/price");
    setDidSetting(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") handleAddPlayer();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-4xl gap-[30px]">
      <div>게임 참가자를 추가해주세요! 🏃</div>

      <div className="flex items-center justify-center gap-[10px]">
        <Input
          name="nicname"
          value={userInput}
          placeholder="닉네임을 입력해주세요"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleAddPlayer}>플레이어 추가</Button>
      </div>

      <div className="flex flex-col items-start justify-center gap-[16px] w-[500px] rounded-md bg-neutral-100 p-[32px]">
        {players.length === 0 && (
          <div className="flex items-center justify-center text-2xl w-full text-center">
            등록된 플레이어가 없습니다. 😢
          </div>
        )}
        {players.map((player, idx) => (
          <Player key={idx} id={player.id} name={player.name} idx={idx} />
        ))}
      </div>

      <Button
        className={cn(
          "w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white",
          players.length < 2 &&
            "pointer-events-none bg-neutral-200 text-neutral-400"
        )}
        onClick={handleClickStart}
      >
        시작하기
      </Button>
    </div>
  );
}

type PlayerProps = {
  id: string;
  name: string;
  idx: number;
};

function Player({ id, name, idx }: PlayerProps) {
  const { removePlayer } = useScoreStore((state) => state.actions);

  const handleRemovePlayer = (id: string) => {
    removePlayer(id);
  };

  return (
    <div className="group flex items-center justify-between gap-[10px] w-full">
      <div className="flex gap-[20px]">
        <span>{`플레이어 ${idx + 1} 👉`}</span>
        <span>{name}</span>
      </div>
      <span
        className="hidden group-hover:block hover:cursor-pointer text-2xl"
        onClick={() => handleRemovePlayer(id)}
      >
        ❌
      </span>
    </div>
  );
}
