"use client";

import useScoreStore from "@/store/score";
import { Button } from "./ui/button";

export default function ScoreBoard() {
  const { players } = useScoreStore((state) => state.data);
  const { setScore } = useScoreStore((state) => state.actions);

  return (
    <div className="w-full gap-[20px] flex flex-col items-center justify-center">
      <h1 className="text-2xl">점수 현황</h1>
      <div className="flex items-center justify-center gap-[48px]">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex flex-col items-center justify-center gap-[20px] w-[120px]"
          >
            <span className="text-2xl">{player.name}</span>
            <span className="text-4xl">{player.score}</span>
            <Button
              className="text-2xl w-[48px] h-[48px]"
              onClick={() => setScore(player.id, player.score + 1)}
            >
              +
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
