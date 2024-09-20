"use client";

import { useRouter } from "next/navigation";
import useScoreStore from "@/store/score";
import { Button } from "@/components/ui/button";

export default function resultPage() {
  const router = useRouter();
  const { players } = useScoreStore((state) => state.data);
  const { reset } = useScoreStore((state) => state.actions);

  if (players.length === 0) return null;

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const handleClickMain = () => {
    router.push("/main");
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-4xl gap-[30px]">
      <div className="flex flex-col items-center justify-center gap-[10px] mb-[20px]">
        <h1 className="text-6xl">🎊 게임 결과 🎊</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2 className="text-purple-500">{`🥇 1등 ${sortedPlayers[0].name} - ${sortedPlayers[0].score}점`}</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2>{`🥈 2등 ${sortedPlayers[1].name} - ${sortedPlayers[1].score}점`}</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2>{`🥉 3등 ${sortedPlayers[2].name} - ${sortedPlayers[2].score}점`}</h2>
      </div>

      {sortedPlayers.length > 3 && (
        <div className="flex flex-col items-center justify-center gap-[10px]">
          {sortedPlayers.slice(3).map((player, index) => (
            <h2 key={player.id}>{`${index + 4}등 ${player.name} - ${
              player.score
            }점`}</h2>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-[10px] mt-[20px]">
        <h2 className="text-2xl">게임을 즐겨주셔서 감사합니다!</h2>
        <Button
          className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
          onClick={handleClickMain}
        >
          메인으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
